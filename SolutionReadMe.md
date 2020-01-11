# findfriends
Circle News assignment

MongoDb Database Content

_id--> BlogId, Users--> List of UserIds

{ "_id" : 30, "users" : [ 20, 21, 28, 30, 38, 44, 45, 49, 52, 39 ] }
 
{ "_id" : 32, "users" : [ 23, 26, 27, 32, 35, 42, 47, 50, 56, 58, 53 ] }
 
{ "_id" : 34, "users" : [ 25, 43, 51, 59, 60 ] }

{ "_id" : 35, "users" : [ 24, 31, 40, 41, 48, 54, 57, 32 ] }

{ "_id" : 31, "users" : [ 22, 29, 33, 34, 36, 37, 46, 55, 40 ] }

{ "_id" : 33, "users" : [ 39, 53, 60 ] }

Problem:
1. Consider all users who have commented on the same blog as friends ( 1st level friend) . 
2. A friend is 2nd level friend if he has commented on a blog where a 1st level friend has also commented 
but has not commented on any common blog.  5. Example - Blog1 has comment of {User1, User2}, Blog2 has comment of {User1, User3}
here User2 and User3 are 2nd level friend if there exists no blog which has comment of User2 and User3.  
3. Similar to above there can be third level friend  and k-th level friend ( LinkedIn shows this kind of friend level)  
4. Create a REST api GET  /users/<userId>/level/<levelNo> which should give list of all friends of that level for
given userId (ex- /users/1234/level/1 for first level friend ).

Solution Approach: Solution of the asked problem : To find K-Level friendShip we can use BFS 
  using adjacency matrix by running  BFS k-times. but first we need to make a complete graph
  of all the users posting comments over same blog

  ALgorithm used is modified BFS way of Graph Traversal.

  Here we are stopping after kth Level iteration
/*  To find k-level friend relatinship for a given user
  userId is used just to simlify the logic 
  we can have a user DB having unique mapping between userID and UserName
  Programme outputs relations in UserIds only.
*/
  
