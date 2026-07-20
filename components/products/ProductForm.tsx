import { prisma } from "@/src/lib/prisma"
import ImageUpload from "./ImageUpload"
import { Product } from "@/src/generated/prisma/client"

type ProductFormProps = {
    product?: Product
}


async function getCategories() {
    return await prisma.category.findMany()
}

//Como este ProductForm lo vamos a reutilizar para agregar y editar un producto, editar necesita que le pasemos un producto, pero agregar NO, es por eso que "product" es opcional.
//Y en los inputs le pasamos ese product como valor por defecto: defaultValue={product?.name}, No aparecera en el de agregar ya que ese no esta aceptando product, solo lo necesitamos para el formulario de editar y que los valores del producto a editar se pasen en automatico

export default async function ProductForm({product}: ProductFormProps) {

    const categories = await getCategories()
    //console.log(categories);


    return (
        <div className="space-y-7">
            <div>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold uppercase tracking-wider text-gray-600"
                >
                    Nombre
                </label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ej. Taco al Pastor"
                    className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-5 py-4 text-lg outline-none transition focus:border-emerald-500 focus:bg-white"
                    defaultValue={product?.name}
                />

            </div>


            <div>
                <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-bold uppercase tracking-wider text-gray-600"
                >
                    Precio
                </label>

                <div className="relative">

                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-emerald-600">
                        $
                    </span>

                    <input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="0.00"
                        className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 py-4 pr-5 pl-10 text-lg outline-none transition focus:border-emerald-500 focus:bg-white"
                        defaultValue={product?.price}
                    />
                </div>
            </div>


            <div>
                <label
                    htmlFor="categoryId"
                    className="mb-2 block text-sm font-bold uppercase tracking-wider text-gray-600"
                >
                    Categoría
                </label>

                <select
                    id="categoryId"
                    name="categoryId"
                    className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-5 py-4 text-lg outline-none transition focus:border-emerald-500 focus:bg-white"
                    defaultValue={product?.categoryId}
                >
                    <option>
                        -- 🌮 Selecciona una categoría --
                    </option>

                    {categories.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

            </div>

            <ImageUpload image={product?.image} />

        </div>

    )
}
