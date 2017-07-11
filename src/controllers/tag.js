import Tag from "../models/tag";
export async function createTag(ctx) {
  const tagName = ctx.request.body.name;
  if (!tagName) {
    ctx.body = {
      status: 401,
      message: "标签名为空"
    };
    return;
  }
  let tag = null;
  try {
    tag = await Tag.findOne({ name: tagName });
  } catch (err) {
    ctx.throw(500, "服务器错误");
  }

  if (!!tag) {
    ctx.body = {
      success: true,
      tag
    };
  }
  const newTag = new Tag({
    name: tagName
  });

  let tagResult = null;
  try {
    tagResult = await newTag.save();
  } catch (err) {
    ctx.throw(500, "服务器错误");
  }

  ctx.body = {
    success: true,
    tag: tagResult
  };
}

export async function listTag(ctx) {
  try {
    const tags = await Tag.find({});
    ctx.body = {
      success: true,
      list: tags
    };
  } catch (err) {
    ctx.throw(500, "服务器错误");
  }
}

export async function deleteTagByName(ctx) {
  const tagName = ctx.request.body.name || ctx.request.query.name;
  if (!tagName) {
    ctx.body = {
      status: 400,
      message: "签名为空"
    };
    return;
  }
  let tag = null;
  try {
    tag = await Tag.findOne({ name: tagName });
  } catch (err) {
    ctx.throw(500, "服务器错误");
  }
  if (!!tag) {
    const conditions = { name: tagName };
    try {
      await Tag.remove(conditions);
    } catch (err) {
      ctx.throw(500, "服务器错误");
    }
  } else {
    ctx.body = {
      success: false,
      message: `${tagName}不存在`
    };
    return;
  }
  ctx.body = {
    success: true,
    message: `${tagName}删除成功`
  };
}

export async function deleteAllTags(ctx) {
  const conditions = {};
  try {
    await Tag.remove(conditions);
  } catch (err) {
    ctx.throw(500, "服务器错误");
  }
  ctx.body = {
    success: true,
    message: `tag全部删除成功`
  };
}

export async function getAllTags(ctx) {
  try {
    const tags = Tag.find();
    ctx.body = {
      success: true,
      list: tags
    };
  } catch (err) {
    ctx.throw(500, "服务器错误");
  }
}

export async function updateTag(ctx) {
  const id = ctx.request.body.id;
  const name = ctx.request.body.name;
  if (!name) {
    ctx.body = {
      status: 401,
      message: "标签名不能为空"
    };
    return;
  }
  try {
    const tag = await Tag.findByIdAndUpdate(id, { $set: { name } });
    ctx.body = {
      success: true,
      tag: tag
    };
  } catch (err) {
    if (err.name === "CastError") {
      ctx.throw(400, "id不存在");
    } else {
      ctx.throw(500, "服务器内部错误");
    }
  }
}

export async function deleteTag(ctx) {
  const id = ctx.request.body.id || ctx.request.query.id;
  console.log(id);
  try {
    const tag = await Tag.findByIdAndRemove(id);
    ctx.body = {
      success: true,
      tag: tag
    };
  } catch (err) {
    if ((err.name = "CastError")) {
      ctx.throw(400, "id不存在");
    } else {
      ctx.throw(500, "服务器错误");
    }
  }
}
