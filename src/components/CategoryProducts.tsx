"use client";

import { useMemo, useState } from "react";
import { sortProducts } from "@/lib/api";
import { toBanglaDigits } from "@/lib/bangla";
import type { Product, SortKey } from "@/lib/types";
import ProductGrid from "./ProductGrid";
import SortSelect from "./SortSelect";

export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end rounded-2xl border border-line bg-card px-4 py-4">
        <SortSelect value={sort} onChange={setSort} />
      </div>

      <p className="text-sm text-muted">
        মোট {toBanglaDigits(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <ProductGrid products={sorted} />
    </div>
  );
}