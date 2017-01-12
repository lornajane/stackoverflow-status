var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
	var relurl = "https://api.stackexchange.com/2.2/similar?";
	relurl += "order=desc&sort=relevance&site=stackoverflow";
	relurl += "&title=" + encodeURIComponent(req.query.title);
	if (req.query.tags) relurl += "&tags=" + req.query.tags;
	// relurl = "http://localhost:3000/test.json";
	console.log("relurl: "+relurl);

	request({url:relurl, json:true, gzip:true}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// pass data to view
			console.log("GOT GOOD BODY:");
			console.log(body);
			res.render('related', { relatedqs: body, title: req.query.title });
		} else {
			res.send("Couldn't get Stackoverflow related questions:\n"+error);
		}
	})

});

module.exports = router;
