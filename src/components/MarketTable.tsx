import { formatPrice } from "@/lib/bangla";
import type { Market } from "@/lib/types";

export default function MarketTable({ markets }: { markets: Market[] }) {
  const rows = markets
    .map((m) => ({ ...m, avg: (Number(m.min) + Number(m.max)) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-140 text-sm">
        <thead>
          <tr className="text-muted">
            <th className="px-4 py-3 text-left font-semibold">বাজার</th>
            <th className="px-4 py-3 text-left font-semibold">বিভাগ</th>
            <th className="px-4 py-3 text-right font-semibold">সর্বনিম্ন</th>
            <th className="px-4 py-3 text-right font-semibold">সর্বাধিক</th>
            <th className="px-4 py-3 text-right font-semibold">গড়</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr
              key={`${m.market}-${m.division}`}
              className="border-t border-line even:bg-chip"
            >
              <td className="px-4 py-3">{m.market}</td>
              <td className="px-4 py-3">{m.division}</td>
              <td className="px-4 py-3 text-right">{formatPrice(m.min)}</td>
              <td className="px-4 py-3 text-right">{formatPrice(m.max)}</td>
              <td className="px-4 py-3 text-right font-semibold">
                {formatPrice(m.avg)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}