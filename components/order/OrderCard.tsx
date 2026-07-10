import { OrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { completeOrder } from "@/actions/complete-order-action";

type OrderCardProps = {
    order: OrderWithProducts
}




export default function OrderCard({ order }: OrderCardProps) {
    return (
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">


            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                        Pedido
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                        {order.name}
                    </h2>
                </div>

                <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700">
                    Pendiente
                </span>
            </div>


            <div className="mt-6">
                <h3 className="mb-3 text-lg font-bold text-gray-800">
                    🌮 Productos ordenados
                </h3>

                <div className="space-y-3">
                    {
                        order.orderProducts.map(item => (

                    <div key={item.productId} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                        <p className="font-medium text-gray-700">
                            {item.product.name}
                        </p>

                        <span className="rounded-lg bg-emerald-100 px-3 py-1 font-bold text-emerald-700">
                            x{item.quantity}
                        </span>
                    </div>
                        ))
                    }

                </div>
            </div>


            <div className="mt-6 flex items-center justify-between rounded-2xl bg-amber-50 p-4">
                <span className="text-lg font-semibold text-gray-700">
                    Total
                </span>

                <span className="text-3xl font-extrabold text-amber-500">
                    {formatCurrency(order.total)}
                </span>
            </div>


            <form action={completeOrder}  className="mt-6">

                <input type="hidden" name="order_id" value={order.id}/>
                
                <button
                    type="submit"
                    className="w-full rounded-2xl bg-emerald-600 py-4 text-lg font-bold text-white shadow-md transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg active:scale-95"
                >
                    ✅ Marcar como completada
                </button>
            </form>

        </section>
    );
}
