module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-use-before-define": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["warn"],
    "import/prefer-default-export": "off",
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "react/button-has-type": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "import/no-extraneous-dependencies": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "import/order": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  globals: {
    JSX: true,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-undef": "off",
      },
    },
  ],
};
