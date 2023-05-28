import React from "react";
import { useArgs } from "@storybook/preview-api";
import { Args, ArgTypes, Meta } from "@storybook/react";

type InputType = ArgTypes[keyof ArgTypes];

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
    const arg = component.args?.[key];
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
        acc[argName] = args?.[key];
      }
    }

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
