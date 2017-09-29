/*
*  @Author: Richard
*  @File Descriptions: 
*  @Date:   2017-09-26 15:02:17
* 
*  @Last Modified time: 2017-09-29 14:51:21
*/

var path = require('path');

// 新建一个聊天室类对象
var chatroom = require('./Chatroom.js')();

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socketIO = require('socket.io')(server);

app.use(express.static(path.resolve('../client')));

app.get('/chatroom.html', function(req, res){
	// console.log(__dirname)
	// res.sendFile('/chatroom.html');
	// res.send('<h1>Welcome Realtime Server</h1>');
})

socketIO.on('connection', function(socket){
	console.log('a user connected...');

	// socket.emit('message', 'hello, i\'m socket server!');

	// 监听用户登录事件
	socket.on('login', function(user){
		console.log(user.userName + '加入了聊天室');
		// 为当前用户socket绑定一个user对象，方便定位用户
		socket.curUser = user;

		// 将用户添加到聊天室
		chatroom.addUser(user);
		console.log('当天聊天室人数:' + chatroom.onlineCounts);
		// 广播用户登录事件
		socket.broadcast.emit('userIn', user);
		socket.emit('changeUsersCount', chatroom.onlineCounts);
		socket.broadcast.emit('changeUsersCount', chatroom.onlineCounts);
	})

	// 监听用户下线事件
	socket.on('disconnect', function(reason){
		// 没有登录的失连直接返回
		if(!socket.curUser){
			return ;
		}
		// 将用户从聊天室中删除
		chatroom.deleteUser(socket.curUser);

		console.log(socket.curUser.userName + '离开。。。');
		console.log('当天聊天室人数:' + chatroom.onlineCounts);

		// 广播用户离开事件
		socket.broadcast.emit('userOut', socket.curUser);
		socket.broadcast.emit('changeUsersCount', chatroom.onlineCounts);
	})

	// 监听用户发送消息事件，做广播转发
	socket.on('chatMsg', function(msg){
		console.log(socket.curUser.userName + ' 说：' + msg);
		socket.broadcast.emit('newMsg', msg, socket.curUser);
	})

})

server.listen(9000, function(){
	console.log('server launched in port 9000...');
})