import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// 1. Criamos a "Pool" do PostgreSQL (a ligação real à base de dados)
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

// 2. Passamos essa ligação para o Adaptador do Prisma
const adapter = new PrismaPg(pool)

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// 3. Inicializamos o PrismaClient injetando o adaptador (A nova norma do Prisma 7)
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma