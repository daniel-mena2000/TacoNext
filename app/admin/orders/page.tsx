//Aqui van a estarse listando las ordenes
import Heading from "@/components/UI/Heading";
import { getPendingOrders } from "@/src/services/order-service";
import OrderCard from "@/components/order/OrderCard";
import RefreshOrdersButton from "@/components/order/RefreshOrdersButton";
import OrderReadyButton from "@/components/order/OrderReadyButton";

export default async function OrderPageAdmin() {

    const orders = await getPendingOrders()
 


    return(
        <>
                <Heading
                    title="🛎️ Ordenes Pendientes"
                    description="Visualiza los pedidos pendientes y administra el flujo de trabajo."
                />

                <div className="flex space-x-5">
                <RefreshOrdersButton />
                <OrderReadyButton/>

                </div>


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
