"use server"

import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schema"

export async function createOrder(data: unknown) {
    const result = OrderSchema.safeParse(data)

    if (!result.success) {
        return{
            errors: result.error.issues
        }
    }

//Depues de las validaciones en cliente y servidor y haber ingresado los datos en "data" ya podemos enviarlos al servidor. podemos pasar "data" o tambien "result.data" que este ya paso la validación de zod.

//Recordar que "orderProducts" es la tabla pivote, y apesar de que estamos escribiendo en la tabla Order, podemos pasarle la informacion que necesita "orderProducts" con "create" iteramos sobre la misma tabla Order y le pasamos los datos que hacen que se relacionen que es productId, orderId no por que este se asigna con el id de Order y quantity es la cantidad de productos de esa orden.
    try {

        await prisma.order.create({
            data: {
              name: result.data.name,
              total: result.data.total,
              orderProducts: {
                create: result.data.order.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
              }
            }
        })

    } catch (error) {
        console.log(error);

    }

}
