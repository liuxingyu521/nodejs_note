var http = require('http');

var receiveData = '';

var options = { hostname:'127.0.0.1',
		port: 8877,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
var request = http.request(options, function(response){
		console.log(response.headers);

		response.on('data', function(data){
		    receiveData += data;
		});
		response.on('end', function(){
		    console.log(receiveData);
		});
	});

request.write('Hello World');
request.end(function(){
    console.log('request ending!');
});
