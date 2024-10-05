import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { parseTodoId } from "../domain/todo";
import { readTodos, createTodo, completeTodo } from "../usecases/todo";
import { todoRepository } from "../infra/todo";

export const todoRoute = new Hono().basePath("/todo");

todoRoute.get("/", async (c) => {
  const todos = await readTodos(todoRepository);
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
  if (id === undefined) {
    throw new HTTPException(400, { message: "id is required" });
  }
  const todoId = parseTodoId(Number(id));
  try {
    const todo = await completeTodo(todoRepository, todoId);
    return c.json(todo);
  } catch (e: unknown) {
    throw new HTTPException(400, { message: (e as Error).message });
  }
});
