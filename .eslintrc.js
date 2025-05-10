module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // Evita o uso de console.log e debugger
        "no-console": ["error", { "allow": ["warn", "error"] }],
        "no-debugger": "error",
    }
};
