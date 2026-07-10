"use client"
import { Category } from "@/src/generated/prisma/client"
import Image from "next/image" //Next tiene una propiedad para renderizar las imagenes
//Algo bueno de prisma es que te trae los tipos de TS ya sincronizados con tu schema de tu modelo
import Link from "next/link"
import { useParams } from "next/navigation"


type CategoryIconsProps = {
    item: Category
}

//Link se usa para el router

export function CategoryIcon({item}: CategoryIconsProps) {
//useParams para saber en que categoria nos encontramos y en este caso colocar estilos, este solo funciona si el componente es de tipo cliente "use client"
    const params = useParams()
    return(
        <div className={`${item.slug === params.category ? 'bg-linear-to-r from-amber-500 to-amber-100' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-2 rounded-2xl`}>

            <Link
    href={`/order/${item.slug}`}
    className={`
        flex items-center gap-4 rounded-2xl p-4 transition-all
        ${
            item.slug === params.category
                ? "bg-emerald-600 text-white shadow-lg scale-[1.02]"
                : "bg-gray-50 hover:bg-emerald-50"
        }
    `}
>
    <div className="relative size-16 shrink-0">
        <Image
            src={`/${item.slug}.png`}
            alt={item.name}
            fill
            sizes="64px"
            className="object-contain"
        />
    </div>

    <div>
        <h3 className="font-bold text-lg">
            {item.name}
        </h3>

        <p className="text-sm opacity-70">
            Ver productos →
        </p>
    </div>
</Link>
        </div>
    )
}
