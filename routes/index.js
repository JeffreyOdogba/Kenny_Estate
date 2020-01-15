var express = require('express');
var router = express.Router();

const service = require('./service');

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('index', { title: 'Kenny Exotic Rentals', success: '' });
});

router.post('/', service.contactUs); 



module.exports = router;
