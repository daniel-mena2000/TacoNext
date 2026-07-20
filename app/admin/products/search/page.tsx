import Heading from "@/components/UI/Heading"
import { Funnel } from "lucide-react"
import { prisma } from "@/src/lib/prisma"
import ProductTable from "@/components/products/ProductsTable"
import { ProductSearchForm } from "@/components/products/ProductSearchForm"
import GoBackButton from "@/components/UI/GoBackButton"

async function searchProducts(searchTerm: string) {

        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            },
            include: {
                category: true
            }
        })

        return products
}

export default async function SearchPage({searchParams,}: {searchParams: Promise<{ search?: string }>}) {

    const { search } = await searchParams;
    const products = await searchProducts(search ?? "");

    return(
        <>
        <Heading
            title="Productos filtrados"
            description="Estos son los productos que coinciden con los criterios de búsqueda."
        />

        <GoBackButton/>

<div className="mb-8 flex justify-end">
    <ProductSearchForm />
</div>

        {products.length > 0 ? (
            <>
             <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

    <div className="border-l-4 border-emerald-600 pl-5">
        <p className="text-sm uppercase tracking-widest text-gray-500">
            Búsqueda
        </p>

        <h2 className="mt-1 text-3xl font-extrabold text-gray-900">
            Resultados para{" "}
            <span className="text-emerald-600">
                "{search}"
            </span>
        </h2>
    </div>


</div>

                <ProductTable products={products} />

            </>

        ): (
        <>

            <div className="mt-10 rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-8 py-14 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-3xl">
            🔍
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
            No se encontraron productos
        </h2>

        <p className="mt-2 text-gray-500">
            No hay productos que coincidan con{" "}
            <span className="font-semibold text-emerald-600">
                "{search}"
            </span>.
        </p>

        <p className="mt-1 text-sm text-gray-400">
            Intenta con otro nombre o revisa la ortografía.
        </p>
    </div>
    </>
        )}
        </>
    )
}
