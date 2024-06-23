import { SiteConfig } from "@/types/site-config"

export const siteConfig: SiteConfig = {
  name: "Conversa",
  author: "bikrantjung",
  description: "A realtime chat app built with honojs and websockets",
  keywords: ["Next.js", "next-auth", "web-sockets"],
  url: {
    base: process.env.NEXT_PUBLIC_APP_URL as string,
    author: "https://github.com/bikrantlabs",
  },
  links: {
    github: "https://github.com/bikrantlabs/next-auth-starter",
  },
  ogImage: `${process.env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
