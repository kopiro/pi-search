exports.find = function(to_find, callback) {
	// Check if is a number
	if (!/^\d+$/.test(to_find)) {
		return callback({
			error: true,
			message: 'NaN'
		});
	}

	var stream = require('fs').createReadStream('pi-billion.txt', {
		start: 2
	});

	var old_buffer_length = -1 * (to_find.toString().length - 1);
	var old_ending_buffer_str = '';

	stream
	.on('data', function(buffer) {
		var buffer_str = old_ending_buffer_str + buffer.toString();

		var index_of = buffer_str.indexOf(process.argv[2]);
		if (index_of >= 0) {
			return callback({
				success: true,
				index: index_of
			});
		}

		old_ending_buffer_str = buffer_str.substr(old_buffer_length);
	})

	.on('end', function() {
		return callback({
			error: true,
			message: 'Not found'
		});
	});
};