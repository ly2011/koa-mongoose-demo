import Koa from 'koa';
import convert from 'koa-convert';
import onerror from 'koa-onerror';
import Router from 'koa-router';
import json from 'koa-json';
import BodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

import config from './configs'

const app = new Koa();
onerror(app);

const router = Router();
const bodyparser = new BodyParser();

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));

import './models/mongodb';

// 导入路由
import users from './routes/user';
import tags from './routes/tag'
import articles from './routes/article'
import comments from './routes/comment'

// logger
app.use(async (ctx, next) => {
  const start = new Date();

  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/favicon.ico', ctx => {
  return;
});
router.use('/user', users.routes(), users.allowedMethods());
router.use('/tag', tags.routes(), tags.allowedMethods());
router.use('/article', articles.routes(), articles.allowedMethods());
router.use('/comment', comments.routes(), comments.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

// create server
app.listen(config.app.port, () => {
  console.log('The server is running at http://localhost:' + config.app.port);
});

export default app;
