import type React from "react";
import { useArgs } from "@storybook/preview-api";
import { type Args, type ArgTypes, type Meta } from "@storybook/react";

type InputType = ArgTypes[keyof ArgTypes];

export type AppendToObjectKeys<T extends object, S extends string> = {
  [K in keyof T as `${S}.${K & string}`]: T[K];
};

export type RemoveFromObjectKeys<T extends object, S extends string> = {
  [K in keyof T as K extends `${S}.${infer R}` ? R : K]: T[K];
};

export const appendKey = <T extends object, S extends string>(
  key: S,
  obj?: T,
): AppendToObjectKeys<T, S> => {
  const result = {} as AppendToObjectKeys<T, S>;
  for (const k in obj) {
    result[`${key}.${k}` as keyof AppendToObjectKeys<T, S>] = obj[
      k
    ] as AppendToObjectKeys<T, S>[keyof AppendToObjectKeys<T, S>];
  }
  return result;
};

export type SubComponentMeta<T extends string, TComponent extends React.FC> = {
  title: T;
  component: TComponent;
  args?: React.ComponentProps<TComponent>;
  argTypes?: {
    [key in keyof React.PropsWithoutRef<TComponent>]: InputType;
  };
};

export function createSubComponentStory<T extends Args>(component: Meta<T>) {
  const argTypes = Object.keys(component.argTypes ?? {}).reduce((acc, key) => {
    const argType = component.argTypes?.[key] as InputType;
    const tempKey = `${component.title}.${key}`;

    acc[tempKey] = {
      ...argType,
      name: argType.name ?? key,
    };

    return acc;
  }, {} as ArgTypes);

  const args = Object.keys(component.args ?? {}).reduce((acc, key) => {
    const arg = component.args?.[key] as string;
    const tempKey = `${component.title}.${key}`;
    acc[tempKey] = arg;

    return acc;
  }, {} as Args);

  return {
    ...component,
    argTypes,
    args,
  };
}

type MetaComponentArgs<T extends Meta> = React.ComponentProps<
  NonNullable<T["component"]>
>;

export function useSubComponentArgs<T extends Meta>(component: T) {
  const [args, updateArgs] = useArgs();
  const subComponentArgs = Object.keys(args ?? {}).reduce((acc, key) => {
    const comp = key.split(".");
    if (comp.length === 2) {
      const [componentName, argName] = comp as [
        string,
        keyof typeof component.args,
      ];
      if (componentName === component.title) {
        acc[argName] = args?.[key] as string;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return acc;
  }, {} as MetaComponentArgs<T>);

  function updateSubComponentArgs(
    subComponentArgs: Partial<MetaComponentArgs<T>>,
  ) {
    const newArgs = Object.keys(subComponentArgs).reduce((acc, key) => {
      const tempKey = `${component.title}.${key}`;
      acc[tempKey] = subComponentArgs?.[key];

      return acc;
    }, {} as Args);

    updateArgs(newArgs);
  }

  return [subComponentArgs, updateSubComponentArgs] as const;
}
