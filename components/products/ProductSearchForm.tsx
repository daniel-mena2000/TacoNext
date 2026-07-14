
import { Search } from "lucide-react";

export function ProductSearchForm() {
    return (
        <form className="flex w-full max-w-lg items-center gap-3">
            <div className="relative flex-1">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Buscar producto..."
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-gray-700 shadow-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
            </div>

      <button
    type="submit"
    className="inline-flex h-11 items-center justify-center rounded-lg bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 active:bg-neutral-900 cursor-pointer"
>
    Buscar
</button>
        </form>
    );
}
