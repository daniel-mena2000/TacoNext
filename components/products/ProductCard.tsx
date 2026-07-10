import { Product } from "@/src/generated/prisma/client"
import { formatCurrency } from "@/src/utils"
import Image from "next/image"
import { AddProductButton } from "./AddProductButton"

type ProductCardProps = {
    item: Product
}

export function ProductCard({item}: ProductCardProps) {
    return(
       <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">

    <div className="relative overflow-hidden">
        <Image
            src={`/products/${item.image}.jpg`}
            alt={`Imagen de ${item.name}`}
            width={400}
            height={500}
            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
        />
    </div>

    <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 min-h-14">
            {item.name}
        </h3>

        <p className="mt-4 text-3xl font-extrabold text-amber-500">
            {formatCurrency(item.price)}
        </p>

       <AddProductButton product={item}/>
    </div>

</div>
    )
}
