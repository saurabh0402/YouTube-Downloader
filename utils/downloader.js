var http = require('http'),
	fs = require('fs'),
	util = require('util'),
	EventEmitter = require('events').EventEmitter;

function Downloader(){}

util.inherits(Downloader, EventEmitter);

Downloader.prototype.download = function(host, path){
	var options = {
		host: host,
		port: 80,
		path: path,
		method: "GET"
	};

	var req = http.request(options, (res) => {
		var fileName = "xyz." + res.headers["content-type"].slice(res.headers["content-type"].indexOf("/") + 1);
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

	req.end()
}

module.exports = new Downloader();