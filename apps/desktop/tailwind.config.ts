import type { Config } from "tailwindcss";

import baseConfig from "@acme/tailwind-config";

export default {
  darkMode: "class",
  content: ["./src/**/*.tsx", "./node_modules/@acme/ui/**/*.tsx"],
  presets: [baseConfig],
} satisfies Config;
