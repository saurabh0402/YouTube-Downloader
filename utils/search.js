var https = require('https'),
	cheerio = require('cheerio');

var options = {
	host: "www.youtube.com",
	path: "/results?search_query=",
	method: "GET"
};

function search(searchQuery){
	var html = "";
	options.path = options.path + encodeURIComponent(searchQuery);
	console.log("Give me a few seconds to get you the results...");
	var req = https.request(options, (res) => {
		res.on('data', (datum) => {
			html += datum;

		});

		res.on('end', () => {
			createResults(html);
		});
	});
	req.end();
}

function createResults(html){
	var $ = cheerio.load(html);

	var videos = $('.yt-lockup-video');

	var i = 0, count = 0;
	var videoDetails = new Array();

	while(i < videos.length){
		if(!($('.yt-lockup-byline span.yt-badge-ad', videos[i]).length)){
			videoDetails[count] = {};
			videoDetails[count].title = $('.yt-lockup-title a', videos[i]).attr('title');
			videoDetails[count].link = $('.yt-lockup-title a', videos[i]).attr('href');
			videoDetails[count].views = $($('.yt-lockup-meta-info li', videos[i])[1]).text();
			count++;
		}
		i++
	}
	showResults(videoDetails);
}

function showResults(videoDetails){
	count = 1;
	videoDetails.forEach((item) => {
		process.stdout.write("\033[31m" + count + ". \033[0m");
		process.stdout.write(item.title + "   ");
		console.log("\033[31m- " + item.views + "\033[0m");
		count++;
	});
}

module.exports = search;