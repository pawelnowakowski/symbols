const assert = require('assert');
const coMocha = require('co-mocha');
const fetchPrices = require('../../lib/http/fetchPrices');


describe('fetch prices test', function () {
	it('fetch prices', function *() {

		//given
		let expectedAssertionCount = 0;
		const readAllPrices = function (symbols) {
			expectedAssertionCount++;
			assert.deepEqual(symbols, ['GOOG', 'AAPL']);
			return Promise.resolve(['r1', 'r2']);
		};

		const parseCurrentPrices = function (resultArray) {
			expectedAssertionCount++;
			assert.deepEqual(resultArray, ['r1', 'r2']);
			return [10, 20];
		};

		const fetch = fetchPrices({readAllPrices, parseCurrentPrices});
		
		//when
		const symbols = yield fetch(['GOOG', 'AAPL']);

		//then
		expectedAssertionCount++;
		assert.deepEqual(symbols, [['GOOG', 10], ['AAPL', 20]]);
		assert.equal(expectedAssertionCount, 3, 'expected number of assertions');
	});
});