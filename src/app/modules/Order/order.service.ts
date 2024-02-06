import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';
const insertIntoDB = async (props: Order) => {
  // database
  const res = await prisma.order.create({
    data: props as any,
  });
  return res;
};
export const OrderService = {
  insertIntoDB,
};
