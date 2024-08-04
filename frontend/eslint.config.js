// @ts-check

import url from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import configPrettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginN from "eslint-plugin-n";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import * as pluginRegexp from "eslint-plugin-regexp";
import pluginVitest from "eslint-plugin-vitest";
import globals from "globals";
import tsEslint from "typescript-eslint";

const __dirname = url.fileURLToPath(new url.URL(".", import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

export default tsEslint.config(
    // register all of the plugins up-front
    {
        plugins: {
            "@typescript-eslint": tsEslint.plugin,
            import: pluginImport,
            "jsx-a11y": pluginJsxA11y,
            n: pluginN,
            "react-hooks": pluginReactHooks,
            react: pluginReact,
            regexp: pluginRegexp,
            vitest: pluginVitest,
        },
    },
    // ignores
    { ignores: ["node_modules", "build", "test_results", "coverage"] },
    // extends
    eslint.configs.recommended,
    ...tsEslint.configs.strictTypeChecked,
    ...tsEslint.configs.stylisticTypeChecked,
    // base config
    {
        languageOptions: {
            globals: {
                ...globals.es2021,
            },
            parserOptions: {
                project: ["./tsconfig.json", "./tsconfig.node.json"],
                tsconfigRootDir: __dirname,
            },
        },
        rules: {
            ...pluginRegexp.configs["flat/recommended"].rules,
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    args: "all",
                    argsIgnorePattern: "^_",
                    caughtErrors: "all",
                    caughtErrorsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                },
            ],
            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        ["sibling", "parent"],
                        "index",
                        "object",
                        "type",
                    ],
                    "newlines-between": "always",
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],
            // enforces consistent type specifier style for named imports
            "import/consistent-type-specifier-style": "error",
            // disallow non-import statements appearing before import statements
            "import/first": "error",
            // Require a newline after the last import/require in a group
            "import/newline-after-import": "error",
            // Forbid import of modules using absolute paths
            "import/no-absolute-path": "error",
            // disallow AMD require/define
            "import/no-amd": "error",
            // forbid default exports - we want to standardize on named exports so that imported names are consistent
            "import/no-default-export": "error",
            // disallow imports from duplicate paths
            "import/no-duplicates": "error",
            // Forbid the use of extraneous packages
            "import/no-extraneous-dependencies": [
                "error",
                {
                    devDependencies: true,
                    peerDependencies: true,
                    optionalDependencies: false,
                },
            ],
            // Forbid mutable exports
            "import/no-mutable-exports": "error",
            // Prevent importing the default as if it were named
            "import/no-named-default": "error",
            // Prohibit named exports
            "import/no-named-export": "off", // we want everything to be a named export
            // Forbid a module from importing itself
            "import/no-self-import": "error",
            // Require modules with a single export to use a default export
            "import/prefer-default-export": "off", // we want everything to be named
        },
    },
    // JavaScript files config
    {
        files: ["**/*.js"],
        ...tsEslint.configs.disableTypeChecked,
    },
    // config files config
    {
        files: ["./*.ts", "./*.js"],
        ...pluginN.configs["flat/recommended-module"],
        rules: {
            "n/prefer-node-protocol": "error",
        },
    },
    // react files config
    {
        files: ["./{src,__tests__}/**/*.ts?(x)"],
        ...pluginReact.configs.recommended,
        ...pluginReact.configs["jsx-runtime"],
        extends: [
            ...compat.config(pluginReactHooks.configs.recommended),
            ...compat.config(pluginJsxA11y.configs.strict),
        ],
        languageOptions: {
            ...pluginReact.configs.recommended.languageOptions,
            globals: {
                ...globals.browser,
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    // test files config
    {
        files: ["./__tests__/**/*.test.ts?(x)"],
        settings: {
            vitest: {
                typecheck: true,
            },
        },
        languageOptions: {
            globals: {
                ...pluginVitest.environments.env.globals,
            },
        },
        ...pluginVitest.configs.recommended,
    },
    // prettier must be the last config
    configPrettier,
);
