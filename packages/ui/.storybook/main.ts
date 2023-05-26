import { resolve } from "path";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-styling",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: [
          {
            find: "@acme/ui",
            replacement: resolve(__dirname, "../src/components"),
          },
          {
            find: "@acme/ui/utils",
            replacement: resolve(__dirname, "../src/utils"),
          },
        ],
      },
      // process is not defined bug [@storybook/builder-vite]https://github.com/storybookjs/storybook/issues/18920
      define: { "process.env": {} },
    });
  },
};
export default config;
