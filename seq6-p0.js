var π = require('./index.js');
var fs = require('fs');

(function _next(number) {

	var number_str = new Array(7 - number.toString().length).join('0') + number.toString();
	process.stdout.write('Searching ' + number_str + ': ');

	π.find(number_str, function(status) {
		if (status.error) {
			fs.appendFileSync('seq6-p0.txt', number + "\n");
			process.stdout.write('NOT FOUND');
		} else {
			process.stdout.write(''+status.index+"\n");
		}

		if (++number === 1000000) {
			process.exit();
		} else {
			_next(number);
		}
	});

})(0);