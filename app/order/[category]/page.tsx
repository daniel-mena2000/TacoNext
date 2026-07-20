import { ProductCard } from "@/components/products/ProductCard";
import Heading from "@/components/UI/Heading";
import Logo from "@/components/UI/Logo";
import { prisma } from "@/src/lib/prisma"

async function getProduct(category: string) {
    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: category
            }
        }
    })

    return products
}


export default async function OrderPage({ params, }: {
  params: Promise<{ category: string }>
}) {

  const { category } = await params;
 
    const products = await getProduct(category)


  return (
    <>

<div className="mb-10">

   <Logo/>


    <Heading
        title="🌮 Arma tu pedido perfecto"
        description="Elige tus tacos, bebidas y complementos favoritos."
    />


</div>
     <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">

        {products.map(item => (
            <ProductCard key={item.id}
            item={item}
            />
        ))}
    </div>
    </>
  );
}
