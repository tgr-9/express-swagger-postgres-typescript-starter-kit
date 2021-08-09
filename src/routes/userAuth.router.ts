import express from 'express';
import { validateSignup } from '../middlewares/validateAuth';
import UserAuthController from '../controllers/userAuth.controller';

const router = express.Router();

router.post('/signin', async (_req, res) => {
  const controller = new UserAuthController();
  const response = await controller.signIn(_req.body);
  return res.status(response.status).send(response);
});

router.post('/signup', validateSignup, async (_req, res) => {
  const controller = new UserAuthController();
  const response = await controller.signUp(_req.body);
  return res.status(response.status).send(response);
});

router.post('/signout', async (req, res) => {
  const refreshToken = req?.body?.token.replace('Bearer ', '');
  const controller = new UserAuthController();
  const response = await controller.signOut({ token: refreshToken });
  return res.send(response);
});

export default router;