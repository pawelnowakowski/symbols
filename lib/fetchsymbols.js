module.exports = function ({readFile, parseSymbols}) {
	return function (filename) {
		return readFile(filename).then(parseSymbols);
	}
};