import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { orderInsertPropsType } from './order.interface';

//  create
const insertIntoDB = async (
  props: orderInsertPropsType
): Promise<Partial<Order>> => {
  const res = await prisma.order.create({
    data: props,
  });
  return res;
};

//  get all
const getAllFormDB = async (props: {
  id: string;
  role: string;
}): Promise<Partial<Order[]>> => {
  const res = await prisma.order.findMany({
    where:
      props?.role === 'customer'
        ? {
            userId: props?.id,
          }
        : {},
  });

  return res;
};

//  get all
const getByIdFormDB = async (id: string) => {
  const res = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  return res;
};
//
export const OrderService = {
  insertIntoDB,
  getAllFormDB,
  getByIdFormDB,
};
