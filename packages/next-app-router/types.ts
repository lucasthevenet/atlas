import type {
  AnyMutationProcedure,
  AnyProcedure,
  AnyQueryProcedure,
  AnyRouter,
  AnySubscriptionProcedure,
  ProcedureArgs,
  ProcedureRouterRecord,
  inferProcedureInput,
  inferProcedureOutput,
} from "@trpc/server";
import { type inferTransformedProcedureOutput } from "@trpc/server/shared";

export type Resolver<TProcedure extends AnyProcedure> = (
  ...args: ProcedureArgs<TProcedure["_def"]>
) => Promise<inferTransformedProcedureOutput<TProcedure>>;

export type QueryResolver<TProcedure extends AnyProcedure> = (
  input: inferProcedureInput<TProcedure>,
  opts?: {
    revalidate?: number | false;
  },
) => Promise<inferProcedureOutput<TProcedure>>;

export type DecorateProcedure<TProcedure extends AnyProcedure> =
  TProcedure extends AnyQueryProcedure
    ? {
        query: QueryResolver<TProcedure>;
        revalidate(): void;
      }
    : TProcedure extends AnyMutationProcedure
    ? {
        mutate: Resolver<TProcedure>;
      }
    : TProcedure extends AnySubscriptionProcedure
    ? {
        subscribe: Resolver<TProcedure>;
      }
    : never;

export type DecoratedProcedureRecord<
  TProcedures extends ProcedureRouterRecord,
> = {
  [TKey in keyof TProcedures]: TProcedures[TKey] extends AnyRouter
    ? DecoratedProcedureRecord<TProcedures[TKey]["_def"]["record"]>
    : TProcedures[TKey] extends AnyProcedure
    ? DecorateProcedure<TProcedures[TKey]>
    : never;
};
