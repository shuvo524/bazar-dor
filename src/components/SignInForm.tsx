"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { safeNext } from "@/lib/redirect";
import FormField from "./FormField";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("callbackUrl"));
  const { data: session } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // সুরক্ষিত পেজ থেকে ফেরত পাঠানো হলে বার্তা দেখাবে
  useEffect(() => {
    if (params.get("auth") === "required") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "auth-required" });
    }
  }, [params]);

  // আগেই লগইন করা থাকলে এই পেজে থাকার দরকার নেই
  useEffect(() => {
    if (session) router.replace(next);
  }, [session, next, router]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      toast.error("সঠিক ইমেইল ঠিকানা লিখুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: cleanEmail,
      password,
    });
    setLoading(false);

    if (error) {
      const wrong =
        error.status === 401 || error.code === "INVALID_EMAIL_OR_PASSWORD";
      toast.error(
        wrong
          ? "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে"
          : error.message || "সাইন ইন করা যায়নি, আবার চেষ্টা করুন",
      );
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(next);
    router.refresh();
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <FormField
          id="email"
          label="ইমেইল"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormField
          id="password"
          label="পাসওয়ার্ড"
          type="password"
          autoComplete="current-password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/30 transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
      </form>

      <SocialButtons next={next} />

      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-brand">
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}