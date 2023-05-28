import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { addDays, eachDayOfInterval } from "date-fns";
import {
  type DayPickerDefaultProps,
  type DayPickerMultipleProps,
  type DayPickerRangeProps,
  type DayPickerSingleProps,
  type SelectMultipleEventHandler,
  type SelectRangeEventHandler,
  type SelectSingleEventHandler,
} from "react-day-picker";

import { Calendar } from "./calendar";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  args: {
    showOutsideDays: true,
  },
  argTypes: {
    // mode: {
    //   control: "inline-radio",
    //   options: ["default", "multiple", "range", "single"],
    //   defaultValue: "default",
    // },
    showOutsideDays: {
      control: "boolean",
      defaultValue: true,
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type DefaultStory = StoryObj<Meta<React.FC<DayPickerDefaultProps>>>;

type SingleStory = StoryObj<Meta<React.FC<DayPickerSingleProps>>>;

type MultipleStory = StoryObj<Meta<React.FC<DayPickerMultipleProps>>>;

type RangeStory = StoryObj<Meta<React.FC<DayPickerRangeProps>>>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const $default: DefaultStory = {
  name: "Default",
  args: {
    mode: "default",
    selected: new Date(),
  },
};

export const single: SingleStory = {
  name: "Single",
  args: {
    mode: "single",
    selected: new Date(),
  },
  argTypes: {
    selected: {
      control: "date",
    },
  },
  render: function Render({ onSelect, ...args }, ctx) {
    const [{ selected }, setArgs] = useArgs<typeof ctx.args>();
    const handleSelect: SelectSingleEventHandler = (
      value,
      selectedDay,
      activeModifiers,
      e,
    ) => {
      onSelect?.(value, selectedDay, activeModifiers, e);
      setArgs({ selected: value });
    };

    return <Calendar {...args} selected={selected} onSelect={handleSelect} />;
  },
};

export const multiple: MultipleStory = {
  name: "Multiple",
  args: {
    mode: "multiple",
    selected: eachDayOfInterval({
      start: new Date(),
      end: addDays(new Date(), 5),
    }),
  },
  render: function Render({ onSelect, ...args }, ctx) {
    const [{ selected }, setArgs] = useArgs<typeof ctx.args>();
    const handleSelect: SelectMultipleEventHandler = (
      value,
      selectedDay,
      activeModifiers,
      e,
    ) => {
      onSelect?.(value, selectedDay, activeModifiers, e);
      setArgs({ selected: value });
    };

    return <Calendar {...args} selected={selected} onSelect={handleSelect} />;
  },
};

export const range: RangeStory = {
  name: "Range",
  args: {
    selected: {
      from: new Date(),
      to: addDays(new Date(), 5),
    },
    mode: "range",
  },
  argTypes: {
    selected: {
      control: "object",
    },
    mode: {
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Hello" },
      },
    },
  },
  render: function Render({ onSelect, ...args }, ctx) {
    const [{ selected }, setArgs] = useArgs<typeof ctx.args>();

    const handleSelect: SelectRangeEventHandler = (
      value,
      selectedDay,
      activeModifiers,
      e,
    ) => {
      onSelect?.(value, selectedDay, activeModifiers, e);
      setArgs({ selected: value });
    };

    return <Calendar {...args} selected={selected} onSelect={handleSelect} />;
  },
};
