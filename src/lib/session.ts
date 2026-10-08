import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/** লগইন না থাকলে সাইন ইন পেজে পাঠায়, লগইন থাকলে session ফেরত দেয় */
export async function requireSession(nextPath: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(
      `/signin?callbackUrl=${encodeURIComponent(nextPath)}&auth=required`,
    );
  }

  return session;
}