const assert = require('assert');
const coMocha = require('co-mocha');
const readAllPrices = require('../../lib/http/readAllPrices');

describe('get all prices test', function () {
	it.skip('[integration test] get all prices', function *() {
		const symbols = ['GOOG', 'AAPL', 'INVALID'];

		const request = require('good-guy-http')();

		const read = readAllPrices({request});

		const result = yield read(symbols);

		assert.equal(result[0].statusCode, 200);
		assert.equal(result[1].statusCode, 200);
		assert.equal(result[2].statusCode, 404);
		assert.equal(result.length, 3);
	});

	it('[unit test] get all prices', function *() {
		const symbols = ['GOOG', 'AAPL', 'INVALID'];
		const request = function (url) {
			return url.endsWith('INVALID')
				? Promise.reject({statusCode: 404})
				: Promise.resolve({statusCode: 200});
		};

		const read = readAllPrices({request});

		const result = yield read(symbols);

		assert.equal(result[0].statusCode, 200);
		assert.equal(result[1].statusCode, 200);
		assert.equal(result[2].statusCode, 404);
		assert.equal(result.length, 3);
	});
});