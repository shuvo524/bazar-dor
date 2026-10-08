import { formatPct } from "@/lib/bangla";
import type { ChangeDir } from "@/lib/types";

export default function ChangeBadge({
  dir,
  pct,
}: {
  dir: ChangeDir;
  pct: number;
}) {
  const base =
    "inline-flex items-center gap-1 rounded-full bg-chip px-2.5 py-1 text-xs font-semibold";

  if (dir === "up") {
    return (
      <span className={`${base} text-up`}>
        <span aria-hidden="true">▲</span>
        {formatPct(pct)}%
      </span>
    );
  }

  if (dir === "down") {
    return (
      <span className={`${base} text-down`}>
        <span aria-hidden="true">▼</span>
        {formatPct(pct)}%
      </span>
    );
  }

  return (
    <span className={`${base} text-ink`}>
      <span aria-hidden="true">—</span>
      {formatPct(0)}%
    </span>
  );
}