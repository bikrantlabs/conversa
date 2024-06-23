import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { z } from "zod"

import { db } from "@/lib/db"

const app = new Hono()

const userRoutes = app
  .get(
    "/search",
    zValidator("query", z.object({ username: z.string().min(3) })),
    async (c) => {
      const { username } = c.req.valid("query")
      const users = await db.user.findMany({
        where: {
          name: { contains: username },
        },
      })
      console.log(`🔥 user.ts:20 ~ API - Sending response`, { users })
      return c.json(users, 200)
    }
  )
  .get(
    "/current-user",
    zValidator("query", z.object({ userId: z.string() })),
    async (c) => {
      const { userId } = c.req.valid("query")
      const users = await db.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          friends: true,
          sentFriendRequests: true,
        },
      })
      return c.json(users, 200)
    }
  )
  .post(
    "/send-request",
    zValidator(
      "json",
      z.object({ senderId: z.string(), receiverId: z.string() })
    ),
    async (c) => {
      const { senderId, receiverId } = c.req.valid("json")

      // Cannot send friend request to ourselves
      if (senderId == receiverId)
        return c.json({ message: "Cannot send friend request!" }, 400)

      try {
        // Cannot send friend request if already in pending or already friends
        const sender = await db.user.findUnique({
          where: {
            id: senderId,
          },
          include: {
            sentFriendRequests: true,
            friends: true,
          },
        })
        if (!sender) return c.json({ message: "Cannot find the user" }, 400)
        const request = sender.sentFriendRequests.find(
          (request) => request.receiverId === receiverId
        )
        if (request) {
          // The request is already sent
          return c.json({ message: "Request already sent" }, 400)
        }
        const friend = sender.friends.find((friend) => friend.id === receiverId)
        if (friend) {
          // the receiver id is already a friend
          return c.json({ message: "Already a friend" }, 400)
        }

        await db.friendRequest.create({
          data: {
            receiverId,
            senderId,
          },
        })
        return c.json({ message: "Friend request sent!" }, 200)
      } catch (error) {
        throw new Error("Error sending friend request")
      }
    }
  )
export { userRoutes }
