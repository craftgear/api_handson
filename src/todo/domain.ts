import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.number().brand('TodoId'),
  title: z.string(),
  done: z.coerce.boolean().default(false),
  doneAt: z.coerce.date().nullish(),
});

export type Todo = z.infer<typeof TodoSchema>;
export type TodoId = Todo['id'];

export const parseTodo = (data: unknown): Todo => TodoSchema.parse(data);
export const parseTodoId = (id: number): TodoId => TodoSchema.shape.id.parse(id);

export type NewTodo = Omit<Todo, 'id'>;
export const parseNewTodo = (data: unknown): NewTodo => TodoSchema.omit({ id: true }).parse(data);
