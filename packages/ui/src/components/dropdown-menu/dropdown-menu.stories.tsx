import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  createSubComponentStory,
  useSubComponentArgs,
} from "../../utils/subcomponents";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  argTypes: {
    open: {
      control: "boolean",
      description:
        "The controlled open state of the dropdown menu. Must be used in conjunction with onOpenChange.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    onOpenChange: {
      action: "onOpenChange",
      description:
        "Event handler called when the open state of the dropdown menu changes.",
      table: {
        type: {
          summary: "function",
          detail: "(open: boolean) => void",
        },
      },
    },
    defaultOpen: {
      control: "boolean",
      description:
        "The open state of the dropdown menu when it is initially rendered. Use when you do not need to control its open state.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    modal: {
      control: "boolean",
      description:
        "The modality of the dropdown menu. When set to true, interaction with outside elements will be disabled and only menu content will be visible to screen readers.",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "true",
        },
      },
    },
  },
  tags: ["autodocs"],
  args: {
    defaultOpen: false,
    modal: true,
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const demo: Story = {
  name: "Default",
  args: { open: false },
  render: function Render({ onOpenChange, ...args }, ctx) {
    const [{ open }, setArgs] = useArgs<typeof ctx.args>();

    const handleOpenChange = (nextOpen: boolean) => {
      onOpenChange?.(nextOpen);
      setArgs({ open: nextOpen });
    };

    return (
      <DropdownMenu {...args} open={open} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" color="gray">
            Open
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Keyboard className="mr-2 h-4 w-4" />
              <span>Keyboard shortcuts</span>
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              <span>Team</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Invite users</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Message</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>More...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>New Team</span>
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Cloud className="mr-2 h-4 w-4" />
            <span>API</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

const checkboxItem = createSubComponentStory({
  title: "Components/DropdownMenu/CheckboxItem",
  component: DropdownMenuCheckboxItem,
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked or not.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    onCheckedChange: {
      action: "onCheckedChange",
      description:
        "Event handler called when the checkbox is checked or unchecked.",
      table: {
        type: {
          summary: "function",
          detail: "(checked: boolean) => void",
        },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled or not.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
  },
  args: {
    checked: false,
    disabled: false,
  },
});

export const withForm: Story = {
  name: "With Checkbox",
  // @ts-expect-error fix later
  args: {
    ...checkboxItem.args,
  },
  argTypes: {
    ...checkboxItem.argTypes,
  },
  render: function Render({ onOpenChange, ...args }, ctx) {
    const [{ open }, setArgs] = useArgs<typeof ctx.args>();
    const [{ checked, onCheckedChange }, setCheckboxArgs] =
      useSubComponentArgs(checkboxItem);

    const handleOpenChange = (nextOpen: boolean) => {
      onOpenChange?.(nextOpen);
      setArgs({ open: nextOpen });
    };

    const handleCheckedChange = (nextChecked: boolean) => {
      onCheckedChange?.(nextChecked);
      setCheckboxArgs({ checked: nextChecked });
    };

    return (
      <DropdownMenu {...args} open={open} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" color="gray">
            Open
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={checked}
            onCheckedChange={handleCheckedChange}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checked}
            onCheckedChange={handleCheckedChange}
            disabled
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checked}
            onCheckedChange={handleCheckedChange}
          >
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
