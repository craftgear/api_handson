import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";

import { parseTodoId, TodoSchema } from "../domain/todo";
import { readTodos, createTodo, completeTodo } from "../usecases/todo";
import { todoRepository } from "../infra/todo";

export const todoRoute = new OpenAPIHono();

const getTodosRoute = createRoute({
  operationId: "getTodos",
  tags: ["todos"],
  path: "/todos",
  method: "get",
  description: "Read all todos",
  responses: {
    200: {
      description: "Get a list of todos",
      content: {
        "application/json": {
          schema: z.array(TodoSchema),
        },
      },
    },
  },
});

todoRoute.openapi(getTodosRoute, async (c) => {
  const todos = await readTodos(todoRepository);
  return c.json(todos);
});

const postTodoRoute = createRoute({
  operationId: "createTodo",
  tags: ["todos"],
  path: "/todos",
  method: "post",
  description: "Create a new todo item",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: z.object({
            title: z.string().openapi({
              example: "Buy milk",
              description: "The title of the todo",
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "a newly created todo item",
      content: {
        "application/json": {
          schema: TodoSchema,
        },
      },
    },
    400: {
      description: "Bad request",
    },
  },
});

todoRoute.openapi(postTodoRoute, async (c) => {
  const data = await c.req.json();
  try {
    const newTodo = await createTodo(todoRepository, data.title);
    return c.json(newTodo);
  } catch (e: unknown) {
    throw new HTTPException(400, { message: (e as Error).message });
  }
});

const patchTodoRoute = createRoute({
  operationId: "completeTodo",
  tags: ["todos"],
  path: "/todos/{id}/complete",
  method: "patch",
  description: "Mark a todo item as complete",
  request: {
    params: z.object({
      id: z.coerce.number().openapi({
        description: "The id of the todo item",
      }),
    }),
  },
  responses: {
    200: {
      description: "a completed todo todo item",
      content: {
        "application/json": {
          schema: TodoSchema,
        },
      },
    },
    400: {
      description: "Bad request",
    },
  },
});

todoRoute.openapi(patchTodoRoute, async (c) => {
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
