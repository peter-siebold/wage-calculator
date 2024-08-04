declare module "eslint-plugin-react" {
    import type { FlatConfig, Linter } from "@typescript-eslint/utils/ts-eslint";

    declare const toBeExported: {
        configs: {
            recommended: FlatConfig.Config;
            all: FlatConfig.Config;
            "jsx-runtime": FlatConfig.Config;
        };
        rules: NonNullable<Linter.Plugin["rules"]>;
    };
    export = toBeExported;
}
