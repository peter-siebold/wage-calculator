declare module "eslint-config-prettier" {
    import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

    declare const toBeExported: FlatConfig.Config;
    export = toBeExported;
}
