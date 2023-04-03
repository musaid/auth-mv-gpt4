import { createRouter, httpError, z } from 'src/lib/trpc';
import { getUser, getUsers, updateUser } from '../controllers/user-controller';

export const userRouter = createRouter()
  .query('all', {
    async resolve({ ctx }) {
      return await getUsers(ctx);
    },
  })
  .query('one', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input, ctx }) {
      const user = await getUser(ctx, input.id);
      if (!user) {
        throw httpError.notFound(`User with id ${input.id} not found`);
      }
      return user;
    },
  })
  .mutation('update', {
    input: z.object({
      id: z.number(),
      data: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      }),
    }),
    async resolve({ input, ctx }) {
      const updatedUser = await updateUser(ctx, input.id, input.data);
      if (!updatedUser) {
        throw httpError.notFound(`User with id ${input.id} not found`);
      }
      return updatedUser;
    },
  });
