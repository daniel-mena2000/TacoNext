"use client"
import { ArrowBigLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function GoBackButton() {
    const router = useRouter()

    const handleBack = () => {
    if (window.history.length > 1) {
        router.back();
    } else {
        router.push("/admin/products");
    }
};
    return(
        <>
                <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-6 py-3 font-semibold text-emerald-700 shadow-sm transition-all hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer">
                    <ArrowBigLeft size={18} />
                            Regresar
                </button>
        </>
    )
}
