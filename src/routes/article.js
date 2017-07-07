import Router from 'koa-router';
const router = Router();
import { createArticle, getAllArticles } from '../controllers/article';

router.get('/', async (ctx, next) => {
  ctx.body = 'this a article response';
});

router.post('/add', createArticle);
router.get('/list', getAllArticles);

export default router;
