import { ProductsPaginations } from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import { redirect } from "next/navigation";
import Heading from "@/components/UI/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ProductSearchForm } from "@/components/products/ProductSearchForm";

//Funcion para calcular los productos y en base a eso hacer un limite paginacion
//usamos el metodo "count" de prisma
async function productCount() {
    return await prisma.product.count()
}

//Función para traernos los productos
async function getProducts(currentPage: number, pageSize: number) {
//Incluiremos category ya que esta no viene como tal en el modelo de Product si no de la relacion, y prisma nos permite incluir campos de estas relaciones, en este caso necesitamos el nombre de la categoria en ProductsTable, el tipo se puede sacar de: "products" o podemos usar Awaited de TS para que nos diga que tipo es y de ahi pasarlo a ProductsTable
    const skip = (currentPage - 1) * pageSize // Salto de paginas

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
//TypeScript. Lo que hace es obtener automáticamente el tipo que devuelve una función, sin que tengas que escribirlo manualmente.
export type ProductsWhiteCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({searchParams}: {searchParams: Promise<{page?: string}>}) {
    const {page} = await searchParams; //ej./admin/products?page=5 entonces page = 5

//Así, si no existe page, siempre empiezas en la página 1.
    const currentPage = Number(page) || 1; //Lo convertimos a numero

//"Quiero mostrar 10 productos por página."
    const pageSize = 10
//Antes de hacer la llamada a la DB y entren a los await, podemos validar que igual la paginacion no sea menor a 0
     if (currentPage < 0) redirect('/admin/products')


    const productsData =  getProducts(currentPage, pageSize)
    //console.log(products);
    const totalProductsData =  productCount()
//Esto para que las consultas sean paralelas, es decir empiecen al mismo tiempo, y que no espere una  hasta que finalice la otra para realizarse, esto se puede hacer ya que estas consultas no dependen una de la otra.
    const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
    const totalPages = Math.ceil(totalProducts / pageSize)

//Si el usuario por alguna razon se pasa el limite paginas, por ejemplo que ponga la pagina manual desde la URL, lo redireccionaremos
 if (currentPage > totalPages) redirect('/admin/products')


    return(
        <>


        <Heading
        title="Administrar Productos"
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
