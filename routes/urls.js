var express = require('express');
var request = require('superagent');
var fs = require('fs');
var md5 = require('MD5');
var parse = require('csv-parse');
//require('should');

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
			parse(result_2.text, {comment:'#'}, function(err, output){
				//console.log(output);
				for(var i=0; i<output[0].length; i++){
					if(output[0][i]=='Load Time (ms)')
						var loadIndex = i;
					if(output[0][i]=='Activity Time(ms)')
						var activityIndex = i;
				}
				var results={"url":inputUrl, "first":{"loadTime":output[1][loadIndex], "activityTime":output[1][activityIndex]}, "second":{"loadTime":output[2][loadIndex], "activityTime":output[2][activityIndex]}
				};
				console.log(results);
				return results;
				
			});
			
			
		});
	//})
	
}

module.exports = router;
