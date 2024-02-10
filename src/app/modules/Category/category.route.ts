import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';
const router = express.Router();

router.post(
  '/create-category',
  validateRequest(CategoryValidation.create),
  CategoryController.insertIntoDB
);
router.get('', CategoryController.getAllFormDB);
router.get(
  '/:id',
  validateRequest(CategoryValidation.paramsId),
  CategoryController.getSingleFormDB
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.update),
  CategoryController.updateIntoDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.paramsId),
  CategoryController.deleteFormDB
);

export const CategoryRoutes = router;
