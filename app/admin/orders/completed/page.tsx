import { getCompletedOrders } from "@/src/services/order-service";
import OrderReady from "@/components/order/OrderReady";
import GoBackButton from "@/components/UI/GoBackButton";

export const dynamic = "force-dynamic";

export default async function CompletedOrder() {

        const orders = await getCompletedOrders()

    return (
        <main className="min-h-screen pt-10">

            <div className="mx-auto mt-8 max-w-4xl px-6 text-center">

                <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold uppercase tracking-widest text-emerald-700">
                    🌮 TacoNext
                </span>

                <h1 className="mt-6 text-5xl font-black tracking-tight text-gray-900">
                    👍 Órdenes listas
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                    Estos pedidos ya están preparados y listos para ser entregados.

                </p>

            </div>

            <GoBackButton/>

            <section className="mx-auto mt-14  px-6">


                        {orders.length ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
                                    {orders.map(order => (
                                        <OrderReady order={order}
                                        key={order.id}
                                        />
                                    ))}
                                </div>
                            ) :
                                <div className="flex flex-col items-center justify-center py-20 text-center">

                        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-5xl">
                            🌮
                        </div>

                        <h2 className="text-3xl font-bold text-gray-800">
                            No hay órdenes listas
                        </h2>

                        <p className="mt-3 max-w-md text-gray-500">
                            Cuando una orden esté preparada aparecerá aquí automáticamente.
                        </p>

                    </div>
}





            </section>

        </main>
    );
}
