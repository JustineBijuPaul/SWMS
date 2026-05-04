import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Create a connection pool to your PostgreSQL database
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/swms_db';
const pool = new Pool({ connectionString });

// Setup the Prisma adapter for Postgres
const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
