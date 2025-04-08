import {
  __esm
} from "./chunk-C6P2IO65.mjs";

// src/lib/purge_cache.ts
import { env } from "process";
var purgeCache;
var init_purge_cache = __esm({
  "src/lib/purge_cache.ts"() {
    purgeCache = async (options = {}) => {
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
      } else if (!env.NETLIFY_LOCAL) {
        payload.deploy_alias = env.NETLIFY_BRANCH;
      }
      const token = env.NETLIFY_PURGE_API_TOKEN || options.token;
      if (env.NETLIFY_LOCAL && !token) {
        const scope = options.tags?.length ? ` for tags ${options.tags?.join(", ")}` : "";
        console.log(`Skipping purgeCache${scope} in local development.`);
        return;
      }
      if (siteSlug) {
        payload.site_slug = siteSlug;
      } else if (domain) {
        payload.domain = domain;
      } else {
        payload.site_id = siteID || env.SITE_ID;
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
  }
});

export {
  purgeCache,
  init_purge_cache
};
