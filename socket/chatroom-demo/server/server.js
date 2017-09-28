/*
*  @Author: Richard
*  @File Descriptions: 
*  @Date:   2017-09-26 15:02:17
* 
*  @Last Modified time: 2017-09-28 16:14:17
*/

var path = require('path');

// 新建一个聊天室类对象
var chatroom = require('./Chatroom.js')();

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socketIO = require('socket.io')(server);

app.use(express.static(path.resolve('../client')));

app.get('/', function(req, res){
	// console.log(__dirname)
	res.sendFile('/index.html');
	// res.send('<h1>Welcome Realtime Server</h1>');
})

socketIO.on('connection', function(socket){
	console.log('a user connected...');

	// socket.emit('message', 'hello, i\'m socket server!');

	// 监听用户登录事件
	socket.on('login', function(user){
		console.log(user);
		
		socket.emit('changeUsersCount', 2);

		setTimeout(function(){
			socket.broadcast.emit('userIn', user);
		}, 3000)
	})

})

server.listen(9000, function(){
	console.log('server launched in port 9000...');
})