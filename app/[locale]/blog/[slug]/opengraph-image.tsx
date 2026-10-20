import { getBlogPosts } from "@/app/[locale]/blog/utils";
import { routing } from "@/i18n/routing";
import { ogContentType, ogSize } from "@/lib/og/card";
import { renderPostCard } from "@/lib/og/render";

export const alt = "May Rain — Field notes";
export const size = ogSize;
export const contentType = ogContentType;

// Bake every card at build time instead of rendering images per request.
export function generateStaticParams() {
  const posts = getBlogPosts();
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  return (
    (await renderPostCard(locale, slug)) ?? new Response(null, { status: 404 })
  );
}
