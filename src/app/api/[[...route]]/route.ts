import { userRoutes } from "@/server/routes/user"
import { Hono } from "hono"
import { handle } from "hono/vercel"

const app = new Hono().basePath("/api")

const routes = app.route("/users", userRoutes)

export const GET = handle(app)
export const POST = handle(app)
export type AppType = typeof routes
