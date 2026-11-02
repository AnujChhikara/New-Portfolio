const CANONICAL_ORIGIN = "https://anujchhikara.com";

const ALLOWED_ORIGINS = new Set([
  "https://anujchhikara.com",
  "https://www.anujchhikara.com",
]);

const ALLOWED_POSTHOG_HOSTS = new Set([
  "https://us.i.posthog.com",
  "https://eu.i.posthog.com",
]);

const ALLOWED_PATHS = new Set(["/", "/blog/how-database-indexes-work/"]);

const MAX_BODY_BYTES = 256;
const REQUEST_TIMEOUT_MS = 2000;

function isAllowedPath(path) {
  return ALLOWED_PATHS.has(path);
}

function disabledResponse() {
  return new Response(null, { status: 204 });
}

function badRequest() {
  return new Response("Bad Request", { status: 400 });
}

function forbidden() {
  return new Response("Forbidden", { status: 403 });
}

function methodNotAllowed() {
  return new Response("Method Not Allowed", { status: 405 });
}

function unsupportedMediaType() {
  return new Response("Unsupported Media Type", { status: 415 });
}

function payloadTooLarge() {
  return new Response("Payload Too Large", { status: 413 });
}

async function readBoundedBody(request) {
  if (!request.body) return { text: "" };

  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        try {
          await reader.cancel();
        } catch {
          // Ignore cancellation errors.
        }
        return { tooLarge: true };
      }
      chunks.push(value);
    }
  } catch {
    try {
      await reader.cancel();
    } catch {
      // Ignore cancellation errors.
    }
    return { error: true };
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return { text: new TextDecoder().decode(bytes) };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname !== "/api/pageview") {
      if (env && typeof env.ASSETS?.fetch === "function") {
        return env.ASSETS.fetch(request);
      }
      return new Response("Not Found", { status: 404 });
    }

    if (!ALLOWED_ORIGINS.has(url.origin)) return forbidden();

    if (request.method !== "POST") return methodNotAllowed();

    const origin = request.headers.get("origin");
    if (!origin || !ALLOWED_ORIGINS.has(origin)) return forbidden();

    if (url.search !== "") return badRequest();

    if (
      request.headers.get("dnt") === "1" ||
      request.headers.get("sec-gpc") === "1"
    ) {
      return disabledResponse();
    }

    const contentType = request.headers.get("content-type");
    if (contentType !== "application/json") return unsupportedMediaType();

    const contentLength = request.headers.get("content-length");
    if (contentLength !== null && Number(contentLength) > MAX_BODY_BYTES) {
      return payloadTooLarge();
    }

    const bodyResult = await readBoundedBody(request);
    if (bodyResult.tooLarge) return payloadTooLarge();
    if (bodyResult.error) return badRequest();

    const rawBody = bodyResult.text;

    if (rawBody.length > MAX_BODY_BYTES) return payloadTooLarge();

    let parsed;
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      return badRequest();
    }

    if (
      parsed === null ||
      typeof parsed !== "object" ||
      Array.isArray(parsed)
    ) {
      return badRequest();
    }

    const keys = Object.keys(parsed);
    if (keys.length !== 1 || keys[0] !== "path") return badRequest();

    const path = parsed.path;
    if (typeof path !== "string" || !isAllowedPath(path)) return badRequest();

    const token = env?.POSTHOG_PROJECT_TOKEN;
    const host = env?.POSTHOG_HOST;

    if (
      typeof token !== "string" ||
      !token.startsWith("phc_") ||
      typeof host !== "string" ||
      !ALLOWED_POSTHOG_HOSTS.has(host)
    ) {
      return disabledResponse();
    }

    const eventId = crypto.randomUUID();
    const payload = {
      api_key: token,
      event: "$pageview",
      distinct_id: eventId,
      uuid: eventId,
      properties: {
        $current_url: `${CANONICAL_ORIGIN}${path}`,
        $pathname: path,
        $host: "anujchhikara.com",
        site: "portfolio",
        $process_person_profile: false,
        $geoip_disable: true,
        $ip: "0.0.0.0",
      },
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const fetchPromise = fetch(`${host}/i/v0/e/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      redirect: "error",
    })
      .then(
        () => undefined,
        () => undefined
      )
      .finally(() => clearTimeout(timeoutId));

    if (ctx && typeof ctx.waitUntil === "function") {
      ctx.waitUntil(fetchPromise);
    } else {
      fetchPromise.catch(() => {});
    }

    return disabledResponse();
  },
};
