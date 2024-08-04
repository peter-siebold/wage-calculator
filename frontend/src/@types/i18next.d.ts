import type { resourceDefault } from "../i18n";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "de";
        resources: typeof resourceDefault;
    }
}
