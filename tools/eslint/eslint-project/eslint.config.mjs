import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import {
  avoidName,
  avoidUsingEval,
  avoidMoreThaThreeArgs,
} from "./src/custom-rules.js";

export default defineConfig([
  {
    name: "JavaScript Files",
    ignores: ["**/dist/**", "**/node_modules/**"],
    basePath: "./src",
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      custom: {
        rules: {
          "avoid-name": avoidName,
          "avoid-eval": avoidUsingEval,
          "avoid-more-than-three-args": avoidMoreThaThreeArgs,
        },
      },
    },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-unused-vars": "off",
      semi: "error",
      "custom/avoid-name": "error",
      "custom/avoid-eval": "error",
      "custom/avoid-more-than-three-args": "error",
    },
  },
]);
