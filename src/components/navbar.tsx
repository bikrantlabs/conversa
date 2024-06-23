import Link from "next/link"

import { auth } from "@/lib/auth"

import { LoginButton } from "./auth/login-button"
import { LogoutButton } from "./auth/logout-button"
import { Icons } from "./icons"
import { Button } from "./ui/button"

export const Navbar = async () => {
  const session = await auth()
  return (
    <>
      <div className="sticky top-0 z-10 flex h-24 w-full items-center justify-center bg-background/90 px-8 backdrop-blur-[6px] backdrop-filter">
        <div className="flex flex-1 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-x-2">
              <Icons.logo className="h-5 w-5" />
              <h1 className="text-lg font-semibold drop-shadow-lg">Conversa</h1>
            </div>
          </Link>
          {session?.user ? (
            <div className="flex items-center gap-2">
              <LogoutButton />
            </div>
          ) : (
            <Link href="/auth/login">
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </div>
      <div className="h-24"></div>
    </>
  )
}
