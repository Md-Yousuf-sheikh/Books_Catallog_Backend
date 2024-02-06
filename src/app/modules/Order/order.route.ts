import express from 'express';
import { OrderController } from './order.controller';
const router = express.Router();

router.post(
  '/create-order',
  // validateRequest(OrderValidation.createorder),
  OrderController.insertIntoDB
);

export const OrderRoutes = router;
