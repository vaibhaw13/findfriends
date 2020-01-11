'use strict';
module.export = function(app) {
  const userAction = require('../controllers/userActionController');

  // todoList Routes
  app.route('/users/comment')
    .get(userAction.list_all_comments)
    .post(userAction.post_a_comment);


  app.route('/users/:userId/level/:levelNo')
    .get(userAction.find_friends);
    //.put(todoList.update_a_task)
    //.delete(todoList.delete_a_task);
};