import Article from "../models/article";
import md5 from "md5";
import jwt from "jsonwebtoken";
import config from "../configs";

export async function createArticle(ctx) {
  const title = ctx.request.body.title;
  const content = ctx.request.body.content;
  const abstract = ctx.request.body.abstract || "";
  const publish = ctx.request.body.publish;
  let tags = ctx.request.body.tags; // tag的_id
  const createTime = new Date();
  const lastEditTime = new Date();
  if (!title) {
    ctx.body = {
      status: 401,
      message: "标题不能为空"
    };
    return;
  }
  if (!content) {
    ctx.body = {
      status: 401,
      message: "文章内容不能为空"
    };
    return;
  }
  if (!abstract) {
    ctx.body = {
      status: 401,
      message: "文章摘要不能为空"
    };
    return;
  }
  if (!!tags) {
    tags = tags.split(',');
  }
  console.log(tags);

  const newArticle = new Article({
    title,
    content,
    abstract,
    publish,
    tags,
    createTime,
    lastEditTime
  });
  try {
    let createResult = await newArticle.save();
    await Article.populate(createResult, { path: "tags" }, (err, result) => {
      createArticle = result;
    });
    console.log("文章创建成功");
    ctx.body = {
      success: true,
      article: createResult
    };
  } catch (err) {
    ctx.throw(500, "服务器错误", err);
  }
}

export async function getAllArticles(ctx) {
  try {
    const articles = await Article.find({});
    ctx.body = {
      success: true,
      list: articles
    };
  } catch (err) {
    ctx.throw(500, "服务器错误");
  }
}
