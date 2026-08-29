import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import test from "node:test";

const outputPath = new URL("../build/client/", import.meta.url);

function readOutput(relativePath) {
  return readFileSync(new URL(relativePath, outputPath), "utf8");
}

test("production build is deployable as static Cloudflare Pages assets", () => {
  assert.equal(
    existsSync(new URL("../build/server/", import.meta.url)),
    false,
    "the build must not contain a runtime server bundle"
  );

  assert.equal(existsSync(new URL("index.html", outputPath)), true);
  assert.equal(existsSync(new URL("__spa-fallback.html", outputPath)), true);
  assert.equal(existsSync(new URL("404.html", outputPath)), true);
  assert.equal(
    existsSync(
      new URL("blog/how-database-indexes-work/index.html", outputPath)
    ),
    true
  );

  assert.equal(existsSync(new URL("_redirects", outputPath)), false);

  const spaFallback = readOutput("__spa-fallback.html");
  assert.equal(readOutput("404.html"), spaFallback);
  assert.match(spaFallback, /Loading portfolio/);
  assert.match(
    spaFallback,
    /<meta name="robots" content="noindex, nofollow"\/>/
  );

  const javascriptAsset = readdirSync(new URL("assets/", outputPath)).find(
    (name) => name.endsWith(".js")
  );
  assert.ok(javascriptAsset, "the build must contain a JavaScript asset");
  assert.doesNotMatch(
    readOutput(`assets/${javascriptAsset}`),
    /<!DOCTYPE html>/
  );
});

test("pre-rendered routes contain route-specific content and metadata", () => {
  const homeHtml = readOutput("index.html");
  const blogHtml = readOutput("blog/how-database-indexes-work/index.html");

  assert.match(homeHtml, /<title>Anuj Chhikara \| Software Engineer<\/title>/);
  assert.match(
    homeHtml,
    /<link rel="canonical" href="https:\/\/anujchhikara\.com"\/>/
  );
  assert.match(homeHtml, /Personal portfolio of Anuj Chhikara/);

  assert.match(
    blogHtml,
    /<title>How Database Indexes Actually Work — Anuj Chhikara<\/title>/
  );
  assert.match(
    blogHtml,
    /<link rel="canonical" href="https:\/\/anujchhikara\.com\/blog\/how-database-indexes-work\/"\/>/
  );
  assert.match(
    blogHtml,
    /<meta property="og:url" content="https:\/\/anujchhikara\.com\/blog\/how-database-indexes-work\/"\/>/
  );
  assert.match(blogHtml, /What is an index, really\?/);
});
