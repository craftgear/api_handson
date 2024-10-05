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

export default app;
