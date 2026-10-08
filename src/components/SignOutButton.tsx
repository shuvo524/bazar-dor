"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    const { error } = await authClient.signOut();
    setLoading(false);

    if (error) {
      toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className="rounded-lg border border-up px-4 py-2 text-sm font-semibold text-up transition hover:bg-up/5 disabled:opacity-60"
    >
      ↩ {loading ? "অপেক্ষা করুন..." : "সাইন আউট"}
    </button>
  );
}