import { Order, OrderProducts, Product } from "../generated/prisma/client"

export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number
    subtotal: number
}

//Types que nos da prisma: Order y OrderProducts
import { Prisma } from "@/src/generated/prisma/client";

export type OrderWithProducts = Prisma.OrderGetPayload<{
    include: {
        orderProducts: {
            include: {
                product: true;
            };
        };
    };
}>;
