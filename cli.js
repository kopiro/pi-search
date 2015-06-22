#!/usr/bin/env node

var π = require('./index.js');
π.find(process.argv[2], function(status) {
	process[ status.error ? 'stderr' : 'stdout' ].write(''+status.message+"\n");
	process.exit(~~status.error);
});