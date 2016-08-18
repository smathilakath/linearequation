module.exports = function (app, rootdir) {

	//GET Routes
	app.get('/', function(req, res) {
	  res.sendFile(rootdir + "/Views/LinnearEquation.html");
	});
}