var https = require('http'),
	querystring = require('querystring'),
	downloader = require('./downloader'),
	EventEmitter = require('events').EventEmitter,
	util = require('util');

var getInfo = {
	host: "www.youtube.com",
	path: "/get_video_info?&video_id=",
	method: "GET"
};

function singleDownloadClass(){}

util.inherits(singleDownloadClass, EventEmitter);

singleDownloadClass.prototype.singleDownload = function(video) {
	var link = video.link.slice(video.link.indexOf("=") + 1), videoInfo = "";
	getInfo.path = getInfo.path + link;
	var req = https.request(getInfo, (res) => {
		res.on('data', (data) => {
			videoInfo += data;
		});

		res.on('end', () => {
			if(!querystring.parse(videoInfo).url_encoded_fmt_stream_map){
				console.log("\033[31mThis Video is not available!!\033[0m");
				return;
			}
			var parsedInfo = querystring.parse(videoInfo).url_encoded_fmt_stream_map, parsedUrls = [];
			var arr = parsedInfo.split(",");
			for(var i in arr){
				parsedUrls.push(querystring.parse(arr[i]));
			}

			console.log("--------------------------------------------------------------\n Download Options: ");

			for(var i in parsedUrls){
				console.log((Number(i) + 1) + ". " + parsedUrls[i].quality + " : " + parsedUrls[i].type.split(";")[0]);
			}

			process.stdin.resume();
			process.stdin.once('data', (data) => {
				var choice;
				choice = Number(data);
				var url = parsedUrls[choice - 1].url;
				url = url.slice(url.indexOf("/") + 2);
				var host =  url.slice(0, url.indexOf("/"));
				var	path = url.slice(url.indexOf("/"));

				downloader.download(host, path, video.title);

				downloader.once('downloaded', () => {
					this.emit('downloaded');
				})
			});
		});
	});
	req.end();
}

module.exports = new singleDownloadClass();