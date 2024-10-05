import { describe, it, expect, expectTypeOf } from "vitest";
import { parseTodo, parseTodoId, parseNewTodo, TodoId } from "./todo";

describe("parseTodo", () => {
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
});

describe("parseTodoId", () => {
  it("parse a valid todo id", () => {
    const todoId = parseTodoId(1);
    expectTypeOf(todoId).toEqualTypeOf<TodoId>();
  });
});

describe("parseNewTodo", () => {
  it("parse a valid new todo", () => {
    expect(parseNewTodo({ title: "Buy milk" })).toEqual({
      title: "Buy milk",
      done: false,
    });
  });
});
