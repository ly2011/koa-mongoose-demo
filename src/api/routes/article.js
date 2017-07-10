import verify from "../../middleware/verify";
import {
  createArticle,
  getAllArticles,
  updateArticle,
  getArticle,
  deleteArticle
} from "../../controllers/article";

export default async router => {
  router.get("/article", async (ctx, next) => {
    ctx.body = "this a article response";
  });

  // router.post("/article/add", verify, createArticle);
  router.post("/article/add", createArticle);
  router.all("/article/list", getAllArticles);
  router.all("/article", getArticle);
  router.post("/article/update", updateArticle);
  router.all("/article/delete", deleteArticle);
};
