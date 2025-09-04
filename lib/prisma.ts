import { PrismaClient } from "@prisma/client"; // ✅ use @prisma/client directly

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"], // optional: logs SQL queries
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
