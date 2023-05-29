import type { Meta, StoryObj } from "@storybook/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const $default: Story = {
  name: "Default",
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="text-gray-900 dark:text-gray-200">
        Make changes to your account here.
      </TabsContent>
      <TabsContent
        value="password"
        className="text-gray-900 dark:text-gray-200"
      >
        Change your password here.
      </TabsContent>
    </Tabs>
  ),
};
