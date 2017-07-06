import mongoose from "mongoose";
mongoose.Promise = Promise;
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

import User from "./user";
import Post from "./post";
import Comment from "./comment";

// connect mongodb
const mongodb_url = "mongodb://localhost:27017/blog";
const db = mongoose.createConnection(mongodb_url);

db.once('open', () => {


  setTimeout(function() {
        createData();
      console.log('0000');
    User.findOne({ name: "aikin" }).exec(function(err, doc) {
        if (err) throw err
      var opts = [
        {
          path: "posts",
          select: "title"
        }
      ];
      console.log(1111);
      doc.populate(opts, function(err, populatedDoc) {
          console.log(2222);
        console.log(populatedDoc.posts[0].title); // post-by-aikin
      });
    });

    User.find({}, (err, docs) => {
        console.log('docs: ', docs);
    })
  }, 1000);
});
mongoose.connection.on("error", console.error);

function createData() {
  var userIds = [new Date(), new Date(), new Date()];
  var postIds = [new Date(), new Date(), new Date()];
  var commentIds = [new Date(), new Date(), new Date()];

  var users = [];
  var posts = [];
  var comments = [];

  users.push({
    _id: userIds[0],
    name: "aikin",
    posts: [postIds[0]]
  });
  users.push({
    _id: userIds[1],
    name: "luna",
    posts: [postIds[1]]
  });
  users.push({
    _id: userIds[2],
    name: "luajin",
    posts: [postIds[2]]
  });

  posts.push({
    _id: postIds[0],
    title: "post-by-aikin",
    poster: userIds[0],
    comments: [commentIds[0]]
  });
  posts.push({
    _id: postIds[1],
    title: "post-by-luna",
    poster: userIds[1],
    comments: [commentIds[1]]
  });
  posts.push({
    _id: postIds[2],
    title: "post-by-luajin",
    poster: userIds[2],
    comments: [commentIds[2]]
  });

  comments.push({
    _id: commentIds[0],
    content: "comment-by-luna",
    commenter: userIds[1],
    post: postIds[0]
  });
  comments.push({
    _id: commentIds[1],
    content: "comment-by-luajin",
    commenter: userIds[2],
    post: postIds[1]
  });
  comments.push({
    _id: commentIds[2],
    content: "comment-by-aikin",
    commenter: userIds[1],
    post: postIds[2]
  });

const user = new User(users)
const user_result = user.save().catch(err => console.error)
  User.create(users, function(err, docs) {
      console.log(err);
      console.log('docs: ', docs);
    // Post.create(posts, function(err, docs) {
    //   Comment.create(comments, function(err, docs) {});
    // });
  });
}
