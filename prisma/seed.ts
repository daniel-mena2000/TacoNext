import { Pool } from "pg"; // 1. Importamos el conector nativo de Postgres
import { PrismaPg } from "@prisma/adapter-pg"; // 2. El adaptador de Prisma 7
import { categories } from "./data/categories";
import { products } from "./data/products";
import { prisma } from "@/src/lib/prisma";
import { pool } from "@/src/lib/prisma";

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
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1); 
  });
