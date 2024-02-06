import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
const insertIntoDB = async (props: User) => {
  // database
  const res = await prisma.user.create({
    data: props,
  });
  return res;
};
export const UserService = {
  insertIntoDB,
};
