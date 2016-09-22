module.exports = function ({request}) {
	return function (symbols) {
		//const url = "http://ichart.finance.yahoo.com/table.csv?s=";
		return Promise
			.all(symbols
				.map(symbol => request("http://ichart.finance.yahoo.com/table.csv?s=" + symbol)
					.catch(err => err)
				)
			);
	}
};