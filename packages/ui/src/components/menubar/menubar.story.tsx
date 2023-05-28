import type { Meta, StoryObj } from "@storybook/react";

import { Menubar } from "./menubar";

const meta = {
  title: "Components/Menubar",
  component: Menubar,
} satisfies Meta<typeof Menubar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const $default: Story = {
  name: "Default",
};
