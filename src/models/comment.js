import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const CommentSchema = new Schema(
  {
    post: { type: String, ref: 'Post' },
    commenter: { type: String, ref: 'User' },
    content: String
  },
  { versionKey: false }
);
CommentSchema.set('toJSON', { getters: true, virtuals: true });
CommentSchema.set('toObject', { getters: true, virtuals: true }); //普通+虚拟
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
