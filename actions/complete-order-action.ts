"use server"

import { prisma } from "@/src/lib/prisma";

//Esta forma es mejor que colocar directamente la funcion en el componente de "OrderCard" ya que desde aqui la podemos usar para componetes de servidor o de cliente, en casa de que la querramos en el mismo componente de servidor dentro de la funcion debe de llevar el "use server" no importa que el componente ya sea de servidor igual la debe de llevar.

//Como lo estamos mandando llamar desde OrderCard en automatico tenemos formData
export async function completeOrder(formData: FormData) {

    console.log(formData.get('order_id'));


    console.log('desde complete order');

}
