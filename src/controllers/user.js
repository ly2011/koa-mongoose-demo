import User from "../models/user";
import md5 from "md5";
import jwt from "jsonwebtoken";
import config from '../configs'

export async function createUser(ctx) {
  let users = null;
  try {
    users = await User.find();
  } catch (err) {
    throw (500, "服务器错误");
  }
  console.log(users);
  if (users.length === 0) {
    users = {
      name: "ly",
      username: "admin",
      password: md5("admin").toUpperCase(),
      avatar: "",
      createTime: new Date()
    };
    const user = new User(users);

    let userResult = null;
    try {
      userResult = await user.save();
    } catch (err) {
      ctx.throw(500, "服务器内部错误");
    }

    console.log("用户创建成功");
    ctx.body = {
      success: true,
      user: userResult
    };
  }
  ctx.body = {
    success: true,
    user: users
  };
}

export async function listUser(ctx) {
  try {
    const users = await User.find();
    ctx.body = {
      success: true,
      list: users
    };
  } catch (err) {
    ctx.staus = err.staus || 500;
    ctx.body = {
      message: "服务器错误"
    };
  }
}

export async function login (ctx) {
  const username = ctx.request.body.username
  let password = ctx.request.body.password
  if (!username || !password) {
    ctx.body = {
      status: 401,
      message: '用户名或密码为空'
    }
    return
  }
  password = md5(password).toUpperCase();
  try {
    const conditions = {
      username
    }
    let user = await User.findOne(conditions)
    if (!!user) {
      if (user.password === password) {
        const token = jwt.sign({
          uid: user._id,
          name: user.name,
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 //1 hours
        }, config.jwt.secret)
        ctx.body = {
          success: true,
          uid: user._id,
          name: user.name,
          token
        }
      } else {
        ctx.body = {
          status: 401,
          message: '密码错误'
        }
      }
    } else {
      ctx.body = {
        status: 401,
        message: '该用户不存在'
      }
    }
  } catch(err) {
    ctx.throw(500, '服务器错误')
  }
}
