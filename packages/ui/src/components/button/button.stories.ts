import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button CTA",
  },
  argTypes: {
    variant: {
      control: "select",
    },
    size: {
      control: "select",
    },
    destructive: {
      control: "boolean",
      defaultValue: false,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    destructive: false,
  },
};

export const secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    destructive: false,
  },
};

export const tertiary: Story = {
  args: {
    variant: "tertiary",
    size: "md",
    destructive: false,
  },
};
export const link: Story = {
  args: {
    variant: "link",
    size: "md",
    destructive: false,
  },
};

export const large: Story = {
  args: {
    size: "lg",
  },
};

export const small: Story = {
  args: {
    size: "sm",
  },
};
