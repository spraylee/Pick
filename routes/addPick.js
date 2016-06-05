var express = require('express');
var router = express.Router();

// // use mongoose
// var mongoose = require("mongoose");

// var config = require("../config");
// mongoose.connect(config.db.mongodb);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

