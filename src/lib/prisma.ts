import { PrismaClient, User, UserCreateInput, UserUpdateInput, UserUpdateInput } from '@prisma/client';

export const prisma = new PrismaClient();
export type { PrismaClient, User, UserCreateInput, UserUpdateInput };
