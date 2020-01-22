//var path = require('path');
var express = require('express');
var router = express.Router();


const service = require('./service');




/* GET users listing. */


router.get('/',service.getReservesAndSuites);

router.post ('/customHome', service.customEditForHomePage);

router.post ('/postsuite', service.PostSuite);

router.post ('/uploadphoto',service.PostPhoto);




module.exports = router;
