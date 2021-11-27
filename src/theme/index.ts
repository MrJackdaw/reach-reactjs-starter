import createState from "@jackcom/raphsducks";
import { createGlobalStyle } from "styled-components";
import { UITheme, UIThemeType } from "types/shared";
import DARK_THEME from "./theme.dark";
import LIGHT_THEME from "./theme.light";

const THEME_KEY = "app-theme";

/* Global Application Style Theme */
const THEME = {
  Dark: DARK_THEME,

  Light: LIGHT_THEME,

  GLOBAL: createGlobalStyle`
  body {
    background-color: ${({ theme: t }) => (t as UITheme).colors.bgColor};
    color: ${({ theme: t }) => (t as UITheme).colors.primary};
  
    a,
    .App-link {
      color: ${({ theme: t }) => (t as UITheme).colors.accent};
    }

    .accent { 
      background-color: ${({ theme: t }) => (t as UITheme).colors.accent}; 
    }
    .bgColor { 
      background-color: ${({ theme: t }) => (t as UITheme).colors.bgColor}; 
    }
    .error { 
      background-color: ${({ theme: t }) => (t as UITheme).colors.error}; 
    }
    .grey {
      background-color: #9c9c9c;
    }
    .primary { 
      background-color: ${({ theme: t }) => (t as UITheme).colors.primary}; 
    }
    .secondary { 
      background-color: ${({ theme: t }) => (t as UITheme).colors.secondary}; 
    }
    .warning { 
      background-color: ${({ theme: t }) => (t as UITheme).colors.warning}; 
    }
    .accent--text{ 
      color: ${({ theme: t }) => (t as UITheme).colors.accent}; 
    }
    .bgColor--text{ 
      color: ${({ theme: t }) => (t as UITheme).colors.bgColor}; 
    }
    .error--text{ 
      color: ${({ theme: t }) => (t as UITheme).colors.error}; 
    }
    .grey--text {
      color: #9c9c9c;
    }
    .primary--text{ 
      color: ${({ theme: t }) => (t as UITheme).colors.primary}; 
    }
    .secondary--text{ 
      color: ${({ theme: t }) => (t as UITheme).colors.secondary}; 
    }
    .warning--text{ 
      color: ${({ theme: t }) => (t as UITheme).colors.warning}; 
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
      (window.localStorage.getItem(THEME_KEY) || "Light") as UIThemeType
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
