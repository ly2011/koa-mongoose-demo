import verify from "../../middleware/verify";
import { createComment, getAllComments } from "../../controllers/comment";

export default async router => {
  router.get("/comment", async (ctx, next) => {
    ctx.body = "this a comment response";
  });

  router.post("/comment/add", createComment);
  router.get("/comment/list", getAllComments);
};
