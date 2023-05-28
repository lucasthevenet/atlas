import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { addDays } from "date-fns";
import { type SelectRangeEventHandler } from "react-day-picker";

import { DateRangePicker } from "./date-range-picker";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  render: function Render({ onChange, ...args }, ctx) {
    const [{ value }, updateArgs] = useArgs<typeof ctx.args>();

    const handleChange: SelectRangeEventHandler = (
      range,
      selectedDay,
      activeModifiers,
      e,
    ) => {
      onChange?.(range, selectedDay, activeModifiers, e);
      updateArgs({ value: range });
    };

    return <DateRangePicker {...args} onChange={handleChange} value={value} />;
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
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const $default: Story = {
  name: "Example",
  args: {
    value: {
      from: new Date(),
      to: addDays(new Date(), 7),
    },
  },
};
