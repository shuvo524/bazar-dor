import Link from "next/link";
import { getDir } from "@/lib/api";
import { formatNumber, unitLabel } from "@/lib/bangla";
import type { Product } from "@/lib/types";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  const dir = getDir(product);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-line bg-card p-4 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-brand"
    >
      <div className="flex items-center gap-3">
        <span
          className="grid size-12 shrink-0 place-items-center rounded-xl bg-chip text-2xl"
          aria-hidden="true"
        >
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold leading-tight">
            {product.nameBn}
          </h3>
          <p className="text-xs text-muted">{unitLabel(product.unit)}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-ink">আজকের দাম</p>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p>
            <span className="text-xl font-bold">
              {formatNumber(product.today)}
            </span>{" "}
            <span className="text-sm">টাকা</span>
          </p>
          <ChangeBadge dir={dir} pct={Number(product.change?.pct ?? 0)} />
        </div>
      </div>
    </Link>
  );
}