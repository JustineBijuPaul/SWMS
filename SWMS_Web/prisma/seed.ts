import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import * as bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

const DUMMY_PASSWORD = "Demo@123456"; // Common password for all dummy users
const ROLES = [
  "CITIZEN",
  "WORKER",
  "CONTRACTOR",
  "ADMIN",
  "STATE_ADMIN",
  "SUPER_ADMIN",
] as const;

async function main() {
  console.log("🌱 Starting database seed...");

  // Hash the password once
  const hashedPassword = await bcryptjs.hash(DUMMY_PASSWORD, 10);

  // Create dummy users for each role
  for (const role of ROLES) {
    const email = `${role.toLowerCase()}@demo.swms.local`;
    const phone = `+91${9000000000 + ROLES.indexOf(role)}`;
    const name = `${role.charAt(0).toUpperCase()}${role.slice(1).toLowerCase()} User`;

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }],
        },
      });

      if (existingUser) {
        console.log(`⏭️  Skipping ${role}: User already exists`);
        continue;
      }

      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          password_hash: hashedPassword,
          role: role,
          language: "en",
        },
      });

      console.log(`✅ Created ${role} user: ${email}`);

      // Create profile for WORKER role
      if (role === "WORKER") {
        await prisma.workerProfile.create({
          data: {
            user_id: user.id,
            availability: true,
            rating: 4.5,
          },
        });
        console.log(`   ├─ Created Worker Profile`);
      }

      // Create profile for CONTRACTOR role
      if (role === "CONTRACTOR") {
        await prisma.contractorProfile.create({
          data: {
            user_id: user.id,
            company_name: "Demo Waste Management Co.",
            zones_managed: ["Zone A", "Zone B", "Zone C"],
          },
        });
        console.log(`   ├─ Created Contractor Profile`);
      }
    } catch (error) {
      console.error(`❌ Error creating ${role} user:`, error);
    }
  }

  console.log("\n📊 Seed Summary:");
  console.log(`Password: ${DUMMY_PASSWORD}`);
  console.log("\n📧 Created Users:");
  for (const role of ROLES) {
    const email = `${role.toLowerCase()}@demo.swms.local`;
    console.log(`   • ${email}`);
  }

  console.log("\n✨ Database seed completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
