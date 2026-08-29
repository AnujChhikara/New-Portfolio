import { copyFileSync } from "node:fs";

copyFileSync(
  new URL("../build/client/__spa-fallback.html", import.meta.url),
  new URL("../build/client/404.html", import.meta.url)
);
