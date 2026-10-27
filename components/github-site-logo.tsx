import Image from "next/image";

export function GitHubSiteLogo() {
  return (
    <Image
      src="https://github.githubassets.com/favicons/favicon.svg"
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
