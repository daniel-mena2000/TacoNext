"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"; //Para resaltar donde nos encontramos

type AdminRouteProps = {
    link : {url: string;
    text: string;
    blank: boolean;
    }
}

//target={link.blank ? '_blank': ''}: Si link.blank esta como true que en este caso en AdminSideBar lo hemos puesto como true, para que esta ruta se abra en una pestaña diferente

export default function AdminRoute({ link }: AdminRouteProps) {
    const pathname = usePathname()
    const active = pathname === link.url;
        return (
        <Link
            href={link.url}
            target={link.blank ? '_blank': ''}
            className={` ${active  ? "bg-emerald-600 text-white shadow-lg hover:bg-emerald-600 hover:text-white": ""}
                flex items-center
                rounded-xl
                px-5
                py-4
                text-lg
                font-semibold
                text-gray-700
                transition-all
                duration-200
                hover:bg-amber-100
                hover:text-emerald-700
                hover:translate-x-1
            `}
        >
            {link.text}
        </Link>
    );
}
