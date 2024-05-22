import { Hono } from "hono";
import { logger } from "hono/logger";
import { checkpointsRoute } from "./routes/checkpoints";

const app = new Hono()

app.use('*', logger())

app.get("/test", c => {
    return c.json({"message": "test"})
})

app.route("/api/checkpoints", checkpointsRoute);

export default app