"use client"

import { useStore } from "@/src/store"
import { OrderDetails } from "./OrderDetails"
import { useMemo } from "react"
import { toast } from "react-toastify"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { ShoppingCart } from "lucide-react"
export function OrderSumary() {

    const order = useStore((state) => state.order)
    const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price),0), [order])
    const clearOrder = useStore((state) => state.clearOrder)


    const handleCreateOrder = async (formData: FormData) => {

        const data = {
            name: formData.get('name'),
            total: total,
            order: order
        }
        const result = OrderSchema.safeParse(data)

        if (!result.success) {
            result.error.issues.forEach(item => {
                toast.error(item.message)
            })
            return
        }
        const response = await createOrder(data)
        if (response?.errors) {
              response.errors.forEach(item => {
                toast.error(item.message)
            })
        }

        toast.success('Pedido realizado Correctamente')
        clearOrder()
    }

    return(
        <>
            <aside className="md:h-screen md:overflow-y-scroll md:w-64 lg:w-96 p-5">

                <div className="flex justify-center items-center">
                    <ShoppingCart width={60}/>
                <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
                </div>


                {order.length === 0 ? <p className="text-center my-10">Tu orden esta vacia</p> : (
                    <div className="mt-5">
                        {order.map(item =>(
                            <OrderDetails key={item.id} item={item}/>
                        ) )}

                    <div className="my-8 rounded-3xl bg-linear-to-r from-amber-500 to-amber-600 p-8 text-center shadow-lg">
                        <p className="text-lg uppercase tracking-wider text-amber-100">
                            Total a pagar
                        </p>

                        <p className="mt-2 text-5xl font-extrabold text-white">
                        {formatCurrency(total)}
                        </p>

                        <p className="mt-3 text-sm text-amber-100">
                            🌮 ¡Tu pedido está casi listo!
                        </p>
                    </div>
            <form action={handleCreateOrder}>

        <div className="py-4">
        <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-gray-700"
        >
            Nombre del cliente
        </label>

        <input
            id="name"
            name="name"
            type="text"
            placeholder="Ej. Daniel"
            className=" w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 text-lg text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        />
    </div>


            <button
                type="submit"
                    className="group w-full overflow-hidden rounded-2xl bg-black py-4 text-lg font-bold text-white transition-all hover:bg-neutral-900 cursor-pointer"
                    >
                <span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                    🌮 Confirmar pedido →
                </span>
            </button>
            </form>
                    </div>
                ) }
            </aside>
        </>
    )
}
