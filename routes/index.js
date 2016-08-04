var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.echostr) {
    res.send(req.query.echostr);
    return;
  }
  res.render('index');
});

router.post('/', function(req, res, next) {
  if (req.query.echostr) {
    res.send(req.query.echostr);
    return;
  }
  res.send('sb');
});

module.exports = router;
