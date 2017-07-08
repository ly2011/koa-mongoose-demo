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
    tags = tags.split(",");
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
    // const articles = await Article.find({});
    const articles = await Article.find({}).populate({
      path: "tags",
      select: { name: 1, _id: 1, id: 1 }, // _id以外，要么全是1，要么全是0，否则就报错
      options: { title: -1 }
    });
    ctx.body = {
      success: true,
      list: articles
    };
  } catch (err) {
    ctx.throw(500, "服务器错误", err);
  }
}

export async function updateArticle(ctx) {
  const { id, title, content, abstract, tags } = ctx.request.body;
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
  const update_article = {
    title,
    content,
    abstract
  };
  try {
    const article = await Article.findByIdAndUpdate(id, {
      $set: update_article
    });
    ctx.body = {
      success: true,
      article
    };
  } catch (err) {
    if (err.name === "CastError") {
      ctx.throw(401, "id不存在");
    } else {
      ctx.throw(500, "服务器错误");
    }
  }
}

export async function getArticle(ctx) {
  const id = ctx.params.id;
  if (!id) {
    ctx.body = {
      status: 401,
      message: "id不能为空"
    };
    return;
  }
  try {
    const article = await Article.findById(id);
    ctx.body = {
      success: true,
      article
    };
  } catch (err) {
    ctx.throw(500, "服务器错误");
  }
}

export async function deleteArticle(ctx) {
  const id = ctx.params.id;
  if (!id) {
    ctx.body = {
      status: 401,
      message: "id不能为空"
    };
    return;
  }
  try {
    const article = await Article.findByIdAndRemove(id);
    ctx.body = {
      success: true,
      article
    };
  } catch (err) {
    ctx.throw(500, "服务器错误");
  }
}
