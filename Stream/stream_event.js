var fs = require('fs')

var readStream = fs.createReadStream('1.mp4');
var n = 0; // 触发data事件次数计数器

readStream
	.on('data', function(chunk){
		n++;
		console.log('data emits');
		console.log(Buffer.isBuffer(chunk));
		readStream.pause();
		console.log('readStream pause');

		setTimeout(function(){
			readStream.resume();
			console.log('readStream resume.');
		}, 10)
	})
	.on('readable', function(){
		console.log('data readable');
	})
	.on('end', function(){
		console.log('data ends');
		console.log('共触发了%d次data事件', n);
	})
	.on('close', function(){
		console.log('data close.');
	})
	.on('error', function(e){
		console.log('read error');
	})