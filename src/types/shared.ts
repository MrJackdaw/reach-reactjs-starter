import { DefaultTheme } from "styled-components";

export const ConnectionPropKeys = [
  "address",
  "error",
  "loading",
  "account",
];

export type ConnectionProps = {
  address?: string;
  error?: string | any | null;
  loading?: boolean;
  account?: any | null;
};

export type UIThemeType = "Dark" | "Light";

export type UITheme = DefaultTheme & {
  sizes: {
    xxs: string;
    xs: string;
    sm: string;
    default: string;
    md: string;
    lg: string;
    xlg: string;
    xxlg: string;
  };

  colors: {
    accent: string;
    bgColor: string;
    error: string;
    primary: string;
    secondary: string;
    warning: string;
  };

  presets: {
    elevated: { md(t: UITheme): string };
    rounded: {
      md(t: UITheme): string;
      lg(t: UITheme): string;
    };
  };
};
