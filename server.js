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
  initial();
  }).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// var routes = require('./api/routes/userActionRoutes'); //importing route
// routes(app); //register the rout

// require('./api/routes/userActionRoutes')(app); //importing route

const userAction = require('./api/controllers/userActionController');

  // todoList Routes api\controllers\userActionController.js
app.route('/users/comment')
  .get(userAction.list_all_comments)
  .post(userAction.post_a_comment);


app.route('/users/:userId/level/:levelNo')
  .get(userAction.find_friends);
  //.put(todoList.update_a_task)
  //.delete(todoList.delete_a_task);

app.listen(port);

console.log('RESTful API server started on: ' + port);

function initial(){
  Comments.create({
    id: 1,
    userId: 20,
    comment: "Comment1",
    blogId : 30
  });
  
  Comments.create({
    id: 2,
    userId: 21,
    comment: "Comment2",
    blogId : 30  
  });
  
  Comments.create({
    id: 3,
    userId: 22,
    comment: "Comment3",
    blogId : 31 
  });
}