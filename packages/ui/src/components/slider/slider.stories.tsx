import type { Meta, StoryObj } from "@storybook/react";

import { Slider } from "./slider";

const meta = {
  title: "Components/Slider",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-60">
        <Story />
      </div>
    ),
  ],
  component: Slider,
  argTypes: {
    value: {
      control: "number",
      description: "The controlled value of the slider.",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    defaultValue: {
      control: "number",
      description:
        "The default value of the slider when it is initially rendered. Use when you do not need to control its value.",
      table: {
        type: {
          summary: "number[]",
        },
      },
    },
    min: {
      control: "number",
      description: "The minimum value of the slider.",
      table: {
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "0",
        },
      },
    },
    max: {
      control: "number",
      description: "The maximum value of the slider.",
      table: {
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "100",
        },
      },
    },
    step: {
      control: "number",
      description: "The step value of the slider.",
      table: {
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "1",
        },
      },
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const $default: Story = {
  name: "Default",
};
