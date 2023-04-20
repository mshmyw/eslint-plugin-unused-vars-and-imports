module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "vars-demo",
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "vars-demo/no-raw-number-calculation": 'error'
    }
}
