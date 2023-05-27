import { withThemeByDataAttribute } from "@storybook/addon-styling";
import type { Preview } from "@storybook/react";
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
    docs: {
      theme: themes.dark,
    },
    backgrounds: { disable: true },
  },
};

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "dark",
    attributeName: "data-mode",
    parentSelector: "html",
  }),
];

export default preview;
