import express from 'express';
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

userRoute.post(
  '/',
  validateRequest(userValidation.loginUser),
  UserController.loginUserWithDB
);
userRoute.post(
  '/:id',
  validateRequest(userValidation.loginUser),
  UserController.loginUserWithDB
);
userRoute.patch(
  '/:id',
  validateRequest(userValidation.loginUser),
  UserController.loginUserWithDB
);
userRoute.delete(
  '/:id',
  validateRequest(userValidation.loginUser),
  UserController.loginUserWithDB
);

//  profile
profileRoute.get(
  '/',
  validateRequest(userValidation.loginUser),
  UserController.loginUserWithDB
);

export const UserRoutes = {
  authRoute,
  userRoute,
  profileRoute,
};
