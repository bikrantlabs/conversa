import Link from "next/link"

import { siteConfig } from "@/config/site"

import { Icons } from "../icons"
import { Navbar } from "../navbar"
import { Button } from "../ui/button"

export const LandingSection = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center">
        <div className="mt-16 flex max-w-4xl flex-col items-center justify-center space-y-6">
          <h1 className="text-6xl font-semibold drop-shadow-lg">
            Welcome to conversa
          </h1>
          <p className="text-center text-xl text-secondary-text">
            A realtime chat app built with honojs and websockets with image
            uploads, reactions, replies and many more.
          </p>
          <div className="flex gap-x-2">
            <Link href={siteConfig.links.github} target="_blank">
              <Button variant={"outline"} className="border-2">
                Github
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
