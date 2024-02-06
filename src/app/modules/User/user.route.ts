import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/create-user',
  // validateRequest(UserValidation.createuser),
  UserController.insertIntoDB
);

export const UserRoutes = router;
