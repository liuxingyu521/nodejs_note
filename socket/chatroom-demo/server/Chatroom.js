/*
*  @Author: Richard
*  @File Descriptions: 
*  @Date:   2017-09-28 14:31:46
* 
*  @Last Modified time: 2017-09-28 15:35:43
*/

// 安全模式类
var Chatroom = function(){
	if(!(this instanceof Chatroom)){
		return new Chatroom();
	}

	this.roomName = null;	// 聊天室名字
	this.onlineUsers = [];	// 在线用户信息
	this.onlineCounts = 0;
}

Chatroom.prototype.changeChatroomName = function(name){
	this.roomName = name;
}

Chatroom.prototype.addUser = function(user){
	this.onlineUsers.push(user);
	this.onineCounts++;
}

Chatroom.prototype.deleteUser = function(user){
	if(!user || !user.userId) return ;

	// 找到该用户在列表里的索引
	var delIndex = this.onlineUsers.findIndex(function(ele, index, arr){
		if(user.userId == ele.userId){
			return index;
		}
	})
	// 如果找到索引，则删除
	if(delIndex > 0){
		this.onlineUsers.splice(index, 1);
		this.onlineCounts--;
	}
}

module.exports = Chatroom;



