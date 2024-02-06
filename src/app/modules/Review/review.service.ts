import { Review } from '@prisma/client';
import prisma from '../../../shared/prisma';
const insertIntoDB = async (props: Review) => {
  // database
  const res = await prisma.review.create({
    data: props,
  });
  return res;
};
export const ReviewService = {
  insertIntoDB,
};
