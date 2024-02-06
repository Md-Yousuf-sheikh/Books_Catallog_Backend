import express from 'express';
import { CategoryController } from './category.controller';
// import { CategoryValidation } from './category.validation';
const router = express.Router();

router.post(
  '/create-category',
  // validateRequest(CategoryValidation.createcategory),
  CategoryController.insertIntoDB
);

export const CategoryRoutes = router;
