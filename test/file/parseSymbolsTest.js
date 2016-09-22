const assert = require('assert');
const parseSymbols = require('../../lib/file/parseSymbols');
const coMocha = require('co-mocha');

describe('parse symbols', function () {
	it('[unit test] should get file symbols', function *() {
		const symbols = parseSymbols('GOOG\r\nAAPL');
		assert.deepEqual(symbols, ['GOOG', 'AAPL'])
	});

	it('[unit test] should get empty array', function *() {
		const symbols = parseSymbols('');
		assert.deepEqual(symbols, []);
	});

	it('[unit test] should trim and get empty array', function *() {
		const symbols = parseSymbols('    ');
		assert.deepEqual(symbols, []);
	});

	it('[unit test] should trim and get empty array', function *() {
		const symbols = parseSymbols('AAPL     \r\nGOOG\r\n\r\n    ');
		assert.deepEqual(symbols, ['GOOG']);
	});
});