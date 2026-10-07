import { cpSync, mkdirSync, rmSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { injectGrokPwaHead, renderWebManifest } from "./grok-pwa-shared.mjs";

const host = "storm.7cloudengineering.com";
const out = "pages";
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync("dist/client", out, { recursive: true });
if (!existsSync("pages/index.html")) {
  throw new Error("static build did not write pages/index.html");
}

const html = injectGrokPwaHead(readFileSync("pages/index.html", "utf8"), { host });
writeFileSync("pages/index.html", html);
writeFileSync("pages/404.html", html);
mkdirSync("pages/__grok", { recursive: true });
writeFileSync("pages/__grok/manifest.webmanifest", renderWebManifest(host));
writeFileSync("pages/CNAME", `${host}\n`);
writeFileSync("pages/.nojekyll", "");
console.log("staged GitHub Pages site in pages/");
