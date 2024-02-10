import { User } from '@prisma/client';
import httpStatus from 'http-status';

import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import {
  isUserPasswordConvertBcrypt,
  isUserPasswordMatch,
} from '../../../helpers/bcryptHelper';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { UserSelect } from './user.constant';

const createUserIntoDB = async (props: User) => {
  // const isUserExist = await prisma.user.findUnique({
  //   where: {
  //     email: props?.email,
  //   },
  // });
  // //  check is user
  // if (isUserExist) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'This user already existed!');
  // }

  const newPassword = await isUserPasswordConvertBcrypt(props?.password);
  // database
  const res = await prisma.user.create({
    data: {
      ...props,
      password: newPassword,
    },
    select: UserSelect,
  });

  return res;
};
const loginUserWithDB = async (props: User) => {
  // database
  const res = await prisma.user.findUnique({
    where: {
      email: props?.email,
    },
  });

  if (!res) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist!");
  }
  //
  const { password, ...responseWithoutPassword } = res;

  //
  const isMatchPassword = await isUserPasswordMatch(props?.password, password);

  if (!isMatchPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password doesn't match.");
  }

  //  email and roll
  const { role, id } = responseWithoutPassword;

  //  create access and refresh tokens
  const accessToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  // refresh Token
  const refreshToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};
// user
const getUsersFormDB = async () => {
  const res = await prisma.user.findMany({
    where: {
      role: 'customer',
    },
    select: UserSelect,
  });

  return res;
};
const getUserByIdFormDB = async (id: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist!");
  }
  // res
  const res = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: UserSelect,
  });

  return res;
};
const deleteUserByIdFormDB = async (id: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist!");
  }

  // res
  const res = await prisma.user.delete({
    where: {
      id: id,
    },
    select: UserSelect,
  });
  return res;
};
const updateUserByIdFormDB = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User>> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist!");
  }

  // res
  const res = await prisma.user.update({
    where: { id },
    data: payload,
    select: UserSelect,
  });

  return res;
};
// profile
const getProfileFormDB = async (id: string) => {
  const res = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: UserSelect,
  });
  if (!res) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User profile doesn't exist!");
  }
  return res;
};

export const UserService = {
  loginUserWithDB,
  createUserIntoDB,
  getUserByIdFormDB,
  deleteUserByIdFormDB,
  updateUserByIdFormDB,
  getProfileFormDB,
  getUsersFormDB,
};
