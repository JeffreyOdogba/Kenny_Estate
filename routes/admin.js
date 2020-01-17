var express = require('express');
var router = express.Router();


const service = require('./service');




/* GET users listing. */


router.get('/',service.getReserves);
router.get('/suites',service.getSuites);

router.post ('/customHome', service.customEditForHomePage);

router.post ('/postsuite', service.PostSuite);




module.exports = router;
