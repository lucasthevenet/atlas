import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "../label";
import { RadioGroup, RadioGroupItem } from "./radio-group";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const $default: Story = {
  name: "Default",
  render: (args) => (
    <RadioGroup defaultValue="option-one" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  ),
};
