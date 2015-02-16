var express = require('express');
var request = require('superagent');
var fs = require('fs');
var md5 = require('MD5');
var csv = require('csv-parse');

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

	//get request to API
	var inputUrl = 'www.aol.com';
	//var url='http://www.webpagetest.org/runtest.php?url='+inputUrl+'&k=A.d0c8cb56fabd227b13d616a75e00f021&f=json';
	//request.get(url, function(result_1){
		//var summaryFile = result_1.body.data.summaryCSV;
		//console.log(summaryFile);
		var summaryFile='http://www.webpagetest.org/result/150216_30_4CG/page_data.csv';
		request.get(summaryFile, function(result_2){
			//console.log(result_2);
			if(result_2){
				var csvFilePath = './temp/'+md5(inputUrl)+'.csv';
				fs.writeFile(csvFilePath, result_2.text);
			}
			
			
			
		});
	//})
	var results={"url":inputUrl, 
				"1st":{"loadTime":"5.5", "activityTime":"6.5"},
				"2nd":{"loadTime":"3.4", "activityTime":"4.5"}
				};
	return results;
}

module.exports = router;
