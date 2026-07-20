"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"

//Accion para subir un nuevo producto a la DB de prisma
export async function createProduct(data: unknown) {
    const result = ProductSchema.safeParse(data)

    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    await prisma.product.create({
        data: result.data
    })
}
