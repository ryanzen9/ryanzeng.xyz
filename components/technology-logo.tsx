import type { Technology } from "@/lib/technologies";

export function TechnologyLogo({
  technology: { name, icon: Icon, themeAdaptive },
  decorative = false,
}: {
  technology: Technology;
  decorative?: boolean;
}) {
  return (
    <span
      className="technology-logo"
      data-technology={name}
      data-theme-adaptive={themeAdaptive || undefined}
      title={name}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : name}
      aria-hidden={decorative || undefined}
    >
      <Icon size="1em" aria-hidden="true" focusable="false" />
    </span>
  );
}
