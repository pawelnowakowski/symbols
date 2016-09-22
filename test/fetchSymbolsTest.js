const fetchSymbols = require('../lib/fetchsymbols');
const assert = require('assert');

describe('fetch symbols', function () {
	it('', function (done) {
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

		//when
		const fetch = fetchSymbols({readFile, parseSymbols});
		
		//then
		const symbolFetch = fetch('someFile');

		symbolFetch.then(function (lines) {
			expectedAssertionCount++;
			assert.deepEqual(lines, ['AAPL', 'GOOD']);
			assert.equal(expectedAssertionCount, 3, 'expected number of assertions');
			done();
		}).catch(done);
	});
});