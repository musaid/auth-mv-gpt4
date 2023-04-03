
import { prisma, PrismaClient } from 'src/lib/prisma';

export interface Context {
  prisma: PrismaClient;
}

export function createContext(): Context {
  return {
    prisma,
  };
}
