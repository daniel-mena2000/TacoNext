import { ProductCard } from "@/components/products/ProductCard";
import Heading from "@/components/UI/Heading";
import Logo from "@/components/UI/Logo";
import { prisma } from "@/src/lib/prisma"
//Que es **where**: Eso es un filtro de Prisma que está buscando productos a través de una **relación**.
//Prisma lo interpreta como: > "Dame todos los productos cuya categoría tenga este slug."
//el category, se lo vamos a pasar en OrderPage con los "params"
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

//params: Son los parametros dinamicos de la ruta, Porque params no contiene la URL completa, sino únicamente los valores de los segmentos dinámicos. No "/order/tacos" si no solo "tacos"
//Porque en Next.js 15 y 16, params en los Server Components ya no se recibe directamente como un objeto en muchos casos asi: ({params}: {params: {category: string}}) , sino como una Promise.
//Este params solo esta disponible en layout.tsx, page.tsx y route.tsx y funcionaes llamadar generateMetadata, si lo queremos en otro componente, que no esta disponible usamos "useParams" de nextNavigation, pero este tiene que se componente de cliente
export default async function OrderPage({ params, }: {
  params: Promise<{ category: string }>
}) {

  const { category } = await params;
  //console.log(category); Ejemplo: tacos
    const products = await getProduct(category)
   // console.log(products);

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
