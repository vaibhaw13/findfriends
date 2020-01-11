var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000,
  mongoose = require('mongoose'),
  Comments = require('./api/models/commentDataModel'), //created model loading here
  bodyParser = require('body-parser');
  
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/local')
  .then(() => {
    console.log("Successfully connected to MongoDB.");  
  /*To put some blog and comment data in my MongoDB 
  
  //To be called only once 
  initial();
  
  */
  }).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});

// To parse my REST request coming from front-end
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing pattern to be called from the UI
const userAction = require('./api/controllers/userActionController');

app.route('/users/comment')
  .get(userAction.list_all_comments)
  .post(userAction.post_a_comment);


app.route('/users/:userId/level/:levelNo')
  .get(userAction.find_friends);
  //.put(todoList.update_a_task)
  //.delete(todoList.delete_a_task);

app.listen(port);

console.log('RESTful API server started on: ' + port);

// Intializing my DB with some data
// function initial(){
//   for(let i=3;i<=40;i++){
    // Comments.create({
    //   id: i + 1,
    //   userId: 20 + i,
    //   comment: "Comment" + i,
    //   blogId : 30 + Math.floor(Math.random() * 6)
    // });
//   }
// }