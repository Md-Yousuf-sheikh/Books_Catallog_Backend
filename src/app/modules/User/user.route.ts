import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { userValidation } from './user.validation';
const authRoute = express.Router();
const userRoute = express.Router();
const profileRoute = express.Router();

authRoute.post(
  '/signup',
  validateRequest(userValidation.registerUser),
  UserController.createUserIntoDB
);
authRoute.post(
  '/signin',
  validateRequest(userValidation.loginUser),
  UserController.loginUserWithDB
);

//  users
userRoute.get('',
auth(ENUM_USER_ROLE.ADMIN),
UserController.getUsersFormDB);
userRoute.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(userValidation.paramsId),
  UserController.getUserByIdFormDB
);
userRoute.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(userValidation.paramsId),
  UserController.updateUserByIdFormDB
);
userRoute.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(userValidation.paramsId),
  UserController.deleteUserByIdFormDB
);

//  profile
profileRoute.get(
  '',
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
  UserController.getProfileFormDB
);

export const UserRoutes = {
  authRoute,
  userRoute,
  profileRoute,
};
