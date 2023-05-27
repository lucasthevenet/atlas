import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "../button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  decorators: [
    function addState(story) {
      const [{ open }, updateArgs] = useArgs();

      function onOpenChange(value: boolean) {
        action("onOpenChange")(value);
        updateArgs({ open: value });
      }

      return story({ open, onOpenChange });
    },
  ],
  argTypes: {
    open: {
      type: "boolean",
      description: "Whether the collapsible is open or not.",
      defaultValue: false,
    },
    onOpenChange: {
      action: "onOpenChange",
      description: "Callback when the collapsible is opened or closed.",
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the collapsible is open by default.",
    },
    asChild: {
      control: false,
    },
  },
  args: {
    defaultOpen: false,
    asChild: false,
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const basic: Story = {
  name: "Basic",
  render: (args) => (
    <Collapsible className="text-gray-900 dark:text-gray-200" {...args}>
      <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
      <CollapsibleContent>
        Yes. Free to use for personal and commercial projects. No attribution
        required.
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const styled: Story = {
  name: "Styled",
  render: (args) => (
    <Collapsible {...args} className="w-[350px] space-y-2 ">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="tertiary" size="sm" color="gray" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md text-gray-900 dark:text-gray-200 border  border-gray-200 dark:border-gray-800 px-4 py-3 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-800 px-4 py-3 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-800 px-4 py-3 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
