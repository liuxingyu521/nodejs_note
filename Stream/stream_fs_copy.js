var fs = require('fs');

var readStream = fs.createReadStream('1.mp4');
var writeStream = fs.createWriteStream('1-stream.mp4');

readStream.on('data', function(chunk){
	if(writeStream.write(chunk) == false){	// 返回false表示数据没写完还在缓冲区
		console.log('still cached');
		readStream.pause();
	}
});
writeStream.on('drain', function(){	// drain事件当当前数据写完了触发
	console.log('cached over.');
	readStream.resume();
});

readStream.on('end', function(){
	writeStream.end();	// 关闭写的数据流
	console.log('read ends');
});

// 用stream 的 pipe()实现文件传递
// fs.createReadStream('1.mp4').pipe(fs.createWriteStream('1-pipe.mp4'));
