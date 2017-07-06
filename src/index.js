import Koa from "koa";
import convert from "koa-convert";
import onerror from "koa-onerror";
import Router from "koa-router";

const app = new Koa();
onerror(app);

const router = Router();

import './models/mongodb'

app.use(router.routes()).use(router.allowedMethods());

// create server
app.listen(3000, () => {
  console.log('The server is running at http://localhost:' + 3000);
});

export default app;
