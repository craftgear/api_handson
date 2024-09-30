import { z } from 'zod';

const TodoSchema = z.object({
  id: z.string().brand('TodoId'),
  title: z.string(),
  completed: z.boolean().default(false),
});

export type Todo = z.infer<typeof TodoSchema>;
export type TodoId = Todo['id'];
