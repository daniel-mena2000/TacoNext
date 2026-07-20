import { ProductsPaginations } from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import { redirect } from "next/navigation";
import Heading from "@/components/UI/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ProductSearchForm } from "@/components/products/ProductSearchForm";


async function productCount() {
    return await prisma.product.count()
}

//Función para traernos los productos
async function getProducts(currentPage: number, pageSize: number) {

    const skip = (currentPage - 1) * pageSize

//take: cuantos registros queremos traernos
//skip: indica cuantos saltarse, ej.10 pues se saltara los primeros 10
    const products = await prisma.product.findMany({
        take: pageSize,
        skip: skip,
        include: {
            category: true
        }
    })

    return products
}

export type ProductsWhiteCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({searchParams}: {searchParams: Promise<{page?: string}>}) {
    const {page} = await searchParams; //ej./admin/products?page=5 entonces page = 5

//Así, si no existe page, siempre empiezas en la página 1.
    const currentPage = Number(page) || 1;


    const pageSize = 10
     if (currentPage < 0) redirect('/admin/products')


    const productsData =  getProducts(currentPage, pageSize)

    const totalProductsData =  productCount()

    const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
    const totalPages = Math.ceil(totalProducts / pageSize)


 if (currentPage > totalPages) redirect('/admin/products')


    return(
        <>


        <Heading
        title="🍽️ Panel de administración"
            description="Administra los productos del menú creando nuevos registros, editando información y realizando búsquedas de forma rápida."

        />

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-6 py-3 font-semibold text-emerald-700 shadow-sm transition-all hover:border-emerald-500 hover:bg-emerald-50"
            >
                <Plus size={18} />
                Nuevo producto
            </Link>

            <ProductSearchForm />


        </div>


        <ProductTable products={products} />

        <ProductsPaginations page={currentPage} totalPages={totalPages}/>

        </>
    )
}
