import { z } from 'zod';
const loginUser = z.object({
  body: z.object({
    mobile: z.string({
      required_error: 'Mobile number is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const authValidation = {
  loginUser,
};
