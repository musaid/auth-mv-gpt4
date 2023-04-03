import { createRouter } from '@trpc/server';
import { authRouter } from './routers/auth';
import { userRouter } from './routers/user';

export const appRouter = createRouter().merge('auth.', authRouter).merge('user.', userRouter);
