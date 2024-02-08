import express from 'express';
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
  validateRequest(CategoryValidation.update),
  CategoryController.updateIntoDB
);
router.delete(
  '/:id',
  validateRequest(CategoryValidation.paramsId),
  CategoryController.deleteFormDB
);

export const CategoryRoutes = router;
