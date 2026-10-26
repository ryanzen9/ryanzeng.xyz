import { BlogPosts } from "@/app/components/posts";
import { ProjectsPlaceholder } from "@/app/components/projects-placeholder";
import { Signature } from "@/app/components/signature";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locale } from "next/root-params";

const EMAIL_HREF = "mailto:rubyceng0326@gmail.com";
const GITHUB_HREF = "https://github.com/ryanzen9";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home.metadata");
  const currentLocale = (await locale()) as AppLocale;
  const title = t("title");
  const description = t("description");
  const path = `/`;

  return createPageMetadata({
    locale: currentLocale,
    path,
    title,
    description,
  });
}

export default async function Page() {
  const t = await getTranslations("home");

  return (
    <div className="editorial-flow">
      <header className="reading-column relative">
        <Signature className="pointer-events-none absolute -top-1 right-0 w-20 -rotate-6 sm:-top-2 sm:right-1 sm:w-48" />
        <p className="editorial-meta mb-6 pr-24 sm:pr-0">{t("eyebrow")}</p>
        <h1 className="editorial-heading whitespace-pre-line">{t("title")}</h1>
        <p className="editorial-body mt-(--space-content-media)">
          {t("introduction")}
        </p>
        <nav
          aria-label={t("links.label")}
          className="mt-(--space-content-media) flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted-foreground"
        >
          <a className="text-link" href={EMAIL_HREF}>
            {t("links.email")}
          </a>
          <span aria-hidden="true">·</span>
          <a
            className="text-link"
            href={GITHUB_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("links.github")}
          </a>
          <span aria-hidden="true">·</span>
          <a className="text-link" href="/rss">
            {t("links.rss")}
          </a>
        </nav>
      </header>

      <section
        aria-labelledby="latest-writing-title"
        className="reading-column"
      >
        <div className="section-intro">
          <h2 id="latest-writing-title" className="section-heading">
            {t("latest.title")}
          </h2>
        </div>
        <BlogPosts variant="compact" />
        <Link href="/blog" className="text-link mt-8 inline-block py-2 text-sm">
          {t("allWriting")} <span aria-hidden="true">→</span>
        </Link>
      </section>

      <ProjectsPlaceholder />
    </div>
  );
}
