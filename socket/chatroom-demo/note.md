### socket.io 学习笔记

> 记录一些开发过程中遇到的小技巧和方法总结

#### 1. socket.broadcast
	
该方法在设置了flags对象里的broadcast为`true`时生效（默认为`true`）

`socket.broadcast.emit(event[, data])`会向出了自己的所有终端广播信息;

