declare module "eslint-plugin-regexp" {
    import type { ClassicConfig, FlatConfig, Linter } from "@typescript-eslint/utils/ts-eslint";

    declare const toBeExported: {
        configs: {
            recommended: ClassicConfig.Config;
            all: ClassicConfig.Config;
            "flat/all": FlatConfig.Config;
            "flat/recommended": FlatConfig.Config;
        };
        rules: NonNullable<Linter.Plugin["rules"]>;
    };
    export = toBeExported;
}
