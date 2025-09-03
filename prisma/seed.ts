import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  await prisma.user.create({
    data: {
      email: "admin@league.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log("✅ User created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
