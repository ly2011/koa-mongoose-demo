import Comment from "../models/comment";
import User from "../models/user";
import Article from "../models/article";
import config from "../configs";

export async function createComment(ctx) {
  const content = ctx.request.body.content;
  const username = ctx.request.body.username; // 用户username
  const article = ctx.request.body.article; // 文章id
  const createTime = new Date();
  const lastEditTime = new Date();
  if (!username) {
    ctx.body = {
      status: 401,
      message: "该用户不存在"
    };
    return;
  }
  if (!article) {
    ctx.body = {
      status: 401,
      message: "该文章不存在"
    };
    return;
  }
  let uid = null;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      ctx.body = {
        status: 401,
        message: "该用户不存在"
      };
      return;
    }
    uid = user._id;
  } catch (err) {
    ctx.throw(500, "服务器错误");
  }
  const newComment = new Comment({
    user: uid,
    article,
    content,
    createTime,
    lastEditTime
  });
  try {
    let createResult = await newComment.save();
    console.log(createResult);
    await Comment.populate(
      createResult,
      { path: "user article" },
      (err, result) => {
        createResult = result;
      }
    );
    console.log("评论创建成功");
    ctx.body = {
      success: true,
      comment: createResult
    };
  } catch (err) {
    ctx.throw(500, "服务器错误");
  }
}
export async function getAllComments(ctx) {
  try {
    const comments = await Comment.find({}).populate({
      path: "user article"
    });
    ctx.body = {
      success: true,
      list: comments
    };
  } catch (err) {
    ctx.throw(500, "服务器错误");
  }
}
