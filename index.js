var	search = require('./search');

process.stdin.resume();

(function main(){
	var searchQuery;
	process.stdout.write("Enter Search Term (Type quit to 'exit'): ");
	process.stdin.once('data', (data) => {
		searchQuery = data.toString().slice(0, data.length - 1);
		if(searchQuery.toLowerCase() == 'quit'){
			console.log("in");
			process.exit();
		}
		search(searchQuery);
	});
})();