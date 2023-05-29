import type { Meta, StoryObj } from "@storybook/react";

import { Progress } from "./progress";

const meta = {
  title: "Components/Progress",
  component: Progress,
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: {
        type: "range",
        min: 0,
      },
    },
    max: {
      control: {
        type: "number",
        min: 0,
      },
    },
  },
  args: {
    value: 50,
    max: 100,
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const $default: Story = {
  name: "Default",
};
