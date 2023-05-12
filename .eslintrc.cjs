/** @type {import("eslint").Linter.Config} */
module.exports = {
  overrides: [{
    extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
    files: ["*.ts", "*.tsx"],
    parserOptions: {
      project: "tsconfig.json"
    }
  }, {
    files: ["*.spect.ts", "*.spec.tsx"],
    rules: {
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off"
    }
  }],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  plugins: ["@typescript-eslint"],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended", "plugin:storybook/recommended"],
  rules: {
    "@typescript-eslint/consistent-type-imports": ["warn", {
      prefer: "type-imports",
      fixStyle: "inline-type-imports"
    }]
  }
};