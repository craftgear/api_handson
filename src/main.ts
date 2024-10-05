import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { HTTPException } from "hono/http-exception";

import { todoRoute } from "./routes/todo";

const app = new OpenAPIHono();
app.route("/v1", todoRoute);
app.onError((e, c) => {
  if (e instanceof HTTPException) {
    return e.getResponse();
  }
  return c.json({ error: e.message }, 500);
});

app.doc31("/open-api", {
  openapi: "3.1.0",
  info: { title: "API Hands On", version: "1" },
  servers: [{ url: "http://localhost:3000/" }],
  tags: [
    {
      name: "todos",
      description: "Operations about todos",
    },
  ],
});

app.get("/doc", swaggerUI({ url: "/open-api" }));

export default app;
