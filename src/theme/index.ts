import createState from "@jackcom/raphsducks";
import { createGlobalStyle } from "styled-components";
import { UIThemeType } from "types/shared";
import DARK_THEME from "./theme.dark";
import LIGHT_THEME from "./theme.light";

const THEME_KEY = "app-theme";

/* Global Application Style Theme */
const THEME = {
  Dark: DARK_THEME,

  Light: LIGHT_THEME,

  GLOBAL: createGlobalStyle`
  body {
    background-color: ${({ theme: t }) => t.colors.bgColor};
    color: ${({ theme: t }) => t.colors.primary};
  
    a,
    .App-link {
      color: ${({ theme: t }) => t.colors.accent};
    }

    .accent { 
      background-color: ${({ theme: t }) => t.colors.accent}; 
    }
    .bgColor { 
      background-color: ${({ theme: t }) => t.colors.bgColor}; 
    }
    .bgGradient { 
      background-color: ${({ theme: t }) => t.colors.bgGradient}; 
    }
    .error { 
      background-color: ${({ theme: t }) => t.colors.error}; 
    }
    .grey {
      background-color: #9c9c9c;
    }
    .primary { 
      background-color: ${({ theme: t }) => t.colors.primary}; 
    }
    .secondary { 
      background-color: ${({ theme: t }) => t.colors.secondary}; 
    }
    .warning { 
      background-color: ${({ theme: t }) => t.colors.warning}; 
    }
    .accent--text{ 
      color: ${({ theme: t }) => t.colors.accent}; 
    }
    .bgColor--text{ 
      color: ${({ theme: t }) => t.colors.bgColor}; 
    }
    .error--text{ 
      color: ${({ theme: t }) => t.colors.error}; 
    }
    .grey--text {
      color: #9c9c9c;
    }
    .primary--text{ 
      color: ${({ theme: t }) => t.colors.primary}; 
    }
    .secondary--text{ 
      color: ${({ theme: t }) => t.colors.secondary}; 
    }
    .warning--text{ 
      color: ${({ theme: t }) => t.colors.warning}; 
    }
  }
  `,
};

export const themeState = createState({ theme: "" as UIThemeType });

/** Get current UI theme from local storage */
export function getTheme(): UIThemeType {
  const { theme } = themeState.getState();
  if (!theme.length) {
    return setTheme(
      (window.localStorage.getItem(THEME_KEY) || "Dark") as UIThemeType
    );
  }

  return theme;
}

/** Set current UI theme */
export function setTheme(newTheme: UIThemeType): UIThemeType {
  themeState.theme(newTheme);
  window.localStorage.setItem(THEME_KEY, newTheme);
  return newTheme;
}

export default THEME;
