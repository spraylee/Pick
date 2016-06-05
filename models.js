var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var _Pick = new Schema({
	name: String,
	time: Number,
	page: [String],
	icon: String
});

exports.Pick = mongoose.model("Pick", _Pick);