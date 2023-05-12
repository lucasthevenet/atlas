import { revalidateTag } from "next/cache";
import {
  createTRPCUntypedClient,
  type CreateTRPCClientOptions,
} from "@trpc/client";
import { type AnyRouter } from "@trpc/server";
import { createRecursiveProxy } from "@trpc/server/shared";

import { clientCallTypeToProcedureType } from "./server";
import { type DecoratedProcedureRecord } from "./types";
import { generateCacheTag } from "./utils";

export { generateCacheTag };

export function createTRPCNextAppRouter<TRouter extends AnyRouter>(
  opts: CreateTRPCClientOptions<TRouter>,
) {
  const client = createTRPCUntypedClient<TRouter>(opts);

  return createRecursiveProxy((opts) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const action = opts.path.pop()!;
    const procedureType = clientCallTypeToProcedureType(action);
    const procedurePath = opts.path.join(".");

    if (action === "revalidate") {
      const cacheTag = generateCacheTag(procedurePath, opts.args[0]);
      return revalidateTag(cacheTag);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
    return (client as any)[procedureType](procedurePath, ...opts.args);
  }) as DecoratedProcedureRecord<TRouter["_def"]["record"]>;
}
