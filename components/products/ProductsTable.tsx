import { ProductsWhiteCategory } from "@/app/admin/products/page";
import { formatCurrency } from "@/src/utils"
import { SquarePen } from "lucide-react";
import Link from "next/link"


type ProductTableProps = {
products: ProductsWhiteCategory
}

export default function ProductTable({ products }: ProductTableProps) {
    return (
        <div className="mt-12 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">

            <table className="min-w-full">

                <thead className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white">
                    <tr>
                        <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">
                            Producto
                        </th>

                        <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">
                            Precio
                        </th>

                        <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">
                            Categoría
                        </th>

                        <th className="px-6 py-5 text-right text-sm font-semibold uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">

                    {products.map(product => (

                        <tr
                            key={product.id}
                            className="transition-colors hover:bg-emerald-50"
                        >

                            <td className="px-6 py-5">
                                <p className="font-bold text-gray-800">
                                    {product.name}
                                </p>
                            </td>

                            <td className="px-6 py-5">
                                <span className="rounded-full bg-amber-100 px-4 py-2 font-bold text-amber-700">
                                    {formatCurrency(product.price)}
                                </span>
                            </td>

                            <td className="px-6 py-5">
                                <span className="rounded-full bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
                                    {product.category.name}
                                </span>
                            </td>

                            <td className="px-6 py-5 text-right">

                            <Link
                                 href={`/admin/products/${product.id}/edit`}
                                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 font-semibold text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-md"
                                >
                                <SquarePen size={18} />
                                Editar
                                </Link>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}
