import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";

type FontSize =
  | ResolvableTo<
      KeyValuePair<
        string,
        | string
        | [fontSize: string, lineHeight: string]
        | [
            fontSize: string,
            configuration: Partial<{
              lineHeight: string;
              letterSpacing: string;
              fontWeight: string | number;
            }>,
          ]
      >
    >
  | undefined;

export const fontSize: FontSize = {
  "7xl": [
    "4.5rem",
    {
      lineHeight: "5.625rem",
      letterSpacing: "-0.02em",
    },
  ],
  "6xl": [
    "3.75rem",
    {
      lineHeight: "4.5rem",
      letterSpacing: "-0.02em",
    },
  ],
  "5xl": [
    "3rem",
    {
      lineHeight: "3.75rem",
      letterSpacing: "-0.02em",
    },
  ],
  "4xl": [
    "2.25rem",
    {
      lineHeight: "2.75rem",
      letterSpacing: "-0.02em",
    },
  ],
  "3xl": ["1.875rem", "2.375rem"],
  "2xl": ["1.5rem", "2rem"],
  xl: ["1.25rem", "1.875rem"],
  lg: ["1.125rem", "1.75rem"],
  md: ["1rem", "1.5rem"],
  sm: ["0.875rem", "1.25rem"],
  xs: ["0.75rem", "1.125rem"],
};
