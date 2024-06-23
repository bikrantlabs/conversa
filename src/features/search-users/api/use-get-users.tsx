import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/hono"

export const useGetUsers = (searchQuery: string) => {
  const query = useQuery({
    queryKey: ["users", searchQuery],
    queryFn: async () => {
      const response = await client.api.users.search.$get({
        query: { username: searchQuery },
      })
      if (!response.ok) throw new Error("Failed to fetch user")

      const data = await response.json()
      return data
    },
    enabled: !!searchQuery,
    staleTime: 5 * 60 * 1000,
  })
  return query
}
