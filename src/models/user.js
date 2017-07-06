import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, unique: true },
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});
const User = mongoose.model('User', UserSchema)
module.exports = User