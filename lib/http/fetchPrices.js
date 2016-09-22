const zip = require('lodash.zip');

module.exports = function ({readAllPrices, parseCurrentPrices}) {
	return function (symbols) {
		return readAllPrices(symbols)
			.then(parseCurrentPrices)
			.then(function (prices) {
				return zip(symbols, prices);
			});
	}
};