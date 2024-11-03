import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { parseTodoId } from "./domain";
import { readTodos, createTodo, completeTodo } from "./usecase";
import { todoRepository } from "./infra/repo";

export const todoRoute = new Hono().basePath("/todos");

todoRoute.get("/", async (c) => {
  const { page, limit } = c.req.query();
  const pageNumber = page ? Number(page) : undefined;
  const limitNumber = limit ? Number(limit) : undefined;

  const todos = await readTodos(todoRepository, pageNumber, limitNumber);
  return c.json(todos);
});

todoRoute.post("/", async (c) => {
  const data = await c.req.json();
  try {
    const newTodo = await createTodo(todoRepository, data.title);
    return c.json(newTodo);
  } catch (e: unknown) {
    throw new HTTPException(400, { message: (e as Error).message });
  }
});

todoRoute.patch("/:id/complete", async (c) => {
  const id = c.req.param("id");
  try {
    const todoId = parseTodoId(Number(id));
    const todo = await completeTodo(todoRepository, todoId);
    return c.json(todo);
  } catch (e: unknown) {
    throw new HTTPException(400, { message: (e as Error).message });
  }
});
