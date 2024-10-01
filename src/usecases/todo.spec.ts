import { describe, it, expect, afterEach, vi } from 'vitest';
import { readTodos, createTodo, completeTodo } from './todo';
import { TodoId, TodoRepository } from '../domain/todo';

describe('todo usecases', () => {
  const repository: TodoRepository = {
    insert: vi.fn(),
    selectAll: vi.fn(),
    makeComplete: vi.fn(),
  };

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('read todos', () => {
    readTodos(repository);
    expect(repository.selectAll).toHaveBeenCalled();
  });

  it('creates a new todo', () => {
    const title = 'Buy milk';
    createTodo(repository, title);
    expect(repository.insert).toHaveBeenCalledWith({ title, completed: false });
  });

  it('completes a todo', () => {
    const id = '1' as TodoId;
    completeTodo(repository, id);
    expect(repository.makeComplete).toHaveBeenCalledWith(id);
  });
});
