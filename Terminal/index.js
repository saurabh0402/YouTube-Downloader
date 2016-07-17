var	searchObj = require('./utils/search');
var singleDownload = require('./utils/singleDownload')

process.stdin.resume();

function main(){
	var searchQuery, pgNo = 1;
	process.stdout.write("Enter Search Term (Type quit to 'exit'): ");
	process.stdin.once('data', (data) => {
		searchQuery = data.toString().slice(0, data.length - 1);
		if(searchQuery.toLowerCase() == 'quit'){
			process.exit();
		}
		searchObj.search(searchQuery, pgNo);
	});

	searchObj.once('done', (videoDetails) => {
		process.stdout.write("Enter your choice: ");
		var choice;
		process.stdin.resume();
		process.stdin.once('data', (data) => {
			choice = Number(data.toString().slice(0, data.length - 1));
			if(choice > videoDetails.length)
				searchObj.search(searchQuery, ++pgNo);
			else{
				singleDownload.singleDownload(videoDetails[choice - 1]);
				singleDownload.once('downloaded', () => {
					main();
				});
			}
		});
	});
}

module.exports = main;