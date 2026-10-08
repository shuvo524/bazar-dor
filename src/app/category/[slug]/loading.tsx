import { ProductGridSkeleton } from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
      <div className="flex animate-pulse items-center gap-4 rounded-2xl border border-line bg-card p-5">
        <div className="size-12 rounded-full bg-line" />
        <div className="space-y-2">
          <div className="h-6 w-32 rounded bg-line" />
          <div className="h-3 w-48 rounded bg-line" />
        </div>
      </div>

      <div className="h-[66px] animate-pulse rounded-2xl border border-line bg-card" />

      <ProductGridSkeleton count={6} />
    </div>
  );
}