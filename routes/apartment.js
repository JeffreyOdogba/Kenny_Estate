var express = require('express');
var router = express.Router();

/* GET apartment page. */
router.get('/', function(req, res, next) {
    res.render('apartment', {title: 'apartment'});
  });

module.exports = router;
