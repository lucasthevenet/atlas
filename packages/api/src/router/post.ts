import { z } from "zod";

import { desc, eq, posts } from "@acme/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findMany({ orderBy: [desc(posts.id)] });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.posts.findFirst({ where: eq(posts.id, input.id) });
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(posts).values(input).execute();
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(posts).where(eq(posts.id, input)).execute();
  }),
});
