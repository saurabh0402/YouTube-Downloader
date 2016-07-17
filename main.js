#!/usr/bin/env node

var terminal = require('./Terminal/index'),
	web = require('./Webapp/app.js');

var args = process.argv;

if(args[2] == '-t'){
	terminal();
}

else if(args[2] == '-b'){
	web();
}

else if(args[2] == '-h'){
	console.log("-t : Use YouTube-Downloader on terminal");
	console.log("-b : Run YouTube-Downloader on browser");
	process.exit();
}

else {
	console.log("Illegal argument " + args[2]);
	console.log("Type ./main.js -h for help");
	process.exit();
}