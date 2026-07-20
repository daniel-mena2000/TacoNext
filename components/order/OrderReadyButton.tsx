"use client";

import { Utensils } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderReadyButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push("/admin/orders/completed")}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-emerald-500 hover:bg-emerald-50"
        >
            <Utensils size={18} />
            Ver órdenes listas
        </button>
    );
}
