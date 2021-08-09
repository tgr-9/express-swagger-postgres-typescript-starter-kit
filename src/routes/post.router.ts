import express from 'express';
import { validateCreatePost, validateRatePost } from '../middlewares/validatePost';
import PostController from '../controllers/post.controller';

const router = express.Router();

router.get('/:id', async (_req, res) => {
  const controller = new PostController();
  const response = await controller.fetch(Number(_req.params.id));
  return res.status(response.status).send(response);
});

router.post('/', validateCreatePost, async (_req, res) => {
  const controller = new PostController();
  const response = await controller.create(_req.body);
  return res.status(response.status).send(response);
});

router.patch('/:id', validateCreatePost, async (_req, res) => {
  const controller = new PostController();
  const response = await controller.update(_req.body, Number(_req.params.id));
  return res.status(response.status).send(response);
});

router.put('/:postId/:userId/:rate', validateRatePost, async (_req, res) => {
  const controller = new PostController();
  const response = await controller.rate(Number(_req.params.postId), Number(_req.params.userId), Number(_req.params.rate));
  return res.status(response.status).send(response);
});

router.delete('/:postId', async (_req, res) => {
  const controller = new PostController();
  const response = await controller.delete(Number(_req.params.postId));
  return res.status(response.status).send(response);
});

export default router;