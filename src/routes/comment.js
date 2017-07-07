import Router from 'koa-router';
const router = Router();
import { createComment, getAllComments } from '../controllers/comment';

router.get('/', async (ctx, next) => {
  ctx.body = 'this a comment response';
});

router.post('/add', createComment);
router.get('/list', getAllComments);

export default router;
