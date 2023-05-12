import { revalidateTag, unstable_cache } from "next/cache";
import {
  callProcedure,
  type AnyQueryProcedure,
  type AnyRouter,
  type MaybePromise,
  type ProcedureType,
  type inferRouterContext,
} from "@trpc/server";
import { createRecursiveProxy } from "@trpc/server/shared";

import {
  type DecorateProcedure,
  type DecoratedProcedureRecord,
  type QueryResolver,
} from "./types";
import { generateCacheTag } from "./utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const clientCallTypeMap: Record<keyof DecorateProcedure<any>, ProcedureType> = {
  query: "query",
  mutate: "mutation",
  subscribe: "subscription",
};

/** @internal */
export const clientCallTypeToProcedureType = (
  clientCallType: string,
): ProcedureType => {
  return clientCallTypeMap[clientCallType as keyof typeof clientCallTypeMap];
};

export function createTRPCNextAppRouter<TRouter extends AnyRouter>(config: {
  router: TRouter;

  createContext: () => MaybePromise<inferRouterContext<TRouter>>;
}) {
  return createRecursiveProxy(async (opts) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [input, callOpts] = opts.args as Parameters<
      QueryResolver<AnyQueryProcedure>
    >;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const action = opts.path.pop()!;
    const procedurePath = opts.path.join(".");
    const cacheTag = generateCacheTag(procedurePath, input);

    console.log(`[${action}]: Server cacheTag`, cacheTag);

    const type = clientCallTypeToProcedureType(action);

    if (action === "revalidate") {
      return revalidateTag(cacheTag);
    }

    const ctx = await config.createContext();

    const callProc = async () =>
      callProcedure({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        procedures: config.router._def.procedures,
        path: procedurePath,
        ctx,
        rawInput: input,
        type,
      });

    if (type === "query") {
      return unstable_cache(
        callProc,
        opts.path, // <- not sure what to put here...
        {
          revalidate: callOpts?.revalidate ?? false,
          tags: [cacheTag],
        },
      )();
    }

    return callProc();
  }) as DecoratedProcedureRecord<TRouter["_def"]["record"]>;
}
