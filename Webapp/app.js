var express = require('express'),
	handlebars = require('express-handlebars').create({
		defaultLayout: __dirname + '/views/layouts/main',
		helpers: {
			section: function(name, options){
				if(!this._sections) this._sections = {};
				this._sections[name] = options.fn(this);
				return null;
			}
		}
	});

function main(){
	var app = express();

	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + "/views");
	app.engine('handlebars', handlebars.engine);
	app.set('view engine', 'handlebars');

	app.use(express.static(__dirname + "/public"));

	app.get("/", (req, res) => {
		res.render("index");
	});

	app.listen(3000, () => {
		console.log("------------------------------------");
		console.log("Server running on port 3000");
		console.log("------------------------------------");
	});	
}

module.exports = main;