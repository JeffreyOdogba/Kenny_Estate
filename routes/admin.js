var express = require('express');
var router = express.Router();


const service = require('./service');




/* GET users listing. */


router.get('/',service.getAllReserves);

router.post ('/customHome', service.customEditForHomePage);

router.post ('/postsuite', service.AddNewSuites);




module.exports = router;
