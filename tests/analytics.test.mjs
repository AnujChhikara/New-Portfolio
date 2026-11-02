import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import test from "node:test";

const workerUrl = new URL("../build/client/_worker.js", import.meta.url);
const routesUrl = new URL("../build/client/_routes.json", import.meta.url);

test("build emits Cloudflare advanced-mode worker and route config", () => {
  assert.equal(existsSync(workerUrl), true, "missing _worker.js");
  assert.equal(existsSync(routesUrl), true, "missing _routes.json");

  const routes = JSON.parse(readFileSync(routesUrl, "utf8"));
  assert.equal(routes.version, 1);
  assert.deepEqual(routes.include, ["/api/pageview"]);
  assert.deepEqual(routes.exclude, []);

  const workerSource = readFileSync(workerUrl, "utf8");
  assert.match(workerSource, /POSTHOG_PROJECT_TOKEN/);
  assert.match(workerSource, /\/i\/v0\/e\//);
});

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function loadWorker() {
  const mod = await import(workerUrl.href);
  return mod.default;
}

function makeEnv(overrides = {}) {
  return {
    POSTHOG_PROJECT_TOKEN: "phc_test_token",
    POSTHOG_HOST: "https://us.i.posthog.com",
    ASSETS: { fetch: async () => new Response("asset", { status: 200 }) },
    ...overrides,
  };
}

function makeRequest(path, options = {}) {
  const {
    method = "POST",
    origin = "https://anujchhikara.com",
    contentType = "application/json",
    body = JSON.stringify({ path }),
    url = "https://anujchhikara.com/api/pageview",
  } = options;
  return new Request(url, {
    method,
    headers: {
      ...(origin ? { origin } : {}),
      ...(contentType ? { "content-type": contentType } : {}),
    },
    body: method === "GET" ? undefined : body,
  });
}

test("worker forwards an allowlisted pageview to PostHog", async () => {
  const worker = await loadWorker();
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response("{}", { status: 200 });
  };

  try {
    const env = makeEnv();
    let waitPromise;
    const ctx = {
      waitUntil: (promise) => {
        waitPromise = promise;
      },
    };

    const response = await worker.fetch(
      makeRequest("/", { body: JSON.stringify({ path: "/" }) }),
      env,
      ctx
    );

    assert.equal(response.status, 204);
    assert.ok(waitPromise, "waitUntil should receive the PostHog fetch");
    await waitPromise;

    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://us.i.posthog.com/i/v0/e/");
    const init = calls[0].init;
    assert.equal(init.method, "POST");

    const payload = JSON.parse(init.body);
    assert.equal(payload.event, "$pageview");
    assert.equal(payload.api_key, "phc_test_token");
    assert.match(payload.distinct_id, uuidRegex);
    assert.match(payload.uuid, uuidRegex);
    assert.equal(payload.distinct_id, payload.uuid);

    const props = payload.properties;
    assert.equal(props.$current_url, "https://anujchhikara.com/");
    assert.equal(props.$pathname, "/");
    assert.equal(props.$host, "anujchhikara.com");
    assert.equal(props.site, "portfolio");
    assert.equal(props.$process_person_profile, false);
    assert.equal(props.$geoip_disable, true);
    assert.equal(props.$ip, "0.0.0.0");

    assert.equal(
      Object.keys(props).sort().join(","),
      [
        "$current_url",
        "$geoip_disable",
        "$host",
        "$ip",
        "$pathname",
        "$process_person_profile",
        "site",
      ]
        .sort()
        .join(",")
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("worker generates a new UUID per event", async () => {
  const worker = await loadWorker();
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push(JSON.parse(init.body));
    return new Response("{}", { status: 200 });
  };

  try {
    const env = makeEnv();
    for (const path of ["/", "/blog/how-database-indexes-work/"]) {
      const ctx = { waitUntil: (p) => p.catch(() => {}) };
      const response = await worker.fetch(
        makeRequest(path, { body: JSON.stringify({ path }) }),
        env,
        ctx
      );
      assert.equal(response.status, 204);
    }
    // Allow scheduled fetches to run.
    await new Promise((resolve) => setTimeout(resolve, 0));

    assert.equal(calls.length, 2);
    assert.notEqual(calls[0].distinct_id, calls[1].distinct_id);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("worker rejects invalid origins, methods, and content types", async () => {
  const worker = await loadWorker();
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    calls.push(1);
    return new Response("{}", { status: 200 });
  };

  try {
    const env = makeEnv();

    const cases = [
      makeRequest("/", { method: "GET", origin: "https://anujchhikara.com" }),
      makeRequest("/", { origin: "https://evil.example" }),
      makeRequest("/", { origin: null }),
      makeRequest("/", { contentType: "text/plain" }),
    ];

    for (const request of cases) {
      const response = await worker.fetch(request, env, {
        waitUntil: (p) => p.catch(() => {}),
      });
      assert.notEqual(
        response.status,
        204,
        `expected rejection for ${request.method}`
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.equal(calls.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("worker rejects malformed bodies and unknown paths", async () => {
  const worker = await loadWorker();
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    calls.push(1);
    return new Response("{}", { status: 200 });
  };

  try {
    const env = makeEnv();
    const bodies = [
      JSON.stringify({}),
      JSON.stringify({ path: "/", extra: true }),
      JSON.stringify({ foo: "/" }),
      "{bad json",
      JSON.stringify({ path: 42 }),
      JSON.stringify({ path: "/unknown" }),
      JSON.stringify({ path: "/blog/how-database-indexes-work" }),
    ];

    for (const body of bodies) {
      const response = await worker.fetch(makeRequest("/", { body }), env, {
        waitUntil: (p) => p.catch(() => {}),
      });
      assert.equal(response.status, 400, `expected 400 for ${body}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.equal(calls.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("worker skips PostHog when DNT or GPC is set", async () => {
  const worker = await loadWorker();
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    calls.push(1);
    return new Response("{}", { status: 200 });
  };

  try {
    const env = makeEnv();

    const dntRequest = new Request("https://anujchhikara.com/api/pageview", {
      method: "POST",
      headers: {
        origin: "https://anujchhikara.com",
        "content-type": "application/json",
        dnt: "1",
      },
      body: JSON.stringify({ path: "/" }),
    });
    const gpcRequest = new Request("https://anujchhikara.com/api/pageview", {
      method: "POST",
      headers: {
        origin: "https://anujchhikara.com",
        "content-type": "application/json",
        "sec-gpc": "1",
      },
      body: JSON.stringify({ path: "/" }),
    });

    for (const request of [dntRequest, gpcRequest]) {
      const response = await worker.fetch(request, env, {
        waitUntil: (p) => p.catch(() => {}),
      });
      assert.equal(response.status, 204);
    }

    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.equal(calls.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("worker is disabled when env is missing or invalid", async () => {
  const worker = await loadWorker();
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    calls.push(1);
    return new Response("{}", { status: 200 });
  };

  try {
    const cases = [
      makeEnv({ POSTHOG_PROJECT_TOKEN: undefined }),
      makeEnv({ POSTHOG_HOST: "https://evil.example" }),
      makeEnv({ POSTHOG_HOST: "http://us.i.posthog.com" }),
    ];

    for (const env of cases) {
      const response = await worker.fetch(
        makeRequest("/", { body: JSON.stringify({ path: "/" }) }),
        env,
        { waitUntil: (p) => p.catch(() => {}) }
      );
      assert.equal(response.status, 204);
    }

    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.equal(calls.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("worker accepts www origin and still uses canonical URL", async () => {
  const worker = await loadWorker();
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response("{}", { status: 200 });
  };

  try {
    const env = makeEnv();
    const ctx = { waitUntil: (p) => p.catch(() => {}) };
    const request = new Request("https://www.anujchhikara.com/api/pageview", {
      method: "POST",
      headers: {
        origin: "https://www.anujchhikara.com",
        "content-type": "application/json",
      },
      body: JSON.stringify({ path: "/" }),
    });

    const response = await worker.fetch(request, env, ctx);
    assert.equal(response.status, 204);
    await new Promise((resolve) => setTimeout(resolve, 0));

    assert.equal(calls.length, 1);
    const payload = JSON.parse(calls[0].init.body);
    assert.equal(payload.properties.$current_url, "https://anujchhikara.com/");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("worker falls back to assets for non-pageview paths", async () => {
  const worker = await loadWorker();
  const env = {
    ASSETS: { fetch: async () => new Response("asset-body", { status: 200 }) },
  };
  const request = new Request("https://anujchhikara.com/", { method: "GET" });
  const response = await worker.fetch(request, env, {
    waitUntil: (p) => p.catch(() => {}),
  });
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "asset-body");
});

test("browser provider source avoids SDK and browser identifiers", () => {
  const source = readFileSync(
    new URL("../app/lib/posthog.tsx", import.meta.url),
    "utf8"
  );
  assert.doesNotMatch(source, /posthog-js/);
  assert.match(source, /credentials:\s*"omit"/);
  assert.match(source, /referrerPolicy:\s*"no-referrer"/);
  assert.match(source, /doNotTrack/);
  assert.match(source, /globalPrivacyControl/);
  assert.doesNotMatch(source, /localStorage|sessionStorage|document\.cookie/);
});

test("worker rejects request URL origin outside production origins", async () => {
  const worker = await loadWorker();
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    calls.push(1);
    return new Response("{}", { status: 200 });
  };

  try {
    const env = makeEnv();
    const request = new Request("https://preview.example.com/api/pageview", {
      method: "POST",
      headers: {
        origin: "https://anujchhikara.com",
        "content-type": "application/json",
      },
      body: JSON.stringify({ path: "/" }),
    });

    const response = await worker.fetch(request, env, {
      waitUntil: (p) => p.catch(() => {}),
    });
    assert.equal(response.status, 403);
    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.equal(calls.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("worker rejects oversized bodies without content length", async () => {
  const worker = await loadWorker();
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    calls.push(1);
    return new Response("{}", { status: 200 });
  };

  try {
    const env = makeEnv();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
            JSON.stringify({ path: "/" }).padEnd(300, "x")
          )
        );
        controller.close();
      },
    });
    const request = new Request("https://anujchhikara.com/api/pageview", {
      method: "POST",
      headers: {
        origin: "https://anujchhikara.com",
        "content-type": "application/json",
      },
      body: stream,
      duplex: "half",
    });

    const response = await worker.fetch(request, env, {
      waitUntil: (p) => p.catch(() => {}),
    });
    assert.equal(response.status, 413);
    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.equal(calls.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("worker rejects oversized chunked bodies", async () => {
  const worker = await loadWorker();
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    calls.push(1);
    return new Response("{}", { status: 200 });
  };

  try {
    const env = makeEnv();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('{"path":"/"'));
        controller.enqueue(new TextEncoder().encode("x".repeat(250)));
        controller.close();
      },
    });
    const request = new Request("https://anujchhikara.com/api/pageview", {
      method: "POST",
      headers: {
        origin: "https://anujchhikara.com",
        "content-type": "application/json",
      },
      body: stream,
      duplex: "half",
    });

    const response = await worker.fetch(request, env, {
      waitUntil: (p) => p.catch(() => {}),
    });
    assert.equal(response.status, 413);
    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.equal(calls.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("worker rejects invalid PostHog hosts", async () => {
  const worker = await loadWorker();
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    calls.push(1);
    return new Response("{}", { status: 200 });
  };

  try {
    const invalidHosts = [
      "https://us.i.posthog.com/",
      "https://us.i.posthog.com/foo",
      "https://user:pass@us.i.posthog.com",
      "https://evil.example",
      "http://us.i.posthog.com",
    ];

    for (const host of invalidHosts) {
      const env = makeEnv({ POSTHOG_HOST: host });
      const response = await worker.fetch(
        makeRequest("/", { body: JSON.stringify({ path: "/" }) }),
        env,
        { waitUntil: (p) => p.catch(() => {}) }
      );
      assert.equal(response.status, 204, `expected disabled for ${host}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.equal(calls.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("worker outbound PostHog fetch disables redirects and forwards no sensitive data", async () => {
  const worker = await loadWorker();
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response("{}", { status: 200 });
  };

  try {
    const env = makeEnv();
    const ctx = { waitUntil: (p) => p.catch(() => {}) };
    const response = await worker.fetch(
      makeRequest("/", { body: JSON.stringify({ path: "/" }) }),
      env,
      ctx
    );
    assert.equal(response.status, 204);
    await new Promise((resolve) => setTimeout(resolve, 0));

    assert.equal(calls.length, 1);
    assert.equal(calls[0].init.redirect, "error");
    const headers = calls[0].init.headers;
    assert.equal(headers["content-type"], "application/json");
    assert.equal(Object.keys(headers).length, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("browser provider source keeps production origin and pathname gates", () => {
  const source = readFileSync(
    new URL("../app/lib/posthog.tsx", import.meta.url),
    "utf8"
  );
  assert.match(source, /https:\/\/anujchhikara\.com/);
  assert.match(source, /https:\/\/www\.anujchhikara\.com/);
  assert.match(source, /window\.location\.origin/);
  assert.match(source, /location\.pathname/);
  assert.match(source, /credentials:\s*"omit"/);
  assert.match(source, /referrerPolicy:\s*"no-referrer"/);
});
