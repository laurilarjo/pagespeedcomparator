var express = require('express');
var router = express.Router();

router.post('/speedtesturl', function(req, res, next) {
	var url = req.body.url;
	//do the thing and collect results
	var results = speedtesturl(url);

	res.send(results);
});

router.get('/', function(req, res, next) {
	var url = req.body.url;
	//do the thing and collect results
	var results = "this is root of urls";

	res.send(results);
});

speedtesturl = function(url) {
	var results = {"Load Time" : 5423, "Activity Time" : 6023};

	return results;
}

module.exports = router;
