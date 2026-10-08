import Link from "next/link";
import { notFound } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import MarketTable from "@/components/MarketTable";
import { getDir, getProductBySlug } from "@/lib/api";
import { formatNumber, formatPrice, shortUnit, unitLabel } from "@/lib/bangla";
import { requireSession } from "@/lib/session";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? product.nameBn : "পণ্য পাওয়া যায়নি" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  // লগইন না থাকলে সাইন ইন পেজে পাঠাবে
  await requireSession(`/product/${slug}`);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const dir = getDir(product);
  const diff = Math.abs(Number(product.today) - Number(product.yesterday));
  const markets = product.markets ?? [];

  const min = markets.length
    ? Math.min(...markets.map((m) => Number(m.min)))
    : product.today;
  const max = markets.length
    ? Math.max(...markets.map((m) => Number(m.max)))
    : product.today;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
      {/* breadcrumb */}
      <nav aria-label="breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-brand">
              হোম
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link
              href={`/category/${product.category}`}
              className="hover:text-brand"
            >
              {product.categoryNameBn}
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-ink">{product.nameBn}</li>
        </ol>
      </nav>

      {/* সারাংশ */}
      <section className="flex flex-col gap-5 rounded-2xl border border-line bg-card p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <span
            className="grid size-20 shrink-0 place-items-center rounded-2xl bg-chip text-5xl"
            aria-hidden="true"
          >
            {product.image}
          </span>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              {product.nameBn}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {unitLabel(product.unit)} ·{" "}
              <Link
                href={`/category/${product.category}`}
                className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-semibold text-brand"
              >
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
            </p>
            <p className="mt-2 text-sm">
              {dir === "flat" ? (
                "গতকালের তুলনায় আজ দাম অপরিবর্তিত"
              ) : (
                <>
                  গতকালের তুলনায় আজ দাম{" "}
                  <strong>{dir === "up" ? "বেড়েছে" : "কমেছে"}</strong> ·{" "}
                  {formatNumber(diff)} টাকা
                </>
              )}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-chip px-8 py-4 text-center">
          <p className="text-sm text-muted">আজকের দাম</p>
          <p className="text-4xl font-bold">{formatNumber(product.today)}</p>
          <p className="text-sm text-muted">
            টাকা / {shortUnit(product.unit)}
          </p>
          <div className="mt-2">
            <ChangeBadge dir={dir} pct={Number(product.change?.pct ?? 0)} />
          </div>
        </div>
      </section>

      {/* দামের সারসংক্ষেপ */}
      <section className="rounded-2xl border border-line bg-card p-5">
        <h2 className="text-lg font-bold">দামের সারসংক্ষেপ</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-line p-4">
            <p className="text-xs text-muted">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-2xl font-bold text-down">
              {formatNumber(min)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-muted">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="rounded-xl border border-line p-4">
            <p className="text-xs text-muted">সর্বাধিক দাম</p>
            <p className="mt-1 text-2xl font-bold text-up">
              {formatNumber(max)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-muted">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="rounded-xl border border-line p-4">
            <p className="text-xs text-muted">গড় দাম</p>
            <p className="mt-1 text-2xl font-bold text-brand">
              {formatNumber(product.today)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-muted">
              প্রতি {shortUnit(product.unit)}-এর হিসাবে
            </p>
          </div>
        </div>

        {/* বাজারভিত্তিক দাম */}
        <h2 className="mb-3 mt-8 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        {markets.length > 0 ? (
          <MarketTable markets={markets} />
        ) : (
          <p className="rounded-xl bg-chip p-4 text-sm text-muted">
            এই পণ্যের বাজারভিত্তিক দামের তথ্য এখন পাওয়া যায়নি।
          </p>
        )}
      </section>
    </div>
  );
}