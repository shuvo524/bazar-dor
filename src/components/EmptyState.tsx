import Link from "next/link";

type Props = {
  emoji?: string;
  title: string;
  message: string;
};

export default function EmptyState({ emoji = "🛒", title, message }: Props) {
  return (
    <div className="rounded-2xl border border-line bg-card px-6 py-14 text-center">
      <div className="text-5xl" aria-hidden="true">
        {emoji}
      </div>
      <h2 className="mt-4 text-xl font-bold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{message}</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/30 transition-colors hover:bg-brand-dark"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}