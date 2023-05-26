import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./badge";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
    variant: "outline",
    color: "gray",
    size: "md",
    type: "pill",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      defaultValue: "outline",
    },
    type: {
      control: "inline-radio",
      defaultValue: "pill",
    },
    color: {
      control: "select",
      defaultValue: "gray",
    },
    size: {
      control: "inline-radio",
      defaultValue: "md",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const outline: Story = {
  args: {
    variant: "outline",
  },
};

export const solid: Story = {
  args: {
    variant: "solid",
  },
};
