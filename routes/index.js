var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('index', { title: 'Kenny Exotic Rentals' });
});



module.exports = router;
