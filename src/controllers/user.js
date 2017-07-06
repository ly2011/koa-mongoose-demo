import User from '../models/user';

export async function createUser(ctx) {
  let users = {
    name: 'aikin',
    posts: ['中国话']
  };

  let posts = {
    title: 'post-by-aikin',
    poster: '内容',
    comments: ['好好看']
  };

  let comments = {
    content: 'comment-by-luna',
    commenter: 'aikin',
    post: '内容'
  };

  const user = new User(users);
  const createUserResult = await user.save().catch(err => {
    ctx.throw(500, '服务器内部错误');
  });
  console.log('用户创建成功');
  ctx.body = {
    success: true,
    user: createUserResult
  };
}

export async function listUser(ctx) {
  try {
    const users = await User.find({});
    ctx.body = {
      success: true,
      list: users
    };
  } catch (err) {
    ctx.staus = err.staus || 500;
    ctx.body = {
      message: '服务器错误'
    };
  }
}
