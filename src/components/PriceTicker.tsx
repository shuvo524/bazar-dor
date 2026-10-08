import { getDir, getProducts } from "@/lib/api";
import { formatNumber, formatPct, shortUnit } from "@/lib/bangla";
import type { Product } from "@/lib/types";

function TickerItem({ p }: { p: Product }) {
  const dir = getDir(p);

  return (
    <div className="flex shrink-0 items-center gap-2 border-r border-line px-5 py-2.5 text-sm whitespace-nowrap">
      <span aria-hidden="true">{p.image}</span>
      <span className="font-medium">{p.nameBn}</span>
      <span className="text-muted">
        {formatNumber(p.today)} টাকা/{shortUnit(p.unit)}
      </span>
      {dir === "up" && (
        <span className="font-semibold text-up">
          ▲ {formatPct(p.change.pct)}%
        </span>
      )}
      {dir === "down" && (
        <span className="font-semibold text-down">
          ▼ {formatPct(p.change.pct)}%
        </span>
      )}
      {dir === "flat" && (
        <span className="font-semibold text-muted">— ০.০%</span>
      )}
    </div>
  );
}

export default async function PriceTicker() {
  const products = await getProducts();

  if (products.length === 0) return null;

  return (
    <div
      className="overflow-hidden border-b border-line bg-card"
      aria-label="আজকের দামের তালিকা"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {products.map((p) => (
          <TickerItem key={`a-${p.id}`} p={p} />
        ))}
        {/* দ্বিতীয় কপি: স্ক্রল যেন থামে না */}
        {products.map((p) => (
          <div key={`b-${p.id}`} aria-hidden="true">
            <TickerItem p={p} />
          </div>
        ))}
      </div>
    </div>
  );
}