var EventEmitter = require('events').EventEmitter;

var manager = new EventEmitter();

function do_job(who) {
	console.log(who + ' have to seeCode');
}

function do_others(who){
	console.log(who + ' have to do_others');
}

manager.addListener('task', do_job);
manager.addListener('task', do_others);

var hasLifeListener = manager.emit('task', 'Richard');
console.log(hasLifeListener+'  '+manager.listenerCount('task'));

manager.removeListener('task',do_job);
console.log(manager.emit('task', 'Richard')+'  '+manager.listenerCount('task'));