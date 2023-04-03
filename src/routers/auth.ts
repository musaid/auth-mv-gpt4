import { createRouter, z } from 'src/lib/trpc';
import { createUser, loginUser } from '../controllers/auth-controller';

export const authRouter = createRouter()
  .mutation('register', {
    input: z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }),
    async resolve({ input, ctx }) {
      return await createUser(ctx, input);
    },
  })
  .mutation('login', {
    input: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await loginUser(ctx, input);
    },
  });
