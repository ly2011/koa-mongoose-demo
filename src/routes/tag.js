import Router from "koa-router";
const router = Router();
import {
  createTag,
  listTag,
  deleteTagByName,
  deleteAllTags,
  updateTag,
  deleteTag
} from "../controllers/tag";

router.get("/", async (ctx, next) => {
  ctx.body = "this a tag response";
});

router.post("/add", createTag);
router.get("/list", listTag);
router.all("/delete_by_name", deleteTagByName);
router.all("/delete_all", deleteAllTags);
router.all("/update", updateTag);
router.all("/delete", deleteTag);

export default router;
