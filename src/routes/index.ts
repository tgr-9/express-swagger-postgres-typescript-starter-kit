import express from 'express';
import UserAuthRouter from './userAuth.router';
import PostRouter from './post.router';

const router = express.Router();

router.use('/auth/user', UserAuthRouter);
router.use('/post', PostRouter);

export default router;
