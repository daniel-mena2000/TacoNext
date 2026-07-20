import { prisma } from "@/src/lib/prisma";


//Esta funcion solo traera las ordenes que esten pendientes es decir como "false",
//Si imprimimos orders en "OrderPageAdmin" y en el navegador la ruta de /admin/orders  vemos que nos trae los productos que estan pendientes, pero No las ordenes como tal, ya que eso esta en la relacion con "orderProducts" de los modelos de prisma, por lo tanto para incluir esta relacion y su contenido, utilizamos "include" y accedemos a orderProducts y para entrar a los valores usamos otro "include" y listamos como true los que queremos incluir

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

//take: 10 - Solo para traernos las 10 primeras ordenes listas,
//Y nos traermos las orderReadyAt que no tengas null
//orderReadyAt: 'desc' - Para mostrar primero la ultima que se completo
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
