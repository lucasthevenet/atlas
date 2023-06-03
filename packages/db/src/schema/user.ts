import { type InferModel } from "drizzle-orm";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
});

export type User = InferModel<typeof users>; // return type when queried

export type NewUser = InferModel<typeof users, "insert">; // insert type
