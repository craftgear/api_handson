import { z } from 'zod';

const TodoSchema = z.object({
  id: z.string().brand('TodoId'),
  title: z
    .string({
      required_error: 'Title is required',
    })
    .trim()
    .min(1, { message: 'Title must be at least 1 character long' }),
  completed: z.boolean().default(false),
});

export type Todo = z.infer<typeof TodoSchema>;
export type TodoId = Todo['id'];
export type NewTodo = Omit<Todo, 'id'>;
export type TodoRepository = {
  selectAll: () => Todo[];
  insert: (todo: NewTodo) => Todo;
  makeComplete: (id: TodoId) => Todo;
};

export const parseTodo = (data: unknown): Todo => TodoSchema.parse(data);
export const parseNewTodo = (data: unknown): NewTodo =>
  TodoSchema.omit({ id: true }).parse(data);
export const isComplete = (todo: Todo) => todo.completed;
