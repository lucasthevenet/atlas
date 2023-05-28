import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "../label";
import { Input } from "./input";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Input",
  component: Input,
  render: function Render({ onChange, ...args }, ctx) {
    const [{ value }, updateArgs] = useArgs<typeof ctx.args>();

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
      onChange?.(evt);
      updateArgs({ value: evt.target.value });
    }

    return <Input {...args} onChange={(e) => handleChange(e)} value={value} />;
  },
  argTypes: {
    onChange: {
      action: "onChange",
    },
    value: {
      control: "text",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const $default: Story = {
  name: "Default",
  args: {
    value: "Hello World",
  },
};

export const disabled: Story = {
  name: "Disabled",
  args: {
    value: "Hello World",
    disabled: true,
  },
};

export const withLabel: Story = {
  name: "With Label",
  args: {
    value: "Hello World",
  },
  render: function Render({ onChange, ...args }, ctx) {
    const [{ value }, updateArgs] = useArgs<typeof ctx.args>();

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
      onChange?.(evt);
      updateArgs({ value: evt.target.value });
    }

    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email-2">Email</Label>
        <Input
          type="email"
          id="email-2"
          placeholder="Email"
          {...args}
          onChange={handleChange}
          value={value}
        />
        <p className="text-sm text-gray-500">Enter your email address.</p>
      </div>
    );
  },
};

export const withText: Story = {
  name: "With Text",
  args: {
    value: "Hello World",
  },
  render: function Render({ onChange, ...args }, ctx) {
    const [{ value }, updateArgs] = useArgs<typeof ctx.args>();

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
      onChange?.(evt);
      updateArgs({ value: evt.target.value });
    }

    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email-2">Email</Label>
        <Input
          type="email"
          id="email-2"
          placeholder="Email"
          {...args}
          onChange={handleChange}
          value={value}
        />
        <p className="text-sm text-gray-500">Enter your email address.</p>
      </div>
    );
  },
};

export const File: Story = {
  name: "File",
  args: {
    type: "file",
  },
  render: function Render({ onChange, ...args }, ctx) {
    const [{ value }, updateArgs] = useArgs<typeof ctx.args>();

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
      onChange?.(evt);
      updateArgs({ value: evt.target.value });
    }
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" {...args} onChange={handleChange} value={value} />
      </div>
    );
  },
};
