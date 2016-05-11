var http = require('http');
var cheerio = require('cheerio');

var url = 'http://www.imooc.com/learn/348';

http.get(url,function(res){
	var html = '';	// 获取页面源代码

	res.on('data',function(data){
		html += data;
	});

	res.on('end',function(){
		// 过滤出目录树
		var allDir = filterData(html);
		// 打印目录树
		printAlldir(allDir);
	});
}).on('error',function(e){
	console.log("获取页面出错！"+ e.message);
});

function filterData(html){
	// 给cheerio模块加载html数据
	var $ = cheerio.load(html);
	var chapters = $('.chapter');

	// 目录树结构
	// [
	// 	{
	// 		chapterTitle: ,
	//		videos:[
	// 			title:,
	// 			id:
	//		]
	// 	}
	// ]
	var courseData = [];

	chapters.each(function(item){
		var chapter = $(this);
		var chapterTitle = chapter.find('strong').text();
		var videos = chapter.find('li');
		var chapterData = {
			chapterTitle: chapterTitle,
			videos: []
		};

		videos.each(function(item,index){
			var _video = $(this);
			var title = _video.find('a').text();
			var id = _video.find('a').attr('href').split('video/')[1];
			chapterData.videos.push({
				title: title,
				id: id
			});
		});

		courseData.push(chapterData);
		
	})
	return courseData;
}

function printAlldir(courseData){
	courseData.forEach(function(item){
		console.log(item.chapterTitle);
		item.videos.forEach(function(video){
			console.log('   [' + video.id + '] '+video.title);
		});
	});
}
