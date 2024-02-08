import { Book } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { IGenericResponse } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BookFilterAbleFiled } from './book.constant';
import { BookService } from './book.service';

// create
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req?.body);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book create successfully',
    data: result,
  });
});

// get all
const getAllFormDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterAbleFiled);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await BookService.getAllFormDB(filters, options);
  
  sendResponse<IGenericResponse<Book[]>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully',
    data: result,
  });

});

// get all
const getSingleByIdFormDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getSingleByIdFormDB(req?.params?.id);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    data: result,
  });
});
// get all
const getBooksByCategoryIdFormDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookService.getBooksByCategoryIdFormDB(
      req?.params?.id
    );
    sendResponse<Book[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Books with associated category data fetched successfully',
      data: result,
    });
  }
);

// delete
const deleteFormDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteFormDB(req?.params?.id);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books deleted successfully',
    data: result,
  });
});

// update
const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const payload = req?.body;
  const result = await BookService.updateIntoDB(id, payload);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books updated successfully',
    data: result,
  });
});

// export
export const BookController = {
  insertIntoDB,
  getAllFormDB,
  deleteFormDB,
  updateIntoDB,
  getSingleByIdFormDB,
  getBooksByCategoryIdFormDB,
};
