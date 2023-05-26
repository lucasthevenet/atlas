import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@acme/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx,mdx}", "../../packages/ui/src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
  presets: [baseConfig],
} satisfies Config;
