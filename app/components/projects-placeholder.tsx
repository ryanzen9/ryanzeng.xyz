import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

// Placeholder rows stand in for a "selected work" list until project content
// exists. Replace them with real project links when the data is ready.
const PLACEHOLDER_ROWS = [0, 1];
const SKELETON_BLOCK = "bg-muted-foreground/20";

export function ProjectsPlaceholder() {
  const t = useTranslations("home.projects");

  return (
    <section aria-labelledby="projects-title" className="reading-column">
      <div className="section-intro">
        <h2 id="projects-title" className="section-heading">
          {t("title")}
        </h2>
        <p className="editorial-body">{t("description")}</p>
      </div>

      <div aria-hidden="true" className="flex flex-col gap-6">
        {PLACEHOLDER_ROWS.map((row) => (
          <div key={row} className="flex flex-col gap-2">
            <Skeleton className={cn(SKELETON_BLOCK, "h-3 w-24")} />
            <Skeleton className={cn(SKELETON_BLOCK, "h-4 w-3/5")} />
            <Skeleton className={cn(SKELETON_BLOCK, "h-3 w-full max-w-sm")} />
          </div>
        ))}
      </div>

      <p className="editorial-meta mt-6">{t("pending")}</p>
    </section>
  );
}
