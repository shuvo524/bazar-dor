"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import FormField from "./FormField";

export default function UpdateProfileForm({
  defaultName,
}: {
  defaultName: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(defaultName);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const cleanName = name.trim();

    if (!cleanName) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name: cleanName });
    setLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <FormField
        id="name"
        label="নাম"
        type="text"
        autoComplete="name"
        placeholder="আপনার নাম লিখুন"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/30 transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "অপেক্ষা করুন..." : "আপডেট"}
      </button>
    </form>
  );
}