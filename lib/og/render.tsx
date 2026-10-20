import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

import { getBlogPosts, parsePublishedAt } from "@/app/[locale]/blog/utils";
import { ogSize, PostCard, SiteCard } from "@/lib/og/card";
import { siteUrl } from "@/lib/site";

const SITE_NAME = "May Rain";
const AUTHOR = "Ryan Zeng";

function getDomain() {
  try {
    return new URL(siteUrl).host;
  } catch {
    return "blog.ryanzeng.xyz";
  }
}

/** Keep long section descriptions to one sentence on the card. */
function firstSentence(text: string) {
  return text.split(/(?<=[.!?。！？])\s*/)[0]?.trim() || text;
}

function formatDate(publishedAt: string) {
  const date = parsePublishedAt(publishedAt);
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${date.getUTCFullYear()}.${month}.${day}`;
}

/** Default card for every page that does not have a more specific one. */
export async function renderSiteCard(locale: string) {
  const t = await getTranslations({ locale, namespace: "home" });
  const taglineLines = t("title")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return new ImageResponse(
    <SiteCard
      eyebrow={t("eyebrow")}
      headline={SITE_NAME}
      taglineLines={taglineLines}
      lang={locale}
      footerLeft={AUTHOR}
      footerRight={getDomain()}
    />,
    ogSize,
  );
}

/** Card for the writing index. */
export async function renderBlogCard(locale: string) {
  const blog = await getTranslations({ locale, namespace: "blog" });

  return new ImageResponse(
    <SiteCard
      eyebrow={blog("eyebrow")}
      headline={blog("title")}
      taglineLines={[firstSentence(blog("description"))]}
      lang={locale}
      footerLeft={AUTHOR}
      footerRight={getDomain()}
    />,
    ogSize,
  );
}

/** Card for the profile page: the name and what this person does. */
export async function renderProfileCard(locale: string) {
  const [home, profile] = await Promise.all([
    getTranslations({ locale, namespace: "home" }),
    getTranslations({ locale, namespace: "profile.hero" }),
  ]);

  return new ImageResponse(
    <SiteCard
      eyebrow={profile("roleLocation")}
      headline={AUTHOR}
      taglineLines={home("title")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)}
      lang={locale}
      footerLeft={SITE_NAME}
      footerRight={getDomain()}
    />,
    ogSize,
  );
}

/** One card per blog post, seeded by slug so the drizzle differs per article. */
export async function renderPostCard(locale: string, slug: string) {
  const post = getBlogPosts().find((entry) => entry.slug === slug);
  if (!post) return null;

  const t = await getTranslations({ locale, namespace: "blog" });

  return new ImageResponse(
    <PostCard
      eyebrow={t("eyebrow")}
      title={post.metadata.title}
      date={formatDate(post.metadata.publishedAt)}
      seed={post.slug}
      footerLeft={AUTHOR}
      footerRight={getDomain()}
    />,
    ogSize,
  );
}
