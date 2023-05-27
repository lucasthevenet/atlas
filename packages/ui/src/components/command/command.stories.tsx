import { useEffect } from "react";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Command",
  component: Command,
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

type DialogStory = StoryObj<Meta<typeof CommandDialog>>;

export const basic: Story = {
  name: "Basic",
  render: (args) => (
    <Command
      className="rounded-lg border border-gray-200 dark:border-gray-800 shadow-md"
      {...args}
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const withDialog: DialogStory = {
  name: "With Dialog",
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the dialog is open or not.",
    },
    onOpenChange: {
      action: "onOpenChange",
      description: "Callback when the dialog is opened or closed.",
    },
  },
  args: {
    open: false,
  },
  decorators: [
    function Component(Story, ctx) {
      const [, setArgs] = useArgs<typeof ctx.args>();

      const onOpenChange = (open: boolean) => {
        ctx.args.onOpenChange?.(open);
        if (ctx.args.open !== undefined) {
          setArgs({ open });
        }
      };

      useEffect(() => {
        const down = (e: KeyboardEvent) => {
          if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            onOpenChange(true);
          }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
      }, []);

      return (
        <>
          <p className="text-sm text-gray-600 dark:text-gray-500">
            Press{" "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 px-1.5 font-mono text-[10px] font-medium opacity-100">
              <span className="text-xs">⌘</span>J
            </kbd>
          </p>
          <Story
            args={{
              ...ctx.args,
              onOpenChange,
            }}
          />
        </>
      );
    },
  ],
  render: function Render(args) {
    return (
      <CommandDialog {...args}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    );
  },
};
