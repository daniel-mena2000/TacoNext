import { PrismaClient } from "@/src/generated/prisma/client";
import { Pool } from "pg";// 1. Importamos el conector nativo de Postgres
import { PrismaPg } from "@prisma/adapter-pg";// 2. El adaptador de Prisma 7

// Creamos la conexión real a la base de datos usando tu variable de entorno
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});
