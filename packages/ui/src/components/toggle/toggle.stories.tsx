import type { Meta, StoryObj } from "@storybook/react";
import { Bold } from "lucide-react";

import { Toggle } from "./toggle";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const $default: Story = {
  name: "Default",
  args: {
    "aria-label": "Toggle italic",
    children: <Bold className="h-4 w-4" />,
  },
};
