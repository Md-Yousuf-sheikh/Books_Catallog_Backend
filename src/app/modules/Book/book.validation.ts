import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    publicationDate: z
      .string({
        required_error: 'Publication date is required',
      })
      .refine(value => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Publication date must be in YYYY-MM-DD format',
      }),
    categoryId: z.string({
      required_error: 'Category ID is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    price: z.number().optional()
  }),
});

export const BookValidation = {
  create,
  update,
};
