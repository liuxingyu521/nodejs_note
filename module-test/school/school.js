var clas = require('./class');


exports.add = function(classes){
	classes.forEach(function(item,index){
		var _class = item;
		var className = _class.name;
		var teacher = _class.teacherName;
		var students = _class.students;
		
		console.log('add class: ' + className);
		clas.add(teacher,students);
	});
};