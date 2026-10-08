import type { Product } from "@/lib/types";
import ProductGrid from "./ProductGrid";

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  marker?: "up" | "down";
  products: Product[];
};

export default function ProductSection({
  id,
  title,
  subtitle,
  marker,
  products,
}: Props) {
  return (
    <section id={id} className="scroll-mt-40">
      <div className="mb-4">
        <h2 className="flex items-center gap-2 text-xl font-bold md:text-2xl">
          {marker === "up" && (
            <span className="text-up" aria-hidden="true">
              ▲
            </span>
          )}
          {marker === "down" && (
            <span className="text-down" aria-hidden="true">
              ▼
            </span>
          )}
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>

      <ProductGrid products={products} />
    </section>
  );
}