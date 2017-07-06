import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  _id: {type: String},
    post      : { type: String, ref: "Post" },
    commenter : { type: String, ref: 'User' },
    content   : String
});
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
