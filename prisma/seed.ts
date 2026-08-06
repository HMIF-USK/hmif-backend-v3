import { PrismaClient } from "@prisma/client";
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

async function main() {
  // 1. User admin (departement sekarang yang menunjuk ke user, bukan sebaliknya)
  const username = process.env.SEED_USERNAME || "hmifusk";
  const password = process.env.SEED_PASSWORD || "test123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findFirst({ where: { username } });

  const user = existing
    ? await prisma.user.update({
        where: { id: existing.id },
        data: { password: hashedPassword, role: "superUser" },
      })
    : await prisma.user.create({
        data: { username, password: hashedPassword, role: "superUser" },
      });

  console.log(`User ${username} siap:`, user.id);

  // 2. Departemen — dipakai frontend sebagai sumber dropdown & pemilik Proker
  for (const [name, description] of DEPARTEMENTS) {
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
  }

  console.log(`${DEPARTEMENTS.length} departemen siap.`);
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
