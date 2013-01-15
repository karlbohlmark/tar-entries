var tar = require('tar');
var Emitter = require('events').EventEmitter;

module.exports = entries;

function entries(tarStream) {
	var entryEmitter = new Emitter();
	var parse = tar.Parse();
	tarStream.pipe(parse)
		.on('entry', function (e) {
			start = parse.position + e._header.block.length;
			entryEmitter.emit('entry', {
				start: start,
				stop: start + e.size,
				size: e.size
			});
		}).on('done', function () {
			entryEmitter.emit('end');
		});
	return entryEmitter;
}