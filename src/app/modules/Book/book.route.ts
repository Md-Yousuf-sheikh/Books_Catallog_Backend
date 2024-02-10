import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.create),
  BookController.insertIntoDB
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.update),
  BookController.updateIntoDB
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteFormDB);
router.get('/:id', BookController.getSingleByIdFormDB);
router.get('/:id/category', BookController.getBooksByCategoryIdFormDB);
router.get('/', BookController.getAllFormDB);

export const BookRoutes = router;
