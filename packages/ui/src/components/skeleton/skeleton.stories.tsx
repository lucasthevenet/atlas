import type { Meta, StoryObj } from "@storybook/react";

import { Skeleton } from "./skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const $default: Story = {
  name: "Default",
};
