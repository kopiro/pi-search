var π = require('./index.js');

(function _next(number) {

	var number_str = new Array(7 - number.toString().length).join('0') + number.toString();

	π.find(number_str, function(status) {
		if (status.error) {
			process.stdout.write(number+"\n");
		}

		if (++number === 1000000) {
			process.stdout.write('We reached the end');
			process.exit();
		} else {
			_next(number);
		}
	});

})(0);