#!/usr/bin/env node

// Open the stream
var stream = require('fs').createReadStream('pi-billion.txt', {
	start: 2, // ignore "3."
});

// Check if the input is a number
var to_find = process.argv[2];
if (!/^\d+$/.test(to_find)) {
	process.stderr.write('NaN');
	process.exit(2);
}

// Receive the data
stream.on('data', function(buffer) {
	var index_of = buffer.toString().indexOf(process.argv[2]);
	if (index_of >= 0) {
		process.stdout.write(index_of.toString());
		stream.pause();
		process.exit(0);
	}
});

// We reached the end
stream.on('end', function() {
	process.stderr.write('-1');
	process.exit(1);
});