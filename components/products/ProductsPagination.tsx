import Link from "next/link"
import { SkipForward, SkipBack } from "lucide-react";

type ProductsPaginationsProps = {
    page: number
    totalPages: number
}

export function ProductsPaginations({page, totalPages}: ProductsPaginationsProps) {
//Sacando numero total de paginas en un array
    const pages = Array.from({length: totalPages}, (_, i)=> i + 1)

    return(
        <>
          <nav className="mt-12 flex items-center justify-center gap-3">

    {/* Página anterior */}
    {page > 1 && (
        <Link href={`/admin/products?page=${page - 1}`}>
            <button className="group flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50">
                <SkipBack
                    size={18}
                    className="text-gray-600 transition group-hover:-translate-x-0.5 group-hover:text-emerald-600"
                />
            </button>
        </Link>
    )}

    {/* Números */}
    <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">

        {pages.map(number => (

            <Link
                key={number}
                href={`/admin/products?page=${number}`}
                className={`
                    flex h-11 w-11 items-center justify-center rounded-xl
                    text-sm font-bold transition-all duration-300
                    ${
                        page === number
                            ? "bg-emerald-600 text-white shadow-md"
                            : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                    }
                `}
            >
                {number}
            </Link>

        ))}

    </div>

    {/* Página siguiente */}
    {page < totalPages && (
        <Link href={`/admin/products?page=${page + 1}`}>
            <button className="group flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50">
                <SkipForward
                    size={18}
                    className="text-gray-600 transition group-hover:translate-x-0.5 group-hover:text-emerald-600"
                />
            </button>
        </Link>
    )}

</nav>
        </>
    )
}
