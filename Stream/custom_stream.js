/*
*	流实现者（构建流的处理方法）
*/
var stream = require('stream');
var util = require('util');	// 工具模块，实现继承

// 定制可读流
function ReadStream(){
	stream.Readable.call(this);	// 调用原有的上下文，保持一致
}
// 继承原有方法属性
util.inherits(ReadStream, stream.Readable);
// 改造自己的方法
ReadStream.prototype._read = function(){
	this.push('I ');
	this.push('Love ');
	this.push('Nodejs ');
	this.push(null);
}

// 定制可写流
function WritStream(){
	stream.Writable.call(this);
	this._cached = new Buffer('');	// 自己定制的附加属性
}

util.inherits(WritStream, stream.Writable);

WritStream.prototype._write = function(chunk, encode, cb){
	console.log(chunk.toString());
	cb();
}

// 定制转换流
function TransformStream(){
	stream.Transform.call(this);
}

util.inherits(TransformStream, stream.Transform);
// 自己实现的_transform方法必须有！
TransformStream.prototype._transform = function(chunk, encode, cb){
	this.push(chunk);
	cb();
}
// 私有方法 _flush 当_transform里最后的数据写入后调用
TransformStream.prototype._flush = function(cb){
	this.push('bingo!');
	cb();
}

var rs = new ReadStream();
var ws = new WritStream();
var ts = new TransformStream();

// 通过管道指引数据流向
rs.pipe(ts).pipe(ws);