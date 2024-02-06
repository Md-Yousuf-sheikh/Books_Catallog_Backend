import express from 'express';
import { ReviewController } from './review.controller';
const router = express.Router();

router.post(
  '/create-review',
  // validateRequest(ReviewValidation.createreview),
  ReviewController.insertIntoDB
);

export const ReviewRoutes = router;
