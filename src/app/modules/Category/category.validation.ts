import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const update = z.object({
  params: z.object({
    id: z.string({
      required_error: 'Category is required in params',
    }),
  }),
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});
const paramsId = z.object({
  params: z.object({
    id: z.string({
      required_error: 'Category is required in params',
    }),
  }),
});

export const CategoryValidation = {
  create,
  paramsId,
  update
};
