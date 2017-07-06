import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {type: String},
    // name  : { type: String, unique: true },
    name  : { type: String},
    posts : [{ type: String }]
    // posts : [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});
const User = mongoose.model('User', UserSchema)
module.exports = User