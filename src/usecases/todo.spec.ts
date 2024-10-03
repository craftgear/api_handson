import { describe, it, expect, vi } from 'vitest';
import { readTodos, createTodo, completeTodo } from './todo';
import type { TodoRepository, TodoId } from '../domain/todo';

describe('todo usecases', () => {
  const repository: TodoRepository = {
    insert: vi.fn(),
    findAll: vi.fn(),
    findById: vi
      .fn()
      .mockResolvedValueOnce({
        id: 1 as TodoId,
        title: 'Buy milk',
        done: false,
      })
      .mockResolvedValueOnce(null),
    makeComplete: vi.fn(),
  };

  it('reads todos', async () => {
    await readTodos(repository);
    expect(repository.findAll).toHaveBeenCalled();
  });

  it('creates a new todo', async () => {
    const title = 'Buy milk';
    await createTodo(repository, title);
    expect(repository.insert).toHaveBeenCalledWith({ title, done: false });
  });

  it('completes a todo', async () => {
    const id = 1 as TodoId;
    await completeTodo(repository, id);
    expect(repository.findById).toHaveBeenCalledWith(id);
    expect(repository.makeComplete).toHaveBeenCalledWith(id);
  });

  it('throws an error when todo is not found', async () => {
    const id = 999 as TodoId;
    expect(() => completeTodo(repository, id)).rejects.toThrowError(
      'Todo not found'
    );
  });
});
