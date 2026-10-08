"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export default function CategoryNav({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="ক্যাটাগরি">
      <ul className="no-scrollbar flex gap-1 overflow-x-auto">
        {categories.map((c) => {
          const href = `/category/${c.slug}`;
          const active = pathname === href;

          return (
            <li key={c.id} className="shrink-0">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 border-b-2 px-3 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                  active
                    ? "border-brand text-brand"
                    : "border-transparent text-ink hover:text-brand"
                }`}
              >
                <span aria-hidden="true">{c.icon}</span>
                {c.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}