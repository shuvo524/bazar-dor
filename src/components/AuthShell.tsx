import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AuthShell({ title, subtitle, children }: Props) {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-muted">{subtitle}</p>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-card p-6 shadow-sm">
        {children}
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        <Link href="/" className="hover:text-brand">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}