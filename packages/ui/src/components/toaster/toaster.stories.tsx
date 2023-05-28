import type { Meta, StoryObj } from "@storybook/react";

import { Toaster } from "./toaster";

const meta = {
  title: "Components/Toaster",
  component: Toaster,
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const $default: Story = {
  name: "Default",
};
