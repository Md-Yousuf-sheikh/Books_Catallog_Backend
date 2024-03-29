import { z } from 'zod';

const create = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string({
          required_error: 'Book ID is required',
        }),
        quantity: z.number({
          required_error: 'Quantity is required',
        }),
      })
    ),
  }),
});


export const orderValidation = {
  create
};
