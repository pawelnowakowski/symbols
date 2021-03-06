const stockFetch = require('../lib/stockfetch');
const assert = require('assert');
const coMocha = require('co-mocha');

describe('stockfetch e2e', function () {
	it('happy path', function *() {
		
		//given
		let expectedAssertionCount = 0;
		const fetchSymbols = function (fileName) {
			expectedAssertionCount++;
			assert.equal(fileName, 'someFile');
			return Promise.resolve(['AAPL', 'GOOD']);
		};
		const fetchPrices = function (symbols) {
			expectedAssertionCount++;
			assert.deepEqual(symbols, ['AAPL', 'GOOD']);
			return Promise.resolve([['AAPL', 10], ['GOOD', 20]]);
		};
		const prepareReport = function (symbolsAndPrices) {
			expectedAssertionCount++;
			assert.deepEqual(symbolsAndPrices, [['AAPL', 10], ['GOOD', 20]]);
			return 'report';
		};

		//when
		const fetch = stockFetch({fetchSymbols, fetchPrices, prepareReport});
		
		//then
		const reportPromise = yield fetch('someFile');
		expectedAssertionCount++;
		assert.equal(reportPromise, 'report');
		assert.equal(expectedAssertionCount, 4, 'expected number of assertions');
	});
});