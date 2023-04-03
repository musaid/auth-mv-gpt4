import { UserUpdateInput } from 'src/lib/prisma';
import { Context } from '../middleware/context';

export async function getUsers(ctx: Context) {
  return await ctx.prisma.user.findMany();
}

export async function getUser(ctx: Context, id: number) {
  return await ctx.prisma.user.findUnique({ where: { id } });
}

export async function updateUser(ctx: Context, id: number, data: UserUpdateInput) {
  return await ctx.prisma.user.update({ where: { id }, data });
}
