// 评论
import mongoose from "mongoose";
import moment from "moment";
moment.locale("zh-cn");
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    article: { type: Schema.Types.ObjectId, ref: "Article" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    content: String,
    createTime: {
      type: Date
    },
    lastEditTime: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
); // 去掉版本锁定
commentSchema.set("toJSON", { getters: true, virtuals: true });
commentSchema.set("toObject", { getters: true, virtuals: true }); //普通+虚拟
commentSchema.path("createTime").get(v => moment(v).format("lll"));
commentSchema.path("lastEditTime").get(v => moment(v).format("lll"));
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
