import { existsSync } from 'node:fs';
import fs, { stat, readFile } from 'node:fs/promises';
import { resolve as resolve$3, relative as relative$2, dirname as dirname$2, basename as basename$2, join as join$2 } from 'node:path';
import process$1 from 'node:process';
import c from 'ansis';
import cac from 'cac';
import { getPort } from 'get-port-please';
import open from 'open';
import { glob } from 'tinyglobby';
import fswalk from '@nodelib/fs.walk';
import { bundleRequire } from 'bundle-require';
import { findUp } from 'find-up';
import { resolve as resolve$2 } from 'mlly';
import createDebug from 'debug';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { createApp, eventHandler, serveStatic, toNodeListener } from 'h3';
import { lookup } from 'mrmime';
import chokidar from 'chokidar';
import { WebSocketServer } from 'ws';

/**
 * Searches a directory looking for matching files. This uses the config
 * array's logic to determine if a directory or file should be ignored.
 *
 * Derived from {@link https://github.com/eslint/eslint/blob/d2d06f7a70d9b96b125ecf2de8951bea549db4da/lib/eslint/eslint-helpers.js#L217-L382|ESLint globSearch()}
 *
 * @param {Object} options The options for this function.
 * @param {string} options.basePath The directory to search.
 * @param {import('@eslint/config-array').ConfigArray} options.configs The config array to use for determining what to ignore.
 * @param {import('@nodelib/fs.walk').DeepFilterFunction} [options.deepFilter] Optional function that indicates whether the directory will be read deep or not.
 * @param {import('@nodelib/fs.walk').EntryFilterFunction} [options.entryFilter] Optional function that indicates whether the entry will be included to results or not.
 * @returns {Promise<Array<string>>} An array of matching file paths or an empty array if there are no matches.
 */
async function configArrayFindFiles (options) {
  const {
    basePath,
    configs,
    deepFilter,
    entryFilter,
  } = options;

  /** @type {import('@nodelib/fs.walk').Entry[]} */
  const filePaths = (await new Promise((resolve, reject) => {
    let promiseRejected = false;

    /**
     * Wraps a boolean-returning filter function. The wrapped function will reject the promise if an error occurs.
     *
     * @param {import('@nodelib/fs.walk').DeepFilterFunction | import('@nodelib/fs.walk').EntryFilterFunction} filter A filter function to wrap.
     * @returns {import('@nodelib/fs.walk').DeepFilterFunction | import('@nodelib/fs.walk').EntryFilterFunction} A function similar to the wrapped filter that rejects the promise if an error occurs.
     */
    function wrapFilter (filter) {
      /** @type {import('@nodelib/fs.walk').DeepFilterFunction | import('@nodelib/fs.walk').EntryFilterFunction} */
      const result = (...args) => {
        // No need to run the filter if an error has been thrown.
        if (!promiseRejected) {
          try {
            return filter(...args);
          } catch (err) {
            promiseRejected = true;
            reject(err);
          }
        }
        return false;
      };

      return result;
    }

    fswalk.walk(
      basePath,
      {
        deepFilter: wrapFilter(entry => {
          if (deepFilter && !deepFilter(entry)) {
            return false;
          }
          return !configs.isDirectoryIgnored(entry.path);
        }),
        entryFilter: wrapFilter(entry => {
          // entries may be directories or files so filter out directories
          if (entry.dirent.isDirectory()) {
            return false;
          }
          if (entryFilter && !entryFilter(entry)) {
            return false;
          }
          return configs.getConfig(entry.path) !== undefined;
        }),
      },
      (error, entries) => {
        // If the promise is already rejected, calling `resolve` or `reject` will do nothing.
        if (error) {
          reject(error);
        } else {
          resolve(entries);
        }
      }
    );
  }));

  return filePaths.map(entry => entry.path);
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.
function assertPath$1(path) {
  if (typeof path !== "string") {
    throw new TypeError(`Path must be a string, received "${JSON.stringify(path)}"`);
  }
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
function stripSuffix$1(name, suffix) {
  if (suffix.length >= name.length) {
    return name;
  }
  const lenDiff = name.length - suffix.length;
  for(let i = suffix.length - 1; i >= 0; --i){
    if (name.charCodeAt(lenDiff + i) !== suffix.charCodeAt(i)) {
      return name;
    }
  }
  return name.slice(0, -suffix.length);
}
function lastPathSegment$1(path, isSep, start = 0) {
  let matchedNonSeparator = false;
  let end = path.length;
  for(let i = path.length - 1; i >= start; --i){
    if (isSep(path.charCodeAt(i))) {
      if (matchedNonSeparator) {
        start = i + 1;
        break;
      }
    } else if (!matchedNonSeparator) {
      matchedNonSeparator = true;
      end = i + 1;
    }
  }
  return path.slice(start, end);
}
function assertArgs$1$1(path, suffix) {
  assertPath$1(path);
  if (path.length === 0) return path;
  if (typeof suffix !== "string") {
    throw new TypeError(`Suffix must be a string, received "${JSON.stringify(suffix)}"`);
  }
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
// This module is browser compatible.
function stripTrailingSeparators$1(segment, isSep) {
  if (segment.length <= 1) {
    return segment;
  }
  let end = segment.length;
  for(let i = segment.length - 1; i > 0; i--){
    if (isSep(segment.charCodeAt(i))) {
      end = i;
    } else {
      break;
    }
  }
  return segment.slice(0, end);
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
// This module is browser compatible.
// Alphabet chars.
// Non-alphabetic chars.
const CHAR_DOT$1 = 46; /* . */ 
const CHAR_FORWARD_SLASH$1 = 47; /* / */

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
// This module is browser compatible.
function isPosixPathSeparator$1(code) {
  return code === CHAR_FORWARD_SLASH$1;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Return the last portion of a `path`.
 * Trailing directory separators are ignored, and optional suffix is removed.
 *
 * @example Usage
 * ```ts
 * import { basename } from "@std/path/posix/basename";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(basename("/home/user/Documents/"), "Documents");
 * assertEquals(basename("/home/user/Documents/image.png"), "image.png");
 * assertEquals(basename("/home/user/Documents/image.png", ".png"), "image");
 * ```
 *
 * @example Working with URLs
 *
 * Note: This function doesn't automatically strip hash and query parts from
 * URLs. If your URL contains a hash or query, remove them before passing the
 * URL to the function. This can be done by passing the URL to `new URL(url)`,
 * and setting the `hash` and `search` properties to empty strings.
 *
 * ```ts
 * import { basename } from "@std/path/posix/basename";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(basename("https://deno.land/std/path/mod.ts"), "mod.ts");
 * assertEquals(basename("https://deno.land/std/path/mod.ts", ".ts"), "mod");
 * assertEquals(basename("https://deno.land/std/path/mod.ts?a=b"), "mod.ts?a=b");
 * assertEquals(basename("https://deno.land/std/path/mod.ts#header"), "mod.ts#header");
 * ```
 *
 * Note: If you are working with file URLs,
 * use the new version of `basename` from `@std/path/posix/unstable-basename`.
 *
 * @param path The path to extract the name from.
 * @param suffix The suffix to remove from extracted name.
 * @returns The extracted name.
 */ function basename$1(path, suffix = "") {
  assertArgs$1$1(path, suffix);
  const lastSegment = lastPathSegment$1(path, isPosixPathSeparator$1);
  const strippedSegment = stripTrailingSeparators$1(lastSegment, isPosixPathSeparator$1);
  return suffix ? stripSuffix$1(strippedSegment, suffix) : strippedSegment;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * The character used to separate entries in the PATH environment variable.
 */ const DELIMITER$1 = ":";
/**
 * The character used to separate components of a file path.
 */ const SEPARATOR$1 = "/";
/**
 * A regular expression that matches one or more path separators.
 */ const SEPARATOR_PATTERN$1 = /\/+/;

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
function assertArg$3$1(path) {
  assertPath$1(path);
  if (path.length === 0) return ".";
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Return the directory path of a `path`.
 *
 * @example Usage
 * ```ts
 * import { dirname } from "@std/path/posix/dirname";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(dirname("/home/user/Documents/"), "/home/user");
 * assertEquals(dirname("/home/user/Documents/image.png"), "/home/user/Documents");
 * assertEquals(dirname("https://deno.land/std/path/mod.ts"), "https://deno.land/std/path");
 * ```
 *
 * @example Working with URLs
 *
 * ```ts
 * import { dirname } from "@std/path/posix/dirname";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(dirname("https://deno.land/std/path/mod.ts"), "https://deno.land/std/path");
 * assertEquals(dirname("https://deno.land/std/path/mod.ts?a=b"), "https://deno.land/std/path");
 * assertEquals(dirname("https://deno.land/std/path/mod.ts#header"), "https://deno.land/std/path");
 * ```
 *
 * Note: If you are working with file URLs,
 * use the new version of `dirname` from `@std/path/posix/unstable-dirname`.
 *
 * @param path The path to get the directory from.
 * @returns The directory path.
 */ function dirname$1(path) {
  assertArg$3$1(path);
  let end = -1;
  let matchedNonSeparator = false;
  for(let i = path.length - 1; i >= 1; --i){
    if (isPosixPathSeparator$1(path.charCodeAt(i))) {
      if (matchedNonSeparator) {
        end = i;
        break;
      }
    } else {
      matchedNonSeparator = true;
    }
  }
  // No matches. Fallback based on provided path:
  //
  // - leading slashes paths
  //     "/foo" => "/"
  //     "///foo" => "/"
  // - no slash path
  //     "foo" => "."
  if (end === -1) {
    return isPosixPathSeparator$1(path.charCodeAt(0)) ? "/" : ".";
  }
  return stripTrailingSeparators$1(path.slice(0, end), isPosixPathSeparator$1);
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Return the extension of the `path` with leading period.
 *
 * @example Usage
 * ```ts
 * import { extname } from "@std/path/posix/extname";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(extname("/home/user/Documents/file.ts"), ".ts");
 * assertEquals(extname("/home/user/Documents/"), "");
 * assertEquals(extname("/home/user/Documents/image.png"), ".png");
 * ```
 *
 * @example Working with URLs
 *
 * Note: This function doesn't automatically strip hash and query parts from
 * URLs. If your URL contains a hash or query, remove them before passing the
 * URL to the function. This can be done by passing the URL to `new URL(url)`,
 * and setting the `hash` and `search` properties to empty strings.
 *
 * ```ts
 * import { extname } from "@std/path/posix/extname";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(extname("https://deno.land/std/path/mod.ts"), ".ts");
 * assertEquals(extname("https://deno.land/std/path/mod.ts?a=b"), ".ts?a=b");
 * assertEquals(extname("https://deno.land/std/path/mod.ts#header"), ".ts#header");
 * ```
 *
 * Note: If you are working with file URLs,
 * use the new version of `extname` from `@std/path/posix/unstable-extname`.
 *
 * @param path The path to get the extension from.
 * @returns The extension (ex. for `file.ts` returns `.ts`).
 */ function extname$1(path) {
  assertPath$1(path);
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  let preDotState = 0;
  for(let i = path.length - 1; i >= 0; --i){
    const code = path.charCodeAt(i);
    if (isPosixPathSeparator$1(code)) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === CHAR_DOT$1) {
      // If this is our first dot, mark it as the start of our extension
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path.slice(startDot, end);
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
function _format$1(sep, pathObject) {
  const dir = pathObject.dir || pathObject.root;
  const base = pathObject.base || (pathObject.name ?? "") + (pathObject.ext ?? "");
  if (!dir) return base;
  if (base === sep) return dir;
  if (dir === pathObject.root) return dir + base;
  return dir + sep + base;
}
function assertArg$2$1(pathObject) {
  if (pathObject === null || typeof pathObject !== "object") {
    throw new TypeError(`The "pathObject" argument must be of type Object, received type "${typeof pathObject}"`);
  }
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Generate a path from `ParsedPath` object.
 *
 * @example Usage
 * ```ts
 * import { format } from "@std/path/posix/format";
 * import { assertEquals } from "@std/assert";
 *
 * const path = format({
 *   root: "/",
 *   dir: "/path/dir",
 *   base: "file.txt",
 *   ext: ".txt",
 *   name: "file"
 * });
 * assertEquals(path, "/path/dir/file.txt");
 * ```
 *
 * @param pathObject The path object to format.
 * @returns The formatted path.
 */ function format$1(pathObject) {
  assertArg$2$1(pathObject);
  return _format$1("/", pathObject);
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
function assertArg$1$1(url) {
  url = url instanceof URL ? url : new URL(url);
  if (url.protocol !== "file:") {
    throw new TypeError(`URL must be a file URL: received "${url.protocol}"`);
  }
  return url;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Converts a file URL to a path string.
 *
 * @example Usage
 * ```ts
 * import { fromFileUrl } from "@std/path/posix/from-file-url";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(fromFileUrl(new URL("file:///home/foo")), "/home/foo");
 * ```
 *
 * @param url The file URL to convert.
 * @returns The path string.
 */ function fromFileUrl$1(url) {
  url = assertArg$1$1(url);
  return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Verifies whether provided path is absolute.
 *
 * @example Usage
 * ```ts
 * import { isAbsolute } from "@std/path/posix/is-absolute";
 * import { assert, assertFalse } from "@std/assert";
 *
 * assert(isAbsolute("/home/user/Documents/"));
 * assertFalse(isAbsolute("home/user/Documents/"));
 * ```
 *
 * @param path The path to verify.
 * @returns Whether the path is absolute.
 */ function isAbsolute$1(path) {
  assertPath$1(path);
  return path.length > 0 && isPosixPathSeparator$1(path.charCodeAt(0));
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
function assertArg$4(path) {
  assertPath$1(path);
  if (path.length === 0) return ".";
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
// This module is browser compatible.
// Resolves . and .. elements in a path with directory names
function normalizeString$1(path, allowAboveRoot, separator, isPathSeparator) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let code;
  for(let i = 0; i <= path.length; ++i){
    if (i < path.length) code = path.charCodeAt(i);
    else if (isPathSeparator(code)) break;
    else code = CHAR_FORWARD_SLASH$1;
    if (isPathSeparator(code)) {
      if (lastSlash === i - 1 || dots === 1) ; else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== CHAR_DOT$1 || res.charCodeAt(res.length - 2) !== CHAR_DOT$1) {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf(separator);
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
            }
            lastSlash = i;
            dots = 0;
            continue;
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) res += `${separator}..`;
          else res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += separator + path.slice(lastSlash + 1, i);
        else res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === CHAR_DOT$1 && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Normalize the `path`, resolving `'..'` and `'.'` segments.
 * Note that resolving these segments does not necessarily mean that all will be eliminated.
 * A `'..'` at the top-level will be preserved, and an empty path is canonically `'.'`.
 *
 * @example Usage
 * ```ts
 * import { normalize } from "@std/path/posix/normalize";
 * import { assertEquals } from "@std/assert";
 *
 * const path = normalize("/foo/bar//baz/asdf/quux/..");
 * assertEquals(path, "/foo/bar/baz/asdf");
 * ```
 *
 * @example Working with URLs
 *
 * Note: This function will remove the double slashes from a URL's scheme.
 * Hence, do not pass a full URL to this function. Instead, pass the pathname of
 * the URL.
 *
 * ```ts
 * import { normalize } from "@std/path/posix/normalize";
 * import { assertEquals } from "@std/assert";
 *
 * const url = new URL("https://deno.land");
 * url.pathname = normalize("//std//assert//.//mod.ts");
 * assertEquals(url.href, "https://deno.land/std/assert/mod.ts");
 *
 * url.pathname = normalize("std/assert/../async/retry.ts");
 * assertEquals(url.href, "https://deno.land/std/async/retry.ts");
 * ```
 *
 * Note: If you are working with file URLs,
 * use the new version of `normalize` from `@std/path/posix/unstable-normalize`.
 *
 * @param path The path to normalize.
 * @returns The normalized path.
 */ function normalize$2(path) {
  assertArg$4(path);
  const isAbsolute = isPosixPathSeparator$1(path.charCodeAt(0));
  const trailingSeparator = isPosixPathSeparator$1(path.charCodeAt(path.length - 1));
  // Normalize the path
  path = normalizeString$1(path, !isAbsolute, "/", isPosixPathSeparator$1);
  if (path.length === 0 && !isAbsolute) path = ".";
  if (path.length > 0 && trailingSeparator) path += "/";
  if (isAbsolute) return `/${path}`;
  return path;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Join all given a sequence of `paths`,then normalizes the resulting path.
 *
 * @example Usage
 * ```ts
 * import { join } from "@std/path/posix/join";
 * import { assertEquals } from "@std/assert";
 *
 * const path = join("/foo", "bar", "baz/asdf", "quux", "..");
 * assertEquals(path, "/foo/bar/baz/asdf");
 * ```
 *
 * @example Working with URLs
 * ```ts
 * import { join } from "@std/path/posix/join";
 * import { assertEquals } from "@std/assert";
 *
 * const url = new URL("https://deno.land");
 * url.pathname = join("std", "path", "mod.ts");
 * assertEquals(url.href, "https://deno.land/std/path/mod.ts");
 *
 * url.pathname = join("//std", "path/", "/mod.ts");
 * assertEquals(url.href, "https://deno.land/std/path/mod.ts");
 * ```
 *
 * Note: If you are working with file URLs,
 * use the new version of `join` from `@std/path/posix/unstable-join`.
 *
 * @param paths The paths to join.
 * @returns The joined path.
 */ function join$1(...paths) {
  if (paths.length === 0) return ".";
  paths.forEach((path)=>assertPath$1(path));
  const joined = paths.filter((path)=>path.length > 0).join("/");
  return joined === "" ? "." : normalize$2(joined);
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Return a `ParsedPath` object of the `path`.
 *
 * @example Usage
 * ```ts
 * import { parse } from "@std/path/posix/parse";
 * import { assertEquals } from "@std/assert";
 *
 * const path = parse("/home/user/file.txt");
 * assertEquals(path, {
 *   root: "/",
 *   dir: "/home/user",
 *   base: "file.txt",
 *   ext: ".txt",
 *   name: "file"
 * });
 * ```
 *
 * @param path The path to parse.
 * @returns The parsed path object.
 */ function parse$1(path) {
  assertPath$1(path);
  const ret = {
    root: "",
    dir: "",
    base: "",
    ext: "",
    name: ""
  };
  if (path.length === 0) return ret;
  const isAbsolute = isPosixPathSeparator$1(path.charCodeAt(0));
  let start;
  if (isAbsolute) {
    ret.root = "/";
    start = 1;
  } else {
    start = 0;
  }
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let i = path.length - 1;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  let preDotState = 0;
  // Get non-dir info
  for(; i >= start; --i){
    const code = path.charCodeAt(i);
    if (isPosixPathSeparator$1(code)) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === CHAR_DOT$1) {
      // If this is our first dot, mark it as the start of our extension
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1) {
      if (startPart === 0 && isAbsolute) {
        ret.base = ret.name = path.slice(1, end);
      } else {
        ret.base = ret.name = path.slice(startPart, end);
      }
    }
    // Fallback to '/' in case there is no basename
    ret.base = ret.base || "/";
  } else {
    if (startPart === 0 && isAbsolute) {
      ret.name = path.slice(1, startDot);
      ret.base = path.slice(1, end);
    } else {
      ret.name = path.slice(startPart, startDot);
      ret.base = path.slice(startPart, end);
    }
    ret.ext = path.slice(startDot, end);
  }
  if (startPart > 0) {
    ret.dir = stripTrailingSeparators$1(path.slice(0, startPart - 1), isPosixPathSeparator$1);
  } else if (isAbsolute) ret.dir = "/";
  return ret;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Resolves path segments into a `path`.
 *
 * @example Usage
 * ```ts
 * import { resolve } from "@std/path/posix/resolve";
 * import { assertEquals } from "@std/assert";
 *
 * const path = resolve("/foo", "bar", "baz/asdf", "quux", "..");
 * assertEquals(path, "/foo/bar/baz/asdf");
 * ```
 *
 * @param pathSegments The path segments to resolve.
 * @returns The resolved path.
 */ function resolve$1(...pathSegments) {
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for(let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--){
    let path;
    if (i >= 0) path = pathSegments[i];
    else {
      // deno-lint-ignore no-explicit-any
      const { Deno } = globalThis;
      if (typeof Deno?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a current working directory (CWD)");
      }
      path = Deno.cwd();
    }
    assertPath$1(path);
    // Skip empty entries
    if (path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isPosixPathSeparator$1(path.charCodeAt(0));
  }
  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when Deno.cwd() fails)
  // Normalize the path
  resolvedPath = normalizeString$1(resolvedPath, !resolvedAbsolute, "/", isPosixPathSeparator$1);
  if (resolvedAbsolute) {
    if (resolvedPath.length > 0) return `/${resolvedPath}`;
    else return "/";
  } else if (resolvedPath.length > 0) return resolvedPath;
  else return ".";
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
function assertArgs$2(from, to) {
  assertPath$1(from);
  assertPath$1(to);
  if (from === to) return "";
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Return the relative path from `from` to `to` based on current working directory.
 *
 * If `from` and `to` are the same, return an empty string.
 *
 * @example Usage
 * ```ts
 * import { relative } from "@std/path/posix/relative";
 * import { assertEquals } from "@std/assert";
 *
 * const path = relative("/data/orandea/test/aaa", "/data/orandea/impl/bbb");
 * assertEquals(path, "../../impl/bbb");
 * ```
 *
 * @param from The path to start from.
 * @param to The path to reach.
 * @returns The relative path.
 */ function relative$1(from, to) {
  assertArgs$2(from, to);
  from = resolve$1(from);
  to = resolve$1(to);
  if (from === to) return "";
  // Trim any leading backslashes
  let fromStart = 1;
  const fromEnd = from.length;
  for(; fromStart < fromEnd; ++fromStart){
    if (!isPosixPathSeparator$1(from.charCodeAt(fromStart))) break;
  }
  const fromLen = fromEnd - fromStart;
  // Trim any leading backslashes
  let toStart = 1;
  const toEnd = to.length;
  for(; toStart < toEnd; ++toStart){
    if (!isPosixPathSeparator$1(to.charCodeAt(toStart))) break;
  }
  const toLen = toEnd - toStart;
  // Compare paths to find the longest common path from root
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i = 0;
  for(; i <= length; ++i){
    if (i === length) {
      if (toLen > length) {
        if (isPosixPathSeparator$1(to.charCodeAt(toStart + i))) {
          // We get here if `from` is the exact base path for `to`.
          // For example: from='/foo/bar'; to='/foo/bar/baz'
          return to.slice(toStart + i + 1);
        } else if (i === 0) {
          // We get here if `from` is the root
          // For example: from='/'; to='/foo'
          return to.slice(toStart + i);
        }
      } else if (fromLen > length) {
        if (isPosixPathSeparator$1(from.charCodeAt(fromStart + i))) {
          // We get here if `to` is the exact base path for `from`.
          // For example: from='/foo/bar/baz'; to='/foo/bar'
          lastCommonSep = i;
        } else if (i === 0) {
          // We get here if `to` is the root.
          // For example: from='/foo'; to='/'
          lastCommonSep = 0;
        }
      }
      break;
    }
    const fromCode = from.charCodeAt(fromStart + i);
    const toCode = to.charCodeAt(toStart + i);
    if (fromCode !== toCode) break;
    else if (isPosixPathSeparator$1(fromCode)) lastCommonSep = i;
  }
  let out = "";
  // Generate the relative path based on the path difference between `to`
  // and `from`
  for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
    if (i === fromEnd || isPosixPathSeparator$1(from.charCodeAt(i))) {
      if (out.length === 0) out += "..";
      else out += "/..";
    }
  }
  // Lastly, append the rest of the destination (`to`) path that comes after
  // the common path parts
  if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
  else {
    toStart += lastCommonSep;
    if (isPosixPathSeparator$1(to.charCodeAt(toStart))) ++toStart;
    return to.slice(toStart);
  }
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
const WHITESPACE_ENCODINGS$1 = {
  "\u0009": "%09",
  "\u000A": "%0A",
  "\u000B": "%0B",
  "\u000C": "%0C",
  "\u000D": "%0D",
  "\u0020": "%20"
};
function encodeWhitespace$1(string) {
  return string.replaceAll(/[\s]/g, (c)=>{
    return WHITESPACE_ENCODINGS$1[c] ?? c;
  });
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Converts a path string to a file URL.
 *
 * @example Usage
 * ```ts
 * import { toFileUrl } from "@std/path/posix/to-file-url";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(toFileUrl("/home/foo"), new URL("file:///home/foo"));
 * assertEquals(toFileUrl("/home/foo bar"), new URL("file:///home/foo%20bar"));
 * ```
 *
 * @param path The path to convert.
 * @returns The file URL.
 */ function toFileUrl$1(path) {
  if (!isAbsolute$1(path)) {
    throw new TypeError(`Path must be absolute: received "${path}"`);
  }
  const url = new URL("file:///");
  url.pathname = encodeWhitespace$1(path.replace(/%/g, "%25").replace(/\\/g, "%5C"));
  return url;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Converts a path to a namespaced path. This function returns the path as is on posix.
 *
 * @example Usage
 * ```ts
 * import { toNamespacedPath } from "@std/path/posix/to-namespaced-path";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(toNamespacedPath("/home/foo"), "/home/foo");
 * ```
 *
 * @param path The path.
 * @returns The namespaced path.
 */ function toNamespacedPath$1(path) {
  // Non-op on posix systems
  return path;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
function common$1$1(paths, sep) {
  const [first = "", ...remaining] = paths;
  const parts = first.split(sep);
  let endOfPrefix = parts.length;
  let append = "";
  for (const path of remaining){
    const compare = path.split(sep);
    if (compare.length <= endOfPrefix) {
      endOfPrefix = compare.length;
      append = "";
    }
    for(let i = 0; i < endOfPrefix; i++){
      if (compare[i] !== parts[i]) {
        endOfPrefix = i;
        append = i === 0 ? "" : sep;
        break;
      }
    }
  }
  return parts.slice(0, endOfPrefix).join(sep) + append;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/** Determines the common path from a set of paths for POSIX systems.
 *
 * @example Usage
 * ```ts
 * import { common } from "@std/path/posix/common";
 * import { assertEquals } from "@std/assert";
 *
 * const path = common([
 *   "./deno/std/path/mod.ts",
 *   "./deno/std/fs/mod.ts",
 * ]);
 * assertEquals(path, "./deno/std/");
 * ```
 *
 * @param paths The paths to compare.
 * @returns The common path.
 */ function common$2(paths) {
  return common$1$1(paths, SEPARATOR$1);
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Options for {@linkcode globToRegExp}, {@linkcode joinGlobs},
 * {@linkcode normalizeGlob} and {@linkcode expandGlob}.
 */ const REG_EXP_ESCAPE_CHARS$1 = [
  "!",
  "$",
  "(",
  ")",
  "*",
  "+",
  ".",
  "=",
  "?",
  "[",
  "\\",
  "^",
  "{",
  "|"
];
const RANGE_ESCAPE_CHARS$1 = [
  "-",
  "\\",
  "]"
];
function _globToRegExp$1(c, glob, { extended = true, globstar: globstarOption = true, // os = osType,
caseInsensitive = false } = {}) {
  if (glob === "") {
    return /(?!)/;
  }
  // Remove trailing separators.
  let newLength = glob.length;
  for(; newLength > 1 && c.seps.includes(glob[newLength - 1]); newLength--);
  glob = glob.slice(0, newLength);
  let regExpString = "";
  // Terminates correctly. Trust that `j` is incremented every iteration.
  for(let j = 0; j < glob.length;){
    let segment = "";
    const groupStack = [];
    let inRange = false;
    let inEscape = false;
    let endsWithSep = false;
    let i = j;
    // Terminates with `i` at the non-inclusive end of the current segment.
    for(; i < glob.length && !c.seps.includes(glob[i]); i++){
      if (inEscape) {
        inEscape = false;
        const escapeChars = inRange ? RANGE_ESCAPE_CHARS$1 : REG_EXP_ESCAPE_CHARS$1;
        segment += escapeChars.includes(glob[i]) ? `\\${glob[i]}` : glob[i];
        continue;
      }
      if (glob[i] === c.escapePrefix) {
        inEscape = true;
        continue;
      }
      if (glob[i] === "[") {
        if (!inRange) {
          inRange = true;
          segment += "[";
          if (glob[i + 1] === "!") {
            i++;
            segment += "^";
          } else if (glob[i + 1] === "^") {
            i++;
            segment += "\\^";
          }
          continue;
        } else if (glob[i + 1] === ":") {
          let k = i + 1;
          let value = "";
          while(glob[k + 1] !== undefined && glob[k + 1] !== ":"){
            value += glob[k + 1];
            k++;
          }
          if (glob[k + 1] === ":" && glob[k + 2] === "]") {
            i = k + 2;
            if (value === "alnum") segment += "\\dA-Za-z";
            else if (value === "alpha") segment += "A-Za-z";
            else if (value === "ascii") segment += "\x00-\x7F";
            else if (value === "blank") segment += "\t ";
            else if (value === "cntrl") segment += "\x00-\x1F\x7F";
            else if (value === "digit") segment += "\\d";
            else if (value === "graph") segment += "\x21-\x7E";
            else if (value === "lower") segment += "a-z";
            else if (value === "print") segment += "\x20-\x7E";
            else if (value === "punct") {
              segment += "!\"#$%&'()*+,\\-./:;<=>?@[\\\\\\]^_‘{|}~";
            } else if (value === "space") segment += "\\s\v";
            else if (value === "upper") segment += "A-Z";
            else if (value === "word") segment += "\\w";
            else if (value === "xdigit") segment += "\\dA-Fa-f";
            continue;
          }
        }
      }
      if (glob[i] === "]" && inRange) {
        inRange = false;
        segment += "]";
        continue;
      }
      if (inRange) {
        segment += glob[i];
        continue;
      }
      if (glob[i] === ")" && groupStack.length > 0 && groupStack[groupStack.length - 1] !== "BRACE") {
        segment += ")";
        const type = groupStack.pop();
        if (type === "!") {
          segment += c.wildcard;
        } else if (type !== "@") {
          segment += type;
        }
        continue;
      }
      if (glob[i] === "|" && groupStack.length > 0 && groupStack[groupStack.length - 1] !== "BRACE") {
        segment += "|";
        continue;
      }
      if (glob[i] === "+" && extended && glob[i + 1] === "(") {
        i++;
        groupStack.push("+");
        segment += "(?:";
        continue;
      }
      if (glob[i] === "@" && extended && glob[i + 1] === "(") {
        i++;
        groupStack.push("@");
        segment += "(?:";
        continue;
      }
      if (glob[i] === "?") {
        if (extended && glob[i + 1] === "(") {
          i++;
          groupStack.push("?");
          segment += "(?:";
        } else {
          segment += ".";
        }
        continue;
      }
      if (glob[i] === "!" && extended && glob[i + 1] === "(") {
        i++;
        groupStack.push("!");
        segment += "(?!";
        continue;
      }
      if (glob[i] === "{") {
        groupStack.push("BRACE");
        segment += "(?:";
        continue;
      }
      if (glob[i] === "}" && groupStack[groupStack.length - 1] === "BRACE") {
        groupStack.pop();
        segment += ")";
        continue;
      }
      if (glob[i] === "," && groupStack[groupStack.length - 1] === "BRACE") {
        segment += "|";
        continue;
      }
      if (glob[i] === "*") {
        if (extended && glob[i + 1] === "(") {
          i++;
          groupStack.push("*");
          segment += "(?:";
        } else {
          const prevChar = glob[i - 1];
          let numStars = 1;
          while(glob[i + 1] === "*"){
            i++;
            numStars++;
          }
          const nextChar = glob[i + 1];
          if (globstarOption && numStars === 2 && [
            ...c.seps,
            undefined
          ].includes(prevChar) && [
            ...c.seps,
            undefined
          ].includes(nextChar)) {
            segment += c.globstar;
            endsWithSep = true;
          } else {
            segment += c.wildcard;
          }
        }
        continue;
      }
      segment += REG_EXP_ESCAPE_CHARS$1.includes(glob[i]) ? `\\${glob[i]}` : glob[i];
    }
    // Check for unclosed groups or a dangling backslash.
    if (groupStack.length > 0 || inRange || inEscape) {
      // Parse failure. Take all characters from this segment literally.
      segment = "";
      for (const c of glob.slice(j, i)){
        segment += REG_EXP_ESCAPE_CHARS$1.includes(c) ? `\\${c}` : c;
        endsWithSep = false;
      }
    }
    regExpString += segment;
    if (!endsWithSep) {
      regExpString += i < glob.length ? c.sep : c.sepMaybe;
      endsWithSep = true;
    }
    // Terminates with `i` at the start of the next segment.
    while(c.seps.includes(glob[i]))i++;
    j = i;
  }
  regExpString = `^${regExpString}$`;
  return new RegExp(regExpString, caseInsensitive ? "i" : "");
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
const constants$1 = {
  sep: "/+",
  sepMaybe: "/*",
  seps: [
    "/"
  ],
  globstar: "(?:[^/]*(?:/|$)+)*",
  wildcard: "[^/]*",
  escapePrefix: "\\"
};
/** Convert a glob string to a regular expression.
 *
 * Tries to match bash glob expansion as closely as possible.
 *
 * Basic glob syntax:
 * - `*` - Matches everything without leaving the path segment.
 * - `?` - Matches any single character.
 * - `{foo,bar}` - Matches `foo` or `bar`.
 * - `[abcd]` - Matches `a`, `b`, `c` or `d`.
 * - `[a-d]` - Matches `a`, `b`, `c` or `d`.
 * - `[!abcd]` - Matches any single character besides `a`, `b`, `c` or `d`.
 * - `[[:<class>:]]` - Matches any character belonging to `<class>`.
 *     - `[[:alnum:]]` - Matches any digit or letter.
 *     - `[[:digit:]abc]` - Matches any digit, `a`, `b` or `c`.
 *     - See https://facelessuser.github.io/wcmatch/glob/#posix-character-classes
 *       for a complete list of supported character classes.
 * - `\` - Escapes the next character for an `os` other than `"windows"`.
 * - \` - Escapes the next character for `os` set to `"windows"`.
 * - `/` - Path separator.
 * - `\` - Additional path separator only for `os` set to `"windows"`.
 *
 * Extended syntax:
 * - Requires `{ extended: true }`.
 * - `?(foo|bar)` - Matches 0 or 1 instance of `{foo,bar}`.
 * - `@(foo|bar)` - Matches 1 instance of `{foo,bar}`. They behave the same.
 * - `*(foo|bar)` - Matches _n_ instances of `{foo,bar}`.
 * - `+(foo|bar)` - Matches _n > 0_ instances of `{foo,bar}`.
 * - `!(foo|bar)` - Matches anything other than `{foo,bar}`.
 * - See https://www.linuxjournal.com/content/bash-extended-globbing.
 *
 * Globstar syntax:
 * - Requires `{ globstar: true }`.
 * - `**` - Matches any number of any path segments.
 *     - Must comprise its entire path segment in the provided glob.
 * - See https://www.linuxjournal.com/content/globstar-new-bash-globbing-option.
 *
 * Note the following properties:
 * - The generated `RegExp` is anchored at both start and end.
 * - Repeating and trailing separators are tolerated. Trailing separators in the
 *   provided glob have no meaning and are discarded.
 * - Absolute globs will only match absolute paths, etc.
 * - Empty globs will match nothing.
 * - Any special glob syntax must be contained to one path segment. For example,
 *   `?(foo|bar/baz)` is invalid. The separator will take precedence and the
 *   first segment ends with an unclosed group.
 * - If a path segment ends with unclosed groups or a dangling escape prefix, a
 *   parse error has occurred. Every character for that segment is taken
 *   literally in this event.
 *
 * Limitations:
 * - A negative group like `!(foo|bar)` will wrongly be converted to a negative
 *   look-ahead followed by a wildcard. This means that `!(foo).js` will wrongly
 *   fail to match `foobar.js`, even though `foobar` is not `foo`. Effectively,
 *   `!(foo|bar)` is treated like `!(@(foo|bar)*)`. This will work correctly if
 *   the group occurs not nested at the end of the segment.
 *
 * @example Usage
 * ```ts
 * import { globToRegExp } from "@std/path/posix/glob-to-regexp";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(globToRegExp("*.js"), /^[^/]*\.js\/*$/);
 * ```
 *
 * @param glob Glob string to convert.
 * @param options Conversion options.
 * @returns The regular expression equivalent to the glob.
 */ function globToRegExp$1(glob, options = {}) {
  return _globToRegExp$1(constants$1, glob, options);
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Test whether the given string is a glob.
 *
 * @example Usage
 * ```ts
 * import { isGlob } from "@std/path/is-glob";
 * import { assert } from "@std/assert";
 *
 * assert(!isGlob("foo/bar/../baz"));
 * assert(isGlob("foo/*ar/../baz"));
 * ```
 *
 * @param str String to test.
 * @returns `true` if the given string is a glob, otherwise `false`
 */ function isGlob$1(str) {
  const chars = {
    "{": "}",
    "(": ")",
    "[": "]"
  };
  const regex = /\\(.)|(^!|\*|\?|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
  if (str === "") {
    return false;
  }
  let match;
  while(match = regex.exec(str)){
    if (match[2]) return true;
    let idx = match.index + match[0].length;
    // if an open bracket/brace/paren is escaped,
    // set the index to the next closing character
    const open = match[1];
    const close = open ? chars[open] : null;
    if (open && close) {
      const n = str.indexOf(close, idx);
      if (n !== -1) {
        idx = n + 1;
      }
    }
    str = str.slice(idx);
  }
  return false;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Like normalize(), but doesn't collapse "**\/.." when `globstar` is true.
 *
 * @example Usage
 * ```ts
 * import { normalizeGlob } from "@std/path/posix/normalize-glob";
 * import { assertEquals } from "@std/assert";
 *
 * const path = normalizeGlob("foo/bar/../*", { globstar: true });
 * assertEquals(path, "foo/*");
 * ```
 *
 * @param glob The glob to normalize.
 * @param options The options to use.
 * @returns The normalized path.
 */ function normalizeGlob$1(glob, options = {}) {
  const { globstar = false } = options;
  if (glob.match(/\0/g)) {
    throw new Error(`Glob contains invalid characters: "${glob}"`);
  }
  if (!globstar) {
    return normalize$2(glob);
  }
  const s = SEPARATOR_PATTERN$1.source;
  const badParentPattern = new RegExp(`(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`, "g");
  return normalize$2(glob.replace(badParentPattern, "\0")).replace(/\0/g, "..");
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Like join(), but doesn't collapse "**\/.." when `globstar` is true.
 *
 * @example Usage
 * ```ts
 * import { joinGlobs } from "@std/path/posix/join-globs";
 * import { assertEquals } from "@std/assert";
 *
 * const path = joinGlobs(["foo", "bar", "**"], { globstar: true });
 * assertEquals(path, "foo/bar/**");
 * ```
 *
 * @param globs The globs to join.
 * @param options The options to use.
 * @returns The joined path.
 */ function joinGlobs$1(globs, options = {}) {
  const { globstar = false } = options;
  if (!globstar || globs.length === 0) {
    return join$1(...globs);
  }
  let joined;
  for (const glob of globs){
    const path = glob;
    if (path.length > 0) {
      if (!joined) joined = path;
      else joined += `${SEPARATOR$1}${path}`;
    }
  }
  if (!joined) return ".";
  return normalizeGlob$1(joined, {
    globstar
  });
}

const posixPath = {
  __proto__: null,
  DELIMITER: DELIMITER$1,
  SEPARATOR: SEPARATOR$1,
  SEPARATOR_PATTERN: SEPARATOR_PATTERN$1,
  basename: basename$1,
  common: common$2,
  dirname: dirname$1,
  extname: extname$1,
  format: format$1,
  fromFileUrl: fromFileUrl$1,
  globToRegExp: globToRegExp$1,
  isAbsolute: isAbsolute$1,
  isGlob: isGlob$1,
  join: join$1,
  joinGlobs: joinGlobs$1,
  normalize: normalize$2,
  normalizeGlob: normalizeGlob$1,
  parse: parse$1,
  relative: relative$1,
  resolve: resolve$1,
  toFileUrl: toFileUrl$1,
  toNamespacedPath: toNamespacedPath$1
};

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.
function assertPath(path) {
  if (typeof path !== "string") {
    throw new TypeError(`Path must be a string, received "${JSON.stringify(path)}"`);
  }
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
function stripSuffix(name, suffix) {
  if (suffix.length >= name.length) {
    return name;
  }
  const lenDiff = name.length - suffix.length;
  for(let i = suffix.length - 1; i >= 0; --i){
    if (name.charCodeAt(lenDiff + i) !== suffix.charCodeAt(i)) {
      return name;
    }
  }
  return name.slice(0, -suffix.length);
}
function lastPathSegment(path, isSep, start = 0) {
  let matchedNonSeparator = false;
  let end = path.length;
  for(let i = path.length - 1; i >= start; --i){
    if (isSep(path.charCodeAt(i))) {
      if (matchedNonSeparator) {
        start = i + 1;
        break;
      }
    } else if (!matchedNonSeparator) {
      matchedNonSeparator = true;
      end = i + 1;
    }
  }
  return path.slice(start, end);
}
function assertArgs$1(path, suffix) {
  assertPath(path);
  if (path.length === 0) return path;
  if (typeof suffix !== "string") {
    throw new TypeError(`Suffix must be a string, received "${JSON.stringify(suffix)}"`);
  }
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
// This module is browser compatible.
// Alphabet chars.
const CHAR_UPPERCASE_A = 65; /* A */ 
const CHAR_LOWERCASE_A = 97; /* a */ 
const CHAR_UPPERCASE_Z = 90; /* Z */ 
const CHAR_LOWERCASE_Z = 122; /* z */ 
// Non-alphabetic chars.
const CHAR_DOT = 46; /* . */ 
const CHAR_FORWARD_SLASH = 47; /* / */ 
const CHAR_BACKWARD_SLASH = 92; /* \ */ 
const CHAR_COLON = 58; /* : */ 
const CHAR_QUESTION_MARK = 63; /* ? */

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
// This module is browser compatible.
function stripTrailingSeparators(segment, isSep) {
  if (segment.length <= 1) {
    return segment;
  }
  let end = segment.length;
  for(let i = segment.length - 1; i > 0; i--){
    if (isSep(segment.charCodeAt(i))) {
      end = i;
    } else {
      break;
    }
  }
  return segment.slice(0, end);
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
// This module is browser compatible.
function isPosixPathSeparator(code) {
  return code === CHAR_FORWARD_SLASH;
}
function isPathSeparator(code) {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
}
function isWindowsDeviceRoot(code) {
  return code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z || code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Return the last portion of a `path`.
 * Trailing directory separators are ignored, and optional suffix is removed.
 *
 * @example Usage
 * ```ts
 * import { basename } from "@std/path/windows/basename";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(basename("C:\\user\\Documents\\"), "Documents");
 * assertEquals(basename("C:\\user\\Documents\\image.png"), "image.png");
 * assertEquals(basename("C:\\user\\Documents\\image.png", ".png"), "image");
 * ```
 *
 * Note: If you are working with file URLs,
 * use the new version of `basename` from `@std/path/windows/unstable-basename`.
 *
 * @param path The path to extract the name from.
 * @param suffix The suffix to remove from extracted name.
 * @returns The extracted name.
 */ function basename(path, suffix = "") {
  assertArgs$1(path, suffix);
  // Check for a drive letter prefix so as not to mistake the following
  // path separator as an extra separator at the end of the path that can be
  // disregarded
  let start = 0;
  if (path.length >= 2) {
    const drive = path.charCodeAt(0);
    if (isWindowsDeviceRoot(drive)) {
      if (path.charCodeAt(1) === CHAR_COLON) start = 2;
    }
  }
  const lastSegment = lastPathSegment(path, isPathSeparator, start);
  const strippedSegment = stripTrailingSeparators(lastSegment, isPathSeparator);
  return suffix ? stripSuffix(strippedSegment, suffix) : strippedSegment;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * The character used to separate entries in the PATH environment variable.
 */ const DELIMITER = ";";
/**
 * The character used to separate components of a file path.
 */ const SEPARATOR = "\\";
/**
 * A regular expression that matches one or more path separators.
 */ const SEPARATOR_PATTERN = /[\\/]+/;

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
function assertArg$3(path) {
  assertPath(path);
  if (path.length === 0) return ".";
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Return the directory path of a `path`.
 *
 * @example Usage
 * ```ts
 * import { dirname } from "@std/path/windows/dirname";
 * import { assertEquals } from "@std/assert";
 *
 * const dir = dirname("C:\\foo\\bar\\baz.ext");
 * assertEquals(dir, "C:\\foo\\bar");
 * ```
 *
 * Note: If you are working with file URLs,
 * use the new version of `dirname` from `@std/path/windows/unstable-dirname`.
 *
 * @param path The path to get the directory from.
 * @returns The directory path.
 */ function dirname(path) {
  assertArg$3(path);
  const len = path.length;
  let rootEnd = -1;
  let end = -1;
  let matchedSlash = true;
  let offset = 0;
  const code = path.charCodeAt(0);
  // Try to match a root
  if (len > 1) {
    if (isPathSeparator(code)) {
      // Possible UNC root
      rootEnd = offset = 1;
      if (isPathSeparator(path.charCodeAt(1))) {
        // Matched double path separator at beginning
        let j = 2;
        let last = j;
        // Match 1 or more non-path separators
        for(; j < len; ++j){
          if (isPathSeparator(path.charCodeAt(j))) break;
        }
        if (j < len && j !== last) {
          // Matched!
          last = j;
          // Match 1 or more path separators
          for(; j < len; ++j){
            if (!isPathSeparator(path.charCodeAt(j))) break;
          }
          if (j < len && j !== last) {
            // Matched!
            last = j;
            // Match 1 or more non-path separators
            for(; j < len; ++j){
              if (isPathSeparator(path.charCodeAt(j))) break;
            }
            if (j === len) {
              // We matched a UNC root only
              return path;
            }
            if (j !== last) {
              // We matched a UNC root with leftovers
              // Offset by 1 to include the separator after the UNC root to
              // treat it as a "normal root" on top of a (UNC) root
              rootEnd = offset = j + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot(code)) {
      // Possible device root
      if (path.charCodeAt(1) === CHAR_COLON) {
        rootEnd = offset = 2;
        if (len > 2) {
          if (isPathSeparator(path.charCodeAt(2))) rootEnd = offset = 3;
        }
      }
    }
  } else if (isPathSeparator(code)) {
    // `path` contains just a path separator, exit early to avoid
    // unnecessary work
    return path;
  }
  for(let i = len - 1; i >= offset; --i){
    if (isPathSeparator(path.charCodeAt(i))) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }
  if (end === -1) {
    if (rootEnd === -1) return ".";
    else end = rootEnd;
  }
  return stripTrailingSeparators(path.slice(0, end), isPosixPathSeparator);
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Return the extension of the `path` with leading period.
 *
 * @example Usage
 * ```ts
 * import { extname } from "@std/path/windows/extname";
 * import { assertEquals } from "@std/assert";
 *
 * const ext = extname("file.ts");
 * assertEquals(ext, ".ts");
 * ```
 *
 * Note: If you are working with file URLs,
 * use the new version of `extname` from `@std/path/windows/unstable-extname`.
 *
 * @param path The path to get the extension from.
 * @returns The extension of the `path`.
 */ function extname(path) {
  assertPath(path);
  let start = 0;
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  let preDotState = 0;
  // Check for a drive letter prefix so as not to mistake the following
  // path separator as an extra separator at the end of the path that can be
  // disregarded
  if (path.length >= 2 && path.charCodeAt(1) === CHAR_COLON && isWindowsDeviceRoot(path.charCodeAt(0))) {
    start = startPart = 2;
  }
  for(let i = path.length - 1; i >= start; --i){
    const code = path.charCodeAt(i);
    if (isPathSeparator(code)) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === CHAR_DOT) {
      // If this is our first dot, mark it as the start of our extension
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path.slice(startDot, end);
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
function _format(sep, pathObject) {
  const dir = pathObject.dir || pathObject.root;
  const base = pathObject.base || (pathObject.name ?? "") + (pathObject.ext ?? "");
  if (!dir) return base;
  if (base === sep) return dir;
  if (dir === pathObject.root) return dir + base;
  return dir + sep + base;
}
function assertArg$2(pathObject) {
  if (pathObject === null || typeof pathObject !== "object") {
    throw new TypeError(`The "pathObject" argument must be of type Object, received type "${typeof pathObject}"`);
  }
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Generate a path from `ParsedPath` object.
 *
 * @example Usage
 * ```ts
 * import { format } from "@std/path/windows/format";
 * import { assertEquals } from "@std/assert";
 *
 * const path = format({
 *   root: "C:\\",
 *   dir: "C:\\path\\dir",
 *   base: "file.txt",
 *   ext: ".txt",
 *   name: "file"
 * });
 * assertEquals(path, "C:\\path\\dir\\file.txt");
 * ```
 *
 * @param pathObject The path object to format.
 * @returns The formatted path.
 */ function format(pathObject) {
  assertArg$2(pathObject);
  return _format("\\", pathObject);
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
function assertArg$1(url) {
  url = url instanceof URL ? url : new URL(url);
  if (url.protocol !== "file:") {
    throw new TypeError(`URL must be a file URL: received "${url.protocol}"`);
  }
  return url;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Converts a file URL to a path string.
 *
 * @example Usage
 * ```ts
 * import { fromFileUrl } from "@std/path/windows/from-file-url";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(fromFileUrl("file:///home/foo"), "\\home\\foo");
 * assertEquals(fromFileUrl("file:///C:/Users/foo"), "C:\\Users\\foo");
 * assertEquals(fromFileUrl("file://localhost/home/foo"), "\\home\\foo");
 * ```
 *
 * @param url The file URL to convert.
 * @returns The path string.
 */ function fromFileUrl(url) {
  url = assertArg$1(url);
  let path = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
  if (url.hostname !== "") {
    // Note: The `URL` implementation guarantees that the drive letter and
    // hostname are mutually exclusive. Otherwise it would not have been valid
    // to append the hostname and path like this.
    path = `\\\\${url.hostname}${path}`;
  }
  return path;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Verifies whether provided path is absolute.
 *
 * @example Usage
 * ```ts
 * import { isAbsolute } from "@std/path/windows/is-absolute";
 * import { assert, assertFalse } from "@std/assert";
 *
 * assert(isAbsolute("C:\\foo\\bar"));
 * assertFalse(isAbsolute("..\\baz"));
 * ```
 *
 * @param path The path to verify.
 * @returns `true` if the path is absolute, `false` otherwise.
 */ function isAbsolute(path) {
  assertPath(path);
  const len = path.length;
  if (len === 0) return false;
  const code = path.charCodeAt(0);
  if (isPathSeparator(code)) {
    return true;
  } else if (isWindowsDeviceRoot(code)) {
    // Possible device root
    if (len > 2 && path.charCodeAt(1) === CHAR_COLON) {
      if (isPathSeparator(path.charCodeAt(2))) return true;
    }
  }
  return false;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
function assertArg(path) {
  assertPath(path);
  if (path.length === 0) return ".";
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
// This module is browser compatible.
// Resolves . and .. elements in a path with directory names
function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let code;
  for(let i = 0; i <= path.length; ++i){
    if (i < path.length) code = path.charCodeAt(i);
    else if (isPathSeparator(code)) break;
    else code = CHAR_FORWARD_SLASH;
    if (isPathSeparator(code)) {
      if (lastSlash === i - 1 || dots === 1) ; else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== CHAR_DOT || res.charCodeAt(res.length - 2) !== CHAR_DOT) {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf(separator);
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
            }
            lastSlash = i;
            dots = 0;
            continue;
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) res += `${separator}..`;
          else res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += separator + path.slice(lastSlash + 1, i);
        else res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === CHAR_DOT && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Normalize the `path`, resolving `'..'` and `'.'` segments.
 * Note that resolving these segments does not necessarily mean that all will be eliminated.
 * A `'..'` at the top-level will be preserved, and an empty path is canonically `'.'`.
 *
 * @example Usage
 * ```ts
 * import { normalize } from "@std/path/windows/normalize";
 * import { assertEquals } from "@std/assert";
 *
 * const normalized = normalize("C:\\foo\\..\\bar");
 * assertEquals(normalized, "C:\\bar");
 * ```
 *
 * Note: If you are working with file URLs,
 * use the new version of `normalize` from `@std/path/windows/unstable-normalize`.
 *
 * @param path The path to normalize
 * @returns The normalized path
 */ function normalize$1(path) {
  assertArg(path);
  const len = path.length;
  let rootEnd = 0;
  let device;
  let isAbsolute = false;
  const code = path.charCodeAt(0);
  // Try to match a root
  if (len > 1) {
    if (isPathSeparator(code)) {
      // Possible UNC root
      // If we started with a separator, we know we at least have an absolute
      // path of some kind (UNC or otherwise)
      isAbsolute = true;
      if (isPathSeparator(path.charCodeAt(1))) {
        // Matched double path separator at beginning
        let j = 2;
        let last = j;
        // Match 1 or more non-path separators
        for(; j < len; ++j){
          if (isPathSeparator(path.charCodeAt(j))) break;
        }
        if (j < len && j !== last) {
          const firstPart = path.slice(last, j);
          // Matched!
          last = j;
          // Match 1 or more path separators
          for(; j < len; ++j){
            if (!isPathSeparator(path.charCodeAt(j))) break;
          }
          if (j < len && j !== last) {
            // Matched!
            last = j;
            // Match 1 or more non-path separators
            for(; j < len; ++j){
              if (isPathSeparator(path.charCodeAt(j))) break;
            }
            if (j === len) {
              // We matched a UNC root only
              // Return the normalized version of the UNC root since there
              // is nothing left to process
              return `\\\\${firstPart}\\${path.slice(last)}\\`;
            } else if (j !== last) {
              // We matched a UNC root with leftovers
              device = `\\\\${firstPart}\\${path.slice(last, j)}`;
              rootEnd = j;
            }
          }
        }
      } else {
        rootEnd = 1;
      }
    } else if (isWindowsDeviceRoot(code)) {
      // Possible device root
      if (path.charCodeAt(1) === CHAR_COLON) {
        device = path.slice(0, 2);
        rootEnd = 2;
        if (len > 2) {
          if (isPathSeparator(path.charCodeAt(2))) {
            // Treat separator following drive name as an absolute path
            // indicator
            isAbsolute = true;
            rootEnd = 3;
          }
        }
      }
    }
  } else if (isPathSeparator(code)) {
    // `path` contains just a path separator, exit early to avoid unnecessary
    // work
    return "\\";
  }
  let tail;
  if (rootEnd < len) {
    tail = normalizeString(path.slice(rootEnd), !isAbsolute, "\\", isPathSeparator);
  } else {
    tail = "";
  }
  if (tail.length === 0 && !isAbsolute) tail = ".";
  if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
    tail += "\\";
  }
  if (device === undefined) {
    if (isAbsolute) {
      if (tail.length > 0) return `\\${tail}`;
      else return "\\";
    }
    return tail;
  } else if (isAbsolute) {
    if (tail.length > 0) return `${device}\\${tail}`;
    else return `${device}\\`;
  }
  return device + tail;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Join all given a sequence of `paths`,then normalizes the resulting path.
 *
 * @example Usage
 * ```ts
 * import { join } from "@std/path/windows/join";
 * import { assertEquals } from "@std/assert";
 *
 * const joined = join("C:\\foo", "bar", "baz\\..");
 * assertEquals(joined, "C:\\foo\\bar");
 * ```
 *
 * Note: If you are working with file URLs,
 * use the new version of `join` from `@std/path/windows/unstable-join`.
 *
 * @param paths The paths to join.
 * @returns The joined path.
 */ function join(...paths) {
  paths.forEach((path)=>assertPath(path));
  paths = paths.filter((path)=>path.length > 0);
  if (paths.length === 0) return ".";
  // Make sure that the joined path doesn't start with two slashes, because
  // normalize() will mistake it for an UNC path then.
  //
  // This step is skipped when it is very clear that the user actually
  // intended to point at an UNC path. This is assumed when the first
  // non-empty string arguments starts with exactly two slashes followed by
  // at least one more non-slash character.
  //
  // Note that for normalize() to treat a path as an UNC path it needs to
  // have at least 2 components, so we don't filter for that here.
  // This means that the user can use join to construct UNC paths from
  // a server name and a share name; for example:
  //   path.join('//server', 'share') -> '\\\\server\\share\\'
  let needsReplace = true;
  let slashCount = 0;
  const firstPart = paths[0];
  if (isPathSeparator(firstPart.charCodeAt(0))) {
    ++slashCount;
    const firstLen = firstPart.length;
    if (firstLen > 1) {
      if (isPathSeparator(firstPart.charCodeAt(1))) {
        ++slashCount;
        if (firstLen > 2) {
          if (isPathSeparator(firstPart.charCodeAt(2))) ++slashCount;
          else {
            // We matched a UNC path in the first part
            needsReplace = false;
          }
        }
      }
    }
  }
  let joined = paths.join("\\");
  if (needsReplace) {
    // Find any more consecutive slashes we need to replace
    for(; slashCount < joined.length; ++slashCount){
      if (!isPathSeparator(joined.charCodeAt(slashCount))) break;
    }
    // Replace the slashes if needed
    if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
  }
  return normalize$1(joined);
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Return a `ParsedPath` object of the `path`.
 *
 * @example Usage
 * ```ts
 * import { parse } from "@std/path/windows/parse";
 * import { assertEquals } from "@std/assert";
 *
 * const parsed = parse("C:\\foo\\bar\\baz.ext");
 * assertEquals(parsed, {
 *   root: "C:\\",
 *   dir: "C:\\foo\\bar",
 *   base: "baz.ext",
 *   ext: ".ext",
 *   name: "baz",
 * });
 * ```
 *
 * @param path The path to parse.
 * @returns The `ParsedPath` object.
 */ function parse(path) {
  assertPath(path);
  const ret = {
    root: "",
    dir: "",
    base: "",
    ext: "",
    name: ""
  };
  const len = path.length;
  if (len === 0) return ret;
  let rootEnd = 0;
  let code = path.charCodeAt(0);
  // Try to match a root
  if (len > 1) {
    if (isPathSeparator(code)) {
      // Possible UNC root
      rootEnd = 1;
      if (isPathSeparator(path.charCodeAt(1))) {
        // Matched double path separator at beginning
        let j = 2;
        let last = j;
        // Match 1 or more non-path separators
        for(; j < len; ++j){
          if (isPathSeparator(path.charCodeAt(j))) break;
        }
        if (j < len && j !== last) {
          // Matched!
          last = j;
          // Match 1 or more path separators
          for(; j < len; ++j){
            if (!isPathSeparator(path.charCodeAt(j))) break;
          }
          if (j < len && j !== last) {
            // Matched!
            last = j;
            // Match 1 or more non-path separators
            for(; j < len; ++j){
              if (isPathSeparator(path.charCodeAt(j))) break;
            }
            if (j === len) {
              // We matched a UNC root only
              rootEnd = j;
            } else if (j !== last) {
              // We matched a UNC root with leftovers
              rootEnd = j + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot(code)) {
      // Possible device root
      if (path.charCodeAt(1) === CHAR_COLON) {
        rootEnd = 2;
        if (len > 2) {
          if (isPathSeparator(path.charCodeAt(2))) {
            if (len === 3) {
              // `path` contains just a drive root, exit early to avoid
              // unnecessary work
              ret.root = ret.dir = path;
              ret.base = "\\";
              return ret;
            }
            rootEnd = 3;
          }
        } else {
          // `path` contains just a relative drive root, exit early to avoid
          // unnecessary work
          ret.root = ret.dir = path;
          return ret;
        }
      }
    }
  } else if (isPathSeparator(code)) {
    // `path` contains just a path separator, exit early to avoid
    // unnecessary work
    ret.root = ret.dir = path;
    ret.base = "\\";
    return ret;
  }
  if (rootEnd > 0) ret.root = path.slice(0, rootEnd);
  let startDot = -1;
  let startPart = rootEnd;
  let end = -1;
  let matchedSlash = true;
  let i = path.length - 1;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  let preDotState = 0;
  // Get non-dir info
  for(; i >= rootEnd; --i){
    code = path.charCodeAt(i);
    if (isPathSeparator(code)) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === CHAR_DOT) {
      // If this is our first dot, mark it as the start of our extension
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1) {
      ret.base = ret.name = path.slice(startPart, end);
    }
  } else {
    ret.name = path.slice(startPart, startDot);
    ret.base = path.slice(startPart, end);
    ret.ext = path.slice(startDot, end);
  }
  // Fallback to '\' in case there is no basename
  ret.base = ret.base || "\\";
  // If the directory is the root, use the entire root as the `dir` including
  // the trailing slash if any (`C:\abc` -> `C:\`). Otherwise, strip out the
  // trailing slash (`C:\abc\def` -> `C:\abc`).
  if (startPart > 0 && startPart !== rootEnd) {
    ret.dir = path.slice(0, startPart - 1);
  } else ret.dir = ret.root;
  return ret;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Resolves path segments into a `path`.
 *
 * @example Usage
 * ```ts
 * import { resolve } from "@std/path/windows/resolve";
 * import { assertEquals } from "@std/assert";
 *
 * const resolved = resolve("C:\\foo\\bar", "..\\baz");
 * assertEquals(resolved, "C:\\foo\\baz");
 * ```
 *
 * @param pathSegments The path segments to process to path
 * @returns The resolved path
 */ function resolve(...pathSegments) {
  let resolvedDevice = "";
  let resolvedTail = "";
  let resolvedAbsolute = false;
  for(let i = pathSegments.length - 1; i >= -1; i--){
    let path;
    // deno-lint-ignore no-explicit-any
    const { Deno } = globalThis;
    if (i >= 0) {
      path = pathSegments[i];
    } else if (!resolvedDevice) {
      if (typeof Deno?.cwd !== "function") {
        throw new TypeError("Resolved a drive-letter-less path without a current working directory (CWD)");
      }
      path = Deno.cwd();
    } else {
      if (typeof Deno?.env?.get !== "function" || typeof Deno?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a current working directory (CWD)");
      }
      path = Deno.cwd();
      // Verify that a cwd was found and that it actually points
      // to our drive. If not, default to the drive's root.
      if (path === undefined || path.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
        path = `${resolvedDevice}\\`;
      }
    }
    assertPath(path);
    const len = path.length;
    // Skip empty entries
    if (len === 0) continue;
    let rootEnd = 0;
    let device = "";
    let isAbsolute = false;
    const code = path.charCodeAt(0);
    // Try to match a root
    if (len > 1) {
      if (isPathSeparator(code)) {
        // Possible UNC root
        // If we started with a separator, we know we at least have an
        // absolute path of some kind (UNC or otherwise)
        isAbsolute = true;
        if (isPathSeparator(path.charCodeAt(1))) {
          // Matched double path separator at beginning
          let j = 2;
          let last = j;
          // Match 1 or more non-path separators
          for(; j < len; ++j){
            if (isPathSeparator(path.charCodeAt(j))) break;
          }
          if (j < len && j !== last) {
            const firstPart = path.slice(last, j);
            // Matched!
            last = j;
            // Match 1 or more path separators
            for(; j < len; ++j){
              if (!isPathSeparator(path.charCodeAt(j))) break;
            }
            if (j < len && j !== last) {
              // Matched!
              last = j;
              // Match 1 or more non-path separators
              for(; j < len; ++j){
                if (isPathSeparator(path.charCodeAt(j))) break;
              }
              if (j === len) {
                // We matched a UNC root only
                device = `\\\\${firstPart}\\${path.slice(last)}`;
                rootEnd = j;
              } else if (j !== last) {
                // We matched a UNC root with leftovers
                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                rootEnd = j;
              }
            }
          }
        } else {
          rootEnd = 1;
        }
      } else if (isWindowsDeviceRoot(code)) {
        // Possible device root
        if (path.charCodeAt(1) === CHAR_COLON) {
          device = path.slice(0, 2);
          rootEnd = 2;
          if (len > 2) {
            if (isPathSeparator(path.charCodeAt(2))) {
              // Treat separator following drive name as an absolute path
              // indicator
              isAbsolute = true;
              rootEnd = 3;
            }
          }
        }
      }
    } else if (isPathSeparator(code)) {
      // `path` contains just a path separator
      rootEnd = 1;
      isAbsolute = true;
    }
    if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
      continue;
    }
    if (resolvedDevice.length === 0 && device.length > 0) {
      resolvedDevice = device;
    }
    if (!resolvedAbsolute) {
      resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
      resolvedAbsolute = isAbsolute;
    }
    if (resolvedAbsolute && resolvedDevice.length > 0) break;
  }
  // At this point the path should be resolved to a full absolute path,
  // but handle relative paths to be safe (might happen when Deno.cwd()
  // fails)
  // Normalize the tail path
  resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, "\\", isPathSeparator);
  return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
function assertArgs(from, to) {
  assertPath(from);
  assertPath(to);
  if (from === to) return "";
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Return the relative path from `from` to `to` based on current working directory.
 *
 * An example in windws, for instance:
 *  from = 'C:\\orandea\\test\\aaa'
 *  to = 'C:\\orandea\\impl\\bbb'
 * The output of the function should be: '..\\..\\impl\\bbb'
 *
 * @example Usage
 * ```ts
 * import { relative } from "@std/path/windows/relative";
 * import { assertEquals } from "@std/assert";
 *
 * const relativePath = relative("C:\\foobar\\test\\aaa", "C:\\foobar\\impl\\bbb");
 * assertEquals(relativePath, "..\\..\\impl\\bbb");
 * ```
 *
 * @param from The path from which to calculate the relative path
 * @param to The path to which to calculate the relative path
 * @returns The relative path from `from` to `to`
 */ function relative(from, to) {
  assertArgs(from, to);
  const fromOrig = resolve(from);
  const toOrig = resolve(to);
  if (fromOrig === toOrig) return "";
  from = fromOrig.toLowerCase();
  to = toOrig.toLowerCase();
  if (from === to) return "";
  // Trim any leading backslashes
  let fromStart = 0;
  let fromEnd = from.length;
  for(; fromStart < fromEnd; ++fromStart){
    if (from.charCodeAt(fromStart) !== CHAR_BACKWARD_SLASH) break;
  }
  // Trim trailing backslashes (applicable to UNC paths only)
  for(; fromEnd - 1 > fromStart; --fromEnd){
    if (from.charCodeAt(fromEnd - 1) !== CHAR_BACKWARD_SLASH) break;
  }
  const fromLen = fromEnd - fromStart;
  // Trim any leading backslashes
  let toStart = 0;
  let toEnd = to.length;
  for(; toStart < toEnd; ++toStart){
    if (to.charCodeAt(toStart) !== CHAR_BACKWARD_SLASH) break;
  }
  // Trim trailing backslashes (applicable to UNC paths only)
  for(; toEnd - 1 > toStart; --toEnd){
    if (to.charCodeAt(toEnd - 1) !== CHAR_BACKWARD_SLASH) break;
  }
  const toLen = toEnd - toStart;
  // Compare paths to find the longest common path from root
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i = 0;
  for(; i <= length; ++i){
    if (i === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i) === CHAR_BACKWARD_SLASH) {
          // We get here if `from` is the exact base path for `to`.
          // For example: from='C:\\foo\\bar'; to='C:\\foo\\bar\\baz'
          return toOrig.slice(toStart + i + 1);
        } else if (i === 2) {
          // We get here if `from` is the device root.
          // For example: from='C:\\'; to='C:\\foo'
          return toOrig.slice(toStart + i);
        }
      }
      if (fromLen > length) {
        if (from.charCodeAt(fromStart + i) === CHAR_BACKWARD_SLASH) {
          // We get here if `to` is the exact base path for `from`.
          // For example: from='C:\\foo\\bar'; to='C:\\foo'
          lastCommonSep = i;
        } else if (i === 2) {
          // We get here if `to` is the device root.
          // For example: from='C:\\foo\\bar'; to='C:\\'
          lastCommonSep = 3;
        }
      }
      break;
    }
    const fromCode = from.charCodeAt(fromStart + i);
    const toCode = to.charCodeAt(toStart + i);
    if (fromCode !== toCode) break;
    else if (fromCode === CHAR_BACKWARD_SLASH) lastCommonSep = i;
  }
  // We found a mismatch before the first common path separator was seen, so
  // return the original `to`.
  if (i !== length && lastCommonSep === -1) {
    return toOrig;
  }
  let out = "";
  if (lastCommonSep === -1) lastCommonSep = 0;
  // Generate the relative path based on the path difference between `to` and
  // `from`
  for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
    if (i === fromEnd || from.charCodeAt(i) === CHAR_BACKWARD_SLASH) {
      if (out.length === 0) out += "..";
      else out += "\\..";
    }
  }
  // Lastly, append the rest of the destination (`to`) path that comes after
  // the common path parts
  if (out.length > 0) {
    return out + toOrig.slice(toStart + lastCommonSep, toEnd);
  } else {
    toStart += lastCommonSep;
    if (toOrig.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) ++toStart;
    return toOrig.slice(toStart, toEnd);
  }
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
const WHITESPACE_ENCODINGS = {
  "\u0009": "%09",
  "\u000A": "%0A",
  "\u000B": "%0B",
  "\u000C": "%0C",
  "\u000D": "%0D",
  "\u0020": "%20"
};
function encodeWhitespace(string) {
  return string.replaceAll(/[\s]/g, (c)=>{
    return WHITESPACE_ENCODINGS[c] ?? c;
  });
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Converts a path string to a file URL.
 *
 * @example Usage
 * ```ts
 * import { toFileUrl } from "@std/path/windows/to-file-url";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(toFileUrl("\\home\\foo"), new URL("file:///home/foo"));
 * assertEquals(toFileUrl("C:\\Users\\foo"), new URL("file:///C:/Users/foo"));
 * assertEquals(toFileUrl("\\\\127.0.0.1\\home\\foo"), new URL("file://127.0.0.1/home/foo"));
 * ```
 * @param path The path to convert.
 * @returns The file URL.
 */ function toFileUrl(path) {
  if (!isAbsolute(path)) {
    throw new TypeError(`Path must be absolute: received "${path}"`);
  }
  const [, hostname, pathname] = path.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/);
  const url = new URL("file:///");
  url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
  if (hostname !== undefined && hostname !== "localhost") {
    url.hostname = hostname;
    if (!url.hostname) {
      throw new TypeError(`Invalid hostname: "${url.hostname}"`);
    }
  }
  return url;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Resolves path to a namespace path
 *
 * @example Usage
 * ```ts
 * import { toNamespacedPath } from "@std/path/windows/to-namespaced-path";
 * import { assertEquals } from "@std/assert";
 *
 * const namespaced = toNamespacedPath("C:\\foo\\bar");
 * assertEquals(namespaced, "\\\\?\\C:\\foo\\bar");
 * ```
 *
 * @param path The path to resolve to namespaced path
 * @returns The resolved namespaced path
 */ function toNamespacedPath(path) {
  // Note: this will *probably* throw somewhere.
  if (typeof path !== "string") return path;
  if (path.length === 0) return "";
  const resolvedPath = resolve(path);
  if (resolvedPath.length >= 3) {
    if (resolvedPath.charCodeAt(0) === CHAR_BACKWARD_SLASH) {
      // Possible UNC root
      if (resolvedPath.charCodeAt(1) === CHAR_BACKWARD_SLASH) {
        const code = resolvedPath.charCodeAt(2);
        if (code !== CHAR_QUESTION_MARK && code !== CHAR_DOT) {
          // Matched non-long UNC root, convert the path to a long UNC path
          return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
        }
      }
    } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
      // Possible device root
      if (resolvedPath.charCodeAt(1) === CHAR_COLON && resolvedPath.charCodeAt(2) === CHAR_BACKWARD_SLASH) {
        // Matched device root, convert the path to a long UNC path
        return `\\\\?\\${resolvedPath}`;
      }
    }
  }
  return path;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
function common$1(paths, sep) {
  const [first = "", ...remaining] = paths;
  const parts = first.split(sep);
  let endOfPrefix = parts.length;
  let append = "";
  for (const path of remaining){
    const compare = path.split(sep);
    if (compare.length <= endOfPrefix) {
      endOfPrefix = compare.length;
      append = "";
    }
    for(let i = 0; i < endOfPrefix; i++){
      if (compare[i] !== parts[i]) {
        endOfPrefix = i;
        append = i === 0 ? "" : sep;
        break;
      }
    }
  }
  return parts.slice(0, endOfPrefix).join(sep) + append;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Determines the common path from a set of paths for Windows systems.
 *
 * @example Usage
 * ```ts
 * import { common } from "@std/path/windows/common";
 * import { assertEquals } from "@std/assert";
 *
 * const path = common([
 *   "C:\\foo\\bar",
 *   "C:\\foo\\baz",
 * ]);
 * assertEquals(path, "C:\\foo\\");
 * ```
 *
 * @param paths The paths to compare.
 * @returns The common path.
 */ function common(paths) {
  return common$1(paths, SEPARATOR);
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Options for {@linkcode globToRegExp}, {@linkcode joinGlobs},
 * {@linkcode normalizeGlob} and {@linkcode expandGlob}.
 */ const REG_EXP_ESCAPE_CHARS = [
  "!",
  "$",
  "(",
  ")",
  "*",
  "+",
  ".",
  "=",
  "?",
  "[",
  "\\",
  "^",
  "{",
  "|"
];
const RANGE_ESCAPE_CHARS = [
  "-",
  "\\",
  "]"
];
function _globToRegExp(c, glob, { extended = true, globstar: globstarOption = true, // os = osType,
caseInsensitive = false } = {}) {
  if (glob === "") {
    return /(?!)/;
  }
  // Remove trailing separators.
  let newLength = glob.length;
  for(; newLength > 1 && c.seps.includes(glob[newLength - 1]); newLength--);
  glob = glob.slice(0, newLength);
  let regExpString = "";
  // Terminates correctly. Trust that `j` is incremented every iteration.
  for(let j = 0; j < glob.length;){
    let segment = "";
    const groupStack = [];
    let inRange = false;
    let inEscape = false;
    let endsWithSep = false;
    let i = j;
    // Terminates with `i` at the non-inclusive end of the current segment.
    for(; i < glob.length && !c.seps.includes(glob[i]); i++){
      if (inEscape) {
        inEscape = false;
        const escapeChars = inRange ? RANGE_ESCAPE_CHARS : REG_EXP_ESCAPE_CHARS;
        segment += escapeChars.includes(glob[i]) ? `\\${glob[i]}` : glob[i];
        continue;
      }
      if (glob[i] === c.escapePrefix) {
        inEscape = true;
        continue;
      }
      if (glob[i] === "[") {
        if (!inRange) {
          inRange = true;
          segment += "[";
          if (glob[i + 1] === "!") {
            i++;
            segment += "^";
          } else if (glob[i + 1] === "^") {
            i++;
            segment += "\\^";
          }
          continue;
        } else if (glob[i + 1] === ":") {
          let k = i + 1;
          let value = "";
          while(glob[k + 1] !== undefined && glob[k + 1] !== ":"){
            value += glob[k + 1];
            k++;
          }
          if (glob[k + 1] === ":" && glob[k + 2] === "]") {
            i = k + 2;
            if (value === "alnum") segment += "\\dA-Za-z";
            else if (value === "alpha") segment += "A-Za-z";
            else if (value === "ascii") segment += "\x00-\x7F";
            else if (value === "blank") segment += "\t ";
            else if (value === "cntrl") segment += "\x00-\x1F\x7F";
            else if (value === "digit") segment += "\\d";
            else if (value === "graph") segment += "\x21-\x7E";
            else if (value === "lower") segment += "a-z";
            else if (value === "print") segment += "\x20-\x7E";
            else if (value === "punct") {
              segment += "!\"#$%&'()*+,\\-./:;<=>?@[\\\\\\]^_‘{|}~";
            } else if (value === "space") segment += "\\s\v";
            else if (value === "upper") segment += "A-Z";
            else if (value === "word") segment += "\\w";
            else if (value === "xdigit") segment += "\\dA-Fa-f";
            continue;
          }
        }
      }
      if (glob[i] === "]" && inRange) {
        inRange = false;
        segment += "]";
        continue;
      }
      if (inRange) {
        segment += glob[i];
        continue;
      }
      if (glob[i] === ")" && groupStack.length > 0 && groupStack[groupStack.length - 1] !== "BRACE") {
        segment += ")";
        const type = groupStack.pop();
        if (type === "!") {
          segment += c.wildcard;
        } else if (type !== "@") {
          segment += type;
        }
        continue;
      }
      if (glob[i] === "|" && groupStack.length > 0 && groupStack[groupStack.length - 1] !== "BRACE") {
        segment += "|";
        continue;
      }
      if (glob[i] === "+" && extended && glob[i + 1] === "(") {
        i++;
        groupStack.push("+");
        segment += "(?:";
        continue;
      }
      if (glob[i] === "@" && extended && glob[i + 1] === "(") {
        i++;
        groupStack.push("@");
        segment += "(?:";
        continue;
      }
      if (glob[i] === "?") {
        if (extended && glob[i + 1] === "(") {
          i++;
          groupStack.push("?");
          segment += "(?:";
        } else {
          segment += ".";
        }
        continue;
      }
      if (glob[i] === "!" && extended && glob[i + 1] === "(") {
        i++;
        groupStack.push("!");
        segment += "(?!";
        continue;
      }
      if (glob[i] === "{") {
        groupStack.push("BRACE");
        segment += "(?:";
        continue;
      }
      if (glob[i] === "}" && groupStack[groupStack.length - 1] === "BRACE") {
        groupStack.pop();
        segment += ")";
        continue;
      }
      if (glob[i] === "," && groupStack[groupStack.length - 1] === "BRACE") {
        segment += "|";
        continue;
      }
      if (glob[i] === "*") {
        if (extended && glob[i + 1] === "(") {
          i++;
          groupStack.push("*");
          segment += "(?:";
        } else {
          const prevChar = glob[i - 1];
          let numStars = 1;
          while(glob[i + 1] === "*"){
            i++;
            numStars++;
          }
          const nextChar = glob[i + 1];
          if (globstarOption && numStars === 2 && [
            ...c.seps,
            undefined
          ].includes(prevChar) && [
            ...c.seps,
            undefined
          ].includes(nextChar)) {
            segment += c.globstar;
            endsWithSep = true;
          } else {
            segment += c.wildcard;
          }
        }
        continue;
      }
      segment += REG_EXP_ESCAPE_CHARS.includes(glob[i]) ? `\\${glob[i]}` : glob[i];
    }
    // Check for unclosed groups or a dangling backslash.
    if (groupStack.length > 0 || inRange || inEscape) {
      // Parse failure. Take all characters from this segment literally.
      segment = "";
      for (const c of glob.slice(j, i)){
        segment += REG_EXP_ESCAPE_CHARS.includes(c) ? `\\${c}` : c;
        endsWithSep = false;
      }
    }
    regExpString += segment;
    if (!endsWithSep) {
      regExpString += i < glob.length ? c.sep : c.sepMaybe;
      endsWithSep = true;
    }
    // Terminates with `i` at the start of the next segment.
    while(c.seps.includes(glob[i]))i++;
    j = i;
  }
  regExpString = `^${regExpString}$`;
  return new RegExp(regExpString, caseInsensitive ? "i" : "");
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
const constants = {
  sep: "(?:\\\\|/)+",
  sepMaybe: "(?:\\\\|/)*",
  seps: [
    "\\",
    "/"
  ],
  globstar: "(?:[^\\\\/]*(?:\\\\|/|$)+)*",
  wildcard: "[^\\\\/]*",
  escapePrefix: "`"
};
/** Convert a glob string to a regular expression.
 *
 * Tries to match bash glob expansion as closely as possible.
 *
 * Basic glob syntax:
 * - `*` - Matches everything without leaving the path segment.
 * - `?` - Matches any single character.
 * - `{foo,bar}` - Matches `foo` or `bar`.
 * - `[abcd]` - Matches `a`, `b`, `c` or `d`.
 * - `[a-d]` - Matches `a`, `b`, `c` or `d`.
 * - `[!abcd]` - Matches any single character besides `a`, `b`, `c` or `d`.
 * - `[[:<class>:]]` - Matches any character belonging to `<class>`.
 *     - `[[:alnum:]]` - Matches any digit or letter.
 *     - `[[:digit:]abc]` - Matches any digit, `a`, `b` or `c`.
 *     - See https://facelessuser.github.io/wcmatch/glob/#posix-character-classes
 *       for a complete list of supported character classes.
 * - `\` - Escapes the next character for an `os` other than `"windows"`.
 * - \` - Escapes the next character for `os` set to `"windows"`.
 * - `/` - Path separator.
 * - `\` - Additional path separator only for `os` set to `"windows"`.
 *
 * Extended syntax:
 * - Requires `{ extended: true }`.
 * - `?(foo|bar)` - Matches 0 or 1 instance of `{foo,bar}`.
 * - `@(foo|bar)` - Matches 1 instance of `{foo,bar}`. They behave the same.
 * - `*(foo|bar)` - Matches _n_ instances of `{foo,bar}`.
 * - `+(foo|bar)` - Matches _n > 0_ instances of `{foo,bar}`.
 * - `!(foo|bar)` - Matches anything other than `{foo,bar}`.
 * - See https://www.linuxjournal.com/content/bash-extended-globbing.
 *
 * Globstar syntax:
 * - Requires `{ globstar: true }`.
 * - `**` - Matches any number of any path segments.
 *     - Must comprise its entire path segment in the provided glob.
 * - See https://www.linuxjournal.com/content/globstar-new-bash-globbing-option.
 *
 * Note the following properties:
 * - The generated `RegExp` is anchored at both start and end.
 * - Repeating and trailing separators are tolerated. Trailing separators in the
 *   provided glob have no meaning and are discarded.
 * - Absolute globs will only match absolute paths, etc.
 * - Empty globs will match nothing.
 * - Any special glob syntax must be contained to one path segment. For example,
 *   `?(foo|bar/baz)` is invalid. The separator will take precedence and the
 *   first segment ends with an unclosed group.
 * - If a path segment ends with unclosed groups or a dangling escape prefix, a
 *   parse error has occurred. Every character for that segment is taken
 *   literally in this event.
 *
 * Limitations:
 * - A negative group like `!(foo|bar)` will wrongly be converted to a negative
 *   look-ahead followed by a wildcard. This means that `!(foo).js` will wrongly
 *   fail to match `foobar.js`, even though `foobar` is not `foo`. Effectively,
 *   `!(foo|bar)` is treated like `!(@(foo|bar)*)`. This will work correctly if
 *   the group occurs not nested at the end of the segment.
 *
 * @example Usage
 * ```ts
 * import { globToRegExp } from "@std/path/windows/glob-to-regexp";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(globToRegExp("*.js"), /^[^\\/]*\.js(?:\\|\/)*$/);
 * ```
 *
 * @param glob Glob string to convert.
 * @param options Conversion options.
 * @returns The regular expression equivalent to the glob.
 */ function globToRegExp(glob, options = {}) {
  return _globToRegExp(constants, glob, options);
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Test whether the given string is a glob.
 *
 * @example Usage
 * ```ts
 * import { isGlob } from "@std/path/is-glob";
 * import { assert } from "@std/assert";
 *
 * assert(!isGlob("foo/bar/../baz"));
 * assert(isGlob("foo/*ar/../baz"));
 * ```
 *
 * @param str String to test.
 * @returns `true` if the given string is a glob, otherwise `false`
 */ function isGlob(str) {
  const chars = {
    "{": "}",
    "(": ")",
    "[": "]"
  };
  const regex = /\\(.)|(^!|\*|\?|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
  if (str === "") {
    return false;
  }
  let match;
  while(match = regex.exec(str)){
    if (match[2]) return true;
    let idx = match.index + match[0].length;
    // if an open bracket/brace/paren is escaped,
    // set the index to the next closing character
    const open = match[1];
    const close = open ? chars[open] : null;
    if (open && close) {
      const n = str.indexOf(close, idx);
      if (n !== -1) {
        idx = n + 1;
      }
    }
    str = str.slice(idx);
  }
  return false;
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Like normalize(), but doesn't collapse "**\/.." when `globstar` is true.
 *
 * @example Usage
 * ```ts
 * import { normalizeGlob } from "@std/path/windows/normalize-glob";
 * import { assertEquals } from "@std/assert";
 *
 * const normalized = normalizeGlob("**\\foo\\..\\bar", { globstar: true });
 * assertEquals(normalized, "**\\bar");
 * ```
 *
 * @param glob The glob pattern to normalize.
 * @param options The options for glob pattern.
 * @returns The normalized glob pattern.
 */ function normalizeGlob(glob, options = {}) {
  const { globstar = false } = options;
  if (glob.match(/\0/g)) {
    throw new Error(`Glob contains invalid characters: "${glob}"`);
  }
  if (!globstar) {
    return normalize$1(glob);
  }
  const s = SEPARATOR_PATTERN.source;
  const badParentPattern = new RegExp(`(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`, "g");
  return normalize$1(glob.replace(badParentPattern, "\0")).replace(/\0/g, "..");
}

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Like join(), but doesn't collapse "**\/.." when `globstar` is true.
 *
 * @example Usage
 *
 * ```ts
 * import { joinGlobs } from "@std/path/windows/join-globs";
 * import { assertEquals } from "@std/assert";
 *
 * const joined = joinGlobs(["foo", "**", "bar"], { globstar: true });
 * assertEquals(joined, "foo\\**\\bar");
 * ```
 *
 * @param globs The globs to join.
 * @param options The options for glob pattern.
 * @returns The joined glob pattern.
 */ function joinGlobs(globs, options = {}) {
  const { globstar = false } = options;
  if (!globstar || globs.length === 0) {
    return join(...globs);
  }
  let joined;
  for (const glob of globs){
    const path = glob;
    if (path.length > 0) {
      if (!joined) joined = path;
      else joined += `${SEPARATOR}${path}`;
    }
  }
  if (!joined) return ".";
  return normalizeGlob(joined, {
    globstar
  });
}

const windowsPath = {
  __proto__: null,
  DELIMITER: DELIMITER,
  SEPARATOR: SEPARATOR,
  SEPARATOR_PATTERN: SEPARATOR_PATTERN,
  basename: basename,
  common: common,
  dirname: dirname,
  extname: extname,
  format: format,
  fromFileUrl: fromFileUrl,
  globToRegExp: globToRegExp,
  isAbsolute: isAbsolute,
  isGlob: isGlob,
  join: join,
  joinGlobs: joinGlobs,
  normalize: normalize$1,
  normalizeGlob: normalizeGlob,
  parse: parse,
  relative: relative,
  resolve: resolve,
  toFileUrl: toFileUrl,
  toNamespacedPath: toNamespacedPath
};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var concatMap;
var hasRequiredConcatMap;

function requireConcatMap () {
	if (hasRequiredConcatMap) return concatMap;
	hasRequiredConcatMap = 1;
	concatMap = function (xs, fn) {
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        var x = fn(xs[i], i);
	        if (isArray(x)) res.push.apply(res, x);
	        else res.push(x);
	    }
	    return res;
	};

	var isArray = Array.isArray || function (xs) {
	    return Object.prototype.toString.call(xs) === '[object Array]';
	};
	return concatMap;
}

var balancedMatch;
var hasRequiredBalancedMatch;

function requireBalancedMatch () {
	if (hasRequiredBalancedMatch) return balancedMatch;
	hasRequiredBalancedMatch = 1;
	balancedMatch = balanced;
	function balanced(a, b, str) {
	  if (a instanceof RegExp) a = maybeMatch(a, str);
	  if (b instanceof RegExp) b = maybeMatch(b, str);

	  var r = range(a, b, str);

	  return r && {
	    start: r[0],
	    end: r[1],
	    pre: str.slice(0, r[0]),
	    body: str.slice(r[0] + a.length, r[1]),
	    post: str.slice(r[1] + b.length)
	  };
	}

	function maybeMatch(reg, str) {
	  var m = str.match(reg);
	  return m ? m[0] : null;
	}

	balanced.range = range;
	function range(a, b, str) {
	  var begs, beg, left, right, result;
	  var ai = str.indexOf(a);
	  var bi = str.indexOf(b, ai + 1);
	  var i = ai;

	  if (ai >= 0 && bi > 0) {
	    if(a===b) {
	      return [ai, bi];
	    }
	    begs = [];
	    left = str.length;

	    while (i >= 0 && !result) {
	      if (i == ai) {
	        begs.push(i);
	        ai = str.indexOf(a, i + 1);
	      } else if (begs.length == 1) {
	        result = [ begs.pop(), bi ];
	      } else {
	        beg = begs.pop();
	        if (beg < left) {
	          left = beg;
	          right = bi;
	        }

	        bi = str.indexOf(b, i + 1);
	      }

	      i = ai < bi && ai >= 0 ? ai : bi;
	    }

	    if (begs.length) {
	      result = [ left, right ];
	    }
	  }

	  return result;
	}
	return balancedMatch;
}

var braceExpansion$1;
var hasRequiredBraceExpansion$1;

function requireBraceExpansion$1 () {
	if (hasRequiredBraceExpansion$1) return braceExpansion$1;
	hasRequiredBraceExpansion$1 = 1;
	var concatMap = requireConcatMap();
	var balanced = requireBalancedMatch();

	braceExpansion$1 = expandTop;

	var escSlash = '\0SLASH'+Math.random()+'\0';
	var escOpen = '\0OPEN'+Math.random()+'\0';
	var escClose = '\0CLOSE'+Math.random()+'\0';
	var escComma = '\0COMMA'+Math.random()+'\0';
	var escPeriod = '\0PERIOD'+Math.random()+'\0';

	function numeric(str) {
	  return parseInt(str, 10) == str
	    ? parseInt(str, 10)
	    : str.charCodeAt(0);
	}

	function escapeBraces(str) {
	  return str.split('\\\\').join(escSlash)
	            .split('\\{').join(escOpen)
	            .split('\\}').join(escClose)
	            .split('\\,').join(escComma)
	            .split('\\.').join(escPeriod);
	}

	function unescapeBraces(str) {
	  return str.split(escSlash).join('\\')
	            .split(escOpen).join('{')
	            .split(escClose).join('}')
	            .split(escComma).join(',')
	            .split(escPeriod).join('.');
	}


	// Basically just str.split(","), but handling cases
	// where we have nested braced sections, which should be
	// treated as individual members, like {a,{b,c},d}
	function parseCommaParts(str) {
	  if (!str)
	    return [''];

	  var parts = [];
	  var m = balanced('{', '}', str);

	  if (!m)
	    return str.split(',');

	  var pre = m.pre;
	  var body = m.body;
	  var post = m.post;
	  var p = pre.split(',');

	  p[p.length-1] += '{' + body + '}';
	  var postParts = parseCommaParts(post);
	  if (post.length) {
	    p[p.length-1] += postParts.shift();
	    p.push.apply(p, postParts);
	  }

	  parts.push.apply(parts, p);

	  return parts;
	}

	function expandTop(str) {
	  if (!str)
	    return [];

	  // I don't know why Bash 4.3 does this, but it does.
	  // Anything starting with {} will have the first two bytes preserved
	  // but *only* at the top level, so {},a}b will not expand to anything,
	  // but a{},b}c will be expanded to [a}c,abc].
	  // One could argue that this is a bug in Bash, but since the goal of
	  // this module is to match Bash's rules, we escape a leading {}
	  if (str.substr(0, 2) === '{}') {
	    str = '\\{\\}' + str.substr(2);
	  }

	  return expand(escapeBraces(str), true).map(unescapeBraces);
	}

	function embrace(str) {
	  return '{' + str + '}';
	}
	function isPadded(el) {
	  return /^-?0\d/.test(el);
	}

	function lte(i, y) {
	  return i <= y;
	}
	function gte(i, y) {
	  return i >= y;
	}

	function expand(str, isTop) {
	  var expansions = [];

	  var m = balanced('{', '}', str);
	  if (!m || /\$$/.test(m.pre)) return [str];

	  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
	  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
	  var isSequence = isNumericSequence || isAlphaSequence;
	  var isOptions = m.body.indexOf(',') >= 0;
	  if (!isSequence && !isOptions) {
	    // {a},b}
	    if (m.post.match(/,.*\}/)) {
	      str = m.pre + '{' + m.body + escClose + m.post;
	      return expand(str);
	    }
	    return [str];
	  }

	  var n;
	  if (isSequence) {
	    n = m.body.split(/\.\./);
	  } else {
	    n = parseCommaParts(m.body);
	    if (n.length === 1) {
	      // x{{a,b}}y ==> x{a}y x{b}y
	      n = expand(n[0], false).map(embrace);
	      if (n.length === 1) {
	        var post = m.post.length
	          ? expand(m.post, false)
	          : [''];
	        return post.map(function(p) {
	          return m.pre + n[0] + p;
	        });
	      }
	    }
	  }

	  // at this point, n is the parts, and we know it's not a comma set
	  // with a single entry.

	  // no need to expand pre, since it is guaranteed to be free of brace-sets
	  var pre = m.pre;
	  var post = m.post.length
	    ? expand(m.post, false)
	    : [''];

	  var N;

	  if (isSequence) {
	    var x = numeric(n[0]);
	    var y = numeric(n[1]);
	    var width = Math.max(n[0].length, n[1].length);
	    var incr = n.length == 3
	      ? Math.abs(numeric(n[2]))
	      : 1;
	    var test = lte;
	    var reverse = y < x;
	    if (reverse) {
	      incr *= -1;
	      test = gte;
	    }
	    var pad = n.some(isPadded);

	    N = [];

	    for (var i = x; test(i, y); i += incr) {
	      var c;
	      if (isAlphaSequence) {
	        c = String.fromCharCode(i);
	        if (c === '\\')
	          c = '';
	      } else {
	        c = String(i);
	        if (pad) {
	          var need = width - c.length;
	          if (need > 0) {
	            var z = new Array(need + 1).join('0');
	            if (i < 0)
	              c = '-' + z + c.slice(1);
	            else
	              c = z + c;
	          }
	        }
	      }
	      N.push(c);
	    }
	  } else {
	    N = concatMap(n, function(el) { return expand(el, false) });
	  }

	  for (var j = 0; j < N.length; j++) {
	    for (var k = 0; k < post.length; k++) {
	      var expansion = pre + N[j] + post[k];
	      if (!isTop || isSequence || expansion)
	        expansions.push(expansion);
	    }
	  }

	  return expansions;
	}
	return braceExpansion$1;
}

var minimatch_1;
var hasRequiredMinimatch;

function requireMinimatch () {
	if (hasRequiredMinimatch) return minimatch_1;
	hasRequiredMinimatch = 1;
	minimatch_1 = minimatch;
	minimatch.Minimatch = Minimatch;

	var path = (function () { try { return require('path') } catch (e) {}}()) || {
	  sep: '/'
	};
	minimatch.sep = path.sep;

	var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
	var expand = requireBraceExpansion$1();

	var plTypes = {
	  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
	  '?': { open: '(?:', close: ')?' },
	  '+': { open: '(?:', close: ')+' },
	  '*': { open: '(?:', close: ')*' },
	  '@': { open: '(?:', close: ')' }
	};

	// any single thing other than /
	// don't need to escape / when using new RegExp()
	var qmark = '[^/]';

	// * => any number of characters
	var star = qmark + '*?';

	// ** when dots are allowed.  Anything goes, except .. and .
	// not (^ or / followed by one or two dots followed by $ or /),
	// followed by anything, any number of times.
	var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?';

	// not a ^ or / followed by a dot,
	// followed by anything, any number of times.
	var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?';

	// characters that need to be escaped in RegExp.
	var reSpecials = charSet('().*{}+?[]^$\\!');

	// "abc" -> { a:true, b:true, c:true }
	function charSet (s) {
	  return s.split('').reduce(function (set, c) {
	    set[c] = true;
	    return set
	  }, {})
	}

	// normalizes slashes.
	var slashSplit = /\/+/;

	minimatch.filter = filter;
	function filter (pattern, options) {
	  options = options || {};
	  return function (p, i, list) {
	    return minimatch(p, pattern, options)
	  }
	}

	function ext (a, b) {
	  b = b || {};
	  var t = {};
	  Object.keys(a).forEach(function (k) {
	    t[k] = a[k];
	  });
	  Object.keys(b).forEach(function (k) {
	    t[k] = b[k];
	  });
	  return t
	}

	minimatch.defaults = function (def) {
	  if (!def || typeof def !== 'object' || !Object.keys(def).length) {
	    return minimatch
	  }

	  var orig = minimatch;

	  var m = function minimatch (p, pattern, options) {
	    return orig(p, pattern, ext(def, options))
	  };

	  m.Minimatch = function Minimatch (pattern, options) {
	    return new orig.Minimatch(pattern, ext(def, options))
	  };
	  m.Minimatch.defaults = function defaults (options) {
	    return orig.defaults(ext(def, options)).Minimatch
	  };

	  m.filter = function filter (pattern, options) {
	    return orig.filter(pattern, ext(def, options))
	  };

	  m.defaults = function defaults (options) {
	    return orig.defaults(ext(def, options))
	  };

	  m.makeRe = function makeRe (pattern, options) {
	    return orig.makeRe(pattern, ext(def, options))
	  };

	  m.braceExpand = function braceExpand (pattern, options) {
	    return orig.braceExpand(pattern, ext(def, options))
	  };

	  m.match = function (list, pattern, options) {
	    return orig.match(list, pattern, ext(def, options))
	  };

	  return m
	};

	Minimatch.defaults = function (def) {
	  return minimatch.defaults(def).Minimatch
	};

	function minimatch (p, pattern, options) {
	  assertValidPattern(pattern);

	  if (!options) options = {};

	  // shortcut: comments match nothing.
	  if (!options.nocomment && pattern.charAt(0) === '#') {
	    return false
	  }

	  return new Minimatch(pattern, options).match(p)
	}

	function Minimatch (pattern, options) {
	  if (!(this instanceof Minimatch)) {
	    return new Minimatch(pattern, options)
	  }

	  assertValidPattern(pattern);

	  if (!options) options = {};

	  pattern = pattern.trim();

	  // windows support: need to use /, not \
	  if (!options.allowWindowsEscape && path.sep !== '/') {
	    pattern = pattern.split(path.sep).join('/');
	  }

	  this.options = options;
	  this.set = [];
	  this.pattern = pattern;
	  this.regexp = null;
	  this.negate = false;
	  this.comment = false;
	  this.empty = false;
	  this.partial = !!options.partial;

	  // make the set of regexps etc.
	  this.make();
	}

	Minimatch.prototype.debug = function () {};

	Minimatch.prototype.make = make;
	function make () {
	  var pattern = this.pattern;
	  var options = this.options;

	  // empty patterns and comments match nothing.
	  if (!options.nocomment && pattern.charAt(0) === '#') {
	    this.comment = true;
	    return
	  }
	  if (!pattern) {
	    this.empty = true;
	    return
	  }

	  // step 1: figure out negation, etc.
	  this.parseNegate();

	  // step 2: expand braces
	  var set = this.globSet = this.braceExpand();

	  if (options.debug) this.debug = function debug() { console.error.apply(console, arguments); };

	  this.debug(this.pattern, set);

	  // step 3: now we have a set, so turn each one into a series of path-portion
	  // matching patterns.
	  // These will be regexps, except in the case of "**", which is
	  // set to the GLOBSTAR object for globstar behavior,
	  // and will not contain any / characters
	  set = this.globParts = set.map(function (s) {
	    return s.split(slashSplit)
	  });

	  this.debug(this.pattern, set);

	  // glob --> regexps
	  set = set.map(function (s, si, set) {
	    return s.map(this.parse, this)
	  }, this);

	  this.debug(this.pattern, set);

	  // filter out everything that didn't compile properly.
	  set = set.filter(function (s) {
	    return s.indexOf(false) === -1
	  });

	  this.debug(this.pattern, set);

	  this.set = set;
	}

	Minimatch.prototype.parseNegate = parseNegate;
	function parseNegate () {
	  var pattern = this.pattern;
	  var negate = false;
	  var options = this.options;
	  var negateOffset = 0;

	  if (options.nonegate) return

	  for (var i = 0, l = pattern.length
	    ; i < l && pattern.charAt(i) === '!'
	    ; i++) {
	    negate = !negate;
	    negateOffset++;
	  }

	  if (negateOffset) this.pattern = pattern.substr(negateOffset);
	  this.negate = negate;
	}

	// Brace expansion:
	// a{b,c}d -> abd acd
	// a{b,}c -> abc ac
	// a{0..3}d -> a0d a1d a2d a3d
	// a{b,c{d,e}f}g -> abg acdfg acefg
	// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
	//
	// Invalid sets are not expanded.
	// a{2..}b -> a{2..}b
	// a{b}c -> a{b}c
	minimatch.braceExpand = function (pattern, options) {
	  return braceExpand(pattern, options)
	};

	Minimatch.prototype.braceExpand = braceExpand;

	function braceExpand (pattern, options) {
	  if (!options) {
	    if (this instanceof Minimatch) {
	      options = this.options;
	    } else {
	      options = {};
	    }
	  }

	  pattern = typeof pattern === 'undefined'
	    ? this.pattern : pattern;

	  assertValidPattern(pattern);

	  // Thanks to Yeting Li <https://github.com/yetingli> for
	  // improving this regexp to avoid a ReDOS vulnerability.
	  if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
	    // shortcut. no need to expand.
	    return [pattern]
	  }

	  return expand(pattern)
	}

	var MAX_PATTERN_LENGTH = 1024 * 64;
	var assertValidPattern = function (pattern) {
	  if (typeof pattern !== 'string') {
	    throw new TypeError('invalid pattern')
	  }

	  if (pattern.length > MAX_PATTERN_LENGTH) {
	    throw new TypeError('pattern is too long')
	  }
	};

	// parse a component of the expanded set.
	// At this point, no pattern may contain "/" in it
	// so we're going to return a 2d array, where each entry is the full
	// pattern, split on '/', and then turned into a regular expression.
	// A regexp is made at the end which joins each array with an
	// escaped /, and another full one which joins each regexp with |.
	//
	// Following the lead of Bash 4.1, note that "**" only has special meaning
	// when it is the *only* thing in a path portion.  Otherwise, any series
	// of * is equivalent to a single *.  Globstar behavior is enabled by
	// default, and can be disabled by setting options.noglobstar.
	Minimatch.prototype.parse = parse;
	var SUBPARSE = {};
	function parse (pattern, isSub) {
	  assertValidPattern(pattern);

	  var options = this.options;

	  // shortcuts
	  if (pattern === '**') {
	    if (!options.noglobstar)
	      return GLOBSTAR
	    else
	      pattern = '*';
	  }
	  if (pattern === '') return ''

	  var re = '';
	  var hasMagic = !!options.nocase;
	  var escaping = false;
	  // ? => one single character
	  var patternListStack = [];
	  var negativeLists = [];
	  var stateChar;
	  var inClass = false;
	  var reClassStart = -1;
	  var classStart = -1;
	  // . and .. never match anything that doesn't start with .,
	  // even when options.dot is set.
	  var patternStart = pattern.charAt(0) === '.' ? '' // anything
	  // not (start or / followed by . or .. followed by / or end)
	  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
	  : '(?!\\.)';
	  var self = this;

	  function clearStateChar () {
	    if (stateChar) {
	      // we had some state-tracking character
	      // that wasn't consumed by this pass.
	      switch (stateChar) {
	        case '*':
	          re += star;
	          hasMagic = true;
	        break
	        case '?':
	          re += qmark;
	          hasMagic = true;
	        break
	        default:
	          re += '\\' + stateChar;
	        break
	      }
	      self.debug('clearStateChar %j %j', stateChar, re);
	      stateChar = false;
	    }
	  }

	  for (var i = 0, len = pattern.length, c
	    ; (i < len) && (c = pattern.charAt(i))
	    ; i++) {
	    this.debug('%s\t%s %s %j', pattern, i, re, c);

	    // skip over any that are escaped.
	    if (escaping && reSpecials[c]) {
	      re += '\\' + c;
	      escaping = false;
	      continue
	    }

	    switch (c) {
	      /* istanbul ignore next */
	      case '/': {
	        // completely not allowed, even escaped.
	        // Should already be path-split by now.
	        return false
	      }

	      case '\\':
	        clearStateChar();
	        escaping = true;
	      continue

	      // the various stateChar values
	      // for the "extglob" stuff.
	      case '?':
	      case '*':
	      case '+':
	      case '@':
	      case '!':
	        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c);

	        // all of those are literals inside a class, except that
	        // the glob [!a] means [^a] in regexp
	        if (inClass) {
	          this.debug('  in class');
	          if (c === '!' && i === classStart + 1) c = '^';
	          re += c;
	          continue
	        }

	        // if we already have a stateChar, then it means
	        // that there was something like ** or +? in there.
	        // Handle the stateChar, then proceed with this one.
	        self.debug('call clearStateChar %j', stateChar);
	        clearStateChar();
	        stateChar = c;
	        // if extglob is disabled, then +(asdf|foo) isn't a thing.
	        // just clear the statechar *now*, rather than even diving into
	        // the patternList stuff.
	        if (options.noext) clearStateChar();
	      continue

	      case '(':
	        if (inClass) {
	          re += '(';
	          continue
	        }

	        if (!stateChar) {
	          re += '\\(';
	          continue
	        }

	        patternListStack.push({
	          type: stateChar,
	          start: i - 1,
	          reStart: re.length,
	          open: plTypes[stateChar].open,
	          close: plTypes[stateChar].close
	        });
	        // negation is (?:(?!js)[^/]*)
	        re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
	        this.debug('plType %j %j', stateChar, re);
	        stateChar = false;
	      continue

	      case ')':
	        if (inClass || !patternListStack.length) {
	          re += '\\)';
	          continue
	        }

	        clearStateChar();
	        hasMagic = true;
	        var pl = patternListStack.pop();
	        // negation is (?:(?!js)[^/]*)
	        // The others are (?:<pattern>)<type>
	        re += pl.close;
	        if (pl.type === '!') {
	          negativeLists.push(pl);
	        }
	        pl.reEnd = re.length;
	      continue

	      case '|':
	        if (inClass || !patternListStack.length || escaping) {
	          re += '\\|';
	          escaping = false;
	          continue
	        }

	        clearStateChar();
	        re += '|';
	      continue

	      // these are mostly the same in regexp and glob
	      case '[':
	        // swallow any state-tracking char before the [
	        clearStateChar();

	        if (inClass) {
	          re += '\\' + c;
	          continue
	        }

	        inClass = true;
	        classStart = i;
	        reClassStart = re.length;
	        re += c;
	      continue

	      case ']':
	        //  a right bracket shall lose its special
	        //  meaning and represent itself in
	        //  a bracket expression if it occurs
	        //  first in the list.  -- POSIX.2 2.8.3.2
	        if (i === classStart + 1 || !inClass) {
	          re += '\\' + c;
	          escaping = false;
	          continue
	        }

	        // handle the case where we left a class open.
	        // "[z-a]" is valid, equivalent to "\[z-a\]"
	        // split where the last [ was, make sure we don't have
	        // an invalid re. if so, re-walk the contents of the
	        // would-be class to re-translate any characters that
	        // were passed through as-is
	        // TODO: It would probably be faster to determine this
	        // without a try/catch and a new RegExp, but it's tricky
	        // to do safely.  For now, this is safe and works.
	        var cs = pattern.substring(classStart + 1, i);
	        try {
	          RegExp('[' + cs + ']');
	        } catch (er) {
	          // not a valid class!
	          var sp = this.parse(cs, SUBPARSE);
	          re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
	          hasMagic = hasMagic || sp[1];
	          inClass = false;
	          continue
	        }

	        // finish up the class.
	        hasMagic = true;
	        inClass = false;
	        re += c;
	      continue

	      default:
	        // swallow any state char that wasn't consumed
	        clearStateChar();

	        if (escaping) {
	          // no need
	          escaping = false;
	        } else if (reSpecials[c]
	          && !(c === '^' && inClass)) {
	          re += '\\';
	        }

	        re += c;

	    } // switch
	  } // for

	  // handle the case where we left a class open.
	  // "[abc" is valid, equivalent to "\[abc"
	  if (inClass) {
	    // split where the last [ was, and escape it
	    // this is a huge pita.  We now have to re-walk
	    // the contents of the would-be class to re-translate
	    // any characters that were passed through as-is
	    cs = pattern.substr(classStart + 1);
	    sp = this.parse(cs, SUBPARSE);
	    re = re.substr(0, reClassStart) + '\\[' + sp[0];
	    hasMagic = hasMagic || sp[1];
	  }

	  // handle the case where we had a +( thing at the *end*
	  // of the pattern.
	  // each pattern list stack adds 3 chars, and we need to go through
	  // and escape any | chars that were passed through as-is for the regexp.
	  // Go through and escape them, taking care not to double-escape any
	  // | chars that were already escaped.
	  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
	    var tail = re.slice(pl.reStart + pl.open.length);
	    this.debug('setting tail', re, pl);
	    // maybe some even number of \, then maybe 1 \, followed by a |
	    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
	      if (!$2) {
	        // the | isn't already escaped, so escape it.
	        $2 = '\\';
	      }

	      // need to escape all those slashes *again*, without escaping the
	      // one that we need for escaping the | character.  As it works out,
	      // escaping an even number of slashes can be done by simply repeating
	      // it exactly after itself.  That's why this trick works.
	      //
	      // I am sorry that you have to see this.
	      return $1 + $1 + $2 + '|'
	    });

	    this.debug('tail=%j\n   %s', tail, tail, pl, re);
	    var t = pl.type === '*' ? star
	      : pl.type === '?' ? qmark
	      : '\\' + pl.type;

	    hasMagic = true;
	    re = re.slice(0, pl.reStart) + t + '\\(' + tail;
	  }

	  // handle trailing things that only matter at the very end.
	  clearStateChar();
	  if (escaping) {
	    // trailing \\
	    re += '\\\\';
	  }

	  // only need to apply the nodot start if the re starts with
	  // something that could conceivably capture a dot
	  var addPatternStart = false;
	  switch (re.charAt(0)) {
	    case '[': case '.': case '(': addPatternStart = true;
	  }

	  // Hack to work around lack of negative lookbehind in JS
	  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
	  // like 'a.xyz.yz' doesn't match.  So, the first negative
	  // lookahead, has to look ALL the way ahead, to the end of
	  // the pattern.
	  for (var n = negativeLists.length - 1; n > -1; n--) {
	    var nl = negativeLists[n];

	    var nlBefore = re.slice(0, nl.reStart);
	    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
	    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
	    var nlAfter = re.slice(nl.reEnd);

	    nlLast += nlAfter;

	    // Handle nested stuff like *(*.js|!(*.json)), where open parens
	    // mean that we should *not* include the ) in the bit that is considered
	    // "after" the negated section.
	    var openParensBefore = nlBefore.split('(').length - 1;
	    var cleanAfter = nlAfter;
	    for (i = 0; i < openParensBefore; i++) {
	      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '');
	    }
	    nlAfter = cleanAfter;

	    var dollar = '';
	    if (nlAfter === '' && isSub !== SUBPARSE) {
	      dollar = '$';
	    }
	    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
	    re = newRe;
	  }

	  // if the re is not "" at this point, then we need to make sure
	  // it doesn't match against an empty path part.
	  // Otherwise a/* will match a/, which it should not.
	  if (re !== '' && hasMagic) {
	    re = '(?=.)' + re;
	  }

	  if (addPatternStart) {
	    re = patternStart + re;
	  }

	  // parsing just a piece of a larger pattern.
	  if (isSub === SUBPARSE) {
	    return [re, hasMagic]
	  }

	  // skip the regexp for non-magical patterns
	  // unescape anything in it, though, so that it'll be
	  // an exact match against a file etc.
	  if (!hasMagic) {
	    return globUnescape(pattern)
	  }

	  var flags = options.nocase ? 'i' : '';
	  try {
	    var regExp = new RegExp('^' + re + '$', flags);
	  } catch (er) /* istanbul ignore next - should be impossible */ {
	    // If it was an invalid regular expression, then it can't match
	    // anything.  This trick looks for a character after the end of
	    // the string, which is of course impossible, except in multi-line
	    // mode, but it's not a /m regex.
	    return new RegExp('$.')
	  }

	  regExp._glob = pattern;
	  regExp._src = re;

	  return regExp
	}

	minimatch.makeRe = function (pattern, options) {
	  return new Minimatch(pattern, options || {}).makeRe()
	};

	Minimatch.prototype.makeRe = makeRe;
	function makeRe () {
	  if (this.regexp || this.regexp === false) return this.regexp

	  // at this point, this.set is a 2d array of partial
	  // pattern strings, or "**".
	  //
	  // It's better to use .match().  This function shouldn't
	  // be used, really, but it's pretty convenient sometimes,
	  // when you just want to work with a regex.
	  var set = this.set;

	  if (!set.length) {
	    this.regexp = false;
	    return this.regexp
	  }
	  var options = this.options;

	  var twoStar = options.noglobstar ? star
	    : options.dot ? twoStarDot
	    : twoStarNoDot;
	  var flags = options.nocase ? 'i' : '';

	  var re = set.map(function (pattern) {
	    return pattern.map(function (p) {
	      return (p === GLOBSTAR) ? twoStar
	      : (typeof p === 'string') ? regExpEscape(p)
	      : p._src
	    }).join('\\\/')
	  }).join('|');

	  // must match entire pattern
	  // ending in a * or ** will make it less strict.
	  re = '^(?:' + re + ')$';

	  // can match anything, as long as it's not this.
	  if (this.negate) re = '^(?!' + re + ').*$';

	  try {
	    this.regexp = new RegExp(re, flags);
	  } catch (ex) /* istanbul ignore next - should be impossible */ {
	    this.regexp = false;
	  }
	  return this.regexp
	}

	minimatch.match = function (list, pattern, options) {
	  options = options || {};
	  var mm = new Minimatch(pattern, options);
	  list = list.filter(function (f) {
	    return mm.match(f)
	  });
	  if (mm.options.nonull && !list.length) {
	    list.push(pattern);
	  }
	  return list
	};

	Minimatch.prototype.match = function match (f, partial) {
	  if (typeof partial === 'undefined') partial = this.partial;
	  this.debug('match', f, this.pattern);
	  // short-circuit in the case of busted things.
	  // comments, etc.
	  if (this.comment) return false
	  if (this.empty) return f === ''

	  if (f === '/' && partial) return true

	  var options = this.options;

	  // windows: need to use /, not \
	  if (path.sep !== '/') {
	    f = f.split(path.sep).join('/');
	  }

	  // treat the test path as a set of pathparts.
	  f = f.split(slashSplit);
	  this.debug(this.pattern, 'split', f);

	  // just ONE of the pattern sets in this.set needs to match
	  // in order for it to be valid.  If negating, then just one
	  // match means that we have failed.
	  // Either way, return on the first hit.

	  var set = this.set;
	  this.debug(this.pattern, 'set', set);

	  // Find the basename of the path by looking for the last non-empty segment
	  var filename;
	  var i;
	  for (i = f.length - 1; i >= 0; i--) {
	    filename = f[i];
	    if (filename) break
	  }

	  for (i = 0; i < set.length; i++) {
	    var pattern = set[i];
	    var file = f;
	    if (options.matchBase && pattern.length === 1) {
	      file = [filename];
	    }
	    var hit = this.matchOne(file, pattern, partial);
	    if (hit) {
	      if (options.flipNegate) return true
	      return !this.negate
	    }
	  }

	  // didn't get any hits.  this is success if it's a negative
	  // pattern, failure otherwise.
	  if (options.flipNegate) return false
	  return this.negate
	};

	// set partial to true to test if, for example,
	// "/a/b" matches the start of "/*/b/*/d"
	// Partial means, if you run out of file before you run
	// out of pattern, then that's fine, as long as all
	// the parts match.
	Minimatch.prototype.matchOne = function (file, pattern, partial) {
	  var options = this.options;

	  this.debug('matchOne',
	    { 'this': this, file: file, pattern: pattern });

	  this.debug('matchOne', file.length, pattern.length);

	  for (var fi = 0,
	      pi = 0,
	      fl = file.length,
	      pl = pattern.length
	      ; (fi < fl) && (pi < pl)
	      ; fi++, pi++) {
	    this.debug('matchOne loop');
	    var p = pattern[pi];
	    var f = file[fi];

	    this.debug(pattern, p, f);

	    // should be impossible.
	    // some invalid regexp stuff in the set.
	    /* istanbul ignore if */
	    if (p === false) return false

	    if (p === GLOBSTAR) {
	      this.debug('GLOBSTAR', [pattern, p, f]);

	      // "**"
	      // a/**/b/**/c would match the following:
	      // a/b/x/y/z/c
	      // a/x/y/z/b/c
	      // a/b/x/b/x/c
	      // a/b/c
	      // To do this, take the rest of the pattern after
	      // the **, and see if it would match the file remainder.
	      // If so, return success.
	      // If not, the ** "swallows" a segment, and try again.
	      // This is recursively awful.
	      //
	      // a/**/b/**/c matching a/b/x/y/z/c
	      // - a matches a
	      // - doublestar
	      //   - matchOne(b/x/y/z/c, b/**/c)
	      //     - b matches b
	      //     - doublestar
	      //       - matchOne(x/y/z/c, c) -> no
	      //       - matchOne(y/z/c, c) -> no
	      //       - matchOne(z/c, c) -> no
	      //       - matchOne(c, c) yes, hit
	      var fr = fi;
	      var pr = pi + 1;
	      if (pr === pl) {
	        this.debug('** at the end');
	        // a ** at the end will just swallow the rest.
	        // We have found a match.
	        // however, it will not swallow /.x, unless
	        // options.dot is set.
	        // . and .. are *never* matched by **, for explosively
	        // exponential reasons.
	        for (; fi < fl; fi++) {
	          if (file[fi] === '.' || file[fi] === '..' ||
	            (!options.dot && file[fi].charAt(0) === '.')) return false
	        }
	        return true
	      }

	      // ok, let's see if we can swallow whatever we can.
	      while (fr < fl) {
	        var swallowee = file[fr];

	        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);

	        // XXX remove this slice.  Just pass the start index.
	        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
	          this.debug('globstar found match!', fr, fl, swallowee);
	          // found a match.
	          return true
	        } else {
	          // can't swallow "." or ".." ever.
	          // can only swallow ".foo" when explicitly asked.
	          if (swallowee === '.' || swallowee === '..' ||
	            (!options.dot && swallowee.charAt(0) === '.')) {
	            this.debug('dot detected!', file, fr, pattern, pr);
	            break
	          }

	          // ** swallows a segment, and continue.
	          this.debug('globstar swallow a segment, and continue');
	          fr++;
	        }
	      }

	      // no match was found.
	      // However, in partial mode, we can't say this is necessarily over.
	      // If there's more *pattern* left, then
	      /* istanbul ignore if */
	      if (partial) {
	        // ran out of file
	        this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
	        if (fr === fl) return true
	      }
	      return false
	    }

	    // something other than **
	    // non-magic patterns just have to match exactly
	    // patterns with magic have been turned into regexps.
	    var hit;
	    if (typeof p === 'string') {
	      hit = f === p;
	      this.debug('string match', p, f, hit);
	    } else {
	      hit = f.match(p);
	      this.debug('pattern match', p, f, hit);
	    }

	    if (!hit) return false
	  }

	  // Note: ending in / means that we'll get a final ""
	  // at the end of the pattern.  This can only match a
	  // corresponding "" at the end of the file.
	  // If the file ends in /, then it can only match a
	  // a pattern that ends in /, unless the pattern just
	  // doesn't have any more for it. But, a/b/ should *not*
	  // match "a/b/*", even though "" matches against the
	  // [^/]*? pattern, except in partial mode, where it might
	  // simply not be reached yet.
	  // However, a/b/ should still satisfy a/*

	  // now either we fell off the end of the pattern, or we're done.
	  if (fi === fl && pi === pl) {
	    // ran out of pattern and filename at the same time.
	    // an exact hit!
	    return true
	  } else if (fi === fl) {
	    // ran out of file, but still had pattern left.
	    // this is ok if we're doing the match as part of
	    // a glob fs traversal.
	    return partial
	  } else /* istanbul ignore else */ if (pi === pl) {
	    // ran out of pattern, still have file left.
	    // this is only acceptable if we're on the very last
	    // empty segment of a file with a trailing slash.
	    // a/* should match a/b/
	    return (fi === fl - 1) && (file[fi] === '')
	  }

	  // should be unreachable.
	  /* istanbul ignore next */
	  throw new Error('wtf?')
	};

	// replace stuff like \* with *
	function globUnescape (s) {
	  return s.replace(/\\(.)/g, '$1')
	}

	function regExpEscape (s) {
	  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
	}
	return minimatch_1;
}

var minimatchExports = requireMinimatch();
const minimatch$2 = /*@__PURE__*/getDefaultExportFromCjs(minimatchExports);

// @ts-self-types="./index.d.ts"
/**
 * @fileoverview Merge Strategy
 */

//-----------------------------------------------------------------------------
// Class
//-----------------------------------------------------------------------------

/**
 * Container class for several different merge strategies.
 */
class MergeStrategy {
	/**
	 * Merges two keys by overwriting the first with the second.
	 * @param {*} value1 The value from the first object key.
	 * @param {*} value2 The value from the second object key.
	 * @returns {*} The second value.
	 */
	static overwrite(value1, value2) {
		return value2;
	}

	/**
	 * Merges two keys by replacing the first with the second only if the
	 * second is defined.
	 * @param {*} value1 The value from the first object key.
	 * @param {*} value2 The value from the second object key.
	 * @returns {*} The second value if it is defined.
	 */
	static replace(value1, value2) {
		if (typeof value2 !== "undefined") {
			return value2;
		}

		return value1;
	}

	/**
	 * Merges two properties by assigning properties from the second to the first.
	 * @param {*} value1 The value from the first object key.
	 * @param {*} value2 The value from the second object key.
	 * @returns {*} A new object containing properties from both value1 and
	 *      value2.
	 */
	static assign(value1, value2) {
		return Object.assign({}, value1, value2);
	}
}

/**
 * @fileoverview Validation Strategy
 */

//-----------------------------------------------------------------------------
// Class
//-----------------------------------------------------------------------------

/**
 * Container class for several different validation strategies.
 */
class ValidationStrategy {
	/**
	 * Validates that a value is an array.
	 * @param {*} value The value to validate.
	 * @returns {void}
	 * @throws {TypeError} If the value is invalid.
	 */
	static array(value) {
		if (!Array.isArray(value)) {
			throw new TypeError("Expected an array.");
		}
	}

	/**
	 * Validates that a value is a boolean.
	 * @param {*} value The value to validate.
	 * @returns {void}
	 * @throws {TypeError} If the value is invalid.
	 */
	static boolean(value) {
		if (typeof value !== "boolean") {
			throw new TypeError("Expected a Boolean.");
		}
	}

	/**
	 * Validates that a value is a number.
	 * @param {*} value The value to validate.
	 * @returns {void}
	 * @throws {TypeError} If the value is invalid.
	 */
	static number(value) {
		if (typeof value !== "number") {
			throw new TypeError("Expected a number.");
		}
	}

	/**
	 * Validates that a value is a object.
	 * @param {*} value The value to validate.
	 * @returns {void}
	 * @throws {TypeError} If the value is invalid.
	 */
	static object(value) {
		if (!value || typeof value !== "object") {
			throw new TypeError("Expected an object.");
		}
	}

	/**
	 * Validates that a value is a object or null.
	 * @param {*} value The value to validate.
	 * @returns {void}
	 * @throws {TypeError} If the value is invalid.
	 */
	static "object?"(value) {
		if (typeof value !== "object") {
			throw new TypeError("Expected an object or null.");
		}
	}

	/**
	 * Validates that a value is a string.
	 * @param {*} value The value to validate.
	 * @returns {void}
	 * @throws {TypeError} If the value is invalid.
	 */
	static string(value) {
		if (typeof value !== "string") {
			throw new TypeError("Expected a string.");
		}
	}

	/**
	 * Validates that a value is a non-empty string.
	 * @param {*} value The value to validate.
	 * @returns {void}
	 * @throws {TypeError} If the value is invalid.
	 */
	static "string!"(value) {
		if (typeof value !== "string" || value.length === 0) {
			throw new TypeError("Expected a non-empty string.");
		}
	}
}

/**
 * @fileoverview Object Schema
 */


//-----------------------------------------------------------------------------
// Types
//-----------------------------------------------------------------------------

/** @typedef {import("./types.ts").ObjectDefinition} ObjectDefinition */
/** @typedef {import("./types.ts").PropertyDefinition} PropertyDefinition */

//-----------------------------------------------------------------------------
// Private
//-----------------------------------------------------------------------------

/**
 * Validates a schema strategy.
 * @param {string} name The name of the key this strategy is for.
 * @param {PropertyDefinition} definition The strategy for the object key.
 * @returns {void}
 * @throws {Error} When the strategy is missing a name.
 * @throws {Error} When the strategy is missing a merge() method.
 * @throws {Error} When the strategy is missing a validate() method.
 */
function validateDefinition(name, definition) {
	let hasSchema = false;
	if (definition.schema) {
		if (typeof definition.schema === "object") {
			hasSchema = true;
		} else {
			throw new TypeError("Schema must be an object.");
		}
	}

	if (typeof definition.merge === "string") {
		if (!(definition.merge in MergeStrategy)) {
			throw new TypeError(
				`Definition for key "${name}" missing valid merge strategy.`,
			);
		}
	} else if (!hasSchema && typeof definition.merge !== "function") {
		throw new TypeError(
			`Definition for key "${name}" must have a merge property.`,
		);
	}

	if (typeof definition.validate === "string") {
		if (!(definition.validate in ValidationStrategy)) {
			throw new TypeError(
				`Definition for key "${name}" missing valid validation strategy.`,
			);
		}
	} else if (!hasSchema && typeof definition.validate !== "function") {
		throw new TypeError(
			`Definition for key "${name}" must have a validate() method.`,
		);
	}
}

//-----------------------------------------------------------------------------
// Errors
//-----------------------------------------------------------------------------

/**
 * Error when an unexpected key is found.
 */
class UnexpectedKeyError extends Error {
	/**
	 * Creates a new instance.
	 * @param {string} key The key that was unexpected.
	 */
	constructor(key) {
		super(`Unexpected key "${key}" found.`);
	}
}

/**
 * Error when a required key is missing.
 */
class MissingKeyError extends Error {
	/**
	 * Creates a new instance.
	 * @param {string} key The key that was missing.
	 */
	constructor(key) {
		super(`Missing required key "${key}".`);
	}
}

/**
 * Error when a key requires other keys that are missing.
 */
class MissingDependentKeysError extends Error {
	/**
	 * Creates a new instance.
	 * @param {string} key The key that was unexpected.
	 * @param {Array<string>} requiredKeys The keys that are required.
	 */
	constructor(key, requiredKeys) {
		super(`Key "${key}" requires keys "${requiredKeys.join('", "')}".`);
	}
}

/**
 * Wrapper error for errors occuring during a merge or validate operation.
 */
class WrapperError extends Error {
	/**
	 * Creates a new instance.
	 * @param {string} key The object key causing the error.
	 * @param {Error} source The source error.
	 */
	constructor(key, source) {
		super(`Key "${key}": ${source.message}`, { cause: source });

		// copy over custom properties that aren't represented
		for (const sourceKey of Object.keys(source)) {
			if (!(sourceKey in this)) {
				this[sourceKey] = source[sourceKey];
			}
		}
	}
}

//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------

/**
 * Represents an object validation/merging schema.
 */
class ObjectSchema {
	/**
	 * Track all definitions in the schema by key.
	 * @type {Map<string, PropertyDefinition>}
	 */
	#definitions = new Map();

	/**
	 * Separately track any keys that are required for faster validtion.
	 * @type {Map<string, PropertyDefinition>}
	 */
	#requiredKeys = new Map();

	/**
	 * Creates a new instance.
	 * @param {ObjectDefinition} definitions The schema definitions.
	 */
	constructor(definitions) {
		if (!definitions) {
			throw new Error("Schema definitions missing.");
		}

		// add in all strategies
		for (const key of Object.keys(definitions)) {
			validateDefinition(key, definitions[key]);

			// normalize merge and validate methods if subschema is present
			if (typeof definitions[key].schema === "object") {
				const schema = new ObjectSchema(definitions[key].schema);
				definitions[key] = {
					...definitions[key],
					merge(first = {}, second = {}) {
						return schema.merge(first, second);
					},
					validate(value) {
						ValidationStrategy.object(value);
						schema.validate(value);
					},
				};
			}

			// normalize the merge method in case there's a string
			if (typeof definitions[key].merge === "string") {
				definitions[key] = {
					...definitions[key],
					merge: MergeStrategy[
						/** @type {string} */ (definitions[key].merge)
					],
				};
			}

			// normalize the validate method in case there's a string
			if (typeof definitions[key].validate === "string") {
				definitions[key] = {
					...definitions[key],
					validate:
						ValidationStrategy[
							/** @type {string} */ (definitions[key].validate)
						],
				};
			}

			this.#definitions.set(key, definitions[key]);

			if (definitions[key].required) {
				this.#requiredKeys.set(key, definitions[key]);
			}
		}
	}

	/**
	 * Determines if a strategy has been registered for the given object key.
	 * @param {string} key The object key to find a strategy for.
	 * @returns {boolean} True if the key has a strategy registered, false if not.
	 */
	hasKey(key) {
		return this.#definitions.has(key);
	}

	/**
	 * Merges objects together to create a new object comprised of the keys
	 * of the all objects. Keys are merged based on the each key's merge
	 * strategy.
	 * @param {...Object} objects The objects to merge.
	 * @returns {Object} A new object with a mix of all objects' keys.
	 * @throws {Error} If any object is invalid.
	 */
	merge(...objects) {
		// double check arguments
		if (objects.length < 2) {
			throw new TypeError("merge() requires at least two arguments.");
		}

		if (
			objects.some(
				object => object === null || typeof object !== "object",
			)
		) {
			throw new TypeError("All arguments must be objects.");
		}

		return objects.reduce((result, object) => {
			this.validate(object);

			for (const [key, strategy] of this.#definitions) {
				try {
					if (key in result || key in object) {
						const merge = /** @type {Function} */ (strategy.merge);
						const value = merge.call(
							this,
							result[key],
							object[key],
						);
						if (value !== undefined) {
							result[key] = value;
						}
					}
				} catch (ex) {
					throw new WrapperError(key, ex);
				}
			}
			return result;
		}, {});
	}

	/**
	 * Validates an object's keys based on the validate strategy for each key.
	 * @param {Object} object The object to validate.
	 * @returns {void}
	 * @throws {Error} When the object is invalid.
	 */
	validate(object) {
		// check existing keys first
		for (const key of Object.keys(object)) {
			// check to see if the key is defined
			if (!this.hasKey(key)) {
				throw new UnexpectedKeyError(key);
			}

			// validate existing keys
			const definition = this.#definitions.get(key);

			// first check to see if any other keys are required
			if (Array.isArray(definition.requires)) {
				if (
					!definition.requires.every(otherKey => otherKey in object)
				) {
					throw new MissingDependentKeysError(
						key,
						definition.requires,
					);
				}
			}

			// now apply remaining validation strategy
			try {
				const validate = /** @type {Function} */ (definition.validate);
				validate.call(definition, object[key]);
			} catch (ex) {
				throw new WrapperError(key, ex);
			}
		}

		// ensure required keys aren't missing
		for (const [key] of this.#requiredKeys) {
			if (!(key in object)) {
				throw new MissingKeyError(key);
			}
		}
	}
}

// @ts-self-types="./index.d.ts"

/**
 * @fileoverview ConfigSchema
 * @author Nicholas C. Zakas
 */

//------------------------------------------------------------------------------
// Types
//------------------------------------------------------------------------------

/** @typedef {import("@eslint/object-schema").PropertyDefinition} PropertyDefinition */
/** @typedef {import("@eslint/object-schema").ObjectDefinition} ObjectDefinition */

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * A strategy that does nothing.
 * @type {PropertyDefinition}
 */
const NOOP_STRATEGY = {
	required: false,
	merge() {
		return undefined;
	},
	validate() {},
};

//------------------------------------------------------------------------------
// Exports
//------------------------------------------------------------------------------

/**
 * The base schema that every ConfigArray uses.
 * @type {ObjectDefinition}
 */
const baseSchema = Object.freeze({
	name: {
		required: false,
		merge() {
			return undefined;
		},
		validate(value) {
			if (typeof value !== "string") {
				throw new TypeError("Property must be a string.");
			}
		},
	},
	files: NOOP_STRATEGY,
	ignores: NOOP_STRATEGY,
});

/**
 * @fileoverview ConfigSchema
 * @author Nicholas C. Zakas
 */

//------------------------------------------------------------------------------
// Types
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Asserts that a given value is an array.
 * @param {*} value The value to check.
 * @returns {void}
 * @throws {TypeError} When the value is not an array.
 */
function assertIsArray(value) {
	if (!Array.isArray(value)) {
		throw new TypeError("Expected value to be an array.");
	}
}

/**
 * Asserts that a given value is an array containing only strings and functions.
 * @param {*} value The value to check.
 * @returns {void}
 * @throws {TypeError} When the value is not an array of strings and functions.
 */
function assertIsArrayOfStringsAndFunctions(value) {
	assertIsArray(value);

	if (
		value.some(
			item => typeof item !== "string" && typeof item !== "function",
		)
	) {
		throw new TypeError(
			"Expected array to only contain strings and functions.",
		);
	}
}

/**
 * Asserts that a given value is a non-empty array.
 * @param {*} value The value to check.
 * @returns {void}
 * @throws {TypeError} When the value is not an array or an empty array.
 */
function assertIsNonEmptyArray(value) {
	if (!Array.isArray(value) || value.length === 0) {
		throw new TypeError("Expected value to be a non-empty array.");
	}
}

//------------------------------------------------------------------------------
// Exports
//------------------------------------------------------------------------------

/**
 * The schema for `files` and `ignores` that every ConfigArray uses.
 * @type {ObjectDefinition}
 */
const filesAndIgnoresSchema = Object.freeze({
	files: {
		required: false,
		merge() {
			return undefined;
		},
		validate(value) {
			// first check if it's an array
			assertIsNonEmptyArray(value);

			// then check each member
			value.forEach(item => {
				if (Array.isArray(item)) {
					assertIsArrayOfStringsAndFunctions(item);
				} else if (
					typeof item !== "string" &&
					typeof item !== "function"
				) {
					throw new TypeError(
						"Items must be a string, a function, or an array of strings and functions.",
					);
				}
			});
		},
	},
	ignores: {
		required: false,
		merge() {
			return undefined;
		},
		validate: assertIsArrayOfStringsAndFunctions,
	},
});

/**
 * @fileoverview ConfigArray
 * @author Nicholas C. Zakas
 */


//------------------------------------------------------------------------------
// Types
//------------------------------------------------------------------------------

/** @typedef {import("./types.ts").ConfigObject} ConfigObject */
/** @typedef {import("minimatch").IMinimatchStatic} IMinimatchStatic */
/** @typedef {import("minimatch").IMinimatch} IMinimatch */
/** @typedef {import("@jsr/std__path")} PathImpl */

/*
 * This is a bit of a hack to make TypeScript happy with the Rollup-created
 * CommonJS file. Rollup doesn't do object destructuring for imported files
 * and instead imports the default via `require()`. This messes up type checking
 * for `ObjectSchema`. To work around that, we just import the type manually
 * and give it a different name to use in the JSDoc comments.
 */
/** @typedef {import("@eslint/object-schema").ObjectSchema} ObjectSchemaInstance */

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const Minimatch$1 = minimatch$2.Minimatch;
const debug = createDebug("@eslint/config-array");

/**
 * A cache for minimatch instances.
 * @type {Map<string, IMinimatch>}
 */
const minimatchCache = new Map();

/**
 * A cache for negated minimatch instances.
 * @type {Map<string, IMinimatch>}
 */
const negatedMinimatchCache = new Map();

/**
 * Options to use with minimatch.
 * @type {Object}
 */
const MINIMATCH_OPTIONS = {
	// matchBase: true,
	dot: true,
	allowWindowsEscape: true,
};

/**
 * The types of config objects that are supported.
 * @type {Set<string>}
 */
const CONFIG_TYPES = new Set(["array", "function"]);

/**
 * Fields that are considered metadata and not part of the config object.
 * @type {Set<string>}
 */
const META_FIELDS = new Set(["name", "index"]);

/**
 * A schema containing just files and ignores for early validation.
 * @type {ObjectSchemaInstance}
 */
const FILES_AND_IGNORES_SCHEMA = new ObjectSchema(filesAndIgnoresSchema);

// Precomputed constant objects returned by `ConfigArray.getConfigWithStatus`.

const CONFIG_WITH_STATUS_EXTERNAL = Object.freeze({ status: "external" });
const CONFIG_WITH_STATUS_IGNORED = Object.freeze({ status: "ignored" });
const CONFIG_WITH_STATUS_UNCONFIGURED = Object.freeze({
	status: "unconfigured",
});

// Match two leading dots followed by a slash or the end of input.
const EXTERNAL_PATH_REGEX = /^\.\.(?:\/|$)/u;

/**
 * Wrapper error for config validation errors that adds a name to the front of the
 * error message.
 */
class ConfigError extends Error {
	/**
	 * Creates a new instance.
	 * @param {string} name The config object name causing the error.
	 * @param {number} index The index of the config object in the array.
	 * @param {Object} options The options for the error.
	 * @param {Error} [options.cause] The error that caused this error.
	 * @param {string} [options.message] The message to use for the error.
	 */
	constructor(name, index, { cause, message }) {
		const finalMessage = message || cause.message;

		super(`Config ${name}: ${finalMessage}`, { cause });

		// copy over custom properties that aren't represented
		if (cause) {
			for (const key of Object.keys(cause)) {
				if (!(key in this)) {
					this[key] = cause[key];
				}
			}
		}

		/**
		 * The name of the error.
		 * @type {string}
		 * @readonly
		 */
		this.name = "ConfigError";

		/**
		 * The index of the config object in the array.
		 * @type {number}
		 * @readonly
		 */
		this.index = index;
	}
}

/**
 * Gets the name of a config object.
 * @param {ConfigObject} config The config object to get the name of.
 * @returns {string} The name of the config object.
 */
function getConfigName(config) {
	if (config && typeof config.name === "string" && config.name) {
		return `"${config.name}"`;
	}

	return "(unnamed)";
}

/**
 * Rethrows a config error with additional information about the config object.
 * @param {object} config The config object to get the name of.
 * @param {number} index The index of the config object in the array.
 * @param {Error} error The error to rethrow.
 * @throws {ConfigError} When the error is rethrown for a config.
 */
function rethrowConfigError(config, index, error) {
	const configName = getConfigName(config);
	throw new ConfigError(configName, index, { cause: error });
}

/**
 * Shorthand for checking if a value is a string.
 * @param {any} value The value to check.
 * @returns {boolean} True if a string, false if not.
 */
function isString(value) {
	return typeof value === "string";
}

/**
 * Creates a function that asserts that the config is valid
 * during normalization. This checks that the config is not nullish
 * and that files and ignores keys  of a config object are valid as per base schema.
 * @param {Object} config The config object to check.
 * @param {number} index The index of the config object in the array.
 * @returns {void}
 * @throws {ConfigError} If the files and ignores keys of a config object are not valid.
 */
function assertValidBaseConfig(config, index) {
	if (config === null) {
		throw new ConfigError(getConfigName(config), index, {
			message: "Unexpected null config.",
		});
	}

	if (config === undefined) {
		throw new ConfigError(getConfigName(config), index, {
			message: "Unexpected undefined config.",
		});
	}

	if (typeof config !== "object") {
		throw new ConfigError(getConfigName(config), index, {
			message: "Unexpected non-object config.",
		});
	}

	const validateConfig = {};

	if ("files" in config) {
		validateConfig.files = config.files;
	}

	if ("ignores" in config) {
		validateConfig.ignores = config.ignores;
	}

	try {
		FILES_AND_IGNORES_SCHEMA.validate(validateConfig);
	} catch (validationError) {
		rethrowConfigError(config, index, validationError);
	}
}

/**
 * Wrapper around minimatch that caches minimatch patterns for
 * faster matching speed over multiple file path evaluations.
 * @param {string} filepath The file path to match.
 * @param {string} pattern The glob pattern to match against.
 * @param {object} options The minimatch options to use.
 * @returns
 */
function doMatch(filepath, pattern, options = {}) {
	let cache = minimatchCache;

	if (options.flipNegate) {
		cache = negatedMinimatchCache;
	}

	let matcher = cache.get(pattern);

	if (!matcher) {
		matcher = new Minimatch$1(
			pattern,
			Object.assign({}, MINIMATCH_OPTIONS, options),
		);
		cache.set(pattern, matcher);
	}

	return matcher.match(filepath);
}

/**
 * Normalizes a `ConfigArray` by flattening it and executing any functions
 * that are found inside.
 * @param {Array} items The items in a `ConfigArray`.
 * @param {Object} context The context object to pass into any function
 *      found.
 * @param {Array<string>} extraConfigTypes The config types to check.
 * @returns {Promise<Array>} A flattened array containing only config objects.
 * @throws {TypeError} When a config function returns a function.
 */
async function normalize(items, context, extraConfigTypes) {
	const allowFunctions = extraConfigTypes.includes("function");
	const allowArrays = extraConfigTypes.includes("array");

	async function* flatTraverse(array) {
		for (let item of array) {
			if (typeof item === "function") {
				if (!allowFunctions) {
					throw new TypeError("Unexpected function.");
				}

				item = item(context);
				if (item.then) {
					item = await item;
				}
			}

			if (Array.isArray(item)) {
				if (!allowArrays) {
					throw new TypeError("Unexpected array.");
				}
				yield* flatTraverse(item);
			} else if (typeof item === "function") {
				throw new TypeError(
					"A config function can only return an object or array.",
				);
			} else {
				yield item;
			}
		}
	}

	/*
	 * Async iterables cannot be used with the spread operator, so we need to manually
	 * create the array to return.
	 */
	const asyncIterable = await flatTraverse(items);
	const configs = [];

	for await (const config of asyncIterable) {
		configs.push(config);
	}

	return configs;
}

/**
 * Normalizes a `ConfigArray` by flattening it and executing any functions
 * that are found inside.
 * @param {Array} items The items in a `ConfigArray`.
 * @param {Object} context The context object to pass into any function
 *      found.
 * @param {Array<string>} extraConfigTypes The config types to check.
 * @returns {Array} A flattened array containing only config objects.
 * @throws {TypeError} When a config function returns a function.
 */
function normalizeSync(items, context, extraConfigTypes) {
	const allowFunctions = extraConfigTypes.includes("function");
	const allowArrays = extraConfigTypes.includes("array");

	function* flatTraverse(array) {
		for (let item of array) {
			if (typeof item === "function") {
				if (!allowFunctions) {
					throw new TypeError("Unexpected function.");
				}

				item = item(context);
				if (item.then) {
					throw new TypeError(
						"Async config functions are not supported.",
					);
				}
			}

			if (Array.isArray(item)) {
				if (!allowArrays) {
					throw new TypeError("Unexpected array.");
				}

				yield* flatTraverse(item);
			} else if (typeof item === "function") {
				throw new TypeError(
					"A config function can only return an object or array.",
				);
			} else {
				yield item;
			}
		}
	}

	return [...flatTraverse(items)];
}

/**
 * Determines if a given file path should be ignored based on the given
 * matcher.
 * @param {Array<string|((string) => boolean)>} ignores The ignore patterns to check.
 * @param {string} filePath The unprocessed file path to check.
 * @param {string} relativeFilePath The path of the file to check relative to the base path,
 * 		using forward slash (`"/"`) as a separator.
 * @returns {boolean} True if the path should be ignored and false if not.
 */
function shouldIgnorePath(ignores, filePath, relativeFilePath) {
	return ignores.reduce((ignored, matcher) => {
		if (!ignored) {
			if (typeof matcher === "function") {
				return matcher(filePath);
			}

			// don't check negated patterns because we're not ignored yet
			if (!matcher.startsWith("!")) {
				return doMatch(relativeFilePath, matcher);
			}

			// otherwise we're still not ignored
			return false;
		}

		// only need to check negated patterns because we're ignored
		if (typeof matcher === "string" && matcher.startsWith("!")) {
			return !doMatch(relativeFilePath, matcher, {
				flipNegate: true,
			});
		}

		return ignored;
	}, false);
}

/**
 * Determines if a given file path is matched by a config based on
 * `ignores` only.
 * @param {string} filePath The unprocessed file path to check.
 * @param {string} relativeFilePath The path of the file to check relative to the base path,
 * 		using forward slash (`"/"`) as a separator.
 * @param {Object} config The config object to check.
 * @returns {boolean} True if the file path is matched by the config,
 *      false if not.
 */
function pathMatchesIgnores(filePath, relativeFilePath, config) {
	return (
		Object.keys(config).filter(key => !META_FIELDS.has(key)).length > 1 &&
		!shouldIgnorePath(config.ignores, filePath, relativeFilePath)
	);
}

/**
 * Determines if a given file path is matched by a config. If the config
 * has no `files` field, then it matches; otherwise, if a `files` field
 * is present then we match the globs in `files` and exclude any globs in
 * `ignores`.
 * @param {string} filePath The unprocessed file path to check.
 * @param {string} relativeFilePath The path of the file to check relative to the base path,
 * 		using forward slash (`"/"`) as a separator.
 * @param {Object} config The config object to check.
 * @returns {boolean} True if the file path is matched by the config,
 *      false if not.
 */
function pathMatches(filePath, relativeFilePath, config) {
	// match both strings and functions
	function match(pattern) {
		if (isString(pattern)) {
			return doMatch(relativeFilePath, pattern);
		}

		if (typeof pattern === "function") {
			return pattern(filePath);
		}

		throw new TypeError(`Unexpected matcher type ${pattern}.`);
	}

	// check for all matches to config.files
	let filePathMatchesPattern = config.files.some(pattern => {
		if (Array.isArray(pattern)) {
			return pattern.every(match);
		}

		return match(pattern);
	});

	/*
	 * If the file path matches the config.files patterns, then check to see
	 * if there are any files to ignore.
	 */
	if (filePathMatchesPattern && config.ignores) {
		filePathMatchesPattern = !shouldIgnorePath(
			config.ignores,
			filePath,
			relativeFilePath,
		);
	}

	return filePathMatchesPattern;
}

/**
 * Ensures that a ConfigArray has been normalized.
 * @param {ConfigArray} configArray The ConfigArray to check.
 * @returns {void}
 * @throws {Error} When the `ConfigArray` is not normalized.
 */
function assertNormalized(configArray) {
	// TODO: Throw more verbose error
	if (!configArray.isNormalized()) {
		throw new Error(
			"ConfigArray must be normalized to perform this operation.",
		);
	}
}

/**
 * Ensures that config types are valid.
 * @param {Array<string>} extraConfigTypes The config types to check.
 * @returns {void}
 * @throws {Error} When the config types array is invalid.
 */
function assertExtraConfigTypes(extraConfigTypes) {
	if (extraConfigTypes.length > 2) {
		throw new TypeError(
			"configTypes must be an array with at most two items.",
		);
	}

	for (const configType of extraConfigTypes) {
		if (!CONFIG_TYPES.has(configType)) {
			throw new TypeError(
				`Unexpected config type "${configType}" found. Expected one of: "object", "array", "function".`,
			);
		}
	}
}

/**
 * Returns path-handling implementations for Unix or Windows, depending on a given absolute path.
 * @param {string} fileOrDirPath The absolute path to check.
 * @returns {PathImpl} Path-handling implementations for the specified path.
 * @throws An error is thrown if the specified argument is not an absolute path.
 */
function getPathImpl(fileOrDirPath) {
	// Posix absolute paths always start with a slash.
	if (fileOrDirPath.startsWith("/")) {
		return posixPath;
	}

	// Windows absolute paths start with a letter followed by a colon and at least one backslash,
	// or with two backslashes in the case of UNC paths.
	// Forward slashed are automatically normalized to backslashes.
	if (/^(?:[A-Za-z]:[/\\]|[/\\]{2})/u.test(fileOrDirPath)) {
		return windowsPath;
	}

	throw new Error(
		`Expected an absolute path but received "${fileOrDirPath}"`,
	);
}

/**
 * Converts a given path to a relative path with all separator characters replaced by forward slashes (`"/"`).
 * @param {string} fileOrDirPath The unprocessed path to convert.
 * @param {string} namespacedBasePath The namespaced base path of the directory to which the calculated path shall be relative.
 * @param {PathImpl} path Path-handling implementations.
 * @returns {string} A relative path with all separator characters replaced by forward slashes.
 */
function toRelativePath(fileOrDirPath, namespacedBasePath, path) {
	const fullPath = path.resolve(namespacedBasePath, fileOrDirPath);
	const namespacedFullPath = path.toNamespacedPath(fullPath);
	const relativePath = path.relative(namespacedBasePath, namespacedFullPath);
	return relativePath.replaceAll(path.SEPARATOR, "/");
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

const ConfigArraySymbol = {
	isNormalized: Symbol("isNormalized"),
	configCache: Symbol("configCache"),
	schema: Symbol("schema"),
	finalizeConfig: Symbol("finalizeConfig"),
	preprocessConfig: Symbol("preprocessConfig"),
};

// used to store calculate data for faster lookup
const dataCache = new WeakMap();

/**
 * Represents an array of config objects and provides method for working with
 * those config objects.
 */
class ConfigArray extends Array {
	/**
	 * The namespaced path of the config file directory.
	 * @type {string}
	 */
	#namespacedBasePath;

	/**
	 * Path-handling implementations.
	 * @type {PathImpl}
	 */
	#path;

	/**
	 * Creates a new instance of ConfigArray.
	 * @param {Iterable|Function|Object} configs An iterable yielding config
	 *      objects, or a config function, or a config object.
	 * @param {Object} options The options for the ConfigArray.
	 * @param {string} [options.basePath="/"] The absolute path of the config file directory.
	 * 		Defaults to `"/"`.
	 * @param {boolean} [options.normalized=false] Flag indicating if the
	 *      configs have already been normalized.
	 * @param {Object} [options.schema] The additional schema
	 *      definitions to use for the ConfigArray schema.
	 * @param {Array<string>} [options.extraConfigTypes] List of config types supported.
	 */
	constructor(
		configs,
		{
			basePath = "/",
			normalized = false,
			schema: customSchema,
			extraConfigTypes = [],
		} = {},
	) {
		super();

		/**
		 * Tracks if the array has been normalized.
		 * @property isNormalized
		 * @type {boolean}
		 * @private
		 */
		this[ConfigArraySymbol.isNormalized] = normalized;

		/**
		 * The schema used for validating and merging configs.
		 * @property schema
		 * @type {ObjectSchemaInstance}
		 * @private
		 */
		this[ConfigArraySymbol.schema] = new ObjectSchema(
			Object.assign({}, customSchema, baseSchema),
		);

		if (!isString(basePath) || !basePath) {
			throw new TypeError("basePath must be a non-empty string");
		}

		/**
		 * The path of the config file that this array was loaded from.
		 * This is used to calculate filename matches.
		 * @property basePath
		 * @type {string}
		 */
		this.basePath = basePath;

		assertExtraConfigTypes(extraConfigTypes);

		/**
		 * The supported config types.
		 * @type {Array<string>}
		 */
		this.extraConfigTypes = [...extraConfigTypes];
		Object.freeze(this.extraConfigTypes);

		/**
		 * A cache to store calculated configs for faster repeat lookup.
		 * @property configCache
		 * @type {Map<string, Object>}
		 * @private
		 */
		this[ConfigArraySymbol.configCache] = new Map();

		// init cache
		dataCache.set(this, {
			explicitMatches: new Map(),
			directoryMatches: new Map(),
			files: undefined,
			ignores: undefined,
		});

		// load the configs into this array
		if (Array.isArray(configs)) {
			this.push(...configs);
		} else {
			this.push(configs);
		}

		// select path-handling implementations depending on the base path
		this.#path = getPathImpl(basePath);

		// On Windows, `path.relative()` returns an absolute path when given two paths on different drives.
		// The namespaced base path is useful to make sure that calculated relative paths are always relative.
		// On Unix, it is identical to the base path.
		this.#namespacedBasePath = this.#path.toNamespacedPath(basePath);
	}

	/**
	 * Prevent normal array methods from creating a new `ConfigArray` instance.
	 * This is to ensure that methods such as `slice()` won't try to create a
	 * new instance of `ConfigArray` behind the scenes as doing so may throw
	 * an error due to the different constructor signature.
	 * @type {ArrayConstructor} The `Array` constructor.
	 */
	static get [Symbol.species]() {
		return Array;
	}

	/**
	 * Returns the `files` globs from every config object in the array.
	 * This can be used to determine which files will be matched by a
	 * config array or to use as a glob pattern when no patterns are provided
	 * for a command line interface.
	 * @returns {Array<string|Function>} An array of matchers.
	 */
	get files() {
		assertNormalized(this);

		// if this data has been cached, retrieve it
		const cache = dataCache.get(this);

		if (cache.files) {
			return cache.files;
		}

		// otherwise calculate it

		const result = [];

		for (const config of this) {
			if (config.files) {
				config.files.forEach(filePattern => {
					result.push(filePattern);
				});
			}
		}

		// store result
		cache.files = result;
		dataCache.set(this, cache);

		return result;
	}

	/**
	 * Returns ignore matchers that should always be ignored regardless of
	 * the matching `files` fields in any configs. This is necessary to mimic
	 * the behavior of things like .gitignore and .eslintignore, allowing a
	 * globbing operation to be faster.
	 * @returns {string[]} An array of string patterns and functions to be ignored.
	 */
	get ignores() {
		assertNormalized(this);

		// if this data has been cached, retrieve it
		const cache = dataCache.get(this);

		if (cache.ignores) {
			return cache.ignores;
		}

		// otherwise calculate it

		const result = [];

		for (const config of this) {
			/*
			 * We only count ignores if there are no other keys in the object.
			 * In this case, it acts list a globally ignored pattern. If there
			 * are additional keys, then ignores act like exclusions.
			 */
			if (
				config.ignores &&
				Object.keys(config).filter(key => !META_FIELDS.has(key))
					.length === 1
			) {
				result.push(...config.ignores);
			}
		}

		// store result
		cache.ignores = result;
		dataCache.set(this, cache);

		return result;
	}

	/**
	 * Indicates if the config array has been normalized.
	 * @returns {boolean} True if the config array is normalized, false if not.
	 */
	isNormalized() {
		return this[ConfigArraySymbol.isNormalized];
	}

	/**
	 * Normalizes a config array by flattening embedded arrays and executing
	 * config functions.
	 * @param {Object} [context] The context object for config functions.
	 * @returns {Promise<ConfigArray>} The current ConfigArray instance.
	 */
	async normalize(context = {}) {
		if (!this.isNormalized()) {
			const normalizedConfigs = await normalize(
				this,
				context,
				this.extraConfigTypes,
			);
			this.length = 0;
			this.push(
				...normalizedConfigs.map(
					this[ConfigArraySymbol.preprocessConfig].bind(this),
				),
			);
			this.forEach(assertValidBaseConfig);
			this[ConfigArraySymbol.isNormalized] = true;

			// prevent further changes
			Object.freeze(this);
		}

		return this;
	}

	/**
	 * Normalizes a config array by flattening embedded arrays and executing
	 * config functions.
	 * @param {Object} [context] The context object for config functions.
	 * @returns {ConfigArray} The current ConfigArray instance.
	 */
	normalizeSync(context = {}) {
		if (!this.isNormalized()) {
			const normalizedConfigs = normalizeSync(
				this,
				context,
				this.extraConfigTypes,
			);
			this.length = 0;
			this.push(
				...normalizedConfigs.map(
					this[ConfigArraySymbol.preprocessConfig].bind(this),
				),
			);
			this.forEach(assertValidBaseConfig);
			this[ConfigArraySymbol.isNormalized] = true;

			// prevent further changes
			Object.freeze(this);
		}

		return this;
	}

	/* eslint-disable class-methods-use-this -- Desired as instance methods */

	/**
	 * Finalizes the state of a config before being cached and returned by
	 * `getConfig()`. Does nothing by default but is provided to be
	 * overridden by subclasses as necessary.
	 * @param {Object} config The config to finalize.
	 * @returns {Object} The finalized config.
	 */
	[ConfigArraySymbol.finalizeConfig](config) {
		return config;
	}

	/**
	 * Preprocesses a config during the normalization process. This is the
	 * method to override if you want to convert an array item before it is
	 * validated for the first time. For example, if you want to replace a
	 * string with an object, this is the method to override.
	 * @param {Object} config The config to preprocess.
	 * @returns {Object} The config to use in place of the argument.
	 */
	[ConfigArraySymbol.preprocessConfig](config) {
		return config;
	}

	/* eslint-enable class-methods-use-this -- Desired as instance methods */

	/**
	 * Returns the config object for a given file path and a status that can be used to determine why a file has no config.
	 * @param {string} filePath The path of a file to get a config for.
	 * @returns {{ config?: Object, status: "ignored"|"external"|"unconfigured"|"matched" }}
	 * An object with an optional property `config` and property `status`.
	 * `config` is the config object for the specified file as returned by {@linkcode ConfigArray.getConfig},
	 * `status` a is one of the constants returned by {@linkcode ConfigArray.getConfigStatus}.
	 */
	getConfigWithStatus(filePath) {
		assertNormalized(this);

		const cache = this[ConfigArraySymbol.configCache];

		// first check the cache for a filename match to avoid duplicate work
		if (cache.has(filePath)) {
			return cache.get(filePath);
		}

		// check to see if the file is outside the base path

		const relativeFilePath = toRelativePath(
			filePath,
			this.#namespacedBasePath,
			this.#path,
		);

		if (EXTERNAL_PATH_REGEX.test(relativeFilePath)) {
			debug(`No config for file ${filePath} outside of base path`);

			// cache and return result
			cache.set(filePath, CONFIG_WITH_STATUS_EXTERNAL);
			return CONFIG_WITH_STATUS_EXTERNAL;
		}

		// next check to see if the file should be ignored

		// check if this should be ignored due to its directory
		if (this.isDirectoryIgnored(this.#path.dirname(filePath))) {
			debug(`Ignoring ${filePath} based on directory pattern`);

			// cache and return result
			cache.set(filePath, CONFIG_WITH_STATUS_IGNORED);
			return CONFIG_WITH_STATUS_IGNORED;
		}

		if (shouldIgnorePath(this.ignores, filePath, relativeFilePath)) {
			debug(`Ignoring ${filePath} based on file pattern`);

			// cache and return result
			cache.set(filePath, CONFIG_WITH_STATUS_IGNORED);
			return CONFIG_WITH_STATUS_IGNORED;
		}

		// filePath isn't automatically ignored, so try to construct config

		const matchingConfigIndices = [];
		let matchFound = false;
		const universalPattern = /^\*$|\/\*{1,2}$/u;

		this.forEach((config, index) => {
			if (!config.files) {
				if (!config.ignores) {
					debug(`Universal config found for ${filePath}`);
					matchingConfigIndices.push(index);
					return;
				}

				if (pathMatchesIgnores(filePath, relativeFilePath, config)) {
					debug(
						`Matching config found for ${filePath} (based on ignores: ${config.ignores})`,
					);
					matchingConfigIndices.push(index);
					return;
				}

				debug(
					`Skipped config found for ${filePath} (based on ignores: ${config.ignores})`,
				);
				return;
			}

			/*
			 * If a config has a files pattern * or patterns ending in /** or /*,
			 * and the filePath only matches those patterns, then the config is only
			 * applied if there is another config where the filePath matches
			 * a file with a specific extensions such as *.js.
			 */

			const universalFiles = config.files.filter(pattern =>
				universalPattern.test(pattern),
			);

			// universal patterns were found so we need to check the config twice
			if (universalFiles.length) {
				debug("Universal files patterns found. Checking carefully.");

				const nonUniversalFiles = config.files.filter(
					pattern => !universalPattern.test(pattern),
				);

				// check that the config matches without the non-universal files first
				if (
					nonUniversalFiles.length &&
					pathMatches(filePath, relativeFilePath, {
						files: nonUniversalFiles,
						ignores: config.ignores,
					})
				) {
					debug(`Matching config found for ${filePath}`);
					matchingConfigIndices.push(index);
					matchFound = true;
					return;
				}

				// if there wasn't a match then check if it matches with universal files
				if (
					universalFiles.length &&
					pathMatches(filePath, relativeFilePath, {
						files: universalFiles,
						ignores: config.ignores,
					})
				) {
					debug(`Matching config found for ${filePath}`);
					matchingConfigIndices.push(index);
					return;
				}

				// if we make here, then there was no match
				return;
			}

			// the normal case
			if (pathMatches(filePath, relativeFilePath, config)) {
				debug(`Matching config found for ${filePath}`);
				matchingConfigIndices.push(index);
				matchFound = true;
			}
		});

		// if matching both files and ignores, there will be no config to create
		if (!matchFound) {
			debug(`No matching configs found for ${filePath}`);

			// cache and return result
			cache.set(filePath, CONFIG_WITH_STATUS_UNCONFIGURED);
			return CONFIG_WITH_STATUS_UNCONFIGURED;
		}

		// check to see if there is a config cached by indices
		const indicesKey = matchingConfigIndices.toString();
		let configWithStatus = cache.get(indicesKey);

		if (configWithStatus) {
			// also store for filename for faster lookup next time
			cache.set(filePath, configWithStatus);

			return configWithStatus;
		}

		// otherwise construct the config

		// eslint-disable-next-line array-callback-return, consistent-return -- rethrowConfigError always throws an error
		let finalConfig = matchingConfigIndices.reduce((result, index) => {
			try {
				return this[ConfigArraySymbol.schema].merge(
					result,
					this[index],
				);
			} catch (validationError) {
				rethrowConfigError(this[index], index, validationError);
			}
		}, {});

		finalConfig = this[ConfigArraySymbol.finalizeConfig](finalConfig);

		configWithStatus = Object.freeze({
			config: finalConfig,
			status: "matched",
		});
		cache.set(filePath, configWithStatus);
		cache.set(indicesKey, configWithStatus);

		return configWithStatus;
	}

	/**
	 * Returns the config object for a given file path.
	 * @param {string} filePath The path of a file to get a config for.
	 * @returns {Object|undefined} The config object for this file or `undefined`.
	 */
	getConfig(filePath) {
		return this.getConfigWithStatus(filePath).config;
	}

	/**
	 * Determines whether a file has a config or why it doesn't.
	 * @param {string} filePath The path of the file to check.
	 * @returns {"ignored"|"external"|"unconfigured"|"matched"} One of the following values:
	 * * `"ignored"`: the file is ignored
	 * * `"external"`: the file is outside the base path
	 * * `"unconfigured"`: the file is not matched by any config
	 * * `"matched"`: the file has a matching config
	 */
	getConfigStatus(filePath) {
		return this.getConfigWithStatus(filePath).status;
	}

	/**
	 * Determines if the given filepath is ignored based on the configs.
	 * @param {string} filePath The path of a file to check.
	 * @returns {boolean} True if the path is ignored, false if not.
	 * @deprecated Use `isFileIgnored` instead.
	 */
	isIgnored(filePath) {
		return this.isFileIgnored(filePath);
	}

	/**
	 * Determines if the given filepath is ignored based on the configs.
	 * @param {string} filePath The path of a file to check.
	 * @returns {boolean} True if the path is ignored, false if not.
	 */
	isFileIgnored(filePath) {
		return this.getConfigStatus(filePath) === "ignored";
	}

	/**
	 * Determines if the given directory is ignored based on the configs.
	 * This checks only default `ignores` that don't have `files` in the
	 * same config. A pattern such as `/foo` be considered to ignore the directory
	 * while a pattern such as `/foo/**` is not considered to ignore the
	 * directory because it is matching files.
	 * @param {string} directoryPath The path of a directory to check.
	 * @returns {boolean} True if the directory is ignored, false if not. Will
	 * 		return true for any directory that is not inside of `basePath`.
	 * @throws {Error} When the `ConfigArray` is not normalized.
	 */
	isDirectoryIgnored(directoryPath) {
		assertNormalized(this);

		const relativeDirectoryPath = toRelativePath(
			directoryPath,
			this.#namespacedBasePath,
			this.#path,
		);

		// basePath directory can never be ignored
		if (relativeDirectoryPath === "") {
			return false;
		}

		if (EXTERNAL_PATH_REGEX.test(relativeDirectoryPath)) {
			return true;
		}

		// first check the cache
		const cache = dataCache.get(this).directoryMatches;

		if (cache.has(relativeDirectoryPath)) {
			return cache.get(relativeDirectoryPath);
		}

		const directoryParts = relativeDirectoryPath.split("/");
		let relativeDirectoryToCheck = "";
		let result;

		/*
		 * In order to get the correct gitignore-style ignores, where an
		 * ignored parent directory cannot have any descendants unignored,
		 * we need to check every directory starting at the parent all
		 * the way down to the actual requested directory.
		 *
		 * We aggressively cache all of this info to make sure we don't
		 * have to recalculate everything for every call.
		 */
		do {
			relativeDirectoryToCheck += `${directoryParts.shift()}/`;

			result = shouldIgnorePath(
				this.ignores,
				this.#path.join(this.basePath, relativeDirectoryToCheck),
				relativeDirectoryToCheck,
			);

			cache.set(relativeDirectoryToCheck, result);
		} while (!result && directoryParts.length);

		// also cache the result for the requested path
		cache.set(relativeDirectoryPath, result);

		return result;
	}
}

var braceExpansion;
var hasRequiredBraceExpansion;

function requireBraceExpansion () {
	if (hasRequiredBraceExpansion) return braceExpansion;
	hasRequiredBraceExpansion = 1;
	var balanced = requireBalancedMatch();

	braceExpansion = expandTop;

	var escSlash = '\0SLASH'+Math.random()+'\0';
	var escOpen = '\0OPEN'+Math.random()+'\0';
	var escClose = '\0CLOSE'+Math.random()+'\0';
	var escComma = '\0COMMA'+Math.random()+'\0';
	var escPeriod = '\0PERIOD'+Math.random()+'\0';

	function numeric(str) {
	  return parseInt(str, 10) == str
	    ? parseInt(str, 10)
	    : str.charCodeAt(0);
	}

	function escapeBraces(str) {
	  return str.split('\\\\').join(escSlash)
	            .split('\\{').join(escOpen)
	            .split('\\}').join(escClose)
	            .split('\\,').join(escComma)
	            .split('\\.').join(escPeriod);
	}

	function unescapeBraces(str) {
	  return str.split(escSlash).join('\\')
	            .split(escOpen).join('{')
	            .split(escClose).join('}')
	            .split(escComma).join(',')
	            .split(escPeriod).join('.');
	}


	// Basically just str.split(","), but handling cases
	// where we have nested braced sections, which should be
	// treated as individual members, like {a,{b,c},d}
	function parseCommaParts(str) {
	  if (!str)
	    return [''];

	  var parts = [];
	  var m = balanced('{', '}', str);

	  if (!m)
	    return str.split(',');

	  var pre = m.pre;
	  var body = m.body;
	  var post = m.post;
	  var p = pre.split(',');

	  p[p.length-1] += '{' + body + '}';
	  var postParts = parseCommaParts(post);
	  if (post.length) {
	    p[p.length-1] += postParts.shift();
	    p.push.apply(p, postParts);
	  }

	  parts.push.apply(parts, p);

	  return parts;
	}

	function expandTop(str) {
	  if (!str)
	    return [];

	  // I don't know why Bash 4.3 does this, but it does.
	  // Anything starting with {} will have the first two bytes preserved
	  // but *only* at the top level, so {},a}b will not expand to anything,
	  // but a{},b}c will be expanded to [a}c,abc].
	  // One could argue that this is a bug in Bash, but since the goal of
	  // this module is to match Bash's rules, we escape a leading {}
	  if (str.substr(0, 2) === '{}') {
	    str = '\\{\\}' + str.substr(2);
	  }

	  return expand(escapeBraces(str), true).map(unescapeBraces);
	}

	function embrace(str) {
	  return '{' + str + '}';
	}
	function isPadded(el) {
	  return /^-?0\d/.test(el);
	}

	function lte(i, y) {
	  return i <= y;
	}
	function gte(i, y) {
	  return i >= y;
	}

	function expand(str, isTop) {
	  var expansions = [];

	  var m = balanced('{', '}', str);
	  if (!m) return [str];

	  // no need to expand pre, since it is guaranteed to be free of brace-sets
	  var pre = m.pre;
	  var post = m.post.length
	    ? expand(m.post, false)
	    : [''];

	  if (/\$$/.test(m.pre)) {    
	    for (var k = 0; k < post.length; k++) {
	      var expansion = pre+ '{' + m.body + '}' + post[k];
	      expansions.push(expansion);
	    }
	  } else {
	    var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
	    var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
	    var isSequence = isNumericSequence || isAlphaSequence;
	    var isOptions = m.body.indexOf(',') >= 0;
	    if (!isSequence && !isOptions) {
	      // {a},b}
	      if (m.post.match(/,.*\}/)) {
	        str = m.pre + '{' + m.body + escClose + m.post;
	        return expand(str);
	      }
	      return [str];
	    }

	    var n;
	    if (isSequence) {
	      n = m.body.split(/\.\./);
	    } else {
	      n = parseCommaParts(m.body);
	      if (n.length === 1) {
	        // x{{a,b}}y ==> x{a}y x{b}y
	        n = expand(n[0], false).map(embrace);
	        if (n.length === 1) {
	          return post.map(function(p) {
	            return m.pre + n[0] + p;
	          });
	        }
	      }
	    }

	    // at this point, n is the parts, and we know it's not a comma set
	    // with a single entry.
	    var N;

	    if (isSequence) {
	      var x = numeric(n[0]);
	      var y = numeric(n[1]);
	      var width = Math.max(n[0].length, n[1].length);
	      var incr = n.length == 3
	        ? Math.abs(numeric(n[2]))
	        : 1;
	      var test = lte;
	      var reverse = y < x;
	      if (reverse) {
	        incr *= -1;
	        test = gte;
	      }
	      var pad = n.some(isPadded);

	      N = [];

	      for (var i = x; test(i, y); i += incr) {
	        var c;
	        if (isAlphaSequence) {
	          c = String.fromCharCode(i);
	          if (c === '\\')
	            c = '';
	        } else {
	          c = String(i);
	          if (pad) {
	            var need = width - c.length;
	            if (need > 0) {
	              var z = new Array(need + 1).join('0');
	              if (i < 0)
	                c = '-' + z + c.slice(1);
	              else
	                c = z + c;
	            }
	          }
	        }
	        N.push(c);
	      }
	    } else {
	      N = [];

	      for (var j = 0; j < n.length; j++) {
	        N.push.apply(N, expand(n[j], false));
	      }
	    }

	    for (var j = 0; j < N.length; j++) {
	      for (var k = 0; k < post.length; k++) {
	        var expansion = pre + N[j] + post[k];
	        if (!isTop || isSequence || expansion)
	          expansions.push(expansion);
	      }
	    }
	  }

	  return expansions;
	}
	return braceExpansion;
}

var braceExpansionExports = requireBraceExpansion();
const expand = /*@__PURE__*/getDefaultExportFromCjs(braceExpansionExports);

const MAX_PATTERN_LENGTH = 1024 * 64;
const assertValidPattern = (pattern) => {
    if (typeof pattern !== 'string') {
        throw new TypeError('invalid pattern');
    }
    if (pattern.length > MAX_PATTERN_LENGTH) {
        throw new TypeError('pattern is too long');
    }
};

// translate the various posix character classes into unicode properties
// this works across all unicode locales
// { <posix class>: [<translation>, /u flag required, negated]
const posixClasses = {
    '[:alnum:]': ['\\p{L}\\p{Nl}\\p{Nd}', true],
    '[:alpha:]': ['\\p{L}\\p{Nl}', true],
    '[:ascii:]': ['\\x' + '00-\\x' + '7f', false],
    '[:blank:]': ['\\p{Zs}\\t', true],
    '[:cntrl:]': ['\\p{Cc}', true],
    '[:digit:]': ['\\p{Nd}', true],
    '[:graph:]': ['\\p{Z}\\p{C}', true, true],
    '[:lower:]': ['\\p{Ll}', true],
    '[:print:]': ['\\p{C}', true],
    '[:punct:]': ['\\p{P}', true],
    '[:space:]': ['\\p{Z}\\t\\r\\n\\v\\f', true],
    '[:upper:]': ['\\p{Lu}', true],
    '[:word:]': ['\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}', true],
    '[:xdigit:]': ['A-Fa-f0-9', false],
};
// only need to escape a few things inside of brace expressions
// escapes: [ \ ] -
const braceEscape = (s) => s.replace(/[[\]\\-]/g, '\\$&');
// escape all regexp magic characters
const regexpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
// everything has already been escaped, we just have to join
const rangesToString = (ranges) => ranges.join('');
// takes a glob string at a posix brace expression, and returns
// an equivalent regular expression source, and boolean indicating
// whether the /u flag needs to be applied, and the number of chars
// consumed to parse the character class.
// This also removes out of order ranges, and returns ($.) if the
// entire class just no good.
const parseClass = (glob, position) => {
    const pos = position;
    /* c8 ignore start */
    if (glob.charAt(pos) !== '[') {
        throw new Error('not in a brace expression');
    }
    /* c8 ignore stop */
    const ranges = [];
    const negs = [];
    let i = pos + 1;
    let sawStart = false;
    let uflag = false;
    let escaping = false;
    let negate = false;
    let endPos = pos;
    let rangeStart = '';
    WHILE: while (i < glob.length) {
        const c = glob.charAt(i);
        if ((c === '!' || c === '^') && i === pos + 1) {
            negate = true;
            i++;
            continue;
        }
        if (c === ']' && sawStart && !escaping) {
            endPos = i + 1;
            break;
        }
        sawStart = true;
        if (c === '\\') {
            if (!escaping) {
                escaping = true;
                i++;
                continue;
            }
            // escaped \ char, fall through and treat like normal char
        }
        if (c === '[' && !escaping) {
            // either a posix class, a collation equivalent, or just a [
            for (const [cls, [unip, u, neg]] of Object.entries(posixClasses)) {
                if (glob.startsWith(cls, i)) {
                    // invalid, [a-[] is fine, but not [a-[:alpha]]
                    if (rangeStart) {
                        return ['$.', false, glob.length - pos, true];
                    }
                    i += cls.length;
                    if (neg)
                        negs.push(unip);
                    else
                        ranges.push(unip);
                    uflag = uflag || u;
                    continue WHILE;
                }
            }
        }
        // now it's just a normal character, effectively
        escaping = false;
        if (rangeStart) {
            // throw this range away if it's not valid, but others
            // can still match.
            if (c > rangeStart) {
                ranges.push(braceEscape(rangeStart) + '-' + braceEscape(c));
            }
            else if (c === rangeStart) {
                ranges.push(braceEscape(c));
            }
            rangeStart = '';
            i++;
            continue;
        }
        // now might be the start of a range.
        // can be either c-d or c-] or c<more...>] or c] at this point
        if (glob.startsWith('-]', i + 1)) {
            ranges.push(braceEscape(c + '-'));
            i += 2;
            continue;
        }
        if (glob.startsWith('-', i + 1)) {
            rangeStart = c;
            i += 2;
            continue;
        }
        // not the start of a range, just a single character
        ranges.push(braceEscape(c));
        i++;
    }
    if (endPos < i) {
        // didn't see the end of the class, not a valid class,
        // but might still be valid as a literal match.
        return ['', false, 0, false];
    }
    // if we got no ranges and no negates, then we have a range that
    // cannot possibly match anything, and that poisons the whole glob
    if (!ranges.length && !negs.length) {
        return ['$.', false, glob.length - pos, true];
    }
    // if we got one positive range, and it's a single character, then that's
    // not actually a magic pattern, it's just that one literal character.
    // we should not treat that as "magic", we should just return the literal
    // character. [_] is a perfectly valid way to escape glob magic chars.
    if (negs.length === 0 &&
        ranges.length === 1 &&
        /^\\?.$/.test(ranges[0]) &&
        !negate) {
        const r = ranges[0].length === 2 ? ranges[0].slice(-1) : ranges[0];
        return [regexpEscape(r), false, endPos - pos, false];
    }
    const sranges = '[' + (negate ? '^' : '') + rangesToString(ranges) + ']';
    const snegs = '[' + (negate ? '' : '^') + rangesToString(negs) + ']';
    const comb = ranges.length && negs.length
        ? '(' + sranges + '|' + snegs + ')'
        : ranges.length
            ? sranges
            : snegs;
    return [comb, uflag, endPos - pos, true];
};

/**
 * Un-escape a string that has been escaped with {@link escape}.
 *
 * If the {@link windowsPathsNoEscape} option is used, then square-brace
 * escapes are removed, but not backslash escapes.  For example, it will turn
 * the string `'[*]'` into `*`, but it will not turn `'\\*'` into `'*'`,
 * becuase `\` is a path separator in `windowsPathsNoEscape` mode.
 *
 * When `windowsPathsNoEscape` is not set, then both brace escapes and
 * backslash escapes are removed.
 *
 * Slashes (and backslashes in `windowsPathsNoEscape` mode) cannot be escaped
 * or unescaped.
 */
const unescape = (s, { windowsPathsNoEscape = false, } = {}) => {
    return windowsPathsNoEscape
        ? s.replace(/\[([^\/\\])\]/g, '$1')
        : s.replace(/((?!\\).|^)\[([^\/\\])\]/g, '$1$2').replace(/\\([^\/])/g, '$1');
};

// parse a single path portion
const types = new Set(['!', '?', '+', '*', '@']);
const isExtglobType = (c) => types.has(c);
// Patterns that get prepended to bind to the start of either the
// entire string, or just a single path portion, to prevent dots
// and/or traversal patterns, when needed.
// Exts don't need the ^ or / bit, because the root binds that already.
const startNoTraversal = '(?!(?:^|/)\\.\\.?(?:$|/))';
const startNoDot = '(?!\\.)';
// characters that indicate a start of pattern needs the "no dots" bit,
// because a dot *might* be matched. ( is not in the list, because in
// the case of a child extglob, it will handle the prevention itself.
const addPatternStart = new Set(['[', '.']);
// cases where traversal is A-OK, no dot prevention needed
const justDots = new Set(['..', '.']);
const reSpecials = new Set('().*{}+?[]^$\\!');
const regExpEscape$1 = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
// any single thing other than /
const qmark$1 = '[^/]';
// * => any number of characters
const star$1 = qmark$1 + '*?';
// use + when we need to ensure that *something* matches, because the * is
// the only thing in the path portion.
const starNoEmpty = qmark$1 + '+?';
// remove the \ chars that we added if we end up doing a nonmagic compare
// const deslash = (s: string) => s.replace(/\\(.)/g, '$1')
class AST {
    type;
    #root;
    #hasMagic;
    #uflag = false;
    #parts = [];
    #parent;
    #parentIndex;
    #negs;
    #filledNegs = false;
    #options;
    #toString;
    // set to true if it's an extglob with no children
    // (which really means one child of '')
    #emptyExt = false;
    constructor(type, parent, options = {}) {
        this.type = type;
        // extglobs are inherently magical
        if (type)
            this.#hasMagic = true;
        this.#parent = parent;
        this.#root = this.#parent ? this.#parent.#root : this;
        this.#options = this.#root === this ? options : this.#root.#options;
        this.#negs = this.#root === this ? [] : this.#root.#negs;
        if (type === '!' && !this.#root.#filledNegs)
            this.#negs.push(this);
        this.#parentIndex = this.#parent ? this.#parent.#parts.length : 0;
    }
    get hasMagic() {
        /* c8 ignore start */
        if (this.#hasMagic !== undefined)
            return this.#hasMagic;
        /* c8 ignore stop */
        for (const p of this.#parts) {
            if (typeof p === 'string')
                continue;
            if (p.type || p.hasMagic)
                return (this.#hasMagic = true);
        }
        // note: will be undefined until we generate the regexp src and find out
        return this.#hasMagic;
    }
    // reconstructs the pattern
    toString() {
        if (this.#toString !== undefined)
            return this.#toString;
        if (!this.type) {
            return (this.#toString = this.#parts.map(p => String(p)).join(''));
        }
        else {
            return (this.#toString =
                this.type + '(' + this.#parts.map(p => String(p)).join('|') + ')');
        }
    }
    #fillNegs() {
        /* c8 ignore start */
        if (this !== this.#root)
            throw new Error('should only call on root');
        if (this.#filledNegs)
            return this;
        /* c8 ignore stop */
        // call toString() once to fill this out
        this.toString();
        this.#filledNegs = true;
        let n;
        while ((n = this.#negs.pop())) {
            if (n.type !== '!')
                continue;
            // walk up the tree, appending everthing that comes AFTER parentIndex
            let p = n;
            let pp = p.#parent;
            while (pp) {
                for (let i = p.#parentIndex + 1; !pp.type && i < pp.#parts.length; i++) {
                    for (const part of n.#parts) {
                        /* c8 ignore start */
                        if (typeof part === 'string') {
                            throw new Error('string part in extglob AST??');
                        }
                        /* c8 ignore stop */
                        part.copyIn(pp.#parts[i]);
                    }
                }
                p = pp;
                pp = p.#parent;
            }
        }
        return this;
    }
    push(...parts) {
        for (const p of parts) {
            if (p === '')
                continue;
            /* c8 ignore start */
            if (typeof p !== 'string' && !(p instanceof AST && p.#parent === this)) {
                throw new Error('invalid part: ' + p);
            }
            /* c8 ignore stop */
            this.#parts.push(p);
        }
    }
    toJSON() {
        const ret = this.type === null
            ? this.#parts.slice().map(p => (typeof p === 'string' ? p : p.toJSON()))
            : [this.type, ...this.#parts.map(p => p.toJSON())];
        if (this.isStart() && !this.type)
            ret.unshift([]);
        if (this.isEnd() &&
            (this === this.#root ||
                (this.#root.#filledNegs && this.#parent?.type === '!'))) {
            ret.push({});
        }
        return ret;
    }
    isStart() {
        if (this.#root === this)
            return true;
        // if (this.type) return !!this.#parent?.isStart()
        if (!this.#parent?.isStart())
            return false;
        if (this.#parentIndex === 0)
            return true;
        // if everything AHEAD of this is a negation, then it's still the "start"
        const p = this.#parent;
        for (let i = 0; i < this.#parentIndex; i++) {
            const pp = p.#parts[i];
            if (!(pp instanceof AST && pp.type === '!')) {
                return false;
            }
        }
        return true;
    }
    isEnd() {
        if (this.#root === this)
            return true;
        if (this.#parent?.type === '!')
            return true;
        if (!this.#parent?.isEnd())
            return false;
        if (!this.type)
            return this.#parent?.isEnd();
        // if not root, it'll always have a parent
        /* c8 ignore start */
        const pl = this.#parent ? this.#parent.#parts.length : 0;
        /* c8 ignore stop */
        return this.#parentIndex === pl - 1;
    }
    copyIn(part) {
        if (typeof part === 'string')
            this.push(part);
        else
            this.push(part.clone(this));
    }
    clone(parent) {
        const c = new AST(this.type, parent);
        for (const p of this.#parts) {
            c.copyIn(p);
        }
        return c;
    }
    static #parseAST(str, ast, pos, opt) {
        let escaping = false;
        let inBrace = false;
        let braceStart = -1;
        let braceNeg = false;
        if (ast.type === null) {
            // outside of a extglob, append until we find a start
            let i = pos;
            let acc = '';
            while (i < str.length) {
                const c = str.charAt(i++);
                // still accumulate escapes at this point, but we do ignore
                // starts that are escaped
                if (escaping || c === '\\') {
                    escaping = !escaping;
                    acc += c;
                    continue;
                }
                if (inBrace) {
                    if (i === braceStart + 1) {
                        if (c === '^' || c === '!') {
                            braceNeg = true;
                        }
                    }
                    else if (c === ']' && !(i === braceStart + 2 && braceNeg)) {
                        inBrace = false;
                    }
                    acc += c;
                    continue;
                }
                else if (c === '[') {
                    inBrace = true;
                    braceStart = i;
                    braceNeg = false;
                    acc += c;
                    continue;
                }
                if (!opt.noext && isExtglobType(c) && str.charAt(i) === '(') {
                    ast.push(acc);
                    acc = '';
                    const ext = new AST(c, ast);
                    i = AST.#parseAST(str, ext, i, opt);
                    ast.push(ext);
                    continue;
                }
                acc += c;
            }
            ast.push(acc);
            return i;
        }
        // some kind of extglob, pos is at the (
        // find the next | or )
        let i = pos + 1;
        let part = new AST(null, ast);
        const parts = [];
        let acc = '';
        while (i < str.length) {
            const c = str.charAt(i++);
            // still accumulate escapes at this point, but we do ignore
            // starts that are escaped
            if (escaping || c === '\\') {
                escaping = !escaping;
                acc += c;
                continue;
            }
            if (inBrace) {
                if (i === braceStart + 1) {
                    if (c === '^' || c === '!') {
                        braceNeg = true;
                    }
                }
                else if (c === ']' && !(i === braceStart + 2 && braceNeg)) {
                    inBrace = false;
                }
                acc += c;
                continue;
            }
            else if (c === '[') {
                inBrace = true;
                braceStart = i;
                braceNeg = false;
                acc += c;
                continue;
            }
            if (isExtglobType(c) && str.charAt(i) === '(') {
                part.push(acc);
                acc = '';
                const ext = new AST(c, part);
                part.push(ext);
                i = AST.#parseAST(str, ext, i, opt);
                continue;
            }
            if (c === '|') {
                part.push(acc);
                acc = '';
                parts.push(part);
                part = new AST(null, ast);
                continue;
            }
            if (c === ')') {
                if (acc === '' && ast.#parts.length === 0) {
                    ast.#emptyExt = true;
                }
                part.push(acc);
                acc = '';
                ast.push(...parts, part);
                return i;
            }
            acc += c;
        }
        // unfinished extglob
        // if we got here, it was a malformed extglob! not an extglob, but
        // maybe something else in there.
        ast.type = null;
        ast.#hasMagic = undefined;
        ast.#parts = [str.substring(pos - 1)];
        return i;
    }
    static fromGlob(pattern, options = {}) {
        const ast = new AST(null, undefined, options);
        AST.#parseAST(pattern, ast, 0, options);
        return ast;
    }
    // returns the regular expression if there's magic, or the unescaped
    // string if not.
    toMMPattern() {
        // should only be called on root
        /* c8 ignore start */
        if (this !== this.#root)
            return this.#root.toMMPattern();
        /* c8 ignore stop */
        const glob = this.toString();
        const [re, body, hasMagic, uflag] = this.toRegExpSource();
        // if we're in nocase mode, and not nocaseMagicOnly, then we do
        // still need a regular expression if we have to case-insensitively
        // match capital/lowercase characters.
        const anyMagic = hasMagic ||
            this.#hasMagic ||
            (this.#options.nocase &&
                !this.#options.nocaseMagicOnly &&
                glob.toUpperCase() !== glob.toLowerCase());
        if (!anyMagic) {
            return body;
        }
        const flags = (this.#options.nocase ? 'i' : '') + (uflag ? 'u' : '');
        return Object.assign(new RegExp(`^${re}$`, flags), {
            _src: re,
            _glob: glob,
        });
    }
    get options() {
        return this.#options;
    }
    // returns the string match, the regexp source, whether there's magic
    // in the regexp (so a regular expression is required) and whether or
    // not the uflag is needed for the regular expression (for posix classes)
    // TODO: instead of injecting the start/end at this point, just return
    // the BODY of the regexp, along with the start/end portions suitable
    // for binding the start/end in either a joined full-path makeRe context
    // (where we bind to (^|/), or a standalone matchPart context (where
    // we bind to ^, and not /).  Otherwise slashes get duped!
    //
    // In part-matching mode, the start is:
    // - if not isStart: nothing
    // - if traversal possible, but not allowed: ^(?!\.\.?$)
    // - if dots allowed or not possible: ^
    // - if dots possible and not allowed: ^(?!\.)
    // end is:
    // - if not isEnd(): nothing
    // - else: $
    //
    // In full-path matching mode, we put the slash at the START of the
    // pattern, so start is:
    // - if first pattern: same as part-matching mode
    // - if not isStart(): nothing
    // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
    // - if dots allowed or not possible: /
    // - if dots possible and not allowed: /(?!\.)
    // end is:
    // - if last pattern, same as part-matching mode
    // - else nothing
    //
    // Always put the (?:$|/) on negated tails, though, because that has to be
    // there to bind the end of the negated pattern portion, and it's easier to
    // just stick it in now rather than try to inject it later in the middle of
    // the pattern.
    //
    // We can just always return the same end, and leave it up to the caller
    // to know whether it's going to be used joined or in parts.
    // And, if the start is adjusted slightly, can do the same there:
    // - if not isStart: nothing
    // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
    // - if dots allowed or not possible: (?:/|^)
    // - if dots possible and not allowed: (?:/|^)(?!\.)
    //
    // But it's better to have a simpler binding without a conditional, for
    // performance, so probably better to return both start options.
    //
    // Then the caller just ignores the end if it's not the first pattern,
    // and the start always gets applied.
    //
    // But that's always going to be $ if it's the ending pattern, or nothing,
    // so the caller can just attach $ at the end of the pattern when building.
    //
    // So the todo is:
    // - better detect what kind of start is needed
    // - return both flavors of starting pattern
    // - attach $ at the end of the pattern when creating the actual RegExp
    //
    // Ah, but wait, no, that all only applies to the root when the first pattern
    // is not an extglob. If the first pattern IS an extglob, then we need all
    // that dot prevention biz to live in the extglob portions, because eg
    // +(*|.x*) can match .xy but not .yx.
    //
    // So, return the two flavors if it's #root and the first child is not an
    // AST, otherwise leave it to the child AST to handle it, and there,
    // use the (?:^|/) style of start binding.
    //
    // Even simplified further:
    // - Since the start for a join is eg /(?!\.) and the start for a part
    // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
    // or start or whatever) and prepend ^ or / at the Regexp construction.
    toRegExpSource(allowDot) {
        const dot = allowDot ?? !!this.#options.dot;
        if (this.#root === this)
            this.#fillNegs();
        if (!this.type) {
            const noEmpty = this.isStart() && this.isEnd();
            const src = this.#parts
                .map(p => {
                const [re, _, hasMagic, uflag] = typeof p === 'string'
                    ? AST.#parseGlob(p, this.#hasMagic, noEmpty)
                    : p.toRegExpSource(allowDot);
                this.#hasMagic = this.#hasMagic || hasMagic;
                this.#uflag = this.#uflag || uflag;
                return re;
            })
                .join('');
            let start = '';
            if (this.isStart()) {
                if (typeof this.#parts[0] === 'string') {
                    // this is the string that will match the start of the pattern,
                    // so we need to protect against dots and such.
                    // '.' and '..' cannot match unless the pattern is that exactly,
                    // even if it starts with . or dot:true is set.
                    const dotTravAllowed = this.#parts.length === 1 && justDots.has(this.#parts[0]);
                    if (!dotTravAllowed) {
                        const aps = addPatternStart;
                        // check if we have a possibility of matching . or ..,
                        // and prevent that.
                        const needNoTrav = 
                        // dots are allowed, and the pattern starts with [ or .
                        (dot && aps.has(src.charAt(0))) ||
                            // the pattern starts with \., and then [ or .
                            (src.startsWith('\\.') && aps.has(src.charAt(2))) ||
                            // the pattern starts with \.\., and then [ or .
                            (src.startsWith('\\.\\.') && aps.has(src.charAt(4)));
                        // no need to prevent dots if it can't match a dot, or if a
                        // sub-pattern will be preventing it anyway.
                        const needNoDot = !dot && !allowDot && aps.has(src.charAt(0));
                        start = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : '';
                    }
                }
            }
            // append the "end of path portion" pattern to negation tails
            let end = '';
            if (this.isEnd() &&
                this.#root.#filledNegs &&
                this.#parent?.type === '!') {
                end = '(?:$|\\/)';
            }
            const final = start + src + end;
            return [
                final,
                unescape(src),
                (this.#hasMagic = !!this.#hasMagic),
                this.#uflag,
            ];
        }
        // We need to calculate the body *twice* if it's a repeat pattern
        // at the start, once in nodot mode, then again in dot mode, so a
        // pattern like *(?) can match 'x.y'
        const repeated = this.type === '*' || this.type === '+';
        // some kind of extglob
        const start = this.type === '!' ? '(?:(?!(?:' : '(?:';
        let body = this.#partsToRegExp(dot);
        if (this.isStart() && this.isEnd() && !body && this.type !== '!') {
            // invalid extglob, has to at least be *something* present, if it's
            // the entire path portion.
            const s = this.toString();
            this.#parts = [s];
            this.type = null;
            this.#hasMagic = undefined;
            return [s, unescape(this.toString()), false, false];
        }
        // XXX abstract out this map method
        let bodyDotAllowed = !repeated || allowDot || dot || false
            ? ''
            : this.#partsToRegExp(true);
        if (bodyDotAllowed === body) {
            bodyDotAllowed = '';
        }
        if (bodyDotAllowed) {
            body = `(?:${body})(?:${bodyDotAllowed})*?`;
        }
        // an empty !() is exactly equivalent to a starNoEmpty
        let final = '';
        if (this.type === '!' && this.#emptyExt) {
            final = (this.isStart() && !dot ? startNoDot : '') + starNoEmpty;
        }
        else {
            const close = this.type === '!'
                ? // !() must match something,but !(x) can match ''
                    '))' +
                        (this.isStart() && !dot && !allowDot ? startNoDot : '') +
                        star$1 +
                        ')'
                : this.type === '@'
                    ? ')'
                    : this.type === '?'
                        ? ')?'
                        : this.type === '+' && bodyDotAllowed
                            ? ')'
                            : this.type === '*' && bodyDotAllowed
                                ? `)?`
                                : `)${this.type}`;
            final = start + body + close;
        }
        return [
            final,
            unescape(body),
            (this.#hasMagic = !!this.#hasMagic),
            this.#uflag,
        ];
    }
    #partsToRegExp(dot) {
        return this.#parts
            .map(p => {
            // extglob ASTs should only contain parent ASTs
            /* c8 ignore start */
            if (typeof p === 'string') {
                throw new Error('string type in extglob ast??');
            }
            /* c8 ignore stop */
            // can ignore hasMagic, because extglobs are already always magic
            const [re, _, _hasMagic, uflag] = p.toRegExpSource(dot);
            this.#uflag = this.#uflag || uflag;
            return re;
        })
            .filter(p => !(this.isStart() && this.isEnd()) || !!p)
            .join('|');
    }
    static #parseGlob(glob, hasMagic, noEmpty = false) {
        let escaping = false;
        let re = '';
        let uflag = false;
        for (let i = 0; i < glob.length; i++) {
            const c = glob.charAt(i);
            if (escaping) {
                escaping = false;
                re += (reSpecials.has(c) ? '\\' : '') + c;
                continue;
            }
            if (c === '\\') {
                if (i === glob.length - 1) {
                    re += '\\\\';
                }
                else {
                    escaping = true;
                }
                continue;
            }
            if (c === '[') {
                const [src, needUflag, consumed, magic] = parseClass(glob, i);
                if (consumed) {
                    re += src;
                    uflag = uflag || needUflag;
                    i += consumed - 1;
                    hasMagic = hasMagic || magic;
                    continue;
                }
            }
            if (c === '*') {
                if (noEmpty && glob === '*')
                    re += starNoEmpty;
                else
                    re += star$1;
                hasMagic = true;
                continue;
            }
            if (c === '?') {
                re += qmark$1;
                hasMagic = true;
                continue;
            }
            re += regExpEscape$1(c);
        }
        return [re, unescape(glob), !!hasMagic, uflag];
    }
}

/**
 * Escape all magic characters in a glob pattern.
 *
 * If the {@link windowsPathsNoEscape | GlobOptions.windowsPathsNoEscape}
 * option is used, then characters are escaped by wrapping in `[]`, because
 * a magic character wrapped in a character class can only be satisfied by
 * that exact character.  In this mode, `\` is _not_ escaped, because it is
 * not interpreted as a magic character, but instead as a path separator.
 */
const escape = (s, { windowsPathsNoEscape = false, } = {}) => {
    // don't need to escape +@! because we escape the parens
    // that make those magic, and escaping ! as [!] isn't valid,
    // because [!]] is a valid glob class meaning not ']'.
    return windowsPathsNoEscape
        ? s.replace(/[?*()[\]]/g, '[$&]')
        : s.replace(/[?*()[\]\\]/g, '\\$&');
};

const minimatch$1 = (p, pattern, options = {}) => {
    assertValidPattern(pattern);
    // shortcut: comments match nothing.
    if (!options.nocomment && pattern.charAt(0) === '#') {
        return false;
    }
    return new Minimatch(pattern, options).match(p);
};
// Optimized checking for the most common glob patterns.
const starDotExtRE = /^\*+([^+@!?\*\[\(]*)$/;
const starDotExtTest = (ext) => (f) => !f.startsWith('.') && f.endsWith(ext);
const starDotExtTestDot = (ext) => (f) => f.endsWith(ext);
const starDotExtTestNocase = (ext) => {
    ext = ext.toLowerCase();
    return (f) => !f.startsWith('.') && f.toLowerCase().endsWith(ext);
};
const starDotExtTestNocaseDot = (ext) => {
    ext = ext.toLowerCase();
    return (f) => f.toLowerCase().endsWith(ext);
};
const starDotStarRE = /^\*+\.\*+$/;
const starDotStarTest = (f) => !f.startsWith('.') && f.includes('.');
const starDotStarTestDot = (f) => f !== '.' && f !== '..' && f.includes('.');
const dotStarRE = /^\.\*+$/;
const dotStarTest = (f) => f !== '.' && f !== '..' && f.startsWith('.');
const starRE = /^\*+$/;
const starTest = (f) => f.length !== 0 && !f.startsWith('.');
const starTestDot = (f) => f.length !== 0 && f !== '.' && f !== '..';
const qmarksRE = /^\?+([^+@!?\*\[\(]*)?$/;
const qmarksTestNocase = ([$0, ext = '']) => {
    const noext = qmarksTestNoExt([$0]);
    if (!ext)
        return noext;
    ext = ext.toLowerCase();
    return (f) => noext(f) && f.toLowerCase().endsWith(ext);
};
const qmarksTestNocaseDot = ([$0, ext = '']) => {
    const noext = qmarksTestNoExtDot([$0]);
    if (!ext)
        return noext;
    ext = ext.toLowerCase();
    return (f) => noext(f) && f.toLowerCase().endsWith(ext);
};
const qmarksTestDot = ([$0, ext = '']) => {
    const noext = qmarksTestNoExtDot([$0]);
    return !ext ? noext : (f) => noext(f) && f.endsWith(ext);
};
const qmarksTest = ([$0, ext = '']) => {
    const noext = qmarksTestNoExt([$0]);
    return !ext ? noext : (f) => noext(f) && f.endsWith(ext);
};
const qmarksTestNoExt = ([$0]) => {
    const len = $0.length;
    return (f) => f.length === len && !f.startsWith('.');
};
const qmarksTestNoExtDot = ([$0]) => {
    const len = $0.length;
    return (f) => f.length === len && f !== '.' && f !== '..';
};
/* c8 ignore start */
const defaultPlatform = (typeof process === 'object' && process
    ? (typeof process.env === 'object' &&
        process.env &&
        process.env.__MINIMATCH_TESTING_PLATFORM__) ||
        process.platform
    : 'posix');
const path = {
    win32: { sep: '\\' },
    posix: { sep: '/' },
};
/* c8 ignore stop */
const sep = defaultPlatform === 'win32' ? path.win32.sep : path.posix.sep;
minimatch$1.sep = sep;
const GLOBSTAR = Symbol('globstar **');
minimatch$1.GLOBSTAR = GLOBSTAR;
// any single thing other than /
// don't need to escape / when using new RegExp()
const qmark = '[^/]';
// * => any number of characters
const star = qmark + '*?';
// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
const twoStarDot = '(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?';
// not a ^ or / followed by a dot,
// followed by anything, any number of times.
const twoStarNoDot = '(?:(?!(?:\\/|^)\\.).)*?';
const filter = (pattern, options = {}) => (p) => minimatch$1(p, pattern, options);
minimatch$1.filter = filter;
const ext = (a, b = {}) => Object.assign({}, a, b);
const defaults = (def) => {
    if (!def || typeof def !== 'object' || !Object.keys(def).length) {
        return minimatch$1;
    }
    const orig = minimatch$1;
    const m = (p, pattern, options = {}) => orig(p, pattern, ext(def, options));
    return Object.assign(m, {
        Minimatch: class Minimatch extends orig.Minimatch {
            constructor(pattern, options = {}) {
                super(pattern, ext(def, options));
            }
            static defaults(options) {
                return orig.defaults(ext(def, options)).Minimatch;
            }
        },
        AST: class AST extends orig.AST {
            /* c8 ignore start */
            constructor(type, parent, options = {}) {
                super(type, parent, ext(def, options));
            }
            /* c8 ignore stop */
            static fromGlob(pattern, options = {}) {
                return orig.AST.fromGlob(pattern, ext(def, options));
            }
        },
        unescape: (s, options = {}) => orig.unescape(s, ext(def, options)),
        escape: (s, options = {}) => orig.escape(s, ext(def, options)),
        filter: (pattern, options = {}) => orig.filter(pattern, ext(def, options)),
        defaults: (options) => orig.defaults(ext(def, options)),
        makeRe: (pattern, options = {}) => orig.makeRe(pattern, ext(def, options)),
        braceExpand: (pattern, options = {}) => orig.braceExpand(pattern, ext(def, options)),
        match: (list, pattern, options = {}) => orig.match(list, pattern, ext(def, options)),
        sep: orig.sep,
        GLOBSTAR: GLOBSTAR,
    });
};
minimatch$1.defaults = defaults;
// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
const braceExpand = (pattern, options = {}) => {
    assertValidPattern(pattern);
    // Thanks to Yeting Li <https://github.com/yetingli> for
    // improving this regexp to avoid a ReDOS vulnerability.
    if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
        // shortcut. no need to expand.
        return [pattern];
    }
    return expand(pattern);
};
minimatch$1.braceExpand = braceExpand;
// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
const makeRe = (pattern, options = {}) => new Minimatch(pattern, options).makeRe();
minimatch$1.makeRe = makeRe;
const match = (list, pattern, options = {}) => {
    const mm = new Minimatch(pattern, options);
    list = list.filter(f => mm.match(f));
    if (mm.options.nonull && !list.length) {
        list.push(pattern);
    }
    return list;
};
minimatch$1.match = match;
// replace stuff like \* with *
const globMagic = /[?*]|[+@!]\(.*?\)|\[|\]/;
const regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
class Minimatch {
    options;
    set;
    pattern;
    windowsPathsNoEscape;
    nonegate;
    negate;
    comment;
    empty;
    preserveMultipleSlashes;
    partial;
    globSet;
    globParts;
    nocase;
    isWindows;
    platform;
    windowsNoMagicRoot;
    regexp;
    constructor(pattern, options = {}) {
        assertValidPattern(pattern);
        options = options || {};
        this.options = options;
        this.pattern = pattern;
        this.platform = options.platform || defaultPlatform;
        this.isWindows = this.platform === 'win32';
        this.windowsPathsNoEscape =
            !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
        if (this.windowsPathsNoEscape) {
            this.pattern = this.pattern.replace(/\\/g, '/');
        }
        this.preserveMultipleSlashes = !!options.preserveMultipleSlashes;
        this.regexp = null;
        this.negate = false;
        this.nonegate = !!options.nonegate;
        this.comment = false;
        this.empty = false;
        this.partial = !!options.partial;
        this.nocase = !!this.options.nocase;
        this.windowsNoMagicRoot =
            options.windowsNoMagicRoot !== undefined
                ? options.windowsNoMagicRoot
                : !!(this.isWindows && this.nocase);
        this.globSet = [];
        this.globParts = [];
        this.set = [];
        // make the set of regexps etc.
        this.make();
    }
    hasMagic() {
        if (this.options.magicalBraces && this.set.length > 1) {
            return true;
        }
        for (const pattern of this.set) {
            for (const part of pattern) {
                if (typeof part !== 'string')
                    return true;
            }
        }
        return false;
    }
    debug(..._) { }
    make() {
        const pattern = this.pattern;
        const options = this.options;
        // empty patterns and comments match nothing.
        if (!options.nocomment && pattern.charAt(0) === '#') {
            this.comment = true;
            return;
        }
        if (!pattern) {
            this.empty = true;
            return;
        }
        // step 1: figure out negation, etc.
        this.parseNegate();
        // step 2: expand braces
        this.globSet = [...new Set(this.braceExpand())];
        if (options.debug) {
            this.debug = (...args) => console.error(...args);
        }
        this.debug(this.pattern, this.globSet);
        // step 3: now we have a set, so turn each one into a series of
        // path-portion matching patterns.
        // These will be regexps, except in the case of "**", which is
        // set to the GLOBSTAR object for globstar behavior,
        // and will not contain any / characters
        //
        // First, we preprocess to make the glob pattern sets a bit simpler
        // and deduped.  There are some perf-killing patterns that can cause
        // problems with a glob walk, but we can simplify them down a bit.
        const rawGlobParts = this.globSet.map(s => this.slashSplit(s));
        this.globParts = this.preprocess(rawGlobParts);
        this.debug(this.pattern, this.globParts);
        // glob --> regexps
        let set = this.globParts.map((s, _, __) => {
            if (this.isWindows && this.windowsNoMagicRoot) {
                // check if it's a drive or unc path.
                const isUNC = s[0] === '' &&
                    s[1] === '' &&
                    (s[2] === '?' || !globMagic.test(s[2])) &&
                    !globMagic.test(s[3]);
                const isDrive = /^[a-z]:/i.test(s[0]);
                if (isUNC) {
                    return [...s.slice(0, 4), ...s.slice(4).map(ss => this.parse(ss))];
                }
                else if (isDrive) {
                    return [s[0], ...s.slice(1).map(ss => this.parse(ss))];
                }
            }
            return s.map(ss => this.parse(ss));
        });
        this.debug(this.pattern, set);
        // filter out everything that didn't compile properly.
        this.set = set.filter(s => s.indexOf(false) === -1);
        // do not treat the ? in UNC paths as magic
        if (this.isWindows) {
            for (let i = 0; i < this.set.length; i++) {
                const p = this.set[i];
                if (p[0] === '' &&
                    p[1] === '' &&
                    this.globParts[i][2] === '?' &&
                    typeof p[3] === 'string' &&
                    /^[a-z]:$/i.test(p[3])) {
                    p[2] = '?';
                }
            }
        }
        this.debug(this.pattern, this.set);
    }
    // various transforms to equivalent pattern sets that are
    // faster to process in a filesystem walk.  The goal is to
    // eliminate what we can, and push all ** patterns as far
    // to the right as possible, even if it increases the number
    // of patterns that we have to process.
    preprocess(globParts) {
        // if we're not in globstar mode, then turn all ** into *
        if (this.options.noglobstar) {
            for (let i = 0; i < globParts.length; i++) {
                for (let j = 0; j < globParts[i].length; j++) {
                    if (globParts[i][j] === '**') {
                        globParts[i][j] = '*';
                    }
                }
            }
        }
        const { optimizationLevel = 1 } = this.options;
        if (optimizationLevel >= 2) {
            // aggressive optimization for the purpose of fs walking
            globParts = this.firstPhasePreProcess(globParts);
            globParts = this.secondPhasePreProcess(globParts);
        }
        else if (optimizationLevel >= 1) {
            // just basic optimizations to remove some .. parts
            globParts = this.levelOneOptimize(globParts);
        }
        else {
            // just collapse multiple ** portions into one
            globParts = this.adjascentGlobstarOptimize(globParts);
        }
        return globParts;
    }
    // just get rid of adjascent ** portions
    adjascentGlobstarOptimize(globParts) {
        return globParts.map(parts => {
            let gs = -1;
            while (-1 !== (gs = parts.indexOf('**', gs + 1))) {
                let i = gs;
                while (parts[i + 1] === '**') {
                    i++;
                }
                if (i !== gs) {
                    parts.splice(gs, i - gs);
                }
            }
            return parts;
        });
    }
    // get rid of adjascent ** and resolve .. portions
    levelOneOptimize(globParts) {
        return globParts.map(parts => {
            parts = parts.reduce((set, part) => {
                const prev = set[set.length - 1];
                if (part === '**' && prev === '**') {
                    return set;
                }
                if (part === '..') {
                    if (prev && prev !== '..' && prev !== '.' && prev !== '**') {
                        set.pop();
                        return set;
                    }
                }
                set.push(part);
                return set;
            }, []);
            return parts.length === 0 ? [''] : parts;
        });
    }
    levelTwoFileOptimize(parts) {
        if (!Array.isArray(parts)) {
            parts = this.slashSplit(parts);
        }
        let didSomething = false;
        do {
            didSomething = false;
            // <pre>/<e>/<rest> -> <pre>/<rest>
            if (!this.preserveMultipleSlashes) {
                for (let i = 1; i < parts.length - 1; i++) {
                    const p = parts[i];
                    // don't squeeze out UNC patterns
                    if (i === 1 && p === '' && parts[0] === '')
                        continue;
                    if (p === '.' || p === '') {
                        didSomething = true;
                        parts.splice(i, 1);
                        i--;
                    }
                }
                if (parts[0] === '.' &&
                    parts.length === 2 &&
                    (parts[1] === '.' || parts[1] === '')) {
                    didSomething = true;
                    parts.pop();
                }
            }
            // <pre>/<p>/../<rest> -> <pre>/<rest>
            let dd = 0;
            while (-1 !== (dd = parts.indexOf('..', dd + 1))) {
                const p = parts[dd - 1];
                if (p && p !== '.' && p !== '..' && p !== '**') {
                    didSomething = true;
                    parts.splice(dd - 1, 2);
                    dd -= 2;
                }
            }
        } while (didSomething);
        return parts.length === 0 ? [''] : parts;
    }
    // First phase: single-pattern processing
    // <pre> is 1 or more portions
    // <rest> is 1 or more portions
    // <p> is any portion other than ., .., '', or **
    // <e> is . or ''
    //
    // **/.. is *brutal* for filesystem walking performance, because
    // it effectively resets the recursive walk each time it occurs,
    // and ** cannot be reduced out by a .. pattern part like a regexp
    // or most strings (other than .., ., and '') can be.
    //
    // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
    // <pre>/<e>/<rest> -> <pre>/<rest>
    // <pre>/<p>/../<rest> -> <pre>/<rest>
    // **/**/<rest> -> **/<rest>
    //
    // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
    // this WOULD be allowed if ** did follow symlinks, or * didn't
    firstPhasePreProcess(globParts) {
        let didSomething = false;
        do {
            didSomething = false;
            // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
            for (let parts of globParts) {
                let gs = -1;
                while (-1 !== (gs = parts.indexOf('**', gs + 1))) {
                    let gss = gs;
                    while (parts[gss + 1] === '**') {
                        // <pre>/**/**/<rest> -> <pre>/**/<rest>
                        gss++;
                    }
                    // eg, if gs is 2 and gss is 4, that means we have 3 **
                    // parts, and can remove 2 of them.
                    if (gss > gs) {
                        parts.splice(gs + 1, gss - gs);
                    }
                    let next = parts[gs + 1];
                    const p = parts[gs + 2];
                    const p2 = parts[gs + 3];
                    if (next !== '..')
                        continue;
                    if (!p ||
                        p === '.' ||
                        p === '..' ||
                        !p2 ||
                        p2 === '.' ||
                        p2 === '..') {
                        continue;
                    }
                    didSomething = true;
                    // edit parts in place, and push the new one
                    parts.splice(gs, 1);
                    const other = parts.slice(0);
                    other[gs] = '**';
                    globParts.push(other);
                    gs--;
                }
                // <pre>/<e>/<rest> -> <pre>/<rest>
                if (!this.preserveMultipleSlashes) {
                    for (let i = 1; i < parts.length - 1; i++) {
                        const p = parts[i];
                        // don't squeeze out UNC patterns
                        if (i === 1 && p === '' && parts[0] === '')
                            continue;
                        if (p === '.' || p === '') {
                            didSomething = true;
                            parts.splice(i, 1);
                            i--;
                        }
                    }
                    if (parts[0] === '.' &&
                        parts.length === 2 &&
                        (parts[1] === '.' || parts[1] === '')) {
                        didSomething = true;
                        parts.pop();
                    }
                }
                // <pre>/<p>/../<rest> -> <pre>/<rest>
                let dd = 0;
                while (-1 !== (dd = parts.indexOf('..', dd + 1))) {
                    const p = parts[dd - 1];
                    if (p && p !== '.' && p !== '..' && p !== '**') {
                        didSomething = true;
                        const needDot = dd === 1 && parts[dd + 1] === '**';
                        const splin = needDot ? ['.'] : [];
                        parts.splice(dd - 1, 2, ...splin);
                        if (parts.length === 0)
                            parts.push('');
                        dd -= 2;
                    }
                }
            }
        } while (didSomething);
        return globParts;
    }
    // second phase: multi-pattern dedupes
    // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
    // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
    // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
    //
    // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
    // ^-- not valid because ** doens't follow symlinks
    secondPhasePreProcess(globParts) {
        for (let i = 0; i < globParts.length - 1; i++) {
            for (let j = i + 1; j < globParts.length; j++) {
                const matched = this.partsMatch(globParts[i], globParts[j], !this.preserveMultipleSlashes);
                if (matched) {
                    globParts[i] = [];
                    globParts[j] = matched;
                    break;
                }
            }
        }
        return globParts.filter(gs => gs.length);
    }
    partsMatch(a, b, emptyGSMatch = false) {
        let ai = 0;
        let bi = 0;
        let result = [];
        let which = '';
        while (ai < a.length && bi < b.length) {
            if (a[ai] === b[bi]) {
                result.push(which === 'b' ? b[bi] : a[ai]);
                ai++;
                bi++;
            }
            else if (emptyGSMatch && a[ai] === '**' && b[bi] === a[ai + 1]) {
                result.push(a[ai]);
                ai++;
            }
            else if (emptyGSMatch && b[bi] === '**' && a[ai] === b[bi + 1]) {
                result.push(b[bi]);
                bi++;
            }
            else if (a[ai] === '*' &&
                b[bi] &&
                (this.options.dot || !b[bi].startsWith('.')) &&
                b[bi] !== '**') {
                if (which === 'b')
                    return false;
                which = 'a';
                result.push(a[ai]);
                ai++;
                bi++;
            }
            else if (b[bi] === '*' &&
                a[ai] &&
                (this.options.dot || !a[ai].startsWith('.')) &&
                a[ai] !== '**') {
                if (which === 'a')
                    return false;
                which = 'b';
                result.push(b[bi]);
                ai++;
                bi++;
            }
            else {
                return false;
            }
        }
        // if we fall out of the loop, it means they two are identical
        // as long as their lengths match
        return a.length === b.length && result;
    }
    parseNegate() {
        if (this.nonegate)
            return;
        const pattern = this.pattern;
        let negate = false;
        let negateOffset = 0;
        for (let i = 0; i < pattern.length && pattern.charAt(i) === '!'; i++) {
            negate = !negate;
            negateOffset++;
        }
        if (negateOffset)
            this.pattern = pattern.slice(negateOffset);
        this.negate = negate;
    }
    // set partial to true to test if, for example,
    // "/a/b" matches the start of "/*/b/*/d"
    // Partial means, if you run out of file before you run
    // out of pattern, then that's fine, as long as all
    // the parts match.
    matchOne(file, pattern, partial = false) {
        const options = this.options;
        // UNC paths like //?/X:/... can match X:/... and vice versa
        // Drive letters in absolute drive or unc paths are always compared
        // case-insensitively.
        if (this.isWindows) {
            const fileDrive = typeof file[0] === 'string' && /^[a-z]:$/i.test(file[0]);
            const fileUNC = !fileDrive &&
                file[0] === '' &&
                file[1] === '' &&
                file[2] === '?' &&
                /^[a-z]:$/i.test(file[3]);
            const patternDrive = typeof pattern[0] === 'string' && /^[a-z]:$/i.test(pattern[0]);
            const patternUNC = !patternDrive &&
                pattern[0] === '' &&
                pattern[1] === '' &&
                pattern[2] === '?' &&
                typeof pattern[3] === 'string' &&
                /^[a-z]:$/i.test(pattern[3]);
            const fdi = fileUNC ? 3 : fileDrive ? 0 : undefined;
            const pdi = patternUNC ? 3 : patternDrive ? 0 : undefined;
            if (typeof fdi === 'number' && typeof pdi === 'number') {
                const [fd, pd] = [file[fdi], pattern[pdi]];
                if (fd.toLowerCase() === pd.toLowerCase()) {
                    pattern[pdi] = fd;
                    if (pdi > fdi) {
                        pattern = pattern.slice(pdi);
                    }
                    else if (fdi > pdi) {
                        file = file.slice(fdi);
                    }
                }
            }
        }
        // resolve and reduce . and .. portions in the file as well.
        // dont' need to do the second phase, because it's only one string[]
        const { optimizationLevel = 1 } = this.options;
        if (optimizationLevel >= 2) {
            file = this.levelTwoFileOptimize(file);
        }
        this.debug('matchOne', this, { file, pattern });
        this.debug('matchOne', file.length, pattern.length);
        for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
            this.debug('matchOne loop');
            var p = pattern[pi];
            var f = file[fi];
            this.debug(pattern, p, f);
            // should be impossible.
            // some invalid regexp stuff in the set.
            /* c8 ignore start */
            if (p === false) {
                return false;
            }
            /* c8 ignore stop */
            if (p === GLOBSTAR) {
                this.debug('GLOBSTAR', [pattern, p, f]);
                // "**"
                // a/**/b/**/c would match the following:
                // a/b/x/y/z/c
                // a/x/y/z/b/c
                // a/b/x/b/x/c
                // a/b/c
                // To do this, take the rest of the pattern after
                // the **, and see if it would match the file remainder.
                // If so, return success.
                // If not, the ** "swallows" a segment, and try again.
                // This is recursively awful.
                //
                // a/**/b/**/c matching a/b/x/y/z/c
                // - a matches a
                // - doublestar
                //   - matchOne(b/x/y/z/c, b/**/c)
                //     - b matches b
                //     - doublestar
                //       - matchOne(x/y/z/c, c) -> no
                //       - matchOne(y/z/c, c) -> no
                //       - matchOne(z/c, c) -> no
                //       - matchOne(c, c) yes, hit
                var fr = fi;
                var pr = pi + 1;
                if (pr === pl) {
                    this.debug('** at the end');
                    // a ** at the end will just swallow the rest.
                    // We have found a match.
                    // however, it will not swallow /.x, unless
                    // options.dot is set.
                    // . and .. are *never* matched by **, for explosively
                    // exponential reasons.
                    for (; fi < fl; fi++) {
                        if (file[fi] === '.' ||
                            file[fi] === '..' ||
                            (!options.dot && file[fi].charAt(0) === '.'))
                            return false;
                    }
                    return true;
                }
                // ok, let's see if we can swallow whatever we can.
                while (fr < fl) {
                    var swallowee = file[fr];
                    this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);
                    // XXX remove this slice.  Just pass the start index.
                    if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
                        this.debug('globstar found match!', fr, fl, swallowee);
                        // found a match.
                        return true;
                    }
                    else {
                        // can't swallow "." or ".." ever.
                        // can only swallow ".foo" when explicitly asked.
                        if (swallowee === '.' ||
                            swallowee === '..' ||
                            (!options.dot && swallowee.charAt(0) === '.')) {
                            this.debug('dot detected!', file, fr, pattern, pr);
                            break;
                        }
                        // ** swallows a segment, and continue.
                        this.debug('globstar swallow a segment, and continue');
                        fr++;
                    }
                }
                // no match was found.
                // However, in partial mode, we can't say this is necessarily over.
                /* c8 ignore start */
                if (partial) {
                    // ran out of file
                    this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
                    if (fr === fl) {
                        return true;
                    }
                }
                /* c8 ignore stop */
                return false;
            }
            // something other than **
            // non-magic patterns just have to match exactly
            // patterns with magic have been turned into regexps.
            let hit;
            if (typeof p === 'string') {
                hit = f === p;
                this.debug('string match', p, f, hit);
            }
            else {
                hit = p.test(f);
                this.debug('pattern match', p, f, hit);
            }
            if (!hit)
                return false;
        }
        // Note: ending in / means that we'll get a final ""
        // at the end of the pattern.  This can only match a
        // corresponding "" at the end of the file.
        // If the file ends in /, then it can only match a
        // a pattern that ends in /, unless the pattern just
        // doesn't have any more for it. But, a/b/ should *not*
        // match "a/b/*", even though "" matches against the
        // [^/]*? pattern, except in partial mode, where it might
        // simply not be reached yet.
        // However, a/b/ should still satisfy a/*
        // now either we fell off the end of the pattern, or we're done.
        if (fi === fl && pi === pl) {
            // ran out of pattern and filename at the same time.
            // an exact hit!
            return true;
        }
        else if (fi === fl) {
            // ran out of file, but still had pattern left.
            // this is ok if we're doing the match as part of
            // a glob fs traversal.
            return partial;
        }
        else if (pi === pl) {
            // ran out of pattern, still have file left.
            // this is only acceptable if we're on the very last
            // empty segment of a file with a trailing slash.
            // a/* should match a/b/
            return fi === fl - 1 && file[fi] === '';
            /* c8 ignore start */
        }
        else {
            // should be unreachable.
            throw new Error('wtf?');
        }
        /* c8 ignore stop */
    }
    braceExpand() {
        return braceExpand(this.pattern, this.options);
    }
    parse(pattern) {
        assertValidPattern(pattern);
        const options = this.options;
        // shortcuts
        if (pattern === '**')
            return GLOBSTAR;
        if (pattern === '')
            return '';
        // far and away, the most common glob pattern parts are
        // *, *.*, and *.<ext>  Add a fast check method for those.
        let m;
        let fastTest = null;
        if ((m = pattern.match(starRE))) {
            fastTest = options.dot ? starTestDot : starTest;
        }
        else if ((m = pattern.match(starDotExtRE))) {
            fastTest = (options.nocase
                ? options.dot
                    ? starDotExtTestNocaseDot
                    : starDotExtTestNocase
                : options.dot
                    ? starDotExtTestDot
                    : starDotExtTest)(m[1]);
        }
        else if ((m = pattern.match(qmarksRE))) {
            fastTest = (options.nocase
                ? options.dot
                    ? qmarksTestNocaseDot
                    : qmarksTestNocase
                : options.dot
                    ? qmarksTestDot
                    : qmarksTest)(m);
        }
        else if ((m = pattern.match(starDotStarRE))) {
            fastTest = options.dot ? starDotStarTestDot : starDotStarTest;
        }
        else if ((m = pattern.match(dotStarRE))) {
            fastTest = dotStarTest;
        }
        const re = AST.fromGlob(pattern, this.options).toMMPattern();
        if (fastTest && typeof re === 'object') {
            // Avoids overriding in frozen environments
            Reflect.defineProperty(re, 'test', { value: fastTest });
        }
        return re;
    }
    makeRe() {
        if (this.regexp || this.regexp === false)
            return this.regexp;
        // at this point, this.set is a 2d array of partial
        // pattern strings, or "**".
        //
        // It's better to use .match().  This function shouldn't
        // be used, really, but it's pretty convenient sometimes,
        // when you just want to work with a regex.
        const set = this.set;
        if (!set.length) {
            this.regexp = false;
            return this.regexp;
        }
        const options = this.options;
        const twoStar = options.noglobstar
            ? star
            : options.dot
                ? twoStarDot
                : twoStarNoDot;
        const flags = new Set(options.nocase ? ['i'] : []);
        // regexpify non-globstar patterns
        // if ** is only item, then we just do one twoStar
        // if ** is first, and there are more, prepend (\/|twoStar\/)? to next
        // if ** is last, append (\/twoStar|) to previous
        // if ** is in the middle, append (\/|\/twoStar\/) to previous
        // then filter out GLOBSTAR symbols
        let re = set
            .map(pattern => {
            const pp = pattern.map(p => {
                if (p instanceof RegExp) {
                    for (const f of p.flags.split(''))
                        flags.add(f);
                }
                return typeof p === 'string'
                    ? regExpEscape(p)
                    : p === GLOBSTAR
                        ? GLOBSTAR
                        : p._src;
            });
            pp.forEach((p, i) => {
                const next = pp[i + 1];
                const prev = pp[i - 1];
                if (p !== GLOBSTAR || prev === GLOBSTAR) {
                    return;
                }
                if (prev === undefined) {
                    if (next !== undefined && next !== GLOBSTAR) {
                        pp[i + 1] = '(?:\\/|' + twoStar + '\\/)?' + next;
                    }
                    else {
                        pp[i] = twoStar;
                    }
                }
                else if (next === undefined) {
                    pp[i - 1] = prev + '(?:\\/|' + twoStar + ')?';
                }
                else if (next !== GLOBSTAR) {
                    pp[i - 1] = prev + '(?:\\/|\\/' + twoStar + '\\/)' + next;
                    pp[i + 1] = GLOBSTAR;
                }
            });
            return pp.filter(p => p !== GLOBSTAR).join('/');
        })
            .join('|');
        // need to wrap in parens if we had more than one thing with |,
        // otherwise only the first will be anchored to ^ and the last to $
        const [open, close] = set.length > 1 ? ['(?:', ')'] : ['', ''];
        // must match entire pattern
        // ending in a * or ** will make it less strict.
        re = '^' + open + re + close + '$';
        // can match anything, as long as it's not this.
        if (this.negate)
            re = '^(?!' + re + ').+$';
        try {
            this.regexp = new RegExp(re, [...flags].join(''));
            /* c8 ignore start */
        }
        catch (ex) {
            // should be impossible
            this.regexp = false;
        }
        /* c8 ignore stop */
        return this.regexp;
    }
    slashSplit(p) {
        // if p starts with // on windows, we preserve that
        // so that UNC paths aren't broken.  Otherwise, any number of
        // / characters are coalesced into one, unless
        // preserveMultipleSlashes is set to true.
        if (this.preserveMultipleSlashes) {
            return p.split('/');
        }
        else if (this.isWindows && /^\/\/[^\/]+/.test(p)) {
            // add an extra '' for the one we lose
            return ['', ...p.split(/\/+/)];
        }
        else {
            return p.split(/\/+/);
        }
    }
    match(f, partial = this.partial) {
        this.debug('match', f, this.pattern);
        // short-circuit in the case of busted things.
        // comments, etc.
        if (this.comment) {
            return false;
        }
        if (this.empty) {
            return f === '';
        }
        if (f === '/' && partial) {
            return true;
        }
        const options = this.options;
        // windows: need to use /, not \
        if (this.isWindows) {
            f = f.split('\\').join('/');
        }
        // treat the test path as a set of pathparts.
        const ff = this.slashSplit(f);
        this.debug(this.pattern, 'split', ff);
        // just ONE of the pattern sets in this.set needs to match
        // in order for it to be valid.  If negating, then just one
        // match means that we have failed.
        // Either way, return on the first hit.
        const set = this.set;
        this.debug(this.pattern, 'set', set);
        // Find the basename of the path by looking for the last non-empty segment
        let filename = ff[ff.length - 1];
        if (!filename) {
            for (let i = ff.length - 2; !filename && i >= 0; i--) {
                filename = ff[i];
            }
        }
        for (let i = 0; i < set.length; i++) {
            const pattern = set[i];
            let file = ff;
            if (options.matchBase && pattern.length === 1) {
                file = [filename];
            }
            const hit = this.matchOne(file, pattern, partial);
            if (hit) {
                if (options.flipNegate) {
                    return true;
                }
                return !this.negate;
            }
        }
        // didn't get any hits.  this is success if it's a negative
        // pattern, failure otherwise.
        if (options.flipNegate) {
            return false;
        }
        return this.negate;
    }
    static defaults(def) {
        return minimatch$1.defaults(def).Minimatch;
    }
}
/* c8 ignore stop */
minimatch$1.AST = AST;
minimatch$1.Minimatch = Minimatch;
minimatch$1.escape = escape;
minimatch$1.unescape = unescape;

const minimatchOpts = { dot: true, flipNegate: true };
const _matchInstances = /* @__PURE__ */ new Map();
function minimatch(file, pattern) {
  let m = _matchInstances.get(pattern);
  if (!m) {
    m = new Minimatch(pattern, minimatchOpts);
    _matchInstances.set(pattern, m);
  }
  return m.match(file);
}
function getMatchedGlobs(file, glob) {
  const globs = (Array.isArray(glob) ? glob : [glob]).flat();
  return globs.filter((glob2) => minimatch(file, glob2)).flat();
}
function matchFile(filepath, configs, basePath) {
  const result = {
    filepath,
    globs: [],
    configs: []
  };
  const {
    config: globalMatchedConfig = {},
    status: globalMatchStatus
  } = buildConfigArray(configs, basePath).getConfigWithStatus(filepath);
  configs.forEach((config) => {
    const positive = getMatchedGlobs(filepath, config.files || []);
    const negative = getMatchedGlobs(filepath, config.ignores || []);
    if (globalMatchStatus === "matched" && globalMatchedConfig.index?.includes(config.index) && positive.length > 0) {
      result.configs.push(config.index);
      result.globs.push(...positive);
    }
    result.globs.push(...negative);
  });
  result.globs = [...new Set(result.globs)];
  return result;
}
const NOOP_SCHEMA = {
  merge: "replace",
  validate() {
  }
};
const FLAT_CONFIG_NOOP_SCHEMA = {
  settings: NOOP_SCHEMA,
  linterOptions: NOOP_SCHEMA,
  language: NOOP_SCHEMA,
  languageOptions: NOOP_SCHEMA,
  processor: NOOP_SCHEMA,
  plugins: NOOP_SCHEMA,
  index: {
    ...NOOP_SCHEMA,
    // accumulate the matched config index to an array
    merge(v1, v2) {
      return [v1].concat(v2).flat();
    }
  },
  rules: NOOP_SCHEMA
};
function buildConfigArray(configs, basePath) {
  return new ConfigArray(configs, {
    basePath,
    schema: FLAT_CONFIG_NOOP_SCHEMA
  }).normalizeSync();
}

const configFilenames = [
  "eslint.config.js",
  "eslint.config.mjs",
  "eslint.config.cjs",
  "eslint.config.ts",
  "eslint.config.mts",
  "eslint.config.cts"
];
const legacyConfigFilenames = [
  ".eslintrc.js",
  ".eslintrc.cjs",
  ".eslintrc.yaml",
  ".eslintrc.yml",
  ".eslintrc.json"
];
const MARK_CHECK = c.green("\u2714");
const MARK_INFO = c.blue("\u2139");
const MARK_ERROR = c.red("\u2716");

class ConfigInspectorError extends Error {
  prettyPrint() {
    console.error(MARK_ERROR, this.message);
  }
}
class ConfigPathError extends ConfigInspectorError {
  constructor(basePath, configFilenames) {
    super("Cannot find ESLint config file");
    this.basePath = basePath;
    this.configFilenames = configFilenames;
  }
  name = "ConfigPathError";
  prettyPrint() {
    console.error(MARK_ERROR, this.message, c.dim(
      `

Looked in ${c.underline(this.basePath)} and parent folders for:

 * ${this.configFilenames.join("\n * ")}`
    ));
  }
}
class ConfigPathLegacyError extends ConfigInspectorError {
  constructor(basePath, configFilename) {
    super("Found ESLint legacy config file");
    this.basePath = basePath;
    this.configFilename = configFilename;
  }
  name = "ConfigPathLegacyError";
  prettyPrint() {
    console.error(MARK_ERROR, this.message, c.dim(
      `

Encountered unsupported legacy config ${c.underline(this.configFilename)} in ${c.underline(this.basePath)}

\`@eslint/config-inspector\` only works with the new flat config format:
https://eslint.org/docs/latest/use/configure/configuration-files-new`
    ));
  }
}

async function resolveConfigPath(options) {
  let {
    cwd,
    userConfigPath,
    userBasePath
  } = options;
  if (userBasePath)
    userBasePath = resolve$3(cwd, userBasePath);
  const lookupBasePath = userBasePath || cwd;
  let configPath = userConfigPath && resolve$3(cwd, userConfigPath);
  if (!configPath) {
    configPath = await findUp(configFilenames, { cwd: lookupBasePath });
  }
  if (!configPath) {
    const legacyConfigPath = await findUp(legacyConfigFilenames, { cwd: lookupBasePath });
    throw legacyConfigPath ? new ConfigPathLegacyError(
      `${relative$2(cwd, dirname$2(legacyConfigPath))}/`,
      basename$2(legacyConfigPath)
    ) : new ConfigPathError(
      `${relative$2(cwd, lookupBasePath)}/`,
      configFilenames
    );
  }
  const basePath = userBasePath || (userConfigPath ? cwd : dirname$2(configPath));
  return {
    basePath,
    configPath
  };
}
async function readConfig(options) {
  const {
    chdir = true,
    globMatchedFiles: globFiles = true
  } = options;
  const resolvedConfigPath = await resolveConfigPath(options);
  const { basePath, configPath } = resolvedConfigPath;
  if (chdir && basePath !== process$1.cwd())
    process$1.chdir(basePath);
  console.log(MARK_INFO, `Reading ESLint config from`, c.blue(configPath));
  const { mod, dependencies } = await bundleRequire({
    filepath: configPath,
    cwd: basePath,
    tsconfig: false
  });
  let rawConfigs = await (mod.default ?? mod);
  if (!Array.isArray(rawConfigs))
    rawConfigs = [rawConfigs];
  rawConfigs.unshift(
    {
      name: "eslint/defaults/languages",
      languageOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        parserOptions: {}
      },
      linterOptions: {
        reportUnusedDisableDirectives: 1
      }
    },
    {
      name: "eslint/defaults/ignores",
      ignores: [
        "**/node_modules/",
        ".git/"
      ]
    },
    {
      name: "eslint/defaults/files",
      files: ["**/*.js", "**/*.mjs"]
    },
    {
      name: "eslint/defaults/files-cjs",
      files: ["**/*.cjs"],
      languageOptions: {
        sourceType: "commonjs",
        ecmaVersion: "latest"
      }
    }
  );
  const rulesMap = /* @__PURE__ */ new Map();
  const eslintPath = await resolve$2("eslint/use-at-your-own-risk", { url: basePath }).catch(() => null) || "eslint/use-at-your-own-risk";
  const eslintRules = await import(eslintPath).then((r) => r.default.builtinRules);
  for (const [name, rule] of eslintRules.entries()) {
    rulesMap.set(name, {
      ...rule.meta,
      name,
      plugin: "eslint",
      schema: void 0,
      messages: void 0
    });
  }
  for (const item of rawConfigs) {
    for (const [prefix, plugin] of Object.entries(item.plugins ?? {})) {
      for (const [name, rule] of Object.entries(plugin.rules ?? {})) {
        rulesMap.set(`${prefix}/${name}`, {
          ...rule.meta,
          name: `${prefix}/${name}`,
          plugin: prefix,
          schema: void 0,
          messages: void 0
        });
      }
    }
  }
  const rules = Object.fromEntries(rulesMap.entries());
  const configs = rawConfigs.map((c2, idx) => {
    return {
      ...c2,
      index: idx,
      plugins: c2.plugins ? Object.fromEntries(Object.entries(c2.plugins ?? {}).map(([prefix]) => [prefix, {}]).filter((i) => i[0])) : void 0,
      languageOptions: c2.languageOptions ? { ...c2.languageOptions, parser: c2.languageOptions.parser?.meta?.name } : void 0,
      processor: c2.processor?.meta?.name
    };
  });
  console.log(MARK_CHECK, "Loaded with", configs.length, "config items and", Object.keys(rules).length, "rules");
  const payload = {
    configs,
    rules,
    files: globFiles ? await globMatchedFiles(basePath, configs, rawConfigs) : void 0,
    meta: {
      lastUpdate: Date.now(),
      basePath,
      configPath
    }
  };
  return {
    configs: rawConfigs,
    dependencies,
    payload
  };
}
async function globMatchedFiles(basePath, configs, rawConfigs) {
  console.log(MARK_INFO, "Globbing matched files");
  const files = [
    ...await configArrayFindFiles({
      basePath,
      configs: buildConfigArray(rawConfigs, basePath)
    })
  ].sort();
  return files.map((filepath) => {
    filepath = relative$2(basePath, filepath);
    const result = matchFile(filepath, configs, basePath);
    if (!result.configs.length)
      return void 0;
    return result;
  }).filter((i) => i);
}

const distDir = fileURLToPath(new URL("../dist/public", import.meta.url));

const readErrorWarning = `Failed to load \`eslint.config.js\`.
Note that \`@eslint/config-inspector\` only works with the flat config format:
https://eslint.org/docs/latest/use/configure/configuration-files-new`;
async function createWsServer(options) {
  let payload;
  const port = await getPort({ port: 7811, random: true });
  const wss = new WebSocketServer({
    port
  });
  const wsClients = /* @__PURE__ */ new Set();
  wss.on("connection", (ws) => {
    wsClients.add(ws);
    console.log(MARK_CHECK, "Websocket client connected");
    ws.on("close", () => wsClients.delete(ws));
  });
  let resolvedConfigPath;
  try {
    resolvedConfigPath = await resolveConfigPath(options);
  } catch (e) {
    if (e instanceof ConfigInspectorError) {
      e.prettyPrint();
      process$1.exit(1);
    } else {
      throw e;
    }
  }
  const { basePath } = resolvedConfigPath;
  const watcher = chokidar.watch([], {
    ignoreInitial: true,
    cwd: basePath
  });
  watcher.on("change", (path) => {
    payload = void 0;
    console.log();
    console.log(MARK_CHECK, "Config change detected", path);
    wsClients.forEach((ws) => {
      ws.send(JSON.stringify({
        type: "config-change",
        path
      }));
    });
  });
  async function getData() {
    try {
      if (!payload) {
        return await readConfig(options).then((res) => {
          const _payload = payload = res.payload;
          _payload.meta.wsPort = port;
          watcher.add(res.dependencies);
          return payload;
        });
      }
      return payload;
    } catch (e) {
      console.error(readErrorWarning);
      if (e instanceof ConfigInspectorError) {
        e.prettyPrint();
      } else {
        console.error(e);
      }
      return {
        message: readErrorWarning,
        error: String(e)
      };
    }
  }
  return {
    port,
    wss,
    watcher,
    getData
  };
}

async function createHostServer(options) {
  const app = createApp();
  const ws = await createWsServer(options);
  const fileMap = /* @__PURE__ */ new Map();
  const readCachedFile = (id) => {
    if (!fileMap.has(id))
      fileMap.set(id, readFile(id, "utf-8").catch(() => void 0));
    return fileMap.get(id);
  };
  app.use("/api/payload.json", eventHandler(async (event) => {
    event.node.res.setHeader("Content-Type", "application/json");
    return event.node.res.end(JSON.stringify(await ws.getData()));
  }));
  app.use("/", eventHandler(async (event) => {
    const result = await serveStatic(event, {
      fallthrough: true,
      getContents: (id) => readCachedFile(join$2(distDir, id)),
      getMeta: async (id) => {
        const stats = await stat(join$2(distDir, id)).catch(() => {
        });
        if (!stats || !stats.isFile())
          return;
        return {
          type: lookup(id),
          size: stats.size,
          mtime: stats.mtimeMs
        };
      }
    });
    if (result === false)
      return readCachedFile(join$2(distDir, "index.html"));
  }));
  return createServer(toNodeListener(app));
}

const cli = cac(
  "eslint-config-inspector"
);
cli.command("build", "Build inspector with current config file for static hosting").option("--config <configFile>", "Config file path").option("--files", "Include matched file paths in payload", { default: true }).option("--basePath <basePath>", "Base directory for globs to resolve. Default to directory of config file if not provided").option("--base <baseURL>", "Base URL for deployment", { default: "/" }).option("--outDir <dir>", "Output directory", { default: ".eslint-config-inspector" }).action(async (options) => {
  console.log(MARK_INFO, "Building static ESLint config inspector...");
  if (process$1.env.ESLINT_CONFIG)
    options.config ||= process$1.env.ESLINT_CONFIG;
  const cwd = process$1.cwd();
  const outDir = resolve$3(cwd, options.outDir);
  let configs;
  try {
    configs = await readConfig({
      cwd,
      userConfigPath: options.config,
      userBasePath: options.basePath,
      globMatchedFiles: options.files
    });
  } catch (error) {
    if (error instanceof ConfigInspectorError) {
      error.prettyPrint();
      process$1.exit(1);
    }
    throw error;
  }
  let baseURL = options.base;
  if (!baseURL.endsWith("/"))
    baseURL += "/";
  if (!baseURL.startsWith("/"))
    baseURL = `/${baseURL}`;
  baseURL = baseURL.replace(/\/+/g, "/");
  if (existsSync(outDir))
    await fs.rm(outDir, { recursive: true });
  await fs.mkdir(outDir, { recursive: true });
  await fs.cp(distDir, outDir, { recursive: true });
  const htmlFiles = await glob("**/*.html", { cwd: distDir, onlyFiles: true, expandDirectories: false });
  if (baseURL !== "/") {
    for (const file of htmlFiles) {
      const content = await fs.readFile(resolve$3(distDir, file), "utf-8");
      const newContent = content.replaceAll(/\s(href|src)="\//g, ` $1="${baseURL}`).replaceAll('baseURL:"/"', `baseURL:"${baseURL}"`);
      await fs.writeFile(resolve$3(outDir, file), newContent, "utf-8");
    }
  }
  await fs.mkdir(resolve$3(outDir, "api"), { recursive: true });
  configs.payload.meta.configPath = "";
  configs.payload.meta.basePath = "";
  await fs.writeFile(resolve$3(outDir, "api/payload.json"), JSON.stringify(configs.payload, null, 2), "utf-8");
  console.log(MARK_CHECK, `Built to ${relative$2(cwd, outDir)}`);
  console.log(MARK_INFO, `You can use static server like \`npx serve ${relative$2(cwd, outDir)}\` to serve the inspector`);
});
cli.command("", "Start dev inspector").option("--config <configFile>", "Config file path").option("--files", "Include matched file paths in payload", { default: true }).option("--basePath <basePath>", "Base directory for globs to resolve. Default to directory of config file if not provided").option("--host <host>", "Host", { default: process$1.env.HOST || "127.0.0.1" }).option("--port <port>", "Port", { default: process$1.env.PORT || 7777 }).option("--open", "Open browser", { default: true }).action(async (options) => {
  const host = options.host;
  const port = await getPort({ port: options.port, portRange: [7777, 9e3], host });
  if (process$1.env.ESLINT_CONFIG)
    options.config ||= process$1.env.ESLINT_CONFIG;
  console.log(MARK_INFO, `Starting ESLint config inspector at`, c.green`http://${host === "127.0.0.1" ? "localhost" : host}:${port}`, "\n");
  const cwd = process$1.cwd();
  const server = await createHostServer({
    cwd,
    userConfigPath: options.config,
    userBasePath: options.basePath,
    globMatchedFiles: options.files
  });
  server.listen(port, host, async () => {
    if (options.open)
      await open(`http://${host === "127.0.0.1" ? "localhost" : host}:${port}`);
  });
});
cli.help();
cli.parse();
