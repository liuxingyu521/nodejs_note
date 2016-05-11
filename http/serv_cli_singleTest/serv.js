var http = require('http');

var receiveData = '';

var server = http.createServer(function(request, response){
	console.log(request.headers);
	request.on('data', function(data){
	    receiveData += data;
	});
        response.writeHead(200, {'Content-Type':'text/plain'});
        response.write('hi,response sccessfull!');
        response.end(function(){
	    console.log(receiveData);
	});
});

server.listen(8877, '127.0.0.1');
