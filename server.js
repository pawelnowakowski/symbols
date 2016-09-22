var express = require('express');
var request = require('good-guy-http')();
var fs = require('fs');

var app = express();

function readSymbols() {
	var file = fs.readFile('./symbols', 'utf8', function (err, data) {
		data = data.split('\r\n');
		data.forEach(function (symbol) {
			request("http://ichart.finance.yahoo.com/table.csv?s=" + symbol)
				.then(function (response) {
					var line = response.body.split('\n')[1];
					line = symbol + line.split(',')[1];
					console.log(line);
				});
		});
	});
}

app.get('/', function (req, res) {
	readSymbols();
});


app.listen(process.env.PORT || 3000, function () {
	console.log('Example app listening on port 3000!');
});