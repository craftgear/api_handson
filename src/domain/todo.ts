import { z } from 'zod';

export const todoSchema = z
  .object({
    id: z.string().brand('TodoId'),
    title: z.string(),
    completed: z.boolean().default(false),
  })
  .brand('Todo');

export type Todo = z.infer<typeof todoSchema>;
export type TodoId = Todo['id'];
