import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { AspectRatio } from "./aspect-ratio";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  args: {
    asChild: false,
  },
  argTypes: {
    asChild: {
      defaultValue: false,
      description:
        "Change the default rendered element for the one passed as a child, merging their props and behavior.",
    },
    ratio: {
      control: "select",
      description: "The desired aspect ratio.",
      options: ["1", "4/3", "16/9", "21/9"],
      mapping: {
        1: 1,
        "4/3": 4 / 3,
        "16/9": 16 / 9,
        "21/9": 21 / 9,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
  render: (props) => (
    <AspectRatio {...props}>
      <img
        src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
        alt="unsplash"
        className="rounded-md w-full h-full object-cover"
      />
    </AspectRatio>
  ),
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const widescreen: Story = {
  args: {
    ratio: 16 / 9,
  },
};

export const square: Story = {
  args: {
    ratio: 1,
  },
};

export const portrait: Story = {
  args: {
    ratio: 4 / 3,
  },
};

export const custom: Story = {
  args: {
    ratio: 21 / 9,
  },
};
