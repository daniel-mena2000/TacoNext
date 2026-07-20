"use client"
import { SearchSchema } from "@/src/schema";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";


export function ProductSearchForm() {


//Recordar que formData son los datos del formulario - <form action={handleSearchForm}> y se pasan automaticamente
    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }
        const result = SearchSchema.safeParse(data)
        console.log(result);
//if por si la busqueda se envia vacia
        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
//Si el usuario escribio "tacos" lo redireccionamos a: http://localhost:3000/admin/products/search?search=tacos -> si observamos la URL tiene "search" esta page es necesario crearla para poder redigir ahi al usuario para los productos encontrados
//Una vez capturado, necesitamos capturar ese valor de la URL y hacer una consulta a prisma, y filtrar los productos
        redirect(`/admin/products/search?search=${result.data.search}`)

    }

    return (
        <form action={handleSearchForm} className="flex w-full max-w-lg items-center gap-3">
            <div className="relative flex-1">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    name="search"
                    type="text"
                    placeholder="Buscar producto..."
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-gray-700 shadow-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
            </div>

      <button
    type="submit"
    className="inline-flex h-11 items-center justify-center rounded-lg bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 active:bg-neutral-900 cursor-pointer"
>
    Buscar
</button>
        </form>
    );
}
