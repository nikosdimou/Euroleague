import { PrismaClient } from "@/app/generated/prisma";

declare global {
  // allow global `var` for prisma
  // avoids TypeScript errors in dev
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"], // remove this line if you don’t want query logs
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
