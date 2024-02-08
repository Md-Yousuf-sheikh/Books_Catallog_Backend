/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BookSearchAbleFiled } from './book.constant';
import { IBooksFilterRequest } from './book.interface';

// create
const insertIntoDB = async (props: Book) => {
  const res = await prisma.book.create({
    data: props,
  });
  return res;
};
// get all
const getAllFormDB = async (
  filters: IBooksFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, skip, page } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: BookSearchAbleFiled.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive', // mySQL is  case insensitive by default
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions?.length > 0 ? { AND: andConditions } : {};

  const res = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [options?.sortBy ?? 'createdAt']: options?.sortOrder ?? 'desc',
    },
  });

  //  get total
  const total = await prisma?.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      limit,
      page,
      total,
    },
    data: res,
  };
};
// get single by id
const getSingleByIdFormDB = async (id: string) => {
  const isCategoryExist = await prisma.book.findUnique({
    where: {
      id: id,
    },
  });
  if (!isCategoryExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This book doesn't exist!");
  }
  const res = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  return res;
};
// get single by id
const getBooksByCategoryIdFormDB = async (id: string) => {
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
  if (!isCategoryExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This category doesn't exist!");
  }
  const res = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
  });

  return res;
};
//  update
const updateIntoDB = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  // check
  const isCategoryExist = await prisma.book.findUnique({
    where: {
      id: id,
    },
  });
  if (!isCategoryExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This book doesn't exist!");
  }
  // res
  const res = await prisma.book.update({
    where: { id },
    data: payload,
  });

  return res;
};
// delete
const deleteFormDB = async (id: string) => {
  const isCategoryExist = await prisma.book.findUnique({
    where: {
      id: id,
    },
  });

  if (!isCategoryExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This book doesn't exist!");
  }

  // res
  const res = await prisma.book.delete({
    where: {
      id: id,
    },
  });
  return res;
};

//  export
export const BookService = {
  insertIntoDB,
  getAllFormDB,
  deleteFormDB,
  updateIntoDB,
  getSingleByIdFormDB,
  getBooksByCategoryIdFormDB,
};
