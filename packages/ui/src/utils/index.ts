import {
  cx,
  type CxOptions,
  type VariantProps,
} from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: CxOptions) {
  return twMerge(cx(inputs));
}

type NonNullable<T> = T extends boolean ? boolean : Exclude<T, null>;

type NoNullField<T> = T extends Record<string, unknown>
  ? {
      [P in keyof T]?: NoNullField<NonNullable<T[P]>>;
    }
  : NonNullable<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NonNullableVariantProps<T extends (...args: any) => any> =
  NoNullField<VariantProps<T>>;
