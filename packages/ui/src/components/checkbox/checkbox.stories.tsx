import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./checkbox";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
    },
    onCheckedChange: {
      action: "onCheckedChange",
    },
    defaultChecked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    asChild: {
      control: false,
    },
  },
  args: {
    asChild: false,
    disabled: false,
    defaultChecked: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const demo: Story = {
  name: "Default",
  render: function Render({ onCheckedChange, ...args }, ctx) {
    const [{ checked }, setArgs] = useArgs<typeof ctx.args>();
    const onChecked = (value: boolean) => {
      onCheckedChange?.(value);
      setArgs({ checked: value });
    };

    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          {...args}
          checked={checked}
          onCheckedChange={onChecked}
        />
        <label
          htmlFor="terms"
          className="text-sm text-gray-900 dark:text-gray-200 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
    );
  },
};

export const withText: Story = {
  render: function Render({ onCheckedChange, ...args }, ctx) {
    const [{ checked }, setArgs] = useArgs<typeof ctx.args>();
    const onChecked = (value: boolean) => {
      onCheckedChange?.(value);
      setArgs({ checked: value });
    };
    return (
      <div className="items-top flex space-x-2">
        <Checkbox
          id="terms1"
          {...args}
          checked={checked}
          onCheckedChange={onChecked}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium text-gray-900 dark:text-gray-200 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
          <p className="text-sm text-gray-500">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    );
  },
};

export const disabled: Story = {
  args: {
    disabled: true,
  },
  render: function Render({ onCheckedChange, ...args }, ctx) {
    const [{ checked }, setArgs] = useArgs<typeof ctx.args>();
    const onChecked = (value: boolean) => {
      onCheckedChange?.(value);
      setArgs({ checked: value });
    };
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms2"
          {...args}
          checked={checked}
          onCheckedChange={onChecked}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms2"
            className="text-sm font-medium text-gray-900 dark:text-gray-200 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
      </div>
    );
  },
};
