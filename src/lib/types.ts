export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type ChangeDir = "up" | "down" | "flat";

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: string; pct: number };
  markets: Market[];
  description?: string;
  tags?: string[];
};

export type SortKey = "default" | "price-asc" | "price-desc";