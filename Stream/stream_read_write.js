/*
*	流实现者（构建流的处理方法）
*/
var Readable = require('stream').Readable;
var Writable = require('stream').Writable;

var readStream = new Readable();
var writStream = new Writable();

readStream.push('I ');
readStream.push('Love ');
readStream.push('Nodejs ');
readStream.push(null);	// 结束标志必须有，不然报错

writStream._write = function(chunk, encode, cb){
	console.log(chunk.toString());
	cb();
};

readStream.pipe(writStream);