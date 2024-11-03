import { describe, it, expect, vi } from "vitest";
import { readTodos, createTodo, completeTodo } from "./usecase";
import type { TodoRepository, TodoId } from "./domain";

describe.concurrent("todo usecases", () => {
  const repository: TodoRepository = {
    insert: vi.fn(),
    selectAll: vi.fn(),
    selectById: vi
      .fn()
      .mockResolvedValueOnce({
        id: 1 as TodoId,
        title: "Buy milk",
        done: false,
      })
      .mockResolvedValueOnce({
        id: 2 as TodoId,
        title: "Buy eggs",
        done: true,
      })
      .mockResolvedValueOnce(null),
    setCompleted: vi.fn(),
  };

  it("reads todos", async () => {
    await readTodos(repository);
    expect(repository.selectAll).toHaveBeenCalledWith(0, 10);
  });

  it("page number should be larger then 0", () => {
    expect(() => readTodos(repository, 0)).rejects.toThrowError(
      "page should be a positive number",
    );
  });

  it("creates a new todo", async () => {
    const title = "Buy milk";
    await createTodo(repository, title);
    expect(repository.insert).toHaveBeenCalledWith({ title, done: false });
  });

  it("completes a todo", async () => {
    const id = 1 as TodoId;
    await completeTodo(repository, id);
    expect(repository.selectById).toHaveBeenCalledWith(id);
    expect(repository.setCompleted).toHaveBeenCalledWith(id);
  });

  it("does NOT completes a todo which is already done", async () => {
    const id = 2 as TodoId;
    await completeTodo(repository, id);
    expect(repository.selectById).toHaveBeenCalledWith(id);
    expect(repository.setCompleted).not.toHaveBeenCalledWith(id);
  });

  it("throws an error when todo is not found", async () => {
    const id = 999 as TodoId;
    expect(() => completeTodo(repository, id)).rejects.toThrowError(
      "Todo not found",
    );
  });
});
