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
