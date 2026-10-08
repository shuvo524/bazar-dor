import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import { getBanglaDate } from "@/lib/bangla";
import CategoryNav from "./CategoryNav";
import UserMenu from "./UserMenu";

export default async function Navbar() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-card/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand">
            <Image
              src="/logo-icon.png"
              alt=""
              width={24}
              height={24}
              priority
            />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold">বাজার দর</span>
            <span className="block text-xs text-muted">{getBanglaDate()}</span>
          </span>
        </Link>

        <UserMenu />
      </div>

      {categories.length > 0 && (
        <div className="border-t border-line">
          <div className="mx-auto w-full max-w-6xl px-4">
            <CategoryNav categories={categories} />
          </div>
        </div>
      )}
    </header>
  );
}