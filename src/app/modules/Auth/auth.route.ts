import express from 'express';
import { AuthController } from './auth.controller';
const router = express.Router();

router.post(
  '/create-auth',
  // validateRequest(AuthValidation.createauth),
  AuthController.insertIntoDB
);

export const AuthRoutes = router;
