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
  console.log(req.body);
  res.send('<xml>\
<ToUserName><![CDATA[toUser]]></ToUserName>\
<FromUserName><![CDATA[fromUser]]></FromUserName>\
<CreateTime>12345678</CreateTime>\
<MsgType><![CDATA[text]]></MsgType>\
<Content><![CDATA[你个SB]]></Content>\
</xml>');
});

module.exports = router;
