"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteOrder(id: number) {
    await prisma.orderProducts.deleteMany({
        where: {
            orderId: id,
        },
    });

    await prisma.order.delete({
        where: {
            id,
        },
    });

    revalidatePath("/admin/completed");
}
