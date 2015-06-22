exports.find = function(to_find, callback) {
	to_find = to_find.toString();

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

	var global_index = 0;
	var old_ending_buffer_str = new Array(to_find.length).join(' ');

	stream
	.on('data', function(buffer) {
		var buffer_str = old_ending_buffer_str + buffer.toString();

		var index_of = buffer_str.indexOf(to_find);
		if (index_of >= 0) {
			var index = global_index + index_of - to_find.length + 1;
			return callback({
				success: true,
				index: global_index + index_of,
				message: 'Found "' + to_find + '" at index ' + index
			});
		}

		old_ending_buffer_str = buffer_str.substr(-to_find.length);
		global_index += buffer.length;
	})

	.on('end', function() {
		return callback({
			error: true,
			message: 'Not found'
		});
	});
};