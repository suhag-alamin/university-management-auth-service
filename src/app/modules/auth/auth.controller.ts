import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

const loginUserController = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  const { refreshToken } = result;

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged successfully',
    data: result,
  });
});

const refreshTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await AuthService.refreshToken(refreshToken);

    // set refresh token into cookie

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);
    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged successfully',
      data: result,
    });
  }
);

const changePasswordController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { ...passwordData } = req.body;

    await AuthService.changePassword(user, passwordData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password Changed successfully',
    });
  }
);

export const AuthController = {
  loginUserController,
  refreshTokenController,
  changePasswordController,
};
