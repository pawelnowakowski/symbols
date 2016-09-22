module.exports = function(rawData) {
	return rawData
		.split('\r\n')
		.filter(validItemFormat);
}

function validItemFormat(item) {
	return item.trim().length > 0 && item.indexOf(' ') === -1;
}