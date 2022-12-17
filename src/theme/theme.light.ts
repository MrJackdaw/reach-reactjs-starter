import shared from "./theme.shared";

/**
 * Defines colors for your application's `light` theme. The properties
 * of `LIGHT_THEME` can be accessed inline when using styled components
 * using the `theme` object, e.g.:
 *
 * border-color: ${({ theme }) => theme.colors.accent}; // #36b4c7
 */
const LIGHT_THEME = {
  colors: {
    accent: "#36b4c7",
    bgColor: "#f7f7f7",
    semitransparent: "#ececec33",
    error: "",
    primary: "#282c34",
    secondary: "",
    warning: ""
  },

  ...shared
};

export default LIGHT_THEME;
