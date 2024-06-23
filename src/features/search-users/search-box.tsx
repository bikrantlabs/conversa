"use client"

import { useState } from "react"
import { useGetUsers } from "@/features/search-users/api/use-get-users"
import { FriendRequestStatus } from "@prisma/client"
import { useDebounce } from "@uidotdev/usehooks"

import { useCurrentUser } from "@/hooks/use-current-user"
import { Input } from "@/components/ui/input"

import { UserList } from "./user-list"

export const SearchBox = () => {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 500)
  const { data } = useGetUsers(debouncedSearch)
  console.log(`🔥 search-box.tsx:13 ~ Data ~`, data)
  const userData = useCurrentUser()

  const getRequestStatus = (id: string): FriendRequestStatus => {
    const request = userData?.sentFriendRequests.find(
      (request) => request.receiverId === id
    )
    return request ? request.status : FriendRequestStatus.REJECTED
  }

  return (
    <div className="relative mx-auto">
      <Input
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      {data?.length
        ? userData && (
            <div className="absolute mt-1 flex w-full flex-col gap-1 rounded border bg-background">
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
        : ""}
    </div>
  )
}
