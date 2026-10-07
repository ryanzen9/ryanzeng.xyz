import { useTranslations } from "next-intl";
import { TechnologyLogo } from "@/components/technology-logo";
import { technologies, type Technology } from "@/lib/technologies";

type TechnologyGroup = {
  key: "build" | "data" | "tooling";
  technologies: Technology[];
};

const TECHNOLOGY_GROUPS: TechnologyGroup[] = [
  {
    key: "build",
    technologies: [
      technologies.typescript,
      technologies.java,
      technologies.dart,
      technologies.react,
      technologies.vue,
      technologies.nextjs,
      technologies.flutter,
      technologies.tailwind,
      technologies.vite,
      technologies.nodejs,
      technologies.nestjs,
      technologies.hono,
      technologies.springBoot,
    ],
  },
  {
    key: "data",
    technologies: [
      technologies.postgresql,
      technologies.mysql,
      technologies.redis,
      technologies.sqlite,
      technologies.supabase,
      technologies.prisma,
      technologies.drizzle,
      technologies.edgedb,
    ],
  },
  {
    key: "tooling",
    technologies: [
      technologies.codex,
      technologies.claudeCode,
      technologies.githubCopilot,
      technologies.cursor,
      technologies.docker,
      technologies.git,
      technologies.githubActions,
      technologies.cloudflare,
      technologies.vercel,
      technologies.linux,
    ],
  },
];

function TechnologyItem({ technology }: { technology: Technology }) {
  return (
    <li className="flex items-center gap-2 text-base leading-7 text-muted-foreground">
      <TechnologyLogo technology={technology} decorative />
      <span>{technology.name}</span>
    </li>
  );
}

export function TechStack() {
  const t = useTranslations("profile.techStack");

  return (
    <section
      aria-labelledby="technology-stack-title"
      className="reading-column"
    >
      <div className="section-intro">
        <h2 id="technology-stack-title" className="section-heading">
          {t("title")}
        </h2>
        <p className="editorial-body">{t("description")}</p>
      </div>

      <div className="flex flex-col gap-(--space-entry)">
        {TECHNOLOGY_GROUPS.map((group) => (
          <div key={group.key}>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-medium">
                {t(`groups.${group.key}.label`)}
              </h3>
              <ul
                className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3"
                aria-label={t(`groups.${group.key}.ariaLabel`)}
              >
                {group.technologies.map((technology) => (
                  <TechnologyItem
                    key={technology.name}
                    technology={technology}
                  />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
