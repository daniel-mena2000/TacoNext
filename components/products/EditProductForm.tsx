"use client"

import { createProduct } from "@/actions/create-product-action"
import { ProductSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { redirect } from "next/navigation"
import { updateProduct } from "@/actions/update-product-action"
import { useParams } from "next/navigation"


export default function EditProductForm({children}: {children: React.ReactNode}) {
    const params = useParams()
    const id = Number(params.id)

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
       const response = await updateProduct(result.data, id)


       if (response?.errors) {
             response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return
       }
       toast.success('Producto actualizado Correctamente')
       redirect('/admin/products')
    }
    return (
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl">

            <div className="bg-linear-to-r from-emerald-600 to-emerald-500 px-8 py-6 text-white">
                <h2 className="text-3xl font-black">
                    🌮 Editar información del producto
                </h2>

                <p className="mt-2 text-emerald-100">
                    Realiza los cambios necesarios y guarda la información del producto.
                </p>
            </div>

            <form action={handleSubmit} className="space-y-8 p-8">

                {children}

                <div className="flex justify-end border-t border-gray-100 pt-8">

                    <button
                        type="submit"
                        className="rounded-2xl bg-black px-8 py-4 text-lg font-bold text-white transition hover:bg-emerald-700 active:scale-95 cursor-pointer"
                    >
                        🌮 Guardar cambios
                    </button>

                </div>

            </form>

        </div>
    )
}
