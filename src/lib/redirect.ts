/** callbackUrl শুধু সাইটের ভেতরের পথ হলে গ্রহণ করে, নইলে হোম পেজ */
export function safeNext(raw: string | null | undefined): string {
  if (!raw) return "/";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
}