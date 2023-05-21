import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  greeting: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .mutation((opts) => {
      return `hello ${opts.input.text}`;
    }),
});
