import { copyFileSync, writeFileSync } from "node:fs";

copyFileSync(
  new URL("../build/client/__spa-fallback.html", import.meta.url),
  new URL("../build/client/404.html", import.meta.url)
);

copyFileSync(
  new URL("./pageview-worker.mjs", import.meta.url),
  new URL("../build/client/_worker.js", import.meta.url)
);

writeFileSync(
  new URL("../build/client/_routes.json", import.meta.url),
  `${JSON.stringify(
    {
      version: 1,
      include: ["/api/pageview"],
      exclude: [],
    },
    null,
    2
  )}\n`
);
