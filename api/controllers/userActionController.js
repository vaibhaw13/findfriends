'use strict';

var mongoose = require('mongoose'),
  Comments = mongoose.model('Comments');

/*  COntroller which is manily used to integrate 
frontEnd request with backend business logic 
*/

//To get all comments on all blogs
exports.list_all_comments = function(req, res) {
  Comments.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

//To write a comment on a particular blog
exports.post_a_comment = function(req, res) {
  var new_comment = new Comments(req.body);
  new_comment.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

/*To find k-level friend relatinship for a given user
  userId is used just to simlify the logic 
  we can have a user DB having unique mapping between userID and UserName

  This Outputs relations in UserIds only.
*/
exports.find_friends = function(req, res) {
  var levelNo = req.params.levelNo,
    userId = req.params.userId;
  Comments.aggregate([ {$group : 
        {
          _id:"$blogId", 
          users: 
          {
            $push: "$userId"
          }
        }
      }
    ], function(err, blogMap) {
    if (err)
      res.send(err);
    res.json(kLevelFriend(userId, levelNo, blogMap));
  });
};

function kLevelFriend(userId, levelNo, blogMap){
  /* 
  Solution of the asked problem : To find K-Level friendShip we can use BFS 
  using adjacency matrix by running  BFS k-times. but first we need to make a complete graph
  of all the users posting comments over same blog

  ALgorithm used is modified BFS way of Graph Traversal.

  Here we are stopping after kth Level iteration
  */
  var adjMatrix = adjacencyMatrix(blogMap);
  console.log('I am at klevel');

  var visited = new Set();
  var queue = new Array();
  queue.push(userId-20);

  for(let i = 0; i < levelNo; i++){
    var tempList = [];
    while(queue.length){
      var row = queue.shift();
      visited.add(row)
      for(let j = 0;j<41;j++){
        if(adjMatrix[row][j]){
          if(visited.has(j)){
            continue;
          } else{
            visited.add(j);
            tempList.push(j);
          }
        }
      }
    }
    queue = tempList;
  }
  var klevel = new Array()
  queue.forEach(x => { return klevel.push(x+20);})
  return {User: userId, levelFriend: levelNo, friends : klevel}
}

function adjacencyMatrix(blogMap){
  /* Creating Adjacenecy Matrix as it is a complete graph 
  adjacency list will also take same space
  Space Complexity(n*2)
  */
  var mat = Array(41).fill().map(() => Array(41).fill(0));
  blogMap.forEach(element => {
    for(let i = 0; i < element.users.length;i++){
      for(let j = i+1;j < element.users.length; j++){
        mat[element.users[i]-20][element.users[j]-20] = 1;
        mat[element.users[j]-20][element.users[i]-20] = 1;
      }
    }
  });
  return mat;
}


/* exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
}; 
*/