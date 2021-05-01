var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('desktop');
});

router.get('/desktop.html', function(req, res, next) {
  res.render('desktop');
});

router.get('/mobile.html', function(req, res, next) {
  res.render('mobile');
});


module.exports = router;
