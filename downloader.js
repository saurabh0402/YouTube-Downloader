var http = require('http'),
	fs = require('fs');

var options = {
	host: "s-media-cache-ak0.pinimg.com",
	port: 80, 
	path: "/736x/1c/09/36/1c0936c9e5cd191312bcdc8216db9c08.jpg",
	method: "GET"
};

var req = http.request(options, (res) => {
	var fileName = options.path.slice(options.path.lastIndexOf("/") + 1);
	var fileSize = res.headers["content-length"];
	var saveFile = fs.createWriteStream(fileName);
	var count = 5;

	res.pipe(saveFile);

	var watcher = fs.watch(fileName, (event, files) => {
		if(event == "change"){
			fs.stat(fileName, (err, stats) => {
				var size = stats["size"];
				var percent = size/fileSize*100;
				if(percent >= count){
					process.stdout.write("=> " + percent.toFixed(2) + "% ");
					count += 5;
					if(percent == 100){
						console.log("\nDownload Complete!!");
						saveFile.close();
						watcher.close();
					}
				}
			});
		}
	});
});

req.end();