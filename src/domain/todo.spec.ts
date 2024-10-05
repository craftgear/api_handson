import { describe, it, expect, expectTypeOf } from "vitest";
import {
  parseTodo,
  parseTodoId,
  parseNewTodo,
  TodoId,
  isComplete,
} from "./todo";

describe.concurrent("parseTodo", () => {
  it("parse a valid todo", () => {
    expect(parseTodo({ id: 1, title: "Buy milk" })).toEqual({
      id: 1,
      title: "Buy milk",
      done: false,
    });
    const now = new Date();
    expect(
      parseTodo({ id: 1, title: "Buy milk done", done: true, doneAt: now }),
    ).toEqual({
      id: 1,
      title: "Buy milk done",
      done: true,
      doneAt: now,
    });
  });
  it("throws an error when title is missing", () => {
    expect(() => parseTodo({ id: 1 })).toThrowError("Title is required");
  });

  it("throws an error when title is empty", () => {
    expect(() => parseTodo({ id: 1, title: "" })).toThrowError(
      "Title must be at least 1 character long",
    );
  });

  it("throws an error when title is only whitespace", () => {
    expect(() => parseTodo({ id: 1, title: " " })).toThrowError(
      "Title must be at least 1 character long",
    );
  });
});

describe("parseTodoId", () => {
  it("parse a valid todo id", () => {
    const todoId = parseTodoId(1);
    expectTypeOf(todoId).toEqualTypeOf<TodoId>();
  });
});

describe.concurrent("parseNewTodo", () => {
  it("parse a valid new todo", () => {
    expect(parseNewTodo({ title: "Buy milk" })).toEqual({
      title: "Buy milk",
      done: false,
    });
  });

  it("throws an error when title is missing", () => {
    expect(() => parseNewTodo({})).toThrowError("Title is required");
  });

  it("throws an error when title is empty", () => {
    expect(() => parseNewTodo({ title: "" })).toThrowError(
      "Title must be at least 1 character long",
    );
  });
});

describe.concurrent("isComplete", () => {
  it("returns true when todo is completed", () => {
    const todo = parseTodo({ id: 1, title: "Buy milk", done: true });
    expect(isComplete(todo)).toBe(true);
  });

  it("returns false when todo is not completed", () => {
    const todo = parseTodo({ id: 1, title: "Buy milk", done: false });
    expect(isComplete(todo)).toBe(false);
  });
});
