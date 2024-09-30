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

export const parseTodo = (data: unknown): Todo => TodoSchema.parse(data);
export const isComplete = (todo: Todo) => todo.completed;
