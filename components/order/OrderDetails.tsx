import {XCircleIcon, PlusIcon, MinusIcon} from "@heroicons/react/24/outline"
import { OrderItem } from "@/src/types"
import { formatCurrency } from "@/src/utils";
import { useStore } from "@/src/store"
import { useMemo } from "react";

type OrderDetailsProps = {
    item: OrderItem
}

const MAX_ITEMS = 5
export function OrderDetails({item}: OrderDetailsProps) {
        const increaseQuantity = useStore((state) => state.increaseQuantity)
        const decreaseQuantity = useStore((state) => state.decreaseQuantity)
        const removeItem = useStore((state) => state.removeItem)


        const disabledDecreaseButton = useMemo(() => item.quantity === 1, [item])
        const disabledIncreaseButton = useMemo(() => item.quantity === MAX_ITEMS, [item])


    return(
        <>
<div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
  <div className="flex justify-between items-start mb-4">
    <div>
      <h3 className="text-xl font-bold text-gray-800">
        {item.name}
      </h3>

      <p className="text-2xl font-extrabold text-amber-500 mt-2">
        {formatCurrency(item.price)}
      </p>
    </div>

    <button
      type="button"
      onClick={() => removeItem(item.id)}
      className="text-red-500 hover:text-red-600 transition-colors"
    >
      <XCircleIcon className="h-8 w-8" />
    </button>
  </div>

  <div className="flex items-center justify-between">
    <div className="flex items-center gap-6 bg-gray-100 rounded-full px-4 py-2">
      <button
        type="button"
        onClick={() => decreaseQuantity(item.id)}
        className="bg-white rounded-full p-1 shadow hover:bg-gray-50 transition
        disabled:opacity-20
        "
        disabled={disabledDecreaseButton}
      >
        <MinusIcon className="h-5 w-5 text-gray-700" />
      </button>

      <span className="text-xl font-bold text-gray-800 min-w-6 text-center">
        {item.quantity}
      </span>

       <button
        type="button"
        onClick={() => increaseQuantity(item.id)}
        className="bg-amber-500 rounded-full p-1 shadow hover:bg-amber-600 transition
        disabled:opacity-20
        "
        disabled={disabledIncreaseButton}
      >
        <PlusIcon className="h-5 w-5 text-white" />
      </button>

    </div>

    <div className="text-right">
      <p className="text-sm text-gray-500">
        Subtotal
      </p>

      <p className="text-2xl font-extrabold text-gray-800">
        {formatCurrency(item.subtotal)}
      </p>
    </div>
  </div>
</div>
        </>
    )
}
