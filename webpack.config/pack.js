var fs = require('fs');

fs.readFile('./index.html', 'utf8', (err, data) => {
	if (!err) {
		var dataStr = data.toString(),
		timestamp = (new Date()).getTime();
	
		dataStr = dataStr.replace('bundle.js', 'index.bundle.js?v='+timestamp).replace('./dist/Dll.js', './vendor.js?v='+ timestamp);

		fs.writeFile('./dll/index.html', dataStr, (error) => {
			if (!error) {
				console.log('HTML file copy successfully');
			} else {
				console.log(error);
			}
		});
	} else {
		console.log(err);
	}
});
