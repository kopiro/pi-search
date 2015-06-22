exports.find = function(to_find, callback) {
	var stream = require('fs').createReadStream('pi-billion.txt', { start: 2 });

	if (!/^\d+$/.test(to_find)) {
		return callback({
			error: true,
			message: 'NaN'
		});
	}

	stream.on('data', function(buffer) {
		var index_of = buffer.toString().indexOf(process.argv[2]);
		if (index_of >= 0) {
			return callback({
				success: true,
				index: index_of
			});
		}
	});

	stream.on('end', function() {
		return callback({
			error: true,
			message: 'Not found'
		});
	});
};