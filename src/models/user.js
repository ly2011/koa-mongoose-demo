import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    // name  : { type: String, unique: true },
    name: { type: String },
    posts: [{ type: String }]
    // posts : [{ type: Schema.Types.ObjectId, ref: 'Post' }]
  },
  { versionKey: false }
);
UserSchema.set('toJSON', { getters: true, virtuals: true });
UserSchema.set('toObject', { getters: true, virtuals: true }); //普通+虚拟
const User = mongoose.model('User', UserSchema);
export default User;
