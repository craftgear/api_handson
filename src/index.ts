import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { todoRoute } from "./routes/todo";

const app = new Hono();

app.route("/v1", todoRoute);
app.onError((e, c) => {
  if (e instanceof HTTPException) {
    return e.getResponse();
  }
  return c.json({ error: e.message }, 500);
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
