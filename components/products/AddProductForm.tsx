"use client"

import { createProduct } from "@/actions/create-product-action"
import { ProductSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { redirect } from "next/navigation"



//Aqui tendremos el form que maneja la logica de agregar el producto y tendremos otro muy similar para editar el producto, pero el formulario va a ser el mismo.
//Aplicaramos OCP: porque el componente puede extender su comportamiento mediante props sin cambiar su implementación

//Children para que acepte ya sea componente de cliente o de servidor, recordar que componentes de cliente no pueden renderizar componentes de servidor directamente como "ProductForm" asi que lo tratamos como un children
//La idea de que este componente sea de cliente es que queremos los toast para mesajes
export default function AddProductForm({children}: {children: React.ReactNode}) {


    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }

        const result = ProductSchema.safeParse(data)
       if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
       }
//Si se pasa la validacion mandamos llamar nuestra accion para subirlo a la DB de prisma
       const response = await createProduct(result.data)
       if (response?.errors) {
             response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return
       }
       toast.success('Producto agregado Correctamente')
       redirect('/admin/products')
    }
    return (
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl">

            <div className="bg-linear-to-r from-emerald-600 to-emerald-500 px-8 py-6 text-white">
                <h2 className="text-3xl font-black">
                    🌮 Información del producto
                </h2>

                <p className="mt-2 text-emerald-100">
                    Completa los datos para agregar un nuevo producto al menú.
                </p>
            </div>

            <form action={handleSubmit} className="space-y-8 p-8">

                {children}

                <div className="flex justify-end border-t border-gray-100 pt-8">

                    <button
                        type="submit"
                        className="rounded-2xl bg-black px-8 py-4 text-lg font-bold text-white transition hover:bg-emerald-700 active:scale-95 cursor-pointer"
                    >
                        🌮 Crear producto
                    </button>

                </div>

            </form>

        </div>
    )
}
