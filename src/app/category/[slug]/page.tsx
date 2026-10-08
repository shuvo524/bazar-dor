import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import EmptyState from "@/components/EmptyState";
import { getCategory, getProducts } from "@/lib/api";
import { toBanglaDigits } from "@/lib/bangla";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);
  return { title: category ? category.nameBn : "ক্যাটাগরি পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  // ভুল slug হলে 404 পেজ দেখাবে
  if (!category) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
      <header className="flex items-center gap-4 rounded-2xl border border-line bg-card p-5">
        <span className="text-4xl" aria-hidden="true">
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-muted">
            {toBanglaDigits(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </header>

      {products.length === 0 ? (
        <EmptyState
          emoji={category.icon}
          title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
          message="এই মুহূর্তে এখানে দেখানোর মতো কোনো পণ্য পাওয়া যায়নি। অন্য ক্যাটাগরি দেখুন।"
        />
      ) : (
        <CategoryProducts products={products} />
      )}
    </div>
  );
}