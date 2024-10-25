import { describe, it, expect, expectTypeOf } from 'vitest';
import {
  parseTodo,
  parseTodoId,
  parseNewTodo,
  Todo,
  TodoId,
  NewTodo,
} from './domain';

describe('parseTodo', () => {
  it('parse a valid todo', () => {
    const result = parseTodo({ id: 1, title: "Buy milk" });
    expect(result).toEqual({
      id: 1,
      title: "Buy milk",
      done: false,
    });
    expectTypeOf(result).toEqualTypeOf<Todo>();
    const now = new Date();
    expect(parseTodo({ id: 1, title: 'Buy milk done', done: true, doneAt: now })).toEqual({
      id: 1,
      title: 'Buy milk done',
      done: true,
      doneAt: now,
    });
  });
});

describe('parseTodoId', () => {
  it('parse a valid todo id', () => {
    const todoId = parseTodoId(1);
    expectTypeOf(todoId).toEqualTypeOf<TodoId>();
  });
});

describe('parseNewTodo', () => {
  it('parse a valid new todo', () => {
    const result = parseNewTodo({ title: "Buy milk" });
    expect(result).toEqual({
      title: "Buy milk",
      done: false,
    });
    expectTypeOf(result).toEqualTypeOf<NewTodo>();
  });
});
