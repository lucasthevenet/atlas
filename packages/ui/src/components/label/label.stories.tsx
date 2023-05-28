import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "../checkbox";
import { Label } from "./label";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Label",
  component: Label,

  argTypes: {
    children: {
      control: "text",
      table: { category: "Label", subcategory: "Prop" },
    },
    asChild: {
      control: null,
      description:
        "Change the default rendered element for the one passed as a child, merging their props and behavior.",
      table: {
        category: "Label",
        subcategory: "Prop",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    htmlFor: {
      control: null,
      description: "The id of the element the label is associated with.",
      table: {
        category: "Label",
        subcategory: "Prop",
        type: {
          summary: "string",
        },
      },
    },
  },
  args: {
    children: "Accept terms and conditions",
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const $default: Story = {
  name: "Default",
  args: {
    children: "Accept terms and conditions",
  },
};

export const withCheckbox: Story = {
  name: "With Checkbox",
  render: function Render({ children, ...args }) {
    return (
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms" {...args}>
            {children}
          </Label>
        </div>
      </div>
    );
  },
};
