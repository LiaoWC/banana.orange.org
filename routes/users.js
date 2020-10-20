var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.locals.userId = 'kkk'
  res.render('test',{title:'JJJ'})
});



module.exports = router;
