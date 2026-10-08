import Link from "next/link";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { requireSession } from "@/lib/session";

export const metadata = { title: "তথ্য আপডেট" };

export default async function UpdateProfilePage() {
  const session = await requireSession("/profile/update");

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-sm text-muted">আপনার নাম বদলাতে পারবেন।</p>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-card p-6 shadow-sm">
        <UpdateProfileForm defaultName={session.user.name ?? ""} />
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        <Link href="/profile" className="hover:text-brand">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </p>
    </div>
  );
}