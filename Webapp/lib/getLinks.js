var https = require('http'),
	querystring = require('querystring'),
	EventEmitter = require('events').EventEmitter,
	util = require('util');

function getLinksClass(){}

util.inherits(getLinksClass, EventEmitter);

getLinksClass.prototype.getLinks = function(videoLink) {
	var appendLater = "&eurl=https%3A%2F%2Fs0.2mdn.net%2Fads%2Frichmedia%2Fstudio%2Fpv2%2F38045893%2FDV_0%2F20160715032241822%2Flayout.html%3Fe%3D69%26renderingType%3D2%26leftOffset%3D0%26topOf&el=adunit&hl=en_US&sts=16989&lact=126&adformat=1_8&cc_load_policy=3";
	var getInfo = {
		host: "www.youtube.com",
		path: "/get_video_info?&video_id=",
		method: "GET"
	};
	
	var link = videoLink.slice(videoLink.indexOf("=") + 1), videoInfo = "";
	getInfo.path = getInfo.path + link + appendLater;
	var req = https.request(getInfo, (res) => {
		res.on('data', (data) => {
			videoInfo += data;
		});

		res.on('end', () => {
			var parsed = querystring.parse(videoInfo);

			if(!parsed.url_encoded_fmt_stream_map){
				this.emit("done", {error: 1, msg: "Video not available right now!"});
				return;
			}

			var parsedInfo = parsed.url_encoded_fmt_stream_map, title = parsed.title,views = parsed.view_count, parsedUrls = [];
			var videoImg = parsed.iurlsd || parsed.iurlhq || parsed.iurlhq_webp || parsed.iurlmaxres || parsed.iurlmq || parsed.iurlmq_webp || parsed.iurlmaxres_webp || parsed.iurl || parsed.iurlsd_wep || parsed.iurl_webp;
			
			var arr = parsedInfo.split(",");
			for(var i in arr){
				parsedUrls.push(querystring.parse(arr[i]));
			}

			this.emit("done", {error: 0, title: title, views: views, img: videoImg, urls: parsedUrls});
		});
	});
	req.end();
}

module.exports = new getLinksClass();