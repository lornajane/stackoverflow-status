var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var cloudant = req.cloudant;

  var pipedb = cloudant.db.use('pipe_db');
  var questions = [];

  // get the pipe info so we can grab the query
  pipedb.view('application', 'all_pipes', {include_docs: true}, function (err, body) {
    if(!err) {
	  // with more than one pipe, we'd need to work out which one(s) we cared about, this assumes one for now
	  var search = body.rows[0].doc.customTags;

	  // now get the actual questions
	  var db = cloudant.db.use('stackoverflow_custom');
	  db.view('questions', 'newest-least-answered', {descending: true}, function (err, body) {
		if(!err) {
		  body.rows.forEach(function (doc) {
			questions.push(doc);
		  });
		  // questions.push(body.rows[0])
		}
		// console.log(questions)
		// pass data to view
		res.render('index', { questions: questions, search: search });
	  });
    }
  });

});

module.exports = router;
