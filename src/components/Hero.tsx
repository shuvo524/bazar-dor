import Image from "next/image";
import { getBanglaDate } from "@/lib/bangla";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-line bg-card p-6 md:p-8">
      <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between">
        <div className="max-w-xl">
          <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand">
            {getBanglaDate()}
          </span>

          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-6 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/30 transition-colors hover:bg-brand-dark"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <Image
          src="/bazar-hero.png"
          alt="ফল ও সবজিতে ভরা বাজারের ঝুড়ি"
          width={320}
          height={260}
          priority
          className="h-auto w-56 shrink-0 md:w-80"
        />
      </div>
    </section>
  );
}