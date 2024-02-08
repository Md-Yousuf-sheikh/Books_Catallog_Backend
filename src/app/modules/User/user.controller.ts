import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

//  Auth
const createUserIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUserIntoDB(req?.body);
  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});
const loginUserWithDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.loginUserWithDB(req?.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully!',
    data: result,
  });
});

//  Users


export const UserController = {
  createUserIntoDB,
  loginUserWithDB
};
