const fetchSymbols = require('../../lib/file/fetchsymbols');
const assert = require('assert');
const td = require('testdouble');
const coMocha = require('co-mocha');

describe('fetch symbols', function () {

	it('[mocking library] reads file and parses function', function *() {

		//given
		const readFile = td.function('readFile');
		const parseSymbols = td.function('parseSymbols');
		td.when(readFile('someFile')).thenReturn(Promise.resolve('AAPL GOOD'));
		td.when(parseSymbols('AAPL GOOD')).thenReturn(Promise.resolve(['AAPL', 'GOOD']));

		const fetch = fetchSymbols({readFile, parseSymbols});
		
		//when
		const symbols = yield fetch('someFile');

		//then
		assert.deepEqual(symbols, ['AAPL', 'GOOD']);
	});

	it('fetch symbols', function *() {

		//given
		let expectedAssertionCount = 0;
		const readFile = function (fileName) {
			expectedAssertionCount++;
			assert.equal(fileName, 'someFile');
			return Promise.resolve('AAPL GOOD');
		};

		const parseSymbols = function (line) {
			expectedAssertionCount++;
			assert.equal(line, 'AAPL GOOD');
			return Promise.resolve(['AAPL', 'GOOD']);
		};

		const fetch = fetchSymbols({readFile, parseSymbols});
		
		//when
		const symbols = yield fetch('someFile');

		//then
		expectedAssertionCount++;
		assert.deepEqual(symbols, ['AAPL', 'GOOD']);
		assert.equal(expectedAssertionCount, 3, 'expected number of assertions');
	});
});