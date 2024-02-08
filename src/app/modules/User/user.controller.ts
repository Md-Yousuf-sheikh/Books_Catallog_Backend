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
const getUsersFormDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUsersFormDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get users successfully!',
    data: result,
  });
});
const getUserByIdFormDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserByIdFormDB(req?.params?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get user successfully!',
    data: result,
  });
});
const updateUserByIdFormDB = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const payload = req?.body;

  const result = await UserService.updateUserByIdFormDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update user successfully!',
    data: result,
  });
});
const deleteUserByIdFormDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUserByIdFormDB(req?.params?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete user successfully!',
    data: result,
  });
});

// profile
const getProfileFormDB = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await UserService.getProfileFormDB(user?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get profile successfully!',
    data: result,
  });
});

//  export
export const UserController = {
  createUserIntoDB,
  loginUserWithDB,
  getUsersFormDB,
  getUserByIdFormDB,
  deleteUserByIdFormDB,
  updateUserByIdFormDB,
  getProfileFormDB,
};
