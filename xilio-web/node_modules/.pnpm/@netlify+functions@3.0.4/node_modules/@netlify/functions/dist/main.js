"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  builder: () => wrapHandler,
  purgeCache: () => purgeCache,
  schedule: () => schedule,
  stream: () => stream
});
module.exports = __toCommonJS(main_exports);

// src/lib/consts.ts
var BUILDER_FUNCTIONS_FLAG = true;
var HTTP_STATUS_METHOD_NOT_ALLOWED = 405;
var METADATA_VERSION = 1;

// src/lib/builder.ts
var augmentResponse = (response) => {
  if (!response) {
    return response;
  }
  const metadata = { version: METADATA_VERSION, builder_function: BUILDER_FUNCTIONS_FLAG, ttl: response.ttl || 0 };
  return {
    ...response,
    metadata
  };
};
var wrapHandler = (handler) => (
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  (event, context, callback) => {
    if (event.httpMethod !== "GET" && event.httpMethod !== "HEAD") {
      return Promise.resolve({
        body: "Method Not Allowed",
        statusCode: HTTP_STATUS_METHOD_NOT_ALLOWED
      });
    }
    const modifiedEvent = {
      ...event,
      multiValueQueryStringParameters: {},
      queryStringParameters: {}
    };
    const wrappedCallback = (error, response) => (
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      callback ? callback(error, augmentResponse(response)) : null
    );
    const execution = handler(modifiedEvent, context, wrappedCallback);
    if (typeof execution === "object" && typeof execution.then === "function") {
      return execution.then(augmentResponse);
    }
    return execution;
  }
);

// src/lib/purge_cache.ts
var import_process = require("process");
var purgeCache = async (options = {}) => {
  if (globalThis.fetch === void 0) {
    throw new Error(
      "`fetch` is not available. Please ensure you're using Node.js version 18.0.0 or above. Refer to https://ntl.fyi/functions-runtime for more information."
    );
  }
  const { siteID } = options;
  const { siteSlug } = options;
  const { domain } = options;
  if (siteID && siteSlug || siteID && domain || siteSlug && domain) {
    throw new Error('Can only pass one of either "siteID", "siteSlug", or "domain"');
  }
  const payload = {
    cache_tags: options.tags
  };
  if ("deployAlias" in options) {
    payload.deploy_alias = options.deployAlias;
  } else if (!import_process.env.NETLIFY_LOCAL) {
    payload.deploy_alias = import_process.env.NETLIFY_BRANCH;
  }
  const token = import_process.env.NETLIFY_PURGE_API_TOKEN || options.token;
  if (import_process.env.NETLIFY_LOCAL && !token) {
    const scope = options.tags?.length ? ` for tags ${options.tags?.join(", ")}` : "";
    console.log(`Skipping purgeCache${scope} in local development.`);
    return;
  }
  if (siteSlug) {
    payload.site_slug = siteSlug;
  } else if (domain) {
    payload.domain = domain;
  } else {
    payload.site_id = siteID || import_process.env.SITE_ID;
    if (!payload.site_id) {
      throw new Error(
        "The Netlify site ID was not found in the execution environment. Please supply it manually using the `siteID` property."
      );
    }
  }
  if (!token) {
    throw new Error(
      "The cache purge API token was not found in the execution environment. Please supply it manually using the `token` property."
    );
  }
  const headers = {
    "Content-Type": "application/json; charset=utf8",
    Authorization: `Bearer ${token}`
  };
  if (options.userAgent) {
    headers["user-agent"] = options.userAgent;
  }
  const apiURL = options.apiURL || "https://api.netlify.com";
  const response = await fetch(`${apiURL}/api/v1/purge`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    let text;
    try {
      text = await response.text();
    } catch {
    }
    if (text) {
      throw new Error(`Cache purge API call was unsuccessful.
Status: ${response.status}
Body: ${text}`);
    }
    throw new Error(`Cache purge API call was unsuccessful.
Status: ${response.status}`);
  }
};

// src/lib/schedule.ts
var schedule = (cron, handler) => handler;

// src/lib/stream.ts
var import_node_stream = require("stream");
var import_node_util = require("util");
var pipeline = (0, import_node_util.promisify)(import_node_stream.pipeline);
var stream = (handler) => awslambda.streamifyResponse(async (event, responseStream, context) => {
  const { body, ...httpResponseMetadata } = await handler(event, context);
  const responseBody = awslambda.HttpResponseStream.from(responseStream, httpResponseMetadata);
  if (typeof body === "undefined") {
    responseBody.end();
  } else if (typeof body === "string") {
    responseBody.write(body);
    responseBody.end();
  } else {
    await pipeline(body, responseBody);
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  builder,
  purgeCache,
  schedule,
  stream
});
