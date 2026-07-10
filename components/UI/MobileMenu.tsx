"use client";

import { useState } from "react";
import { Category } from "@/src/generated/prisma/client";
import { CategoryIcon } from "./CategoryIcon";

type MobileMenuProps = {
  categories: Category[];
};

export function MobileMenu({ categories }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-emerald-600 text-white p-4 font-bold"
      >
        ☰ Categorías
      </button>

      {open && (
        <nav className="bg-emerald-600">
          {categories.map((item) => (
            <CategoryIcon
              key={item.id}
              item={item}
            />
          ))}
        </nav>
      )}
    </div>
  );
}
