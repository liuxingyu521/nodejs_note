## socket.io 学习笔记

> 记录一些开发过程中遇到的小技巧和方法总结

### socket.io 服务器端

#### 1. socket.broadcast
	
该方法在设置了flags对象里的broadcast为`true`时生效（默认为`true`）

`socket.broadcast.emit(event[, data])`会向除了当前socket的所有socket client终端广播信息;

