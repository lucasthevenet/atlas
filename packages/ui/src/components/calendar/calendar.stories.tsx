import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DateRange } from "react-day-picker";

import { Calendar } from "./calendar";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  args: {
    mode: "default",
    showOutsideDays: true,
  },
  argTypes: {
    mode: {
      control: "inline-radio",
      options: ["default", "multiple", "range", "single"],
      defaultValue: "default",
    },
    showOutsideDays: {
      control: "boolean",
      defaultValue: true,
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const $default: Story = {
  name: "Default",
  args: {
    mode: "default",
  },
};

export const single: Story = {
  name: "Single",
  args: {
    mode: "single",
  },
  render: ({ mode, ...args }) => {
    const [selected, setSelected] = useState<Date>();
    return (
      <Calendar
        {...args}
        mode="single"
        selected={selected}
        onSelect={setSelected}
      />
    );
  },
};

export const multiple: Story = {
  name: "Multiple",
  args: {
    mode: "multiple",
  },
  render: ({ mode, ...args }) => {
    const [selected, setSelected] = useState<Date[]>();
    return (
      <Calendar
        {...args}
        mode="multiple"
        selected={selected}
        onSelect={setSelected}
      />
    );
  },
};

export const range: Story = {
  name: "Range",
  args: {
    mode: "range",
  },
  render: ({ mode, ...args }) => {
    const [selected, setSelected] = useState<DateRange>();
    return (
      <Calendar
        {...args}
        mode="range"
        selected={selected}
        onSelect={setSelected}
      />
    );
  },
};
