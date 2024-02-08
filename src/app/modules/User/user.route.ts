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
userRoute.get('', UserController.getUsersFormDB);
userRoute.get(
  '/:id',
  validateRequest(userValidation.paramsId),
  UserController.getUserByIdFormDB
);
userRoute.patch(
  '/:id',
  validateRequest(userValidation.paramsId),
  UserController.updateUserByIdFormDB
);
userRoute.delete(
  '/:id',
  validateRequest(userValidation.paramsId),
  UserController.deleteUserByIdFormDB
);

//  profile
profileRoute.get(
  '',
  auth(ENUM_USER_ROLE.CUSTOMER),
  UserController.getProfileFormDB
);

export const UserRoutes = {
  authRoute,
  userRoute,
  profileRoute,
};
