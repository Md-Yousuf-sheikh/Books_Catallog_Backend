
  import { Request, Response } from 'express';
  import httpStatus from 'http-status';
  import catchAsync from '../../../shared/catchAsync';
  import sendResponse from '../../../shared/sendResponse';
  import { Book } from '@prisma/client';
  import { BookService } from './book.service';

    const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
        const result = await Book.insertIntoDB(req?.body);
          sendResponse<Book>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Book create successfully',
            data: result,
          });
    });
    export const BookController={
      insertIntoDB
    }; 