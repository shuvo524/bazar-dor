const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const BN_WEEKDAYS = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

const BN_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

/** ইংরেজি সংখ্যা -> বাংলা সংখ্যা (148 -> ১৪৮) */
export function toBanglaDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/** বাংলা সংখ্যা -> ইংরেজি সংখ্যা (১৪৮ -> 148) */
export function toEnglishDigits(value: string): string {
  return value.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}

/** ভারতীয় স্টাইলে কমা বসায়: 185000 -> 1,85,000 */
function groupIndian(intStr: string): string {
  if (intStr.length <= 3) return intStr;
  const last3 = intStr.slice(-3);
  const rest = intStr.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${rest},${last3}`;
}

/**
 * সংখ্যাকে বাংলায় সাজায়।
 * পূর্ণসংখ্যা হলে দশমিক ছাড়া (১,৮৫০), নইলে দুই ঘর দশমিক (৬৩.৫০)।
 */
export function formatNumber(n: number, decimals?: number): string {
  const fixed =
    decimals !== undefined
      ? n.toFixed(decimals)
      : Number.isInteger(n)
        ? String(n)
        : n.toFixed(2);
  const [int, frac] = fixed.split(".");
  const out = frac ? `${groupIndian(int)}.${frac}` : groupIndian(int);
  return toBanglaDigits(out);
}

/** দাম: ১৪৮ টাকা */
export function formatPrice(n: number, decimals?: number): string {
  return `${formatNumber(n, decimals)} টাকা`;
}

/** শতাংশ: ২.১ */
export function formatPct(n: number): string {
  return toBanglaDigits(Math.abs(Number(n)).toFixed(1));
}

const UNIT_SHORT: Record<string, string> = {
  kg: "কেজি",
  কেজি: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  ltr: "লিটার",
  l: "লিটার",
  লিটার: "লিটার",
  dozen: "ডজন",
  doz: "ডজন",
  ডজন: "ডজন",
  piece: "পিস",
  pieces: "পিস",
  pcs: "পিস",
  pc: "পিস",
  পিস: "পিস",
};

/** ছোট ইউনিট: কেজি, লিটার, ডজন, পিস */
export function shortUnit(unit: string): string {
  return UNIT_SHORT[unit.trim().toLowerCase()] ?? unit;
}

/** পূর্ণ ইউনিট লাইন: প্রতি কেজি */
export function unitLabel(unit: string): string {
  return `প্রতি ${shortUnit(unit)}`;
}

/** ঢাকার সময় অনুযায়ী বাংলা তারিখ: মঙ্গলবার, ৬ অক্টোবর, ২০২৬ */
export function getBanglaDate(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);

  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value);

  const year = get("year");
  const month = get("month");
  const day = get("day");

  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();

  return `${BN_WEEKDAYS[weekday]}, ${toBanglaDigits(day)} ${BN_MONTHS[month - 1]}, ${toBanglaDigits(year)}`;
}