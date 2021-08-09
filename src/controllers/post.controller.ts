import { getModelFromCollectionBase } from '../utils';
import {
  Route,
  Tags,
  Post,
  Body,
  Path,
  Put,
  Delete,
  Patch,
  Get,
} from 'tsoa';
import {
  IPostPayload,
  IResponse,
} from '../interfaces';
import { Post as PostModel, PostRate } from '../sqlz/models';

@Route('api/v1/post')
@Tags('Post')
export default class UserAuthController {

  @Get('/:id')
  public async fetch(@Path() id: number) {
    try {
      let post = await PostModel.findOne({ where: { id }, include: [{ model: PostRate, as: 'rates', required: false }] });
      if (post) {
        post = getModelFromCollectionBase(post);
        const p: any = {...post};
        const {rates} = p;
        let avgRate = 0;
        if (rates && rates.length > 0) {
          const rateLen = rates.length;
          rates.map((r: any) => {
            avgRate = avgRate + (r.rate / rateLen);
          });
        }
        return { status: 200, data: {...post, avgRate}, error: null, message: 'Success to fetch post!' };
      }
      return { status: 400, data: null, error: null, message: 'Success to fetch post!' };
    } catch (error) {
      const response: IResponse = { status: 400, data: null, error, message: 'Failed to fetch post!' };
      return response
    }
  }

  @Post('/')
  public async create(@Body() body: IPostPayload) {
    try {
      const post = await PostModel.create({ ...body });
      if (post) {
        return { status: 200, data: post, error: null, message: 'Success to create post!' };
      }
      const response: IResponse = { status: 400, data: null, error: null, message: 'Failed to create post!' };
      return response;
    } catch (error) {
      const response: IResponse = { status: 400, data: null, error, message: 'Failed to create post!' };
      return response;
    }
  }

  @Patch('/:id')
  public async update(@Body() body: IPostPayload, @Path() id: number) {
    try {
      const exPost = await PostModel.findByPk(id);
      if (exPost) {
        const post = await PostModel.update({ ...body }, { where: { id }, returning: true });
        return { status: 200, data: post[1][0], error: null, message: 'Success to update post!' };
      }
      const response: IResponse = { status: 400, data: null, error: null, message: 'Failed to update post!' };
      return response
    } catch (error) {
      const response: IResponse = { status: 400, data: null, error, message: 'Failed o update post!' };
      return response;
    }
  }

  @Put('/:postId/:userId/:rate')
  public async rate(@Path() postId: number, @Path() userId: number, @Path() rate: number) {
    try {
      const exPostRate = await PostRate.findOne({ where: { postId, userId } });
      if (exPostRate) {
        await PostRate.destroy({ where: { postId, userId } });
        return { status: 200, data: null, error: null, message: 'Success to remove ost\'s rate!' };
      }
      const postRate = await PostRate.create({ postId, userId, rate });
      if (postRate) {
        return { status: 200, data: postRate, error: null, message: 'Success o rate post!' };
      }
      const response: IResponse = { status: 400, data: null, error: null, message: 'Faile to rate post!' };
      return response
    }catch (error) {
      const response: IResponse = { status: 400, data: null, error, message: 'Failed to create post!' };
      return response
    }
  }

  @Delete('/:postId')
  public async delete(@Path() postId: number) {
    try {
      await PostRate.destroy({ where: { postId } });
      await PostModel.destroy({ where: { id: postId } });
      const response: IResponse = { status: 200, data: null, error: null, message: 'Success to remove posts!' };
      return response;
    } catch (error) {
      const response: IResponse = { status: 400, data: null, error, message: 'Failed to remo;ve post!' };
      return response
    }
  }
}
