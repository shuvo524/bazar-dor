import Link from "next/link";
import { requireSession } from "@/lib/session";
import SignOutButton from "@/components/SignOutButton";

export const metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const session = await requireSession("/profile");
  const user = session.user;
  const initial = (user.name?.[0] || user.email?.[0] || "U").toUpperCase();

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt=""
              referrerPolicy="no-referrer"
              className="size-16 rounded-xl object-cover"
            />
          ) : (
            <span className="grid size-16 place-items-center rounded-xl bg-brand text-2xl font-bold text-white">
              {initial}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="truncate text-sm text-muted">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </section>

      <section className="rounded-2xl border border-line bg-card p-5">
        <h2 className="text-lg font-bold">তথ্য</h2>

        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-line pb-3">
            <dt className="text-muted">নাম</dt>
            <dd className="font-medium">{user.name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">ইমেইল</dt>
            <dd className="truncate font-medium">{user.email}</dd>
          </div>
        </dl>

        <Link
          href="/profile/update"
          className="mt-5 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/30 transition-colors hover:bg-brand-dark"
        >
          তথ্য আপডেট করুন
        </Link>
      </section>
    </div>
  );
}