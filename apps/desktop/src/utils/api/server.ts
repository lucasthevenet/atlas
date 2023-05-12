"use server";

import { createTRPCNextAppRouter } from "@trpc/next-app-router/server";

import { appRouter, createTRPCContext } from "@acme/api";

export const api = createTRPCNextAppRouter({
  router: appRouter,
  createContext: createTRPCContext,
});

export { type RouterInputs, type RouterOutputs } from "@acme/api";
