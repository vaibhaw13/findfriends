'use strict';

var mongoose = require('mongoose'),
  Comments = mongoose.model('Comments');

exports.list_all_comments = function(req, res) {
  Comments.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.post_a_comment = function(req, res) {
  var new_comment = new Comments(req.body);
  new_comment.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.find_friends = function(req, res) {
  console.log(req.params);
  var levelNo = req.params.levelNo,
    userId = req.params.userId;
  console.log(levelNo,userId);
  Comments.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


// exports.update_a_task = function(req, res) {
//   Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.delete_a_task = function(req, res) {


//   Task.remove({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };