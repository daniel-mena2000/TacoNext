import { prisma } from "@/src/lib/prisma";



export async function getPendingOrders() {
    return prisma.order.findMany({
        where: {
            status: false,
        },
        include: {
            orderProducts: {
                include: {
                    product: true,
                },
            },
        },
    });
}


export async function getCompletedOrders() {
    return prisma.order.findMany({
        take: 10,
        where: {
            orderReadyAt: {
                not: null
            }
        },
        orderBy:{
            orderReadyAt: 'desc'
        },
        include: {
            orderProducts: {
                include: {
                    product: true,
                },
            },
        },
    });
}
