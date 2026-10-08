"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UserMenu() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  async function handleSignOut() {
    setOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: () => {
          toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
        },
      },
    });
  }

  if (isPending) {
    return <div className="h-9 w-28 animate-pulse rounded-lg bg-line" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="rounded-lg px-3 py-2 text-sm font-semibold hover:text-brand"
        >
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand/30 transition-colors hover:bg-brand-dark"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;  
  const firstName = user.name?.split(" ")[0] || "ইউজার";
  const initial = (user.name?.[0] || user.email?.[0] || "U").toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-chip"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt=""
            referrerPolicy="no-referrer"
            className="size-9 rounded-lg object-cover"
          />
        ) : (
          <span className="grid size-9 place-items-center rounded-lg bg-brand text-sm font-bold text-white">
            {initial}
          </span>
        )}
        <span className="text-sm font-semibold">{firstName}</span>
        <span className="text-[10px] text-muted" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-line bg-card p-4 shadow-lg"
        >
          <p className="font-semibold">{user.name}</p>
          <p className="truncate text-xs text-muted">{user.email}</p>

          <div className="mt-3 flex flex-col gap-1 text-sm">
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2 hover:bg-chip"
            >
              👤 আমার প্রোফাইল
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="rounded-lg px-2 py-2 text-left text-up hover:bg-chip"
            >
              ↩ সাইন আউট
            </button>
          </div>
        </div>
      )}
    </div>
  );
}