import { useArgs } from "@storybook/preview-api";
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { addDays, eachDayOfInterval } from "date-fns";

import { DatePicker } from "./date-picker";

// @ts-expect-error
const handleDateChange = function Component(Story, ctx) {
  const [, setArgs] = useArgs<typeof ctx.args>();
  const onSelect = (selected: unknown) => {
    ctx.args.onSelect?.(selected);
    if (ctx.args.selected !== undefined) {
      setArgs({ selected });
    }
  };

  return (
    <Story
      args={{
        ...ctx.args,
        onSelect,
      }}
    />
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  decorators: [handleDateChange],
  args: {
    mode: "default",
    showOutsideDays: true,
    selected: new Date(),
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
    onSelect: {
      action: "onSelect",
    },
    selected: {
      control: "date",
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const $default: Story = {
  name: "Default",
  args: {
    mode: "default",
    selected: new Date(),
  },
};

export const single: Story = {
  name: "Single",
  args: {
    mode: "single",
    selected: new Date(),
  },
};

export const multiple: Story = {
  name: "Multiple",
  args: {
    mode: "multiple",
    selected: eachDayOfInterval({
      start: new Date(),
      end: addDays(new Date(), 5),
    }),
  },
};

export const range: Story = {
  name: "Range",
  args: {
    mode: "range",
    selected: {
      from: new Date(),
      to: addDays(new Date(), 5),
    },
  },
};
