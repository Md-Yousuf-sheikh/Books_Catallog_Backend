import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
const router = express.Router();

router.post(
  '/create-book',
  validateRequest(BookValidation.create),
  BookController.insertIntoDB
);
router.patch(
  '/:id',
  validateRequest(BookValidation.update),
  BookController.updateIntoDB
);
router.delete('/:id', BookController.deleteFormDB);
router.get('/:id', BookController.getSingleByIdFormDB);
router.get('/:id/category', BookController.getBooksByCategoryIdFormDB);
router.get('/', BookController.getAllFormDB);

export const BookRoutes = router;
