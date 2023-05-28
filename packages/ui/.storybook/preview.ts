import { withThemeByDataAttribute } from "@storybook/addon-styling";
import type { Decorator, Preview } from "@storybook/react";
import { themes } from "@storybook/theming";

import "../src/styles/global.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      actions: { argTypesRegex: "^on[A-Z].*" },
    },
    layout: "centered",
    docs: {
      theme: themes.dark,
    },
    backgrounds: { disable: true },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "dark",
      attributeName: "data-mode",
      parentSelector: "html",
    }) as Decorator,
  ],
};

export default preview;
