var	searchObj = require('./utils/search');

process.stdin.resume();

(function main(){
	var searchQuery;
	process.stdout.write("Enter Search Term (Type quit to 'exit'): ");
	process.stdin.once('data', (data) => {
		searchQuery = data.toString().slice(0, data.length - 1);
		if(searchQuery.toLowerCase() == 'quit'){
			process.exit();
		}
		searchObj.search(searchQuery, 1);
	});

	searchObj.on('done', (videoDetails) => {
		process.stdout.write("Enter your choice: ");
		var choice;
		process.stdin.resume();
		process.stdin.once('data', (data) => {
			choice = Number(data.toString().slice(0, data.length - 1));
			if(choice > videoDetails.length)
				searchObj.search(searchQuery, 2);
			else
				console.log(videoDetails[choice - 1]);
		});
	});
})();