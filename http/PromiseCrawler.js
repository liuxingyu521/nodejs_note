var http = require('http');
var promise = require('bluebird');	// 加载Promise模块
var cheerio = require('cheerio');	// 加载操作html/xml数据的模块

var baseUrl = 'http://www.imooc.com/learn/';
var videoIds = [348, 637, 259, 197, 134, 75]

// 构建函数得到promise对象
function getPagesAsync(url){
	return new promise(function(resolve, reject){
		console.log('正在爬取 ' + url + ' 的课程信息...');

		http.get(url,function(res){
			var html = '';	// 获取页面源代码

			res.on('data',function(data){
				html += data;
			});

			res.on('end',function(){
				resolve(html);	// 传给后边的成功状态处理函数
			});
		}).on('error',function(e){
			reject(e);	// 传给后边的失败状态处理函数
			console.log("获取页面出错！"+ e.message);
		});
	})
}

// 存放Promise对象的数组
var fetchCoursesArray = [];

videoIds.forEach(function(id){
	fetchCoursesArray.push(getPagesAsync(baseUrl + id));
})

promise
	.all(fetchCoursesArray)	// 一个个promise对象的数组
	.then(function(pages){	// 进行数组整体数据处理
		var coursesData = [];
		console.log('\n');
		pages.forEach(function(page){
			// 整理返回所需数据
			var courseData = filterData(page);
			coursesData.push(courseData);
		})

		// 按学习人数多少排序
		coursesData.sort(function(a,b){
			return a.number < b.number;
		}).forEach(function(item){
			console.log("##### 正在学习 " + item.title + 
				" 课程的有 " + item.number + ' 人.');
		});
		printCoursesData(coursesData);
		
	})

function filterData(html){
	// 给cheerio模块加载html数据
	var $ = cheerio.load(html);
	var chapters = $('.chapter');

	var number = parseInt($($('.statics .static-item strong').last()).text());
	var title = $('.hd h2').text();

	// 课程数据的结构
	// courseData = {
	//				title: title,
	//				number: number,
	//				content:[
	// 					{
	// 						chapterTitle: ,
	//						videos:[
	// 							title:,
	// 							id:
	//						]
	// 					}
	// 					]
	//				}
	var courseData = {	// 构建一个课程对象
		title: title,
		number: number,
		content: []
	};

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

		courseData.content.push(chapterData);
		
	})
	return courseData;
}

function printCoursesData(coursesData){	
	coursesData.forEach(function(course){
		console.log('          '+course.title);
		course.content.forEach(function(item){
			console.log(item.chapterTitle);
			item.videos.forEach(function(video){
				console.log('   [' + video.id + '] '+video.title);
			});
		})
	});
}