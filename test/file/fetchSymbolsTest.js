const fetchSymbols = require('../../lib/file/fetchsymbols');
const assert = require('assert');
const coMocha = require('co-mocha');

describe('fetch symbols', function () {
	it('fetch symbols', function *() {

		//given
		let expectedAssertionCount = 0;
		const readFile = function (fileName) {
			expectedAssertionCount++;
			assert.equal(fileName, 'someFile');
			return Promise.resolve(['AAPL GOOD']);
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

		/*symbolFetch.then(function (lines) {
			expectedAssertionCount++;
			assert.deepEqual(lines, ['AAPL', 'GOOD']);
			assert.equal(expectedAssertionCount, 3, 'expected number of assertions');
			done();
		}).catch(done);*/
	});
});