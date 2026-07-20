"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function RefreshOrdersButton() {
      const router = useRouter();
    const [isPending, startTransition] = useTransition();

    return (
         <button
            type="button"
            onClick={() =>
                startTransition(() => {
                    router.refresh();
                })
            }
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-emerald-500 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
            <RefreshCw
                size={18}
                className={isPending ? "animate-spin" : ""}
            />

            {isPending ? "Actualizando..." : "Actualizar pedidos"}
        </button>
    );
}
