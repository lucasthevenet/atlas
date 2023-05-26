import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@acme/ui/button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "link"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl"],
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
    children: "Button",
    size: "md",
    destructive: false,
  },
};

export const secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
    size: "md",
    destructive: false,
  },
};

export const tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "Button",
    size: "md",
    destructive: false,
  },
};
export const link: Story = {
  args: {
    variant: "link",
    children: "Button",
    size: "md",
    destructive: false,
  },
};

export const large: Story = {
  args: {
    size: "lg",
    children: "Button",
  },
};

export const small: Story = {
  args: {
    size: "sm",
    children: "Button",
  },
};
