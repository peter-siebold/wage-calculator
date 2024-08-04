declare module "@eslint/js" {
    import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

    declare const toBeExported: {
        configs: {
            all: FlatConfig.Config;
            recommended: FlatConfig.Config;
        };
    };
    export = toBeExported;
}
