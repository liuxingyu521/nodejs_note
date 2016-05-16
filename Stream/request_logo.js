var http = require('http');
var fs = require('fs');
var request = require('request');

http
	.createServer(function(req, response){
		// fs.readFile('stream_copy_logo.png', function(err, data){
		// 	if(err){
		// 		response.end('file is not exist!');
		// 	}
		// 	else{
		// 		response.writeHeader(200, {'Content-type':'text/image'});
		// 		response.end(data);
		// 	}
		// })

		// fs.createReadStream('stream_copy_logo.png').pipe(response);
		request('http://static.mukewang.com/static/img/common/logo.png')
			.pipe(response);
	})
	.listen(8877);