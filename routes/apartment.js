var express = require('express');
var router = express.Router();
var service = require('./service');

/* GET apartment page. */
router.get('/', async function(req, res, next) {

 const suiteInfo = await service.getSuitePhotoCaller();
    res.render('apartment', {title: 'apartment', suiteInfo:suiteInfo }); 
  });

router.get('/:suiteid', service.getFeatures);

module.exports = router;
