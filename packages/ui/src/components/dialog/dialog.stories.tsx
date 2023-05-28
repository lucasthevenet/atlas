import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Dialog",
  component: Dialog,
  argTypes: {
    open: {
      control: "boolean",
    },
    onOpenChange: {
      action: "clicked",
    },
    defaultOpen: {
      control: "boolean",
    },
  },
  args: {
    defaultOpen: false,
    open: true,
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const demo: Story = {
  name: "Default",

  render: function Render({ onOpenChange, ...args }) {
    const [{ open }, setArgs] = useArgs();

    const handleOpenChange = (nextOpen: boolean) => {
      onOpenChange?.(nextOpen);
      setArgs({ open: nextOpen });
    };

    return (
      <Dialog {...args} open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="secondary">Show Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              color="gray"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => handleOpenChange(false)}>
              Delete my account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const withForm: Story = {
  name: "With Form",

  render: function Render({ onOpenChange, ...args }) {
    const [{ open }, setArgs] = useArgs();

    const handleOpenChange = (nextOpen: boolean) => {
      onOpenChange?.(nextOpen);
      setArgs({ open: nextOpen });
    };

    return (
      <Dialog {...args} open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="secondary">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};
