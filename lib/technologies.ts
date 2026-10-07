import { GoogleGmail, type Icon } from "@dev.icons/react";
import { devIcons } from "@/lib/icons";

export type Technology = {
  name: string;
  icon: Icon;
  themeAdaptive?: boolean;
};

export const technologies = {
  typescript: { name: "TypeScript", icon: devIcons.typescript.color },
  java: { name: "Java", icon: devIcons.java.color },
  dart: { name: "Dart", icon: devIcons.dart.color },
  react: { name: "React", icon: devIcons.react.color },
  vue: { name: "Vue", icon: devIcons.vue.color },
  nextjs: {
    name: "Next.js",
    icon: devIcons.nextjs.color,
    themeAdaptive: true,
  },
  flutter: { name: "Flutter", icon: devIcons.flutter.color },
  tailwind: {
    name: "Tailwind CSS",
    icon: devIcons.tailwind.color,
  },
  vite: { name: "Vite", icon: devIcons.vite.color },
  nodejs: {
    name: "Node.js",
    icon: devIcons.nodejs.color,
  },
  nestjs: { name: "NestJS", icon: devIcons.nestjs.color },
  hono: { name: "Hono", icon: devIcons.hono.color },
  springBoot: { name: "Spring Boot", icon: devIcons.springBoot.color },
  spring: { name: "Spring", icon: devIcons.spring.color },
  postgresql: { name: "PostgreSQL", icon: devIcons.postgresql.color },
  mysql: { name: "MySQL", icon: devIcons.mysql.color },
  redis: { name: "Redis", icon: devIcons.redis.color },
  sqlite: { name: "SQLite", icon: devIcons.sqlite.color },
  supabase: { name: "Supabase", icon: devIcons.supabase.color },
  prisma: { name: "Prisma", icon: devIcons.prisma.color, themeAdaptive: true },
  drizzle: {
    name: "Drizzle",
    icon: devIcons.drizzle.color,
    themeAdaptive: true,
  },
  edgedb: { name: "EdgeDB", icon: devIcons.edgedb.color, themeAdaptive: true },
  codex: { name: "Codex", icon: devIcons.openai.color, themeAdaptive: true },
  claudeCode: { name: "Claude Code", icon: devIcons.claudeCode.color },
  githubCopilot: {
    name: "GitHub Copilot",
    icon: devIcons.githubCopilot.color,
    themeAdaptive: true,
  },
  cursor: { name: "Cursor", icon: devIcons.cursor.color, themeAdaptive: true },
  docker: { name: "Docker", icon: devIcons.docker.color },
  git: { name: "Git", icon: devIcons.git.color },
  githubActions: { name: "GitHub Actions", icon: devIcons.githubActions.color },
  cloudflare: { name: "Cloudflare", icon: devIcons.cloudflare.color },
  vercel: { name: "Vercel", icon: devIcons.vercel.color, themeAdaptive: true },
  linux: { name: "Linux", icon: devIcons.linux.color },
  gmail: { name: "Gmail", icon: GoogleGmail },
} satisfies Record<string, Technology>;
