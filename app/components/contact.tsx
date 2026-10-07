import { useTranslations } from "next-intl";
import { TechnologyLogo } from "@/components/technology-logo";
import { technologies } from "@/lib/technologies";
import { Rss } from "lucide-react";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section aria-labelledby="contact-title" className="reading-column">
      <div className="section-intro">
        <h2 id="contact-title" className="section-heading">
          {t("title")}
        </h2>
        <p className="editorial-body">{t("description")}</p>
      </div>
      <div className="logo-links">
        <a
          className="logo-link"
          href="mailto:rubyceng0326@gmail.com"
          aria-label={t("email")}
          title={t("email")}
        >
          <TechnologyLogo technology={technologies.gmail} decorative />
        </a>
        <a
          className="logo-link"
          href="/rss"
          aria-label={t("rss")}
          title={t("rss")}
        >
          <Rss size="1em" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
