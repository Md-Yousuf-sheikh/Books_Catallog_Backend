import { z } from 'zod';

const registerUser = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email format',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
    contactNo: z.string({
      required_error: 'Contact number is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    profileImg: z.string({
      required_error: 'Profile image is required',
    }),
  }),
});

const loginUser = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email format',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const updateUser = z.object({
  body: z.object({
    name: z.optional(z.string()),
    contactNo: z.optional(z.string()),
    address: z.optional(z.string()),
    profileImg: z.optional(z.string()),
  }),
});

const paramsId = z.object({
  params: z.object({
    id: z.string({
      required_error: 'UserId is required in params',
    }),
  }),
});

export const userValidation = {
  loginUser,
  registerUser,
  updateUser,
  paramsId,
};
