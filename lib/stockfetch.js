module.exports = function ({fetchSymbols, fetchPrices, prepareReport}) {
	return function (filename) {
		return fetchSymbols(filename).then(fetchPrices).then(prepareReport);
	}
};