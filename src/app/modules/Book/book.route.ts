
      
    import express from 'express';
    import validateRequest from '../../middlewares/validateRequest';
    import { BookController } from './book.controller';
    import {BookValidation } from './book.validation';
    const router = express.Router();

    router.post(
      '/create-book',
      // validateRequest(BookValidation.createbook),
      BookController.createUser
    );

    export const BookRoutes = router;


  
  