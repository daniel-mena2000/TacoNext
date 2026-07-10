//Aqui van a estarse listando las ordenes
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/UI/Heading";
import { getPendingOrders } from "@/src/services/order-service";



//Next.js espera que cada archivo page.tsx exporte un componente por defecto (default export), porque ese componente representa la página de esa ruta.
export default async function OrderPageAdmin() {
//Mandamos llamar las ordenes pendientes
    const orders = await getPendingOrders()
    //console.log(orders);


    return(
        <>
         <Heading
            title="🍽️ Panel de administración"
            description="Visualiza los pedidos pendientes y administra el flujo de trabajo."
        />

        {orders.length ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
                {orders.map(order => (
                    <OrderCard order={order}
                    key={order.id}
                    />
                ))}
            </div>
        ) :
         <p className="text-center">No hay ordenes Penientes</p>
         }

        </>
    )
}
