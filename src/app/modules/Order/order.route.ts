import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { orderValidation } from './order.validation';
const router = express.Router();

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(orderValidation.create),
  OrderController.insertIntoDB
);
router.get('/',  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN), OrderController.getAllFormDB);
router.get('/:id',  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN), OrderController.getByIdFormDB);

export const OrderRoutes = router;
