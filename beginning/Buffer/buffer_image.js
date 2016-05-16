var fs = require('fs');

fs.readFile('logo.png', function(err, origin_buffer){
	if(err)
		console.log(err);

	console.log(Buffer.isBuffer(origin_buffer));

	// 用原始buffer构建文件
	fs.writeFile('logo_buffer.png', origin_buffer, function(err, data){
		if(err)
			console.log(err);
	});

	var base64Image = origin_buffer.toString('base64');

	console.log(base64Image);

	// 转成base64编码的buffer
	var decodedBase64Image = new Buffer(base64Image,'base64');

	// 比较两个buffer二进制流是一样的、返回0
	console.log(Buffer.compare(origin_buffer, decodedBase64Image));

	// 用转换后的buffer构建文件
	fs.writeFile('logo_decodedImage.png', decodedBase64Image, function(err){
		if(err)
			console.log(err);
	})
})