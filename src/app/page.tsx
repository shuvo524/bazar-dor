import { Suspense } from "react";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import { HomeSkeleton } from "@/components/ProductSkeleton";
import { getFallers, getProducts, getRisers } from "@/lib/api";
import { toBanglaDigits } from "@/lib/bangla";

async function HomeSections() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-card p-8 text-center">
        <p className="text-lg font-semibold">দাম লোড করা যায়নি</p>
        <p className="mt-1 text-sm text-muted">
          ইন্টারনেট সংযোগ দেখে একটু পরে পেজটি রিলোড করুন।
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <ProductSection
        title="আজ দাম বেড়েছে"
        marker="up"
        products={getRisers(products, 6)}
      />
      <ProductSection
        title="আজ দাম কমেছে"
        marker="down"
        products={getFallers(products, 6)}
      />
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${toBanglaDigits(products.length)}টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-8">
      <Hero />
      <Suspense fallback={<HomeSkeleton />}>
        <HomeSections />
      </Suspense>
    </div>
  );
}