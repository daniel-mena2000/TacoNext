"use server"

import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";
import { revalidatePath } from "next/cache";

//Esta forma es mejor que colocar directamente la funcion en el componente de "OrderCard" ya que desde aqui la podemos usar para componetes de servidor o de cliente, en casa de que la querramos en el mismo componente de servidor dentro de la funcion debe de llevar el "use server" no importa que el componente ya sea de servidor igual la debe de llevar.

//Como lo estamos mandando llamar desde OrderCard en automatico tenemos formData, el "order_id" es del input invisible que creamos simplemente para obtener el valor del ID de la orden que le dimos completar
export async function completeOrder(formData: FormData) {

    //console.log(formData.get('order_id'));

//FormData siempre devuelve strings (o File), por eso orderId es "5" y no 5. por eso usamos +orderId, pero podemos igual crear un schema para tranformar a numero
    const data = {
        orderId: formData.get('order_id')
    }

    const result = OrderIdSchema.safeParse(data)

//`where` es una condición de búsqueda. Le dice a Prisma qué registro quieres encontrar antes de actualizarlo, borrarlo o consultarlo. Busca la orden cuyo id sea igual a orderId y actualízala con los datos de data.
    if (result.success) {

        try {
            await prisma.order.update({
                where: {
                    id: result.data.orderId
                },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            })

            revalidatePath('/admin/orders')
        } catch (error) {
            console.log(error);

        }
    }

    //console.log('desde complete order');

}


/*
¿Qué hace esta función?

El flujo es:
El usuario hace clic en "Marcar Orden Completada".
Se envía el formulario.
La Server Action `completeOrder` recibe el formData.
Obtiene el order_id.
Prisma ejecuta un UPDATE en PostgreSQL.
Si todo sale bien, la función termina.
Si ocurre un error, el catch lo captura.
*/
