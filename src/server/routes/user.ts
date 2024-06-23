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
      try {
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
