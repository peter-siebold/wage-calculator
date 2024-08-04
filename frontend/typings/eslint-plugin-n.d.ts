declare module "eslint-plugin-n" {
    import type { ClassicConfig, FlatConfig, Linter } from "@typescript-eslint/utils/ts-eslint";

    declare const toBeExported: {
        configs: {
            "recommended-module": ClassicConfig.Config;
            "recommended-script": ClassicConfig.Config;
            recommended: ClassicConfig.Config;
            "flat/recommended-module": FlatConfig.Config;
            "flat/recommended-script": FlatConfig.Config;
            "flat/recommended": FlatConfig.Config;
            "flat/mixed-esm-and-cjs": FlatConfig.Config[];
        };
        rules: NonNullable<Linter.Plugin["rules"]>;
    };
    export = toBeExported;
}
