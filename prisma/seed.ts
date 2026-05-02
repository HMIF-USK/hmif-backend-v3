import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // 1. Create a department first since User requires it
  const adminDepartment = await prisma.departement.upsert({
    where: { id: "dept-admin-1" },
    update: {},
    create: {
      id: "dept-admin-1",
      name: "Admin / Default",
      description: "Default department for superusers",
    },
  });

  // 2. Hash the password
  const hashedPassword = await bcrypt.hash("test123", 10);

  // 3. Create or update the user
  const existingUser = await prisma.user.findFirst({
    where: { username: "hmifusk" },
  });

  if (!existingUser) {
    const user = await prisma.user.create({
      data: {
        username: "hmifusk",
        password: hashedPassword,
        departement_id: adminDepartment.id,
      },
    });
    console.log("Created user hmifusk!");
    console.log({ user });
  } else {
    const user = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        password: hashedPassword,
        departement_id: adminDepartment.id,
      },
    });
    console.log("Updated user hmifusk!");
    console.log({ user });
  }

  console.log("Seeding successful!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
