module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "no-undef": "off", // Вимикаємо правило no-undef
        "@typescript-eslint/no-empty-interface": "off", // Вимикаємо правило no-empty-interface
        "@typescript-eslint/explicit-module-boundary-types": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "prettier/prettier": ["warn", { endOfLine: "auto", tabWidth: 4 }],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
