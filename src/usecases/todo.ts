import {
  parseNewTodo,
  parseTodoId,
  isComplete,
  TodoRepository,
  TodoId,
} from '../domain/todo';

export const readTodos = async ({ findAll }: TodoRepository) => {
  return await findAll();
};

export const createTodo = async ({ insert }: TodoRepository, title: string) => {
  const todo = parseNewTodo({ title });
  return await insert(todo);
};

export const completeTodo = async (
  { findById, makeComplete }: TodoRepository,
  id: TodoId
) => {
  const todoId = parseTodoId(id);
  const todo = await findById(todoId);
  if (!todo) {
    throw new Error('Todo not found');
  }
  if (isComplete(todo)) {
    return todo;
  }
  return await makeComplete(todoId);
};
