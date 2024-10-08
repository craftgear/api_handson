/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Todo {
  done: Generated<number | null>;
  done_at: number | null;
  id: Generated<number | null>;
  title: string;
}

export interface DB {
  todo: Todo;
}
