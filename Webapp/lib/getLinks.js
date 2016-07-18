var https = require('http'),
	querystring = require('querystring'),
	EventEmitter = require('events').EventEmitter,
	util = require('util');

var getInfo = {
	host: "www.youtube.com",
	path: "/get_video_info?&video_id=",
	method: "GET"
};

function getLinksClass(){}

util.inherits(getLinksClass, EventEmitter);

getLinksClass.prototype.getLinks = function(videoLink) {
	var link = videoLink.slice(videoLink.indexOf("=") + 1), videoInfo = "";
	getInfo.path = getInfo.path + link;
	var req = https.request(getInfo, (res) => {
		res.on('data', (data) => {
			videoInfo += data;
		});

		res.on('end', () => {
			if(!querystring.parse(videoInfo).url_encoded_fmt_stream_map){
				this.emit("error", {error: 1, msg: "Video not available right now!"});
				return;
			}

			var parsed = querystring.parse(videoInfo);
			var parsedInfo = parsed.url_encoded_fmt_stream_map, title = parsed.title,views = parsed.view_count, parsedUrls = [];
			
			var arr = parsedInfo.split(",");
			for(var i in arr){
				parsedUrls.push(querystring.parse(arr[i]));
			}

			this.emit("done", {error: 0, title: title, views: views, img: parsed.iurlsd, urls: parsedUrls});
		});
	});
	req.end();
}

module.exports = new getLinksClass();