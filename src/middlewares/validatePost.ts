import { Request, Response, NextFunction } from 'express';
import { User, Post } from '../sqlz/models';
import { IResponse } from '../interfaces';

/**
 * A middleware to validate the post.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function validateCreatePost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try{
    if (!req.body.content) {
      const response: IResponse = {status: 400, data: null, error: null, message: 'Failed to validate the post data.'};
      res.status(response.status).send(response);
    }
    next();
  } catch (err) {
    const response: IResponse = {status: 400, data: null, error: null, message: 'Failed to validate the post data.'};
    res.status(response.status).send(response);
  }
}

/**
 * A middleware to validate the post.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function validateRatePost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try{
    if (!req.params.postId || !req.params.userId || !req.params.rate) {
      const response: IResponse = {status: 400, data: null, error: null, message: 'Failed to validate the post data.'};
      res.status(response.status).send(response);
    }
    const postId = Number(req.params.postId);
    const post = await Post.findByPk(postId);
    if (!post){
      const response: IResponse = {status: 400, data: null, error: null, message: 'There isn\'t the post.'};
      res.status(response.status).send(response);
    }
    const userId = Number(req.params.userId);
    const user = await User.findByPk(userId);
    if (!user){
      const response: IResponse = {status: 400, data: null, error: null, message: 'There isn\'t the user.'};
      res.status(response.status).send(response);
    }
    if (Number(req.params.rate) < 0 || Number(req.params.rate) > 5) {
      const response: IResponse = {status: 400, data: null, error: null, message: 'Rate should be value between 0 and 5.'};
      res.status(response.status).send(response);
    }
    next();
  } catch (err) {
    const response: IResponse = {status: 400, data: null, error: null, message: 'Failed to validate the post data.'};
    res.status(response.status).send(response);
  }
}