import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const PostSchema = new Schema(
  {
    poster: { type: String, ref: 'User' },
    comments: [{ type: String, ref: 'Comment' }],
    title: String,
    content: String
  },
  { versionKey: false }
);
PostSchema.set('toJSON', { getters: true, virtuals: true });
PostSchema.set('toObject', { getters: true, virtuals: true }); //普通+虚拟
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
