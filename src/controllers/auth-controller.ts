import { hashPassword, comparePasswords } from '../utils/password';
import { createJwtToken } from '../utils/jwt';
import { UserCreateInput } from 'src/lib/prisma';
import { Context } from 'src/middleware/context';

interface RegisterInput {
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export async function createUser(ctx: Context, input: RegisterInput): Promise<UserCreateInput> {
  const hashedPassword = await hashPassword(input.password);
  const user = await ctx.prisma.user.create({
    data: {
      email: input.email,
      password: hashedPassword,
    },
  });

  return user;
}

export async function loginUser(ctx: Context, input: LoginInput): Promise<string> {
  const user = await ctx.prisma.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isValidPassword = await comparePasswords(input.password, user.password);

  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  const token = createJwtToken({ userId: user.id });

  return token;
}
