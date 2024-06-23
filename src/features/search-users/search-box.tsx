"use client"

import { useState } from "react"
import { useGetUsers } from "@/features/search-users/api/use-get-users"
import { FriendRequestStatus } from "@prisma/client"
import { useClickAway, useDebounce } from "@uidotdev/usehooks"

import { useCurrentUser } from "@/hooks/use-current-user"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

import { UserList } from "./user-list"

export const SearchBox = () => {
  const [search, setSearch] = useState("")
  const [open, setIsOpen] = useState(false)
  const debouncedSearch = useDebounce(search, 500)
  const { data, isFetching } = useGetUsers(debouncedSearch)
  const userData = useCurrentUser()

  const resultBoxRef = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false)
  })

  const getRequestStatus = (id: string): FriendRequestStatus => {
    const request = userData?.sentFriendRequests.find(
      (request) => request.receiverId === id
    )
    return request ? request.status : FriendRequestStatus.REJECTED
  }
  console.log(`🔥 search-box.tsx:31 ~ Data: ~`, data, open)
  return (
    <div className="relative mx-auto">
      <Input
        onFocus={() => {
          setIsOpen(true)
        }}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      {isFetching ? (
        <div
          className="absolute mt-1 flex w-full flex-col items-center justify-center rounded border bg-background p-4"
          ref={resultBoxRef}
        >
          <Icons.loader className="animate-spin text-muted-foreground" />
        </div>
      ) : open && data?.length ? (
        userData && (
          <div
            className="absolute mt-1 flex w-full flex-col gap-1 rounded border bg-background"
            ref={resultBoxRef}
          >
            {data.map((d) => {
              if (d.id !== userData.id)
                return (
                  <UserList
                    key={d.id}
                    id={d.id}
                    sentById={userData?.id}
                    name={d.name}
                    image={d.image}
                    searchQuery={debouncedSearch}
                    requestStatus={getRequestStatus(d.id)}
                  />
                )
            })}
          </div>
        )
      ) : (
        ""
      )}
    </div>
  )
}
