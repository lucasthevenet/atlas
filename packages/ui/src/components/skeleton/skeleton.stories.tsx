import type { Meta, StoryObj } from "@storybook/react";

import { Skeleton } from "./skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const $default: Story = {
  name: "Default",
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" {...args} />
        <Skeleton className="h-4 w-[200px]" {...args} />
      </div>
    </div>
  ),
};
