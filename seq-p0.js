var π = require('./index.js');
var fs = require('fs');

var N = 13;

(function _next(number) {

	var number_str = new Array((N+1) - number.toString().length).join('0') + number.toString();
	process.stdout.write('Searching ' + number_str + ': ');

	π.find(number_str, function(status) {
		if (status.error) {
			fs.appendFileSync('seq' + N + '-p0.txt', '' + number + "\n");
			process.stdout.write("NOT FOUND\n");
		} else {
			process.stdout.write(''+status.index+"\n");
		}

		if (++number === Math.pow(10, N)) {
			process.exit();
		} else {
			_next(number);
		}
	});

})(0);