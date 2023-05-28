import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { CalendarDays } from "lucide-react";

import {
  createSubComponentStory,
  useSubComponentArgs,
} from "../../utils/subcomponents";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

const content = createSubComponentStory({
  title: "Content",
  component: HoverCardContent,
  args: {
    forceMount: false as true,
    side: "bottom",
  },
  argTypes: {
    forceMount: {
      control: "boolean",
      table: {
        category: "Content",
        subcategory: "Prop",
        type: {
          summary: "boolean",
        },
      },
    },
    side: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
      description: "The side of the trigger the hover card should appear on.",
      table: {
        category: "Content",
        subcategory: "Prop",
        type: {
          summary: "enum",
          detail: '"top" | "right" | "bottom" | "left"',
        },
        defaultValue: {
          summary: "bottom",
        },
      },
    },
  },
});

const trigger = createSubComponentStory({
  title: "Trigger",
  component: HoverCardTrigger,
  args: {
    asChild: false,
  },
  argTypes: {
    asChild: {
      control: "null",
      description:
        "Change the default rendered element for the one passed as a child, merging their props and behavior.",
      table: {
        category: "Trigger",
        subcategory: "Prop",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
  },
});

type RootStory = StoryObj<Meta<typeof HoverCard>>;

const root: RootStory = {
  argTypes: {
    open: {
      control: "boolean",
      description:
        "The controlled open state of the hover card. Must be used in conjunction with onOpenChange.",
      table: {
        category: "Root",
        subcategory: "Prop",
        type: {
          summary: "boolean",
        },
      },
    },
    onOpenChange: {
      action: "onOpenChange",
      description:
        "Event handler called when the open state of the hover card changes.",
      table: {
        category: "Root",
        subcategory: "Prop",
        type: {
          summary: "(open: boolean) => void",
        },
      },
    },
    defaultOpen: {
      control: "boolean",
      description:
        "The open state of the hover card when it is initially rendered. Use when you do not need to control its open state.",
      table: {
        category: "Root",
        subcategory: "Prop",
        type: {
          summary: "boolean",
        },
      },
    },
    openDelay: {
      control: "number",
      description:
        "The duration from when the mouse enters the trigger until the hover card opens.",
      table: {
        category: "Root",
        subcategory: "Prop",
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "700",
        },
      },
    },
    closeDelay: {
      control: "number",
      description:
        "The duration from when the mouse leaves the trigger or content until the hover card closes.",
      table: {
        category: "Root",
        subcategory: "Prop",
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "300",
        },
      },
    },
  },
  args: {
    defaultOpen: false,
    openDelay: 700,
    closeDelay: 300,
  },
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  argTypes: {
    ...root.argTypes,
    ...content.argTypes,
    ...trigger.argTypes,
  },
  args: {
    ...root.args,
    ...content.args,
    ...trigger.args,
  },
} satisfies Meta<typeof HoverCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const basic: Story = {
  name: "Basic",
  args: { open: false },
  render: function Render({ onOpenChange, ...args }) {
    const [contentArgs] = useSubComponentArgs(content);
    const [triggerArgs] = useSubComponentArgs(trigger);
    const [{ open }, setArgs] = useArgs();

    const handleOpenChange = (nextOpen: boolean) => {
      onOpenChange?.(nextOpen);
      setArgs({ open: nextOpen });
    };

    return (
      <HoverCard {...args} open={open} onOpenChange={handleOpenChange}>
        <HoverCardTrigger
          className="text-gray-900 dark:text-gray-200"
          {...triggerArgs}
        >
          Hover
        </HoverCardTrigger>
        <HoverCardContent {...contentArgs}>
          The React Framework – created and maintained by @vercel.
        </HoverCardContent>
      </HoverCard>
    );
  },
};

export const userCard: Story = {
  name: "User Card",
  render: function Render({ onOpenChange, ...args }) {
    const [contentArgs] = useSubComponentArgs(content);
    const [triggerArgs] = useSubComponentArgs(trigger);
    const [{ open }, setArgs] = useArgs();

    const handleOpenChange = (nextOpen: boolean) => {
      onOpenChange?.(nextOpen);
      setArgs({ open: nextOpen });
    };

    return (
      <HoverCard {...args} open={open} onOpenChange={handleOpenChange}>
        <HoverCardTrigger {...triggerArgs} asChild>
          <Button variant="link" color="gray">
            @nextjs
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80" {...contentArgs}>
          <div className="flex justify-between space-x-4 text-gray-900 dark:text-gray-200">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@nextjs</h4>
              <p className="text-sm">
                The React Framework – created and maintained by @vercel.
              </p>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Joined December 2021
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  },
};
