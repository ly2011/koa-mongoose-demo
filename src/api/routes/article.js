import verify from "../../middleware/verify";
import { createArticle, getAllArticles } from "../../controllers/article";

export default async router => {
  router.get("/article", async (ctx, next) => {
    ctx.body = "this a article response";
  });

  // router.post("/article/add", verify, createArticle);
  router.post("/article/add", createArticle);
  router.get("/article/list", getAllArticles);
};
