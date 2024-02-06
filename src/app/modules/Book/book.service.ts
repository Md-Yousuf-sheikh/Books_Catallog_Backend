
  import prisma from '../../../shared/prisma';
  import { Prisma, Book } from '@prisma/client';
  const insertIntoDB = async (props: Book) => {
    // database
    const res = await prisma.book.create({
      data: props,
    });
    return res;
  };
  export const BookService={
    insertIntoDB
  };
  
  
