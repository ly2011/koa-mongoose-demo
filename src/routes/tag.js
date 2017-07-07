import Router from 'koa-router';
const router = Router();
import { createTag, listTag, deleteTagByName, deleteAll } from '../controllers/tag';

router.get('/', async (ctx, next) => {
  ctx.body = 'this a users response';
});

router.post('/add', createTag);
router.get('/list', listTag);
router.all('/delete_by_name', deleteTagByName)
router.all('/delete_all', deleteAll)

export default router;
