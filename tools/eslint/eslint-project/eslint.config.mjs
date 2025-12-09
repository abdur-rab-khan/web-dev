import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    name: "JavaScript Files",
    ignores: ["**/dist/**", "**/node_modules/**"],
    basePath: "./src",
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-unused-vars": "off",
      semi: "error",
    },
  },
]);
