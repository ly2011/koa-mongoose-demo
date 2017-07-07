// 标签
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const tagSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    }
  },
  { versionKey: false }
);
tagSchema.set("toJSON", { getters: true, virtuals: true });
tagSchema.set("toObject", { getters: true, virtuals: true }); //普通+虚拟
const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
