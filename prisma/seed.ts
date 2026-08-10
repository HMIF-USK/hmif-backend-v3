import { PrismaClient, userrRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const DEPARTEMENTS = [
  ["DPH", "Dewan Pengurus Harian"],
  ["PPM", "Pengembangan Potensi Mahasiswa"],
  ["KOMINKRAF", "Komunikasi, Informasi dan Ekonomi Kreatif"],
  ["PKM", "Pengelola Kesejahteraan Mahasiswa"],
  ["SOSMAS", "Sosial Masyarakat"],
  ["HUAL", "Hubungan Alumni"],
  ["MBA", "Minat dan Bakat"],
  ["KEAGAMAAN", "Keagamaan"],
  ["ADM", "Administrasi"],
];

async function upsertUser(username: string, password: string, role: userrRole) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const existing = await prisma.user.findFirst({ where: { username } });

  return existing
    ? prisma.user.update({
        where: { id: existing.id },
        data: { password: hashedPassword, role },
      })
    : prisma.user.create({ data: { username, password: hashedPassword, role } });
}

async function main() {
  // 1. Super user
  const superUser = await upsertUser(
    process.env.SEED_USERNAME || "hmifusk",
    process.env.SEED_PASSWORD || "test123",
    "superUser",
  );
  console.log(`superUser ${superUser.username} siap`);

  // 2. Satu akun per departemen. MBA dapat role "mba" (satu-satunya yang boleh
  //    upload achievement), sisanya "departement" (hanya event/proker).
  const deptPassword = process.env.SEED_DEPT_PASSWORD || "test123";

  for (const [name, description] of DEPARTEMENTS) {
    const username = name.toLowerCase();
    const role: userrRole = name === "MBA" ? "mba" : "departement";
    const user = await upsertUser(username, deptPassword, role);

    const found = await prisma.departement.findFirst({ where: { name } });
    if (found) {
      await prisma.departement.update({
        where: { id: found.id },
        data: { description, user_id: user.id },
      });
    } else {
      await prisma.departement.create({
        data: { name, description, user_id: user.id },
      });
    }

    console.log(`  ${name} -> login "${username}" / "${deptPassword}" (${role})`);
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
