module.exports = {
  root: true,
  env: {
    node: true
  },
  "extends": [
    "plugin:vue/essential",
    "@vue/standard",
    "@vue/typescript"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "comma-dangle": ["warn", "only-multiline"],
    "quotes": ["error", "double"],
    "space-before-function-paren": ["warn", "never"],
    "semi": ["warn", "always"],
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
