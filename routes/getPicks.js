var express = require('express');
var router = express.Router();


// // use mongoose
// var mongoose = require("mongoose");
// var models = require("../models");
// var Pick = models.Pick;
// var config = require("../config");
// mongoose.connect(config.db.mongodb);

/* GET users listing. */
router.post('/', function(req, res, next) {
  // res.send('respond with a resource');
  var picks = [{
		id: 0,
		name: "一个人的北京",
		time: "3:00",
		lastTime: 120,
		pickTimes: 31,
		stars: 2,
		page: ["page_0.gif", "page_1.gif", "page_2.gif"],
		icon: "icon.jpg"
  }, {
    id: 1,
    name: "唱歌的孩子",
    time: "5:20",
    lastTime: 170,
    pickTimes: 13,
    stars: 2,
    page: ["唱歌的孩子01.gif", "唱歌的孩子02.gif", "唱歌的孩子03.gif"],
    icon: "icon.jpg"
  }, {
    id:2,
    name: "玫瑰",
    time: "1:20",
    lastTime: 150,
    pickTimes: 18,
    stars: 2,
    page: ["玫瑰01.gif", "玫瑰02.gif"],
    icon: "icon.jpg"
  }, {
    id:2,
    name: "南方姑娘",
    time: "1:20",
    lastTime: 150,
    pickTimes: 18,
    stars: 2,
    page: ["第六季第24集《南方姑娘》01.gif","第六季第24集《南方姑娘》02.gif","第六季第24集《南方姑娘》03.gif"],
    icon: "icon.jpg"
  }];
  res.send(picks);
  // Pick.find(function(err, data) {
  // 	res.json(result);
  // });
});

module.exports = router;

