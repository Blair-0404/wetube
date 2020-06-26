module.exports = {
    "env": {
        "es2020": true
    },
    "extends": [
        "airbnb-base", "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "no-console":"off"
    }
};
