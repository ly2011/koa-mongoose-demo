import Router from 'koa-router';
const router = Router();
import { createUser, listUser, login } from '../controllers/user';

router.get('/', async (ctx, next) => {
  ctx.body = 'this a users response';
});

router.post('/add', createUser);
router.get('/list', listUser);
router.post('/login', login)

export default router;
