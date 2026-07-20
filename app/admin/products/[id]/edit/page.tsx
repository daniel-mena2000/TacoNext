import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation";
import Heading from "@/components/UI/Heading";
import ProductForm from "@/components/products/ProductForm";
import EditProductForm from "@/components/products/EditProductForm";
import GoBackButton from "@/components/UI/GoBackButton";


//Mandamos llamar la DB para buscar por el id el producto a editar
async function getProductById(id: number) {
//findUnique: Se trae el primer registro que cumpla con la condicion
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
//Si no existe el id del producto redireccionamos al compoente NotFound
    if (!product) {
        notFound()
    }

    return product
}

//params: ej. 4
export default async function EditProductsPage({params}: {params: Promise<{ id: string }>}) {

    const { id } = await params;
    const product = await getProductById(Number(id));


    return(
        <>
<Heading
  title={`Editar producto: ${product.name}`}
  description="Actualiza el nombre, precio, categoría e imagen del producto."
/>

        <GoBackButton/>

        <EditProductForm>
            <ProductForm product={product} />
        </EditProductForm>

        </>
    )
}
