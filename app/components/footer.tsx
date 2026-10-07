"use client";

import { useTranslations } from "next-intl";
import { Rss } from "lucide-react";
import { GitHubSiteLogo } from "@/components/github-site-logo";
import { XLogo } from "@/components/x-logo";
import type { MouseEvent } from "react";

export default function Footer() {
  const shareUrl = `https://x.com/intent/post`;

  const t = useTranslations("accessibility");

  function addCurrentUrl(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.href = `${shareUrl}?url=${encodeURIComponent(window.location.href)}`;
  }

  return (
    <footer className="border-t border-border/60 pt-8 pb-12 text-sm text-muted-foreground">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Ryan Zeng · MIT</p>
        <ul className="logo-links">
          <li>
            <a
              className="logo-link"
              rel="noopener noreferrer"
              target="_blank"
              href="/rss"
              aria-label={t("rss")}
              title={t("rss")}
            >
              <Rss size="1em" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              className="logo-link"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/ryanzen9"
              aria-label={t("github")}
              title={t("github")}
            >
              <GitHubSiteLogo />
            </a>
          </li>
          <li>
            <a
              className="logo-link"
              rel="noopener noreferrer"
              target="_blank"
              href={shareUrl}
              onClick={addCurrentUrl}
              aria-label={t("x")}
              title={t("x")}
            >
              <XLogo />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
