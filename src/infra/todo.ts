import { db } from './db';

import type { TodoRepository, NewTodo, TodoId } from '../domain/todo';
import { parseTodo, parseNewTodo } from '../domain/todo';

export const todoRepository: TodoRepository = {
  findAll: async () => {
    const data = await db
      .selectFrom('todo')
      .selectAll()
      .orderBy('id desc')
      .execute();
    return data.map((x) => parseTodo(x));
  },
  findById: async (id: TodoId) => {
    const data = await db
      .selectFrom('todo')
      .selectAll()
      .where('todo.id', '=', id)
      .executeTakeFirst();
    return data ? parseTodo(data) : null;
  },
  insert: async (input: NewTodo) => {
    const newTodo = parseNewTodo(input);
    const data = await db
      .insertInto('todo')
      .values({
        ...newTodo,
        completed: 0,
      })
      .returningAll()
      .executeTakeFirst();
    return parseTodo(data);
  },
  makeComplete: async (id: TodoId) => {
    const data = await db
      .updateTable('todo')
      .set({ completed: 1 })
      .where('todo.id', '=', id)
      .returningAll()
      .executeTakeFirst();
    return data ? parseTodo(data) : null;
  },
};
