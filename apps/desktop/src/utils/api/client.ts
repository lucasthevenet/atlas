import { httpLink, loggerLink } from "@trpc/client";
import {
  createTRPCNextAppRouter,
  generateCacheTag,
} from "@trpc/next-app-router/client";
import superjson from "superjson";

import { type AppRouter } from "@acme/api";

const getUrl = () => {
  if (typeof window !== "undefined") return "/api/trpc";
  const vc = process.env.VERCEL_URL;
  if (vc) return `https://${vc}/api/trpc`;
  return "http://localhost:3000/api/trpc";
};

export const api = createTRPCNextAppRouter<AppRouter>({
  transformer: superjson,
  links: [
    loggerLink(),
    (runtime) => {
      return (ctx) => {
        const { path, input } = ctx.op;
        const cacheTag = generateCacheTag(path, input);

        console.log("client cacheTag", cacheTag);

        const link = httpLink({
          url: getUrl(),
          fetch: (url, opts) => {
            return fetch(url, {
              ...opts,
              next: { tags: [cacheTag] },
            });
          },
        })(runtime);

        return link(ctx);
      };
    },
  ],
});
