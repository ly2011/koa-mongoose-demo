import mongoose from "mongoose";
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  _id: {type: String},
    poster   : { type: String, ref: 'User' },
    comments : [{ type: String, ref: 'Comment' }],
    title    : String,
    content  : String
});
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
