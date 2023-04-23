module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [],
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "unused-vars-and-imports"
    ],
    rules: {
        "no-unused-vars": "off",
        "unused-vars-and-imports/no-unused-imports": "error",
        "unused-vars-and-imports/no-unused-vars": "error"
      },
}
