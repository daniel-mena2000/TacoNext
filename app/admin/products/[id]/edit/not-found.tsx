import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl">🌮</h1>

      <h1 className="text-8xl font-black text-amber-500">404</h1>

      <h2 className="mt-4 text-3xl font-bold text-gray-800">
        Producto no encontrado
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        El producto que intentas editar no existe o fue eliminado de la base de
        datos.
      </p>

      <Link
        href="/admin/products"
        className="mt-8 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-600"
      >
        ← Volver a Productos
      </Link>
    </div>
  );
}
