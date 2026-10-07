import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GitHubSiteLogo } from "@/components/github-site-logo";
import { TechnologyLogo } from "@/components/technology-logo";
import { technologies } from "@/lib/technologies";
import type { GitHubUser } from "@/lib/github";
import { useTranslations } from "next-intl";

export function ProfileHero({ profile }: { profile: GitHubUser | null }) {
  const t = useTranslations("profile.hero");
  const name = profile?.name ?? "Ryan Zeng";
  const username = profile?.login ?? "ryanzen9";
  const profileUrl = profile?.html_url ?? "https://github.com/ryanzen9";

  return (
    <header aria-labelledby="profile-title" className="reading-column">
      <div className="mb-8 flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage src={profile?.avatar_url ?? ""} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <p className="editorial-meta">{t("roleLocation")}</p>
      </div>
      <h1 id="profile-title" className="editorial-heading">
        {name}
      </h1>
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link mt-4 inline-block py-1 font-mono text-sm text-muted-foreground"
        aria-label={t("githubProfileAria", { name })}
      >
        @{username}
      </a>
      <div className="editorial-copy editorial-body mt-(--space-content-media)">
        <p>{t("introduction.primary")}</p>
        <p>{t("introduction.currentFocus")}</p>
      </div>
      <div className="logo-links mt-(--space-content-media)">
        <a
          className="logo-link"
          href="mailto:rubyceng0326@gmail.com"
          aria-label={t("links.email")}
          title={t("links.email")}
        >
          <TechnologyLogo technology={technologies.gmail} decorative />
        </a>
        <a
          className="logo-link"
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("githubProfileAria", { name })}
          title={t("links.github")}
        >
          <GitHubSiteLogo />
        </a>
      </div>
    </header>
  );
}
