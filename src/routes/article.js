import Router from "koa-router";
import verify from "../middleware/verify";
const router = Router();
import { createArticle, getAllArticles } from "../controllers/article";

router.get("/", async (ctx, next) => {
  ctx.body = "this a article response";
});

// router.post("/add", verify, createArticle);
router.post("/add", createArticle);
router.get("/list", getAllArticles);

export default router;
