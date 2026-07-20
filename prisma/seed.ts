import { Pool } from "pg"; // 1. Importamos el conector nativo de Postgres
import { PrismaPg } from "@prisma/adapter-pg"; // 2. El adaptador de Prisma 7
import { categories } from "./data/categories";
import { products } from "./data/products";
import { prisma } from "@/src/lib/prisma";
import { pool } from "@/src/lib/prisma";

//createMany() sirve para crear varios registros de una sola vez.
async function main() {
  console.log("Cargando categorías...");
  await prisma.category.createMany({
    data: categories
  });

   await prisma.product.createMany({
    data: products
  });
  console.log("¡Categorías cargadas con éxito!");
}

main()
  .then(async () => {
    await prisma.$disconnect(); // 1. Apaga el cliente de Prisma
    await pool.end(); // 2. Cierra el grifo de PostgreSQL
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect(); // 2. Apaga Prisma por seguridad
    await pool.end(); // 3. Cierra el pool por seguridad
    process.exit(1); // 4. Apaga el script inmediatamente con código de error
  });
