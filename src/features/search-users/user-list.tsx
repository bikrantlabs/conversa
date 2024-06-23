"use client"

import { FriendRequestStatus } from "@prisma/client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { AddFriendButton } from "./add-friend-btn"

interface UserListProps {
  id: string
  name: string
  image: string | null
  sentById: string
  requestStatus: FriendRequestStatus
  searchQuery: string
}
export const UserList = ({
  id,
  sentById,
  name,
  image,
  requestStatus,
  searchQuery,
}: UserListProps) => {
  return (
    <div className="flex items-center gap-2 rounded border-b-2 border-dotted p-2">
      <Avatar>
        <AvatarImage src={`${image}`} alt={name} />
        <AvatarFallback>{name[0] + name[1]}</AvatarFallback>
      </Avatar>
      <p className="text-sm font-semibold">{name}</p>
      {requestStatus !== "REJECTED" && (
        <Badge variant={"secondary"}>
          {requestStatus === "PENDING"
            ? "Sent"
            : requestStatus === "ACCEPTED"
              ? "Friends"
              : ""}
        </Badge>
      )}

      {requestStatus !== "ACCEPTED" && (
        <AddFriendButton
          searchQuery={searchQuery}
          requestStatus={requestStatus}
          senderId={sentById}
          receiverId={id}
        />
      )}
    </div>
  )
}
