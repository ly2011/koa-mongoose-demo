import verify from "../../middleware/verify";
import {
  createTag,
  listTag,
  deleteTagByName,
  deleteAllTags,
  updateTag,
  deleteTag
} from "../../controllers/tag";

export default async router => {
  router.get("/tag/", async (ctx, next) => {
    ctx.body = "this a tag response";
  });

  // router.post("/tag/add", verify, createTag);
  router.post("/tag/add", createTag);
  router.get("/tag/list", listTag);
  router.all("/tag/delete_by_name", deleteTagByName);
  router.all("/tag/delete_all", deleteAllTags);
  router.all("/tag/update", updateTag);
  router.all("/tag/delete", deleteTag);
};
