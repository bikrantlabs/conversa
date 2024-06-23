import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<
  (typeof client.api.users)["send-request"]["$post"]
>
type RequestType = InferRequestType<
  (typeof client.api.users)["send-request"]["$post"]
>["json"] & { searchQuery: string }
export const useSendRequest = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.users["send-request"]["$post"]({
        json,
      })
      return await response.json()
    },
    onSuccess: (data, variables) => {
      // Invalidate all previous friend requests
      queryClient.invalidateQueries({
        queryKey: ["friendRequests", variables.searchQuery],
      })
      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      })
    },
    onError: () => {
      console.log("Error sending friend request")
    },
  })
  return mutation
}
