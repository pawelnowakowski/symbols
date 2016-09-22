const assert = require('assert');
const readFile = require('../../lib/file/readFile');
const coMocha = require('co-mocha');
const fs = require('fs');

describe('read file', function () {
	it('[integration test] should get file content', function *() {
		const read = readFile({fs});

		const result = yield read('./symbols');

		assert.equal(result, 'GOOG\r\nAAPL\r\nORCL\r\nMSFT');
	});

	it('[integration test] should fail on nonexistent file', function *() {
		const read = readFile({fs});

		try {
			yield read('./symbols_invalid');
			throw 'should never get here';
		} catch(e) {
			assert.equal(e, 'Cannot read file ./symbols_invalid');
		}
	});
});