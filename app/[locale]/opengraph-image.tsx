import { routing } from "@/i18n/routing";
import { ogContentType, ogSize } from "@/lib/og/card";
import { renderSiteCard } from "@/lib/og/render";

export const alt = "May Rain — The personal site of Ryan Zeng";
export const size = ogSize;
export const contentType = ogContentType;

// Bake every card at build time instead of rendering images per request.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return renderSiteCard(locale);
}
