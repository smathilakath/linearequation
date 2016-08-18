//Configuration Settings
var port = 9000;

//Loading in extra frameworks
var express = require('express'); //express package
var app = express();
var http = require('http').Server(app); //http server package from express

//Options
app.use(express.static(__dirname)); //host only static pages 

//Load in routes
require('./Routes/routes.js')(app, __dirname);

//Port listener
http.listen(port, function() {
    console.log("==============================================");
    console.log("	       WEB SERVER ONLINE!");
    console.log("==============================================");
    console.log("Listening to port: " + port );
    console.log("==============================================");
});
