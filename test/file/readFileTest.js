const assert = require('assert');
const readFile = require('../../lib/file/readFile');
const coMocha = require('co-mocha');

describe('read file', function () {
	it('[integration test] should get file content', function *() {
		//given
		const fs = require('fs');
		const read = readFile({fs});

		//when
		const result = yield read('./symbols');

		//then
		assert.equal(result, 'GOOG\r\nAAPL\r\nORCL\r\nMSFT');
	});

	it('[unit test] should get file content', function *() {
		
		//given
		const fs = {
			readFile: function(fileName, encoding, callback){
				assert.equal(fileName, './symbols');
				assert.equal(encoding, 'utf8');
				callback(null, 'content');
			}
		}
		const read = readFile({fs});

		//when
		const result = yield read('./symbols');

		//then
		assert.equal(result, 'content');
	});

	it('[unit test with mocking library] should get file content', function *() {
		
		//given
		const td = require('testdouble');
		const fs = td.object();
		td.when(fs.readFile('./symbols', 'utf8')).thenCallback(null, 'content');
		const read = readFile({fs});

		//when
		const result = yield read('./symbols');

		//then
		assert.equal(result, 'content');
	});

	it('[unit test] should fail on nonexistent file', function *() {
		
		//given
		const fs = {
			readFile: function(fileName, encoding, callback){
				assert.equal(fileName, './symbols_invalid');
				assert.equal(encoding, 'utf8');
				callback('Cannot read file ' + fileName, null);
			}
		}
		const read = readFile({fs});

		//when
		try {
			const result = yield read('./symbols_invalid');
			throw 'should never get here';
		} catch(e){
			assert.equal(e, 'Cannot read file ./symbols_invalid');
		}
	});

	it('[unit test with mocking library] should fail on nonexistent file', function *() {
		
		//given
		const td = require('testdouble');
		const fs = td.object();
		td.when(fs.readFile('./symbols_invalid', 'utf8')).thenCallback(null, 'Cannot read file ./symbols_invalid');
		const read = readFile({fs});

		//when
		const result = yield read('./symbols_invalid');

		//then
		assert.equal(result, 'Cannot read file ./symbols_invalid');
	});

	it('[integration test] should fail on nonexistent file', function *() {
		const fs = require('fs');
		const read = readFile({fs});

		try {
			yield read('./symbols_invalid');
			throw 'should never get here';
		} catch(e) {
			assert.equal(e, 'Cannot read file ./symbols_invalid');
		}
	});
});