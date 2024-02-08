import { Category } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

// create
const insertIntoDB = async (props: Category) => {
  const res = await prisma.category.create({
    data: props,
  });
  return res;
};
// get all
const getAllFormDB = async () => {
  const res = await prisma.category.findMany({});
  return res;
};
// get single by id
const getSingleFormDB = async (id: string) => {
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
  if (!isCategoryExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This category doesn't exist!");
  }
  const res = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  const books = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
  });
  return {
    ...res,
    books: books,
  };
};
//  update
const updateIntoDB = async (
  id: string,
  payload: Partial<Category>
): Promise<Category> => {
  // check
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
  if (!isCategoryExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This category doesn't exist!");
  }
  // res
  const res = await prisma.category.update({
    where: { id },
    data: payload,
  });

  return res;
};
// delete
const deleteFormDB = async (id: string) => {
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });

  if (!isCategoryExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This category doesn't exist!");
  }

  // res
  const res = await prisma.category.delete({
    where: {
      id: id,
    },
  });
  return res;
};

//  export
export const CategoryService = {
  insertIntoDB,
  getAllFormDB,
  getSingleFormDB,
  deleteFormDB,
  updateIntoDB,
};
