var express = require('express'),
	bodyParser = require('body-parser'),
	handlebars = require('express-handlebars').create({
		defaultLayout: __dirname + '/views/layouts/main',
		helpers: {
			section: function(name, options){
				if(!this._sections) this._sections = {};
				this._sections[name] = options.fn(this);
				return null;
			}
		}
	}),
	getLinks = require('./lib/getLinks');

function main(){
	var app = express();

	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + "/views");
	app.engine('handlebars', handlebars.engine);
	app.set('view engine', 'handlebars');

	app.use(express.static(__dirname + "/public"));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	app.get("/", (req, res) => {
		res.render("index");
	});

	app.post("/getvideolink", (req, res) => {
		var link = req.body.link;
		getLinks.getLinks(link);

		getLinks.once('done', (urls) => {
			res.json(urls);
		});
	});

	app.listen(app.get('port'), () => {
		console.log("------------------------------------");
		console.log("Server running on port " + app.get('port'));
		console.log("------------------------------------");
	});	
}

module.exports = main;