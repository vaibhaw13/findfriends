'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CommentSchema = new Schema({
  id: Number,
  userId: Number,
  comment: String,
  blogId : Number
});

module.exports = mongoose.model('Comments', CommentSchema);