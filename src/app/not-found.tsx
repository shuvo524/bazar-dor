import EmptyState from "@/components/EmptyState";

export const metadata = { title: "পেজ পাওয়া যায়নি" };

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <EmptyState
        emoji="🔍"
        title="৪০৪ — পেজটি খুঁজে পাওয়া যায়নি"
        message="আপনি যে পেজটি খুঁজছেন সেটি নেই, সরানো হয়েছে বা লিংকটি ভুল।"
      />
    </div>
  );
}