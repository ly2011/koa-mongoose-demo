// 文章
import mongoose from "mongoose";
import moment from "moment";
moment.locale("zh-cn");
const Schema = mongoose.Schema;
const articleSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
    abstract: { type: String }, // 摘要
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag"
      }
    ],
    publish: {
      type: Boolean,
      default: false
    },
    createTime: {
      type: Date
    },
    lastEditTime: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);
articleSchema.set("toJSON", { getters: true, virtuals: true });
articleSchema.set("toObject", { getters: true, virtuals: true }); //普通+虚拟
articleSchema.path("createTime").get(v => moment(v).format("lll"));
articleSchema.path("lastEditTime").get(v => moment(v).format("lll"));

const Article = mongoose.model("Article", articleSchema);

export default Article;
