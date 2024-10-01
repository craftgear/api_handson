import { parseNewTodo, TodoId, TodoRepository } from '../domain/todo';

export const readTodos = ({ selectAll }: TodoRepository) => {
  return selectAll();
};

export const createTodo = ({ insert }: TodoRepository, title: string) => {
  const todo = parseNewTodo({ title });
  return insert(todo);
};

export const completeTodo = ({ makeComplete }: TodoRepository, id: TodoId) => {
  return makeComplete(id);
};
