var https = require('http'),
	querystring = require('querystring'), 
	fs = require('fs');

var getInfo = {
	host: "www.youtube.com",
	path: "/get_video_info?&video_id=",
	method: "GET"
};

function singleDownload(video) {
	var link = video.link.slice(video.link.indexOf("=") + 1), videoInfo = "";
	getInfo.path = getInfo.path + link;
	var req = https.request(getInfo, (res) => {
		res.on('data', (data) => {
			videoInfo += data;
		});

		res.on('end', () => {
			var parsedInfo = querystring.parse(videoInfo).url_encoded_fmt_stream_map, parsedUrls = [];
			var arr = parsedInfo.split(",");
			for(var i in arr){
				parsedUrls.push(querystring.parse(arr[i]));
			}

			for(var i in parsedUrls){
				console.log("-------------");
				for(var j in parsedUrls[i]){
					console.log(j + " = " + parsedUrls[i][j]);
				}
				console.log("--------------");
			}
			console.log("Done");
		});
	});
	req.end();
}

module.exports = singleDownload;