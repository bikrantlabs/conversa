import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import { client } from "@/lib/hono"

export const useCurrentUser = () => {
  const session = useSession()
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      if (!session.data || !session.data?.user?.id)
        throw new Error("Unauthorized")
      const response = await client.api.users["current-user"].$get({
        query: { userId: session.data.user.id },
      })
      if (!response.ok) throw new Error("Failed to fetch user")

      const data = await response.json()
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
  return query.data
}
