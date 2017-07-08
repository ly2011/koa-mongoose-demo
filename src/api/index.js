import Router from "koa-router";
import compose from "koa-compose";
import importDir from "import-dir";
import config from "../configs";

const routes = importDir("./routes");

export default () => {
  const router = new Router({
    prefix: config.app.baseApi
  });
  Object.keys(routes).forEach(name => {
    return routes[name](router);
  });
  return compose([router.routes(), router.allowedMethods()]);
};
