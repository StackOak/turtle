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

// src/lib/purge_cache.ts
var purge_cache_exports = {};
__export(purge_cache_exports, {
  purgeCache: () => purgeCache
});
module.exports = __toCommonJS(purge_cache_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  purgeCache
});
