import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // check user
  const user = new User();
  const isUserExist = await user.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // match password

  if (!user.isPasswordMatch(password, isUserExist.password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
  }

  const { id: userId, role, needPasswordChange } = isUserExist;
  const accessToken = JwtHelpers.createToken(
    { id: userId, role },
    config.jwt.secret as Secret,
    config.jwt.expiration as string
  );

  const refreshToken = JwtHelpers.createToken(
    { id: userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expiration as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
