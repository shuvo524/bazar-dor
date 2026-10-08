export function ProductCardSkeleton() {
  return (
    <div
      className="rounded-2xl border border-line bg-card p-4"
      aria-hidden="true"
    >
      <div className="flex animate-pulse items-center gap-3">
        <div className="size-12 rounded-xl bg-line" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 rounded bg-line" />
          <div className="h-3 w-1/3 rounded bg-line" />
        </div>
      </div>
      <div className="mt-4 animate-pulse space-y-2">
        <div className="h-3 w-16 rounded bg-line" />
        <div className="flex items-center justify-between">
          <div className="h-6 w-24 rounded bg-line" />
          <div className="h-6 w-14 rounded-full bg-line" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="লোড হচ্ছে"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

function SectionTitleSkeleton() {
  return <div className="mb-4 h-7 w-44 animate-pulse rounded bg-line" />;
}

export function HomeSkeleton() {
  return (
    <div className="space-y-10">
      <section>
        <SectionTitleSkeleton />
        <ProductGridSkeleton count={6} />
      </section>
      <section>
        <SectionTitleSkeleton />
        <ProductGridSkeleton count={6} />
      </section>
      <section>
        <SectionTitleSkeleton />
        <ProductGridSkeleton count={9} />
      </section>
    </div>
  );
}