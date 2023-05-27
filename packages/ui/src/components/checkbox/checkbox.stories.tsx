import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./checkbox";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  decorators: [
    function addState(Story, ctx) {
      const [{ checked }, setArgs] = useArgs<typeof ctx.args>();

      function onCheckedChange(checked: boolean) {
        ctx.args.onCheckedChange?.(checked);
        setArgs({ checked });
      }

      return (
        <Story {...ctx} args={{ ...ctx.args, checked, onCheckedChange }} />
      );
    },
  ],
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
    checked: false,
    defaultChecked: false,
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const demo: Story = {
  name: "Default",
  render: function Render(args) {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" {...args} />
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
  render: function Render(args) {
    return (
      <div className="items-top flex space-x-2">
        <Checkbox id="terms1" {...args} />
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
  render: function Render(args) {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms2" {...args} disabled />
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
