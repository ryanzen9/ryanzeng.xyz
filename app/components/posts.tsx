import {
  getBlogPosts,
  parsePublishedAt,
  publishedDateFormat,
} from "@/app/[locale]/blog/utils";
import { Link } from "@/i18n/navigation";
import { blogLang } from "@/lib/site";
import { cn } from "@/lib/utils";
import { getFormatter } from "next-intl/server";

type BlogPostsProps = {
  /**
   * "compact" keeps only the date and title of each post, for the homepage.
   * The writing index keeps the full date/title/summary stack.
   */
  variant?: "full" | "compact";
};

export async function BlogPosts({ variant = "full" }: BlogPostsProps = {}) {
  const format = await getFormatter();
  const isCompact = variant === "compact";
  const posts = getBlogPosts().sort(
    (a, b) =>
      parsePublishedAt(b.metadata.publishedAt).getTime() -
      parsePublishedAt(a.metadata.publishedAt).getTime(),
  );

  return (
    <ol className={cn("flex flex-col", !isCompact && "gap-(--space-entry)")}>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            className={cn(
              "group flex flex-col py-2",
              isCompact
                ? "gap-1 sm:flex-row sm:items-baseline sm:gap-4"
                : "items-start gap-3",
            )}
            href={`/blog/${post.slug}`}
          >
            <time
              dateTime={post.metadata.publishedAt}
              className={cn(
                "editorial-meta shrink-0 font-mono tabular-nums",
                isCompact && "sm:w-32",
              )}
            >
              {format.dateTime(
                parsePublishedAt(post.metadata.publishedAt),
                publishedDateFormat,
              )}
            </time>
            <h3
              lang={blogLang}
              className={cn(
                "font-medium leading-snug tracking-tight decoration-border underline-offset-4 group-hover:underline",
                isCompact ? "text-lg" : "text-xl sm:text-2xl",
              )}
            >
              {post.metadata.title}{" "}
              <span
                aria-hidden="true"
                className={cn(
                  "inline-block text-muted-foreground transition-transform",
                  isCompact
                    ? "text-sm group-hover:translate-x-0.5"
                    : "text-base group-hover:translate-x-1",
                )}
              >
                ↗
              </span>
            </h3>
            {isCompact ? null : (
              <p lang={blogLang} className="editorial-body">
                {post.metadata.summary}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ol>
  );
}
