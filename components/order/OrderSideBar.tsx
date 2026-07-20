import { prisma } from "@/src/lib/prisma";
import { CategoryIcon } from "../UI/CategoryIcon";
import { MobileMenu } from "../UI/MobileMenu";

//findMany() sirve para obtener varios registros de una tabla.
async function getCategories() {
    return await prisma.category.findMany()
}

export async function OrderSiderBar() {

    const categories = await getCategories()

    return(
        <>
            <MobileMenu categories={categories} />

           <aside className="hidden md:flex md:w-80 flex-col  border-r border-gray-200">
    <div className="p-6 text-center bg-linear-to-r from-amber-500 to-amber-600 ">
        <h2 className="text-2xl font-bold text-gray-800">
            🌮 Menú
        </h2>

        <p className="text-white">
            Elige una categoría
        </p>
    </div>

    <nav className="flex-1 px-4 space-y-3 overflow-y-auto py-2">
        {categories.map(item => (
            <CategoryIcon
                key={item.id}
                item={item}
            />
        ))}
    </nav>
</aside>
        </>
    )
}
