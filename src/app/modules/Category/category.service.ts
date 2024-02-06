import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';
const insertIntoDB = async (props: Category) => {
  // database
  const res = await prisma.category.create({
    data: props,
  });
  return res;
};

//
export const CategoryService = {
  insertIntoDB,
};
