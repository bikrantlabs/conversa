import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { z } from "zod"

const app = new Hono()

const userRoutes = app.get(
  "/search",
  zValidator("query", z.object({ username: z.string().min(3) })),
  (c) => {
    return c.json({ message: "OK" }, 200)
  }
)
export { userRoutes }
