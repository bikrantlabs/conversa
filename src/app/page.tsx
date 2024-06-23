import { redirect } from "next/navigation"
import { SearchBox } from "@/features/search-users/search-box"
import { useSession } from "next-auth/react"

import { auth } from "@/lib/auth"
import { LandingSection } from "@/components/marketing/landing"

export default async function Home() {
  const session = await auth()
  if (session?.user) redirect("/chat")
  return (
    <>
      <LandingSection />
      <div className="mx-auto mt-8 w-64">
        <SearchBox />
      </div>
    </>
  )
}
