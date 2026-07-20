"use client"
import { Product } from "@/src/generated/prisma/client"
import { useStore } from "@/src/store"

type AddProductButtonProps = {
    product: Product
}

export function AddProductButton({product}: AddProductButtonProps) {

    const addToOrder = useStore((state) => state.addToOrder)



    return(
        <>
             <button
            type="button"
            className="w-full mt-5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all duration-200 text-white font-bold uppercase py-3 rounded-xl cursor-pointer"

            onClick={() => addToOrder(product)}

        >
            Agregar al pedido
        </button>
        </>
    )
}
