import { type InferModel } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("full_name"),
  content: text("content"),
});

export type Post = InferModel<typeof posts>; // return type when queried

export type NewPost = InferModel<typeof posts, "insert">; // insert type
