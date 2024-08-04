declare module "eslint-plugin-react-hooks" {
    import type { ClassicConfig, Linter } from "@typescript-eslint/utils/ts-eslint";

    declare const toBeExported: {
        configs: {
            recommended: ClassicConfig.Config;
        };
        rules: NonNullable<Linter.Plugin["rules"]>;
    };
    export = toBeExported;
}
