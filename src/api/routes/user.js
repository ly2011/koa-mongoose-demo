import verify from "../../middleware/verify";
import { createUser, listUser, login } from "../../controllers/user";

export default async router => {
  router.get("/user", async (ctx, next) => {
    ctx.body = "this a users response";
  });

  router.post("/user/add", createUser);
  router.get("/user/list", listUser);
  router.post("/user/login", login);
};
