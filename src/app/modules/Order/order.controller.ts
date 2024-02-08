import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user;
  const payload = req.body;

  const result = await OrderService.insertIntoDB({
    ...payload,
    userId: userId?.id,
  });

  sendResponse<Partial<Order>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order create successfully',
    data: result,
  });
});

//  get all
const getAllFormDB = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user;

  const result = await OrderService.getAllFormDB({
    id: userInfo?.id,
    role: userInfo?.role,
  });

  sendResponse<Partial<Order[]>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});
//  get all
const getByIdFormDB = catchAsync(async (req: Request, res: Response) => {

  const result = await OrderService.getByIdFormDB(req.params?.id);

  sendResponse<Partial<Order>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

export const OrderController = {
  insertIntoDB,
  getAllFormDB,
  getByIdFormDB
};
