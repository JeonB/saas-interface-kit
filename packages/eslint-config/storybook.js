import { config as reactInternalConfig } from "./react-internal.js";

/**
 * ESLint for Storybook apps: same as react-internal, but stories often use
 * hooks inside CSF `render` functions (not valid component names for the hooks plugin).
 *
 * @type {import("eslint").Linter.Config}
 */
export const config = [
  ...reactInternalConfig,
  {
    rules: {
      "react-hooks/rules-of-hooks": "off",
    },
  },
];
