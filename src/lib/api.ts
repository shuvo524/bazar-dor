import type { Category, ChangeDir, Product, SortKey } from "./types";

// প্রথম API কাজ না করলে দ্বিতীয়টা চেষ্টা করবে
const DEFAULT_BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

const API_BASES = Array.from(
  new Set(
    [process.env.NEXT_PUBLIC_API_BASE, ...DEFAULT_BASES]
      .filter((b): b is string => Boolean(b))
      .map((b) => b.replace(/\/$/, "")),
  ),
);

async function fetchJson(path: string, init?: RequestInit): Promise<unknown> {
  for (const base of API_BASES) {
    try {
      const res = await fetch(`${base}${path}`, init ?? { next: { revalidate: 60 } });
      if (res.status === 404) return null;
      if (!res.ok) continue;
      return await res.json();
    } catch {
      continue;
    }
  }
  return null;
}

function toList<T>(json: unknown): T[] {
  if (Array.isArray(json)) return json as T[];
  const data = (json as { data?: unknown } | null)?.data;
  return Array.isArray(data) ? (data as T[]) : [];
}

export async function getCategories(init?: RequestInit): Promise<Category[]> {
  return toList<Category>(await fetchJson("/categories", init));
}

export async function getCategory(
  slug: string,
  init?: RequestInit,
): Promise<Category | null> {
  const json = await fetchJson(`/categories/${encodeURIComponent(slug)}`, init);
  if (!json || Array.isArray(json)) return null;
  const item = ((json as { data?: unknown }).data ?? json) as Category;
  return item && item.slug ? item : null;
}

export async function getProducts(
  category?: string,
  init?: RequestInit,
): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return toList<Product>(await fetchJson(`/products${query}`, init));
}

export async function getProductBySlug(
  slug: string,
  init?: RequestInit,
): Promise<Product | null> {
  const filtered = toList<Product>(
    await fetchJson(`/products?slug=${encodeURIComponent(slug)}`, init),
  );
  const exact = filtered.find((p) => p.slug === slug);
  if (exact) return exact;

  const all = await getProducts(undefined, init);
  return all.find((p) => p.slug === slug) ?? null;
}

/* ---------- সাহায্যকারী ফাংশন ---------- */

/** দাম বাড়ল, কমল নাকি একই আছে */
export function getDir(p: Product): ChangeDir {
  const pct = Number(p.change?.pct ?? 0);
  if (!pct) return "flat";
  if (p.change.dir === "up") return "up";
  if (p.change.dir === "down") return "down";
  return "flat";
}

/** সবচেয়ে বেশি দাম বাড়া পণ্য */
export function getRisers(products: Product[], count = 6): Product[] {
  return products
    .filter((p) => getDir(p) === "up")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, count);
}

/** সবচেয়ে বেশি দাম কমা পণ্য */
export function getFallers(products: Product[], count = 6): Product[] {
  return products
    .filter((p) => getDir(p) === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, count);
}

/** সংখ্যার মান ধরে সাজায় (স্ট্রিং ধরে নয়) */
export function sortProducts(products: Product[], key: SortKey): Product[] {
  if (key === "price-asc") {
    return [...products].sort((a, b) => Number(a.today) - Number(b.today));
  }
  if (key === "price-desc") {
    return [...products].sort((a, b) => Number(b.today) - Number(a.today));
  }
  return products;
}