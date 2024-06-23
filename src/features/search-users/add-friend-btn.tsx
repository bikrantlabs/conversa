"use client"

import { FriendRequestStatus } from "@prisma/client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { useSendRequest } from "./api/use-send-request"

interface AddFriendButtonProps {
  receiverId: string
  senderId: string
  requestStatus: FriendRequestStatus
  searchQuery: string
}

export const AddFriendButton = ({
  receiverId,
  senderId,
  requestStatus,
  searchQuery,
}: AddFriendButtonProps) => {
  const { mutate, isPending } = useSendRequest()
  return (
    <Button
      size="icon"
      onClick={() => {
        mutate({ receiverId, senderId, searchQuery })
        // TODO: Send friend request api
      }}
      className={cn(
        "ml-auto h-7 ",
        requestStatus === "PENDING" && "bg-yellow-500/20"
      )}
      variant="outline"
      isLoading={isPending}
      disabled={requestStatus === "PENDING" || isPending}
    >
      {requestStatus === "PENDING" ? (
        <Icons.userCheck className="h-4 w-4" />
      ) : (
        <Icons.userRoundPlus className="h-4 w-4" />
      )}
    </Button>
  )
}
