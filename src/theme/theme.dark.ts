import shared from "./theme.shared";

/**
 * Define the colors for your application's `dark` theme here.
 * When using styled components, the properties of `DARK_THEME`
 * can be accessed inline using the `theme` object, e.g.:
 *
 * border-color: ${({ theme }) => theme.colors.accent}; // #36b4c7
 */
const DARK_THEME = {
  colors: {
    accent: "#36b4c7",
    bgColor: "#282c34",
    semitransparent: "#7a7a7a42",
    error: "",
    primary: "#f7f7f7",
    secondary: "#001586",
    warning: ""
  },

  ...shared
};

export default DARK_THEME;
