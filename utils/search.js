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
	
}

module.exports = search;

//Video-Tile: yt-lockup-video ->
//Video-Title: yt-lockup-title ->
//A single a tag, link: href, name: title