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

/** Pola sandi akun departemen: <username>hmif2026, mis. ppm -> ppmhmif2026 */
const passwordFor = (username: string) => `${username}hmif2026`;

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
  // 1. Super user — sandinya "adminhmif2026", di luar pola <username>hmif2026
  //    karena username-nya bukan "admin".
  const superUserPassword = process.env.SEED_PASSWORD || "adminhmif2026";
  const superUser = await upsertUser(
    process.env.SEED_USERNAME || "hmifusk",
    superUserPassword,
    "superUser",
  );
  console.log(`superUser -> login "${superUser.username}" / "${superUserPassword}"`);

  // 2. Satu akun per departemen. MBA dapat role "mba" (satu-satunya yang boleh
  //    upload achievement), sisanya "departement" (hanya event/proker).
  for (const [name, description] of DEPARTEMENTS) {
    const username = name.toLowerCase();
    const deptPassword = passwordFor(username);
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
