import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { type SelectSingleEventHandler } from "react-day-picker";

import { DatePicker } from "./date-picker";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  render: function Render({ onChange, ...args }, ctx) {
    const [{ value }, updateArgs] = useArgs<typeof ctx.args>();

    const handleChange: SelectSingleEventHandler = (
      day,
      selectedDay,
      activeModifiers,
      e,
    ) => {
      onChange?.(day, selectedDay, activeModifiers, e);
      updateArgs({ value: day });
    };

    return <DatePicker {...args} onChange={handleChange} value={value} />;
  },
  argTypes: {
    showOutsideDays: {
      control: "boolean",
      type: "boolean",
      defaultValue: true,
    },
    onChange: {
      action: "onChange",
    },
    value: {
      control: "date",
      defaultValue: new Date(),
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const $default: Story = {
  name: "Example",
  args: {
    value: new Date(),
  },
};
