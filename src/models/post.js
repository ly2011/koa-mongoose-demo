import mongoose from "mongoose";
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  poster: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  title: String,
  content: String
});
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
