/// <reference types="next" />

import { cache } from "react";
import {
  clientCallTypeToProcedureType,
  createTRPCUntypedClient,
  type CreateTRPCProxyClient,
} from "@trpc/client";
import {
  type ActionHandlerDef,
  type CreateTRPCNextAppRouterOptions,
  type inferActionDef,
} from "@trpc/next/dist/app-dir/shared";
import {
  TRPCError,
  callProcedure,
  getTRPCErrorFromUnknown,
  type AnyProcedure,
  type AnyRootConfig,
  type AnyRouter,
  type CombinedDataTransformer,
  type MaybePromise,
  type Simplify,
  type inferProcedureInput,
} from "@trpc/server";
import { type TRPCResponse } from "@trpc/server/rpc";
import {
  createRecursiveProxy,
  getErrorShape,
  transformTRPCResponse,
} from "@trpc/server/shared";

export function isFormData(value: unknown): value is FormData {
  if (typeof FormData === "undefined") {
    // FormData is not supported
    return false;
  }
  return value instanceof FormData;
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
function set(
  obj: Record<string, any>,
  path: string | string[],
  value: unknown,
): void {
  if (typeof path === "string") {
    path = path.split(/[\.\[\]]/).filter(Boolean);
  }

  if (path.length > 1) {
    const p = path.shift()!;
    const isArrayIndex = /^\d+$/.test(path[0]!);
    obj[p] = obj[p] || (isArrayIndex ? [] : {});
    set(obj[p], path, value);
    return;
  }
  const p = path[0]!;
  if (obj[p] === undefined) {
    obj[p] = value;
  } else if (Array.isArray(obj[p])) {
    obj[p].push(value);
  } else {
    obj[p] = [obj[p], value];
  }
}

export function formDataToObject(formData: FormData) {
  const obj: Record<string, unknown> = {};

  for (const [key, value] of formData.entries()) {
    set(obj, key, value);
  }

  return obj;
}

// ts-prune-ignore-next
export function experimental_createTRPCNextAppDirServer<
  TRouter extends AnyRouter,
>(opts: CreateTRPCNextAppRouterOptions<TRouter>) {
  const getClient = cache(() => {
    const config = opts.config();
    return createTRPCUntypedClient(config);
  });

  return createRecursiveProxy((callOpts) => {
    // lazily initialize client
    const client = getClient();

    const pathCopy = [...callOpts.path];
    const procedureType = clientCallTypeToProcedureType(
      pathCopy.pop() as string,
    );
    const fullPath = pathCopy.join(".");

    return (client[procedureType] as any)(fullPath, ...callOpts.args);
  }) as CreateTRPCProxyClient<TRouter>;
}

/**
 * @internal
 */
export type TRPCActionHandler<TDef extends ActionHandlerDef> = (
  input: TDef["input"] | FormData,
) => Promise<TRPCResponse<TDef["output"], TDef["errorShape"]>>;

export function experimental_createServerActionHandler<
  TInstance extends {
    _config: AnyRootConfig;
  },
>(
  t: TInstance,
  opts: {
    createContext: () => MaybePromise<TInstance["_config"]["$types"]["ctx"]>;
    /**
     * Transform form data to a `Record` before passing it to the procedure
     * @default true
     */
    normalizeFormData?: boolean;
  },
) {
  const config = t._config;

  const { normalizeFormData = true, createContext } = opts;

  const transformer = config.transformer as CombinedDataTransformer;

  // TODO allow this to take a `TRouter` in addition to a `AnyProcedure`
  return function createServerAction<TProc extends AnyProcedure>(
    proc: TProc,
  ): TRPCActionHandler<Simplify<inferActionDef<TProc>>> {
    return async function actionHandler(
      rawInput: inferProcedureInput<TProc> | FormData,
    ) {
      const ctx: undefined | TInstance["_config"]["$types"]["ctx"] = undefined;
      try {
        const ctx = await createContext();
        if (normalizeFormData && isFormData(rawInput)) {
          // Normalizes formdata so we can use `z.object({})` etc on the server
          try {
            rawInput = formDataToObject(rawInput);
          } catch {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to convert FormData to an object",
            });
          }
        } else if (rawInput && !isFormData(rawInput)) {
          rawInput = transformer.input.deserialize(rawInput);
        }

        const data = await proc({
          input: undefined,
          ctx,
          path: "serverAction",
          rawInput,
          type: proc._type,
        });

        const transformedJSON = transformTRPCResponse(config, {
          result: {
            data,
          },
        });
        return transformedJSON;
      } catch (cause) {
        const error = getTRPCErrorFromUnknown(cause);
        const shape = getErrorShape({
          config,
          ctx,
          error,
          input: rawInput,
          path: "serverAction",
          type: proc._type,
        });

        // TODO: send the right HTTP header?!

        return transformTRPCResponse(t._config, {
          error: shape,
        });
      }
    } as TRPCActionHandler<inferActionDef<TProc>>;
  };
}

export function experimental_createServerActionRouter<
  TInstance extends {
    _config: AnyRootConfig;
  },
>(
  t: TInstance,
  opts: {
    createContext: () => MaybePromise<TInstance["_config"]["$types"]["ctx"]>;
    /**
     * Transform form data to a `Record` before passing it to the procedure
     * @default true
     */
    normalizeFormData?: boolean;
  },
) {
  const config = t._config;

  const { normalizeFormData = true, createContext } = opts;

  const transformer = config.transformer as CombinedDataTransformer;

  // TODO allow this to take a `TRouter` in addition to a `AnyProcedure`
  return function createServerAction<TRouter extends AnyRouter>(
    router: TRouter,
  ): CreateTRPCProxyClient<TRouter> {
    return createRecursiveProxy(async ({ path, args }) => {
      const pathCopy = [...path];
      const procedureType = clientCallTypeToProcedureType(
        pathCopy.pop() as string,
      );
      const fullPath = pathCopy.join(".");

      const ctx: undefined | TInstance["_config"]["$types"]["ctx"] = undefined;
      let rawInput = args[0];

      try {
        const ctx = await createContext();
        if (normalizeFormData && isFormData(rawInput)) {
          // Normalizes formdata so we can use `z.object({})` etc on the server
          try {
            rawInput = formDataToObject(rawInput);
          } catch {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to convert FormData to an object",
            });
          }
        } else if (rawInput && !isFormData(rawInput)) {
          rawInput = transformer.input.deserialize(rawInput);
        }

        const data = await callProcedure({
          procedures: router._def.procedures,
          path: fullPath,
          rawInput,
          ctx,
          type: procedureType,
        });

        const transformedJSON = transformTRPCResponse(config, {
          result: {
            data,
          },
        });
        return transformedJSON;
      } catch (cause) {
        const error = getTRPCErrorFromUnknown(cause);
        const shape = getErrorShape({
          config,
          ctx,
          error,
          input: rawInput,
          path: fullPath,
          type: procedureType,
        });

        // TODO: send the right HTTP header?!

        return transformTRPCResponse(t._config, {
          error: shape,
        });
      }
    }) as CreateTRPCProxyClient<TRouter>;
  };
}
