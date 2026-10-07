import Image from "next/image";

export function GitHubSiteLogo() {
  return (
    <Image
      // Source: https://github.githubassets.com/favicons/favicon.svg
      src="/icons/github.svg"
      width={32}
      height={32}
      alt=""
      aria-hidden="true"
      className="site-logo"
      data-site="github"
      unoptimized
    />
  );
}
