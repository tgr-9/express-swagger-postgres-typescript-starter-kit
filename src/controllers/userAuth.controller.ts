import {
  Route,
  Tags,
  Post,
  Body,
} from 'tsoa';
import { User } from '../sqlz/models';
import {
  ILoginPayload,
  IResponse,
  IUserBasicPayload,
  ILogout
} from '../interfaces';
import * as UserSessionController from './userSession.controller';
import { getModelFromCollectionBase, bcrypt, jwt } from '../utils';

@Route('api/v1/auth/user')
@Tags('User Auth')
export default class UserAuthController {

  @Post('/signin')
  public async signIn(@Body() auth: ILoginPayload) {
    try {
      let result: any = await User.findOne({ where: { email: auth.email } });
      result = getModelFromCollectionBase(result);
      if (result) {
        const isSame = await bcrypt.compare(auth.password, result.password);
        if (isSame) {
          const { id, email, firstname, lastname } = result;
          const loggedInPayload = {
            id,
            email,
            firstname,
            lastname,
          };
          const refreshToken = jwt.generateRefreshToken({ ...loggedInPayload });
          const userSessionPayload = {
            userId: id,
            token: refreshToken
          };
          const session = await UserSessionController.create(userSessionPayload);
          const accessToken = jwt.generateAccessToken({
            ...loggedInPayload,
            sessionId: session.id
          });
          const response: IResponse = { status: 200, data: { accessToken, refreshToken }, error: null, message: 'Successed to signin!' };
          return response;
        } else {
          const response: IResponse = { status: 400, data: null, error: null, message: 'Password is wrong!' };
          return response;
        }
      } else {
        const response: IResponse = { status: 400, data: null, error: null, message: 'You are not registered!' };
        return response;
      }
    } catch (error) {
      return { status: 400, data: null, error, message: 'Failed to signin!' };
    }
  }

  @Post('/signup')
  public async signUp(@Body() auth: IUserBasicPayload) {
    try {
      const result: any = await User.findOne({ where: { email: auth.email } });
      if (result) {
        return { status: 400, data: null, error: null, message: 'Please use other email.' };
      }
      const pwd = await bcrypt.hash(auth.password);
      const user: any = await User.create({ ...auth, password: pwd });
      const response: IResponse = { status: 200, data: user, error: null, message: 'Successed to register.' };
      return response;
    } catch (error) {
      const response: IResponse = { status: 400, data: null, error, message: 'Failed to signup!' };
      return response;
    }
  }

  @Post('/signout')
  public async signOut(@Body() body: ILogout) {
    try {
      const session = await UserSessionController.get(body.token);
      if (session) {
        await UserSessionController.remove(body.token);
        return { status: 200, data: null, error: null, message: 'Success to logout!' };
      }
      const response: IResponse = { status: 400, data: null, error: null, message: 'Failed to logout!' };
      return response;
    } catch (error) {
      const response: IResponse = { status: 400, data: null, error, message: 'Failed to logout!' };
      return response;
    }
  }
}
