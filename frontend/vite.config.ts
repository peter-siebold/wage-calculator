import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import { rimrafSync } from "rimraf";
import copy from "rollup-plugin-copy";
import noEmit from "rollup-plugin-no-emit";
import { defineConfig, mergeConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ command }) => {
  const baseConfig = {
    /**
     * Right now *.svg is inlined in the output, but still additionally written to the output directory.
     * This is a workaround to prevent the additional *.svg assets from being written.
     * @see https://github.com/pd4d10/vite-plugin-svgr/issues/69
     */
    plugins: [
      // Bundle *.svg files
      svgr(),
      // Prevent *.svg files from being written to the output directory
      noEmit({ match: (file) => file.endsWith(".svg") }),
      react(),
    ],
    build: {
      outDir: resolve(__dirname, "build"),
    },
    css: {
      postcss: {
        plugins: [autoprefixer],
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL(".", import.meta.url)),
      },
    },
    test: {
      include: [
        "**/__tests__/**/?(*.){test,spec}.?(c|m)[jt]s?(x)",
        "**/src/**/?(*.){test,spec}.?(c|m)[jt]s?(x)",
      ],
      environment: "jsdom",
      setupFiles: "./__tests__/setup.ts",
      globals: true,
      reporters: ["default"],
      outputFile: {
        junit: "./test-results/junit.xml",
      },
      coverage: {
        enabled: true,
        provider: "v8",
        include: ["src/**/*.ts?(x)"],
        reporter: ["text", "html"],
        /**
         * Type-only or interface-only files need to be excluded,
         * as v8 collects them,	but they won't be covered.
         * @see https://github.com/vitest-dev/vitest/issues/3605
         */
        exclude: [
          "src/types.ts?(x)",
          "src/**/*.d.ts",
          "**/__tests__/__mocks__**/*",
          "**/src/**/__mocks__/**/*",
          "src/index.tsx",
        ],
      },
    },
  };

  // Production build
  if (command === "build") {
    rimrafSync(resolve(__dirname, "../langchain/static"));

    return mergeConfig(
      baseConfig,
      {
        base: "/",
        build: {
          sourcemap: false,
        },
        plugins: [
          copy({
            hook: "writeBundle",
            flatten: false,
            targets: [
              {
                src: "build/**/*",
                dest: resolve(__dirname, "../backend/public"),
              },
            ],
          }),
        ],
      },
      true
    );
  }

  // Development build
  return mergeConfig(
    baseConfig,
    {
      build: {
        sourcemap: true,
      },
    },
    true
  );
});
