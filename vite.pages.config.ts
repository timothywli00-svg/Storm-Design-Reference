import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// @ts-expect-error JS plugin alongside the TS vite config
import { grokPwaPlugin } from "./scripts/grok-pwa-plugin.mjs";

/**
 * Static build for GitHub Pages. The live preview and the Vercel publish
 * still use vite.config.ts. This config emits files a host can serve
 * without running a server.
 */
export default defineConfig({
  plugins: [
    grokPwaPlugin(),
    tailwindcss(),
    tanstackStart({
      pages: [{ path: "/" }],
      prerender: {
        enabled: true,
        crawlLinks: false,
        autoStaticPathsDiscovery: false,
      },
    }),
    viteReact(),
  ],
});
