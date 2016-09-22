var fs = require('fs');

module.exports = function(){
	return function (fileName) {
		return new Promise(function (resolve, reject) {
			fs.readFile(fileName, 'utf8', (err, data) => {
				if(err) reject('Cannot read file ' + fileName);
				else resolve(data);
			});
		});
	}
}

