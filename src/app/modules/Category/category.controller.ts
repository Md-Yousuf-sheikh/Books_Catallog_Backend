import { Category } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';


// create
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.insertIntoDB(req?.body);
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});
// get all
const getAllFormDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllFormDB();
  sendResponse<Category[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched successfully',
    data: result,
  });
});
// get single
const getSingleFormDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getSingleFormDB(req?.params?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched successfully',
    data: result,
  });
});
// deleted
const deleteFormDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.deleteFormDB(req?.params?.id);
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories deleted successfully',
    data: result,
  });
});
// Update
const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const payload = req?.body;

  const result = await CategoryService.updateIntoDB(id, payload);
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories updated successfully',
    data: result,
  });
});


// ex
export const CategoryController = {
  insertIntoDB,
  getAllFormDB,
  getSingleFormDB,
  deleteFormDB,
  updateIntoDB,
};
