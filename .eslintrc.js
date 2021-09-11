module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "airbnb",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
  },
};
