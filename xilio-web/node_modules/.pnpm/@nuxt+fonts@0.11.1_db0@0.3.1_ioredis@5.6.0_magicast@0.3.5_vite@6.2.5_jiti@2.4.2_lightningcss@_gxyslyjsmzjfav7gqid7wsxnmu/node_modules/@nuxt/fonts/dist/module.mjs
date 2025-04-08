import { useNuxt, useLogger, addDevServerHandler, addVitePlugin, createResolver, defineNuxtModule, addTemplate, addBuildPlugin } from '@nuxt/kit';
import { createJiti } from 'jiti';
import { extname, relative, join, resolve, dirname } from 'pathe';
import { defineFontProvider, providers, createUnifont } from 'unifont';
import { hasProtocol, withTrailingSlash, withLeadingSlash, joinURL, joinRelativeURL, withoutLeadingSlash } from 'ufo';
import { glob } from 'tinyglobby';
import { filename } from 'pathe/utils';
import { createRegExp, anyOf, not, wordBoundary } from 'magic-regexp';
import { getMetricsForFamily, readMetrics, generateFontFace as generateFontFace$1 } from 'fontaine';
import { createStorage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs';
import { createUnplugin } from 'unplugin';
import { parse, walk } from 'css-tree';
import MagicString from 'magic-string';
import { transform } from 'esbuild';
import fsp from 'node:fs/promises';
import { writeFileSync, existsSync } from 'node:fs';
import { eventHandler, createError } from 'h3';
import { fetch } from 'node-fetch-native/proxy';
import { colors } from 'consola/utils';
import { defu } from 'defu';
import { hash } from 'ohash';
import { onDevToolsInitialized, extendServerRpc, addCustomTab } from '@nuxt/devtools-kit';
import { toUnifontProvider } from './utils.mjs';

function generateFontFace(family, font) {
  return [
    "@font-face {",
    `  font-family: '${family}';`,
    `  src: ${renderFontSrc(font.src)};`,
    `  font-display: ${font.display || "swap"};`,
    font.unicodeRange && `  unicode-range: ${font.unicodeRange};`,
    font.weight && `  font-weight: ${Array.isArray(font.weight) ? font.weight.join(" ") : font.weight};`,
    font.style && `  font-style: ${font.style};`,
    font.stretch && `  font-stretch: ${font.stretch};`,
    font.featureSettings && `  font-feature-settings: ${font.featureSettings};`,
    font.variationSettings && `  font-variation-settings: ${font.variationSettings};`,
    `}`
  ].filter(Boolean).join("\n");
}
async function generateFontFallbacks(family, data, fallbacks) {
  if (!fallbacks?.length) return [];
  const fontURL = data.src.find((s) => "url" in s);
  const metrics = await getMetricsForFamily(family) || fontURL && await readMetrics(fontURL.originalURL || fontURL.url);
  if (!metrics) return [];
  const css = [];
  for (const fallback of fallbacks) {
    css.push(generateFontFace$1(metrics, {
      ...fallback,
      metrics: await getMetricsForFamily(fallback.font) || void 0
    }));
  }
  return css;
}
const formatMap = {
  woff2: "woff2",
  woff: "woff",
  otf: "opentype",
  ttf: "truetype",
  eot: "embedded-opentype",
  svg: "svg"
};
const extensionMap = Object.fromEntries(Object.entries(formatMap).map(([key, value]) => [value, key]));
const formatToExtension = (format) => format && format in extensionMap ? "." + extensionMap[format] : void 0;
function parseFont(font) {
  if (font.startsWith("/") || hasProtocol(font)) {
    const extension = extname(font).slice(1);
    const format = formatMap[extension];
    return {
      url: font,
      format
    };
  }
  return { name: font };
}
function renderFontSrc(sources) {
  return sources.map((src) => {
    if ("url" in src) {
      let rendered = `url("${src.url}")`;
      for (const key of ["format", "tech"]) {
        if (key in src) {
          rendered += ` ${key}(${src[key]})`;
        }
      }
      return rendered;
    }
    return `local("${src.name}")`;
  }).join(", ");
}
function relativiseFontSources(font, relativeTo) {
  return {
    ...font,
    src: font.src.map((source) => {
      if ("name" in source) return source;
      if (!source.url.startsWith("/")) return source;
      return {
        ...source,
        url: relative(relativeTo, source.url)
      };
    })
  };
}

const local = defineFontProvider("local", () => {
  const providerContext = {
    rootPaths: [],
    registry: {}
  };
  const nuxt = useNuxt();
  function registerFont(path) {
    const slugs = generateSlugs(path);
    for (const slug of slugs) {
      providerContext.registry[slug] ||= [];
      providerContext.registry[slug].push(path);
    }
  }
  function unregisterFont(path) {
    const slugs = generateSlugs(path);
    for (const slug of slugs) {
      providerContext.registry[slug] ||= [];
      providerContext.registry[slug] = providerContext.registry[slug].filter((p) => p !== path);
    }
  }
  const extensionPriority = [".woff2", ".woff", ".ttf", ".otf", ".eot"];
  function lookupFont(family, suffixes) {
    const slug = [fontFamilyToSlug(family), ...suffixes].join("-");
    const paths = providerContext.registry[slug];
    if (!paths || paths.length === 0) {
      return [];
    }
    const fonts = /* @__PURE__ */ new Set();
    for (const path of paths) {
      const base = providerContext.rootPaths.find((root) => path.startsWith(root));
      fonts.add(base ? withLeadingSlash(relative(base, path)) : path);
    }
    return [...fonts].sort((a, b) => {
      const extA = extname(a);
      const extB = extname(b);
      return extensionPriority.indexOf(extA) - extensionPriority.indexOf(extB);
    });
  }
  nuxt.hook("nitro:init", async (nitro) => {
    for (const assetsDir of nitro.options.publicAssets) {
      const possibleFontFiles = await glob(["**/*.{ttf,woff,woff2,eot,otf}"], {
        absolute: true,
        cwd: assetsDir.dir
      });
      providerContext.rootPaths.push(withTrailingSlash(assetsDir.dir));
      for (const file of possibleFontFiles) {
        registerFont(file.replace(assetsDir.dir, join(assetsDir.dir, assetsDir.baseURL || "/")));
      }
    }
    providerContext.rootPaths = providerContext.rootPaths.sort((a, b) => b.length - a.length);
  });
  nuxt.hook("builder:watch", (event, relativePath) => {
    relativePath = relative(nuxt.options.srcDir, resolve(nuxt.options.srcDir, relativePath));
    const path = resolve(nuxt.options.srcDir, relativePath);
    if (event === "add" && isFontFile(path)) {
      registerFont(path);
    }
    if (event === "unlink" && isFontFile(path)) {
      unregisterFont(path);
    }
  });
  return {
    resolveFont(fontFamily, options) {
      const fonts = [];
      for (const weight of options.weights) {
        for (const style of options.styles) {
          for (const subset of options.subsets) {
            const resolved = lookupFont(fontFamily, [weightMap$1[weight] || weight, style, subset]);
            if (resolved.length > 0) {
              fonts.push({
                src: resolved.map((url) => parseFont(url)),
                weight,
                style
              });
            }
          }
        }
      }
      if (fonts.length > 0) {
        return {
          fonts
        };
      }
    }
  };
});
const FONT_RE = /\.(?:ttf|woff|woff2|eot|otf)(?:\?[^.]+)?$/;
const NON_WORD_RE = /\W+/g;
const isFontFile = (id) => FONT_RE.test(id);
const weightMap$1 = {
  100: "thin",
  200: "extra-light",
  300: "light",
  400: "normal",
  500: "medium",
  600: "semi-bold",
  700: "bold",
  800: "extra-bold",
  900: "black"
};
const weights = Object.entries(weightMap$1).flatMap((e) => e).filter((r) => r !== "normal");
const WEIGHT_RE = createRegExp(anyOf(.../* @__PURE__ */ new Set([...weights, ...weights.map((w) => w.replace("-", ""))])).groupedAs("weight").after(not.digit).before(not.digit.or(wordBoundary)), ["i"]);
const styles = ["italic", "oblique"];
const STYLE_RE = createRegExp(anyOf(...styles).groupedAs("style").before(not.wordChar.or(wordBoundary)), ["i"]);
const subsets = [
  "cyrillic-ext",
  "cyrillic",
  "greek-ext",
  "greek",
  "vietnamese",
  "latin-ext",
  "latin"
];
const SUBSET_RE = createRegExp(anyOf(...subsets).groupedAs("subset").before(not.wordChar.or(wordBoundary)), ["i"]);
function generateSlugs(path) {
  let name = filename(path) || path;
  const weight = name.match(WEIGHT_RE)?.groups?.weight || "normal";
  const style = name.match(STYLE_RE)?.groups?.style || "normal";
  const subset = name.match(SUBSET_RE)?.groups?.subset || "latin";
  for (const slug of [weight, style, subset]) {
    name = name.replace(slug, "");
  }
  const slugs = /* @__PURE__ */ new Set();
  for (const slug of [name.replace(/\.\w*$/, ""), name.replace(/[._-]\w*$/, "")]) {
    slugs.add([
      fontFamilyToSlug(slug.replace(/[\W_]+$/, "")),
      weightMap$1[weight] || weight,
      style,
      subset
    ].join("-").toLowerCase());
  }
  return [...slugs];
}
function fontFamilyToSlug(family) {
  return family.toLowerCase().replace(NON_WORD_RE, "");
}

const cacheBase = "node_modules/.cache/nuxt/fonts/meta";
const storage = createStorage({
  driver: fsDriver({ base: cacheBase })
});

const weightMap = {
  100: "Thin",
  200: "ExtraLight",
  300: "Light",
  400: "Regular",
  500: "Medium",
  600: "SemiBold",
  700: "Bold",
  800: "ExtraBold",
  900: "Black"
};
const styleMap = {
  italic: "Italic",
  oblique: "Oblique",
  normal: ""
};
function processRawValue(value) {
  return value.split(",").map((v) => v.trim().replace(/^(?<quote>['"])(.*)\k<quote>$/, "$2"));
}
const _genericCSSFamilies = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "ui-serif",
  "ui-sans-serif",
  "ui-monospace",
  "ui-rounded",
  "emoji",
  "math",
  "fangsong"
];
const genericCSSFamilies = new Set(_genericCSSFamilies);
const globalCSSValues = /* @__PURE__ */ new Set([
  "inherit",
  "initial",
  "revert",
  "revert-layer",
  "unset"
]);
function extractGeneric(node) {
  if (node.value.type == "Raw") {
    return;
  }
  for (const child of node.value.children) {
    if (child.type === "Identifier" && genericCSSFamilies.has(child.name)) {
      return child.name;
    }
  }
}
function extractEndOfFirstChild(node) {
  if (node.value.type == "Raw") {
    return;
  }
  for (const child of node.value.children) {
    if (child.type === "String") {
      return child.loc.end.offset;
    }
    if (child.type === "Operator" && child.value === ",") {
      return child.loc.start.offset;
    }
  }
  return node.value.children.last.loc.end.offset;
}
function extractFontFamilies(node) {
  if (node.value.type == "Raw") {
    return processRawValue(node.value.value);
  }
  const families = [];
  let buffer = "";
  for (const child of node.value.children) {
    if (child.type === "Identifier" && !genericCSSFamilies.has(child.name) && !globalCSSValues.has(child.name)) {
      buffer = buffer ? `${buffer} ${child.name}` : child.name;
    }
    if (buffer && child.type === "Operator" && child.value === ",") {
      families.push(buffer.replace(/\\/g, ""));
      buffer = "";
    }
    if (buffer && child.type === "Dimension") {
      buffer = (buffer + " " + child.value + child.unit).trim();
    }
    if (child.type === "String") {
      families.push(child.value);
    }
  }
  if (buffer) {
    families.push(buffer);
  }
  return families;
}
function addLocalFallbacks(fontFamily, data) {
  for (const face of data) {
    const style = (face.style ? styleMap[face.style] : "") ?? "";
    if (Array.isArray(face.weight)) {
      face.src.unshift({ name: [fontFamily, "Variable", style].join(" ").trim() });
    } else if (face.src[0] && !("name" in face.src[0])) {
      const weights = (Array.isArray(face.weight) ? face.weight : [face.weight]).map((weight) => weightMap[weight]).filter(Boolean);
      for (const weight of weights) {
        if (weight === "Regular") {
          face.src.unshift({ name: [fontFamily, style].join(" ").trim() });
        }
        face.src.unshift({ name: [fontFamily, weight, style].join(" ").trim() });
      }
    }
  }
  return data;
}

const SKIP_RE = /\/node_modules\/vite-plugin-vue-inspector\//;
const FontFamilyInjectionPlugin = (options) => createUnplugin(() => {
  let postcssOptions;
  async function transformCSS(code, id, opts = {}) {
    const s = new MagicString(code);
    const injectedDeclarations = /* @__PURE__ */ new Set();
    const promises = [];
    async function addFontFaceDeclaration(fontFamily, fallbackOptions) {
      const result = await options.resolveFontFace(fontFamily, {
        generic: fallbackOptions?.generic,
        fallbacks: fallbackOptions?.fallbacks || []
      }) || {};
      if (!result.fonts || result.fonts.length === 0) return;
      const fallbackMap = result.fallbacks?.map((f) => ({ font: f, name: `${fontFamily} Fallback: ${f}` })) || [];
      let insertFontFamilies = false;
      if (result.fonts[0] && options.shouldPreload(fontFamily, result.fonts[0])) {
        const fontToPreload = result.fonts[0].src.find((s2) => "url" in s2)?.url;
        if (fontToPreload) {
          const urls = options.fontsToPreload.get(id) || /* @__PURE__ */ new Set();
          options.fontsToPreload.set(id, urls.add(fontToPreload));
        }
      }
      const prefaces = [];
      for (const font of result.fonts) {
        const fallbackDeclarations = await generateFontFallbacks(fontFamily, font, fallbackMap);
        const declarations = [generateFontFace(fontFamily, opts.relative ? relativiseFontSources(font, withLeadingSlash(dirname(id))) : font), ...fallbackDeclarations];
        for (let declaration of declarations) {
          if (!injectedDeclarations.has(declaration)) {
            injectedDeclarations.add(declaration);
            if (!options.dev) {
              declaration = await transform(declaration, {
                loader: "css",
                charset: "utf8",
                minify: true,
                ...postcssOptions
              }).then((r) => r.code || declaration).catch(() => declaration);
            } else {
              declaration += "\n";
            }
            prefaces.push(declaration);
          }
        }
        if (fallbackDeclarations.length) {
          insertFontFamilies = true;
        }
      }
      s.prepend(prefaces.join(""));
      if (fallbackOptions && insertFontFamilies) {
        const insertedFamilies = fallbackMap.map((f) => `"${f.name}"`).join(", ");
        s.prependLeft(fallbackOptions.index, `, ${insertedFamilies}`);
      }
    }
    const ast = parse(code, { positions: true });
    const existingFontFamilies = /* @__PURE__ */ new Set();
    function processNode(node, parentOffset = 0) {
      walk(node, {
        visit: "Declaration",
        enter(node2) {
          if (this.atrule?.name === "font-face" && node2.property === "font-family") {
            for (const family of extractFontFamilies(node2)) {
              existingFontFamilies.add(family);
            }
          }
        }
      });
      walk(node, {
        visit: "Declaration",
        enter(node2) {
          if (node2.property !== "font-family" && node2.property !== "font" && (options.processCSSVariables === false || options.processCSSVariables === "font-prefixed-only" && !node2.property.startsWith("--font") || options.processCSSVariables === true && !node2.property.startsWith("--")) || this.atrule?.name === "font-face") {
            return;
          }
          const [fontFamily, ...fallbacks] = extractFontFamilies(node2);
          if (fontFamily && !existingFontFamilies.has(fontFamily)) {
            promises.push(addFontFaceDeclaration(fontFamily, node2.value.type !== "Raw" ? {
              fallbacks,
              generic: extractGeneric(node2),
              index: extractEndOfFirstChild(node2) + parentOffset
            } : void 0));
          }
        }
      });
      walk(node, {
        visit: "Raw",
        enter(node2) {
          const nestedRaw = parse(node2.value, { positions: true });
          const isNestedCss = nestedRaw.children.some((child) => child.type === "Rule");
          if (!isNestedCss) return;
          parentOffset += node2.loc.start.offset;
          processNode(nestedRaw, parentOffset);
        }
      });
    }
    processNode(ast);
    await Promise.all(promises);
    return s;
  }
  return {
    name: "nuxt:fonts:font-family-injection",
    transformInclude(id) {
      return isCSS(id) && !SKIP_RE.test(id);
    },
    async transform(code, id) {
      if (!options.processCSSVariables && !code.includes("font-family:")) {
        return;
      }
      const s = await transformCSS(code, id);
      if (s.hasChanged()) {
        return {
          code: s.toString(),
          map: s.generateMap({ hires: true })
        };
      }
    },
    vite: {
      configResolved(config) {
        if (options.dev || !config.esbuild || postcssOptions) {
          return;
        }
        postcssOptions = {
          target: config.esbuild.target,
          ...resolveMinifyCssEsbuildOptions(config.esbuild)
        };
      },
      renderChunk(code, chunk) {
        if (chunk.facadeModuleId) {
          for (const file of chunk.moduleIds) {
            if (options.fontsToPreload.has(file)) {
              options.fontsToPreload.set(chunk.facadeModuleId, options.fontsToPreload.get(file));
            }
          }
        }
      },
      generateBundle: {
        enforce: "post",
        async handler(_outputOptions, bundle) {
          for (const key in bundle) {
            const chunk = bundle[key];
            if (chunk?.type === "asset" && isCSS(chunk.fileName)) {
              const s = await transformCSS(chunk.source.toString(), key, { relative: true });
              if (s.hasChanged()) {
                chunk.source = s.toString();
              }
            }
          }
        }
      }
    }
  };
});
const IS_CSS_RE = /\.(?:css|scss|sass|postcss|pcss|less|stylus|styl)(?:\?[^.]+)?$/;
function isCSS(id) {
  return IS_CSS_RE.test(id);
}
function resolveMinifyCssEsbuildOptions(options) {
  const base = {
    charset: options.charset ?? "utf8",
    logLevel: options.logLevel,
    logLimit: options.logLimit,
    logOverride: options.logOverride,
    legalComments: options.legalComments
  };
  if (options.minifyIdentifiers != null || options.minifySyntax != null || options.minifyWhitespace != null) {
    return {
      ...base,
      minifyIdentifiers: options.minifyIdentifiers ?? true,
      minifySyntax: options.minifySyntax ?? true,
      minifyWhitespace: options.minifyWhitespace ?? true
    };
  }
  return { ...base, minify: true };
}

const logger = useLogger("@nuxt/fonts");

async function setupPublicAssetStrategy(options = {}) {
  const assetsBaseURL = options.prefix || "/_fonts";
  const nuxt = useNuxt();
  const renderedFontURLs = /* @__PURE__ */ new Map();
  function normalizeFontData(faces) {
    const data = [];
    for (const face of Array.isArray(faces) ? faces : [faces]) {
      data.push({
        ...face,
        unicodeRange: face.unicodeRange === void 0 || Array.isArray(face.unicodeRange) ? face.unicodeRange : [face.unicodeRange],
        src: (Array.isArray(face.src) ? face.src : [face.src]).map((src) => {
          const source = typeof src === "string" ? parseFont(src) : src;
          if ("url" in source && hasProtocol(source.url, { acceptRelative: true })) {
            source.url = source.url.replace(/^\/\//, "https://");
            const _url = source.url.replace(/\?.*/, "");
            const MAX_FILENAME_PREFIX_LENGTH = 50;
            const file = [
              // TODO: investigate why negative ignore pattern below is being ignored
              hash(filename(_url) || _url).replace(/^-+/, "").slice(0, MAX_FILENAME_PREFIX_LENGTH),
              hash(source).replace(/-/, "_") + (extname(source.url) || formatToExtension(source.format) || "")
            ].filter(Boolean).join("-");
            renderedFontURLs.set(file, source.url);
            source.originalURL = source.url;
            source.url = nuxt.options.dev ? joinRelativeURL(nuxt.options.app.baseURL, assetsBaseURL, file) : joinURL(assetsBaseURL, file);
            if (!nuxt.options.dev) {
              writeFileSync(join(cacheDir, file), "");
            }
          }
          return source;
        })
      });
    }
    return data;
  }
  async function devEventHandler(event) {
    const filename2 = event.path.slice(1);
    const url = renderedFontURLs.get(event.path.slice(1));
    if (!url) {
      throw createError({ statusCode: 404 });
    }
    const key = "data:fonts:" + filename2;
    let res = await storage.getItemRaw(key);
    if (!res) {
      res = await fetch(url).then((r) => r.arrayBuffer()).then((r) => Buffer.from(r));
      await storage.setItemRaw(key, res);
    }
    return res;
  }
  addDevServerHandler({
    route: joinURL(nuxt.options.runtimeConfig.app.baseURL || nuxt.options.app.baseURL, assetsBaseURL),
    handler: eventHandler(devEventHandler)
  });
  addVitePlugin({
    name: "nuxt-fonts-public-assets",
    async configureServer(server) {
      if (server.config.appType !== "custom") {
        server.middlewares.use(
          assetsBaseURL,
          async (req, res) => {
            res.end(await devEventHandler({ path: req.url }));
          }
        );
      }
    }
  }, { client: true, server: false });
  if (nuxt.options.dev) {
    nuxt.options.routeRules ||= {};
    nuxt.options.routeRules[joinURL(assetsBaseURL, "**")] = {
      cache: {
        maxAge: ONE_YEAR_IN_SECONDS
      }
    };
  }
  nuxt.options.nitro.publicAssets ||= [];
  const cacheDir = join(nuxt.options.buildDir, "cache", "fonts");
  if (!nuxt.options.dev) {
    await fsp.mkdir(cacheDir, { recursive: true });
  }
  nuxt.options.nitro = defu(nuxt.options.nitro, {
    publicAssets: [{
      dir: cacheDir,
      maxAge: ONE_YEAR_IN_SECONDS,
      baseURL: assetsBaseURL
    }],
    ignore: [`!${join(cacheDir, "**/*")}`],
    prerender: {
      ignore: [assetsBaseURL]
    }
  });
  nuxt.hook("nitro:init", (nitro) => {
    if (nuxt.options.dev) {
      return;
    }
    let built = false;
    nuxt.hook("vite:compiled", () => {
      built = true;
    });
    nuxt.hook("webpack:compiled", () => {
      built = true;
    });
    nitro.hooks.hook("rollup:before", async () => {
      if (!built) {
        return;
      }
      await fsp.rm(cacheDir, { recursive: true, force: true });
      await fsp.mkdir(cacheDir, { recursive: true });
      let banner = false;
      for (const [filename2, url] of renderedFontURLs) {
        const key = "data:fonts:" + filename2;
        let res = await storage.getItemRaw(key);
        if (!res) {
          if (!banner) {
            banner = true;
            logger.info("Downloading fonts...");
          }
          logger.log(colors.gray("  \u251C\u2500 " + url));
          res = await fetch(url).then((r) => r.arrayBuffer()).then((r) => Buffer.from(r));
          await storage.setItemRaw(key, res);
        }
        await fsp.writeFile(join(cacheDir, filename2), res);
      }
      if (banner) {
        logger.success("Fonts downloaded and cached.");
      }
    });
  });
  return { normalizeFontData };
}
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

const DEVTOOLS_UI_PATH = "/__nuxt-devtools-fonts";
const DEVTOOLS_UI_PORT = 3300;
const DEVTOOLS_RPC_NAMESPACE = "nuxt-devtools-fonts";

function setupDevToolsUI() {
  const nuxt = useNuxt();
  const resolver = createResolver(import.meta.url);
  const clientPath = resolver.resolve("./client");
  const isProductionBuild = existsSync(clientPath);
  if (isProductionBuild) {
    nuxt.hook("vite:serverCreated", async (server) => {
      const sirv = await import('sirv').then((r) => r.default || r);
      server.middlewares.use(
        DEVTOOLS_UI_PATH,
        sirv(clientPath, { dev: true, single: true })
      );
    });
  } else {
    nuxt.hook("vite:extendConfig", (config) => {
      config.server = config.server || {};
      config.server.proxy = config.server.proxy || {};
      config.server.proxy[DEVTOOLS_UI_PATH] = {
        target: `http://localhost:${DEVTOOLS_UI_PORT}${DEVTOOLS_UI_PATH}`,
        changeOrigin: true,
        followRedirects: true,
        rewrite: (path) => path.replace(DEVTOOLS_UI_PATH, "")
      };
    });
  }
  addCustomTab({
    name: "fonts",
    title: "Fonts",
    icon: "carbon:text-font",
    view: {
      type: "iframe",
      src: DEVTOOLS_UI_PATH
    }
  });
}
function setupDevtoolsConnection(enabled) {
  if (!enabled) {
    return { exposeFont: () => {
    } };
  }
  setupDevToolsUI();
  let rpc;
  const fonts = [];
  onDevToolsInitialized(() => {
    rpc = extendServerRpc(DEVTOOLS_RPC_NAMESPACE, {
      getFonts: () => fonts,
      generateFontFace
    });
    rpc.broadcast.exposeFonts.asEvent(fonts);
  });
  function exposeFonts(font) {
    fonts.push(font);
    rpc?.broadcast.exposeFonts.asEvent(fonts);
  }
  return {
    exposeFont: exposeFonts
  };
}

const defaultValues = {
  weights: [400],
  styles: ["normal", "italic"],
  subsets: [
    "cyrillic-ext",
    "cyrillic",
    "greek-ext",
    "greek",
    "vietnamese",
    "latin-ext",
    "latin"
  ],
  fallbacks: {
    "serif": ["Times New Roman"],
    "sans-serif": ["Arial"],
    "monospace": ["Courier New"],
    "cursive": [],
    "fantasy": [],
    "system-ui": [
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial"
    ],
    "ui-serif": ["Times New Roman"],
    "ui-sans-serif": ["Arial"],
    "ui-monospace": ["Courier New"],
    "ui-rounded": [],
    "emoji": [],
    "math": [],
    "fangsong": []
  }
};
const module = defineNuxtModule({
  meta: {
    name: "@nuxt/fonts",
    configKey: "fonts"
  },
  defaults: {
    devtools: true,
    processCSSVariables: "font-prefixed-only",
    experimental: {
      disableLocalFallbacks: false
    },
    defaults: {},
    assets: {
      prefix: "/_fonts"
    },
    local: {},
    google: {},
    adobe: {
      id: ""
    },
    providers: {
      local,
      adobe: providers.adobe,
      google: providers.google,
      googleicons: providers.googleicons,
      bunny: providers.bunny,
      fontshare: providers.fontshare,
      fontsource: providers.fontsource
    }
  },
  async setup(options, nuxt) {
    if (nuxt.options._prepare) return;
    const normalizedDefaults = {
      weights: (options.defaults?.weights || defaultValues.weights).map((v) => String(v)),
      styles: options.defaults?.styles || defaultValues.styles,
      subsets: options.defaults?.subsets || defaultValues.subsets,
      fallbacks: Object.fromEntries(Object.entries(defaultValues.fallbacks).map(([key, value]) => [
        key,
        Array.isArray(options.defaults?.fallbacks) ? options.defaults.fallbacks : options.defaults?.fallbacks?.[key] || value
      ]))
    };
    if (!options.defaults?.fallbacks || !Array.isArray(options.defaults.fallbacks)) {
      const fallbacks = options.defaults.fallbacks ||= {};
      for (const _key in defaultValues.fallbacks) {
        const key = _key;
        fallbacks[key] ||= defaultValues.fallbacks[key];
      }
    }
    const providers2 = await resolveProviders(options.providers);
    const prioritisedProviders = /* @__PURE__ */ new Set();
    let unifont;
    nuxt.hook("modules:done", async () => {
      await nuxt.callHook("fonts:providers", providers2);
      const resolvedProviders = [];
      for (const [key, provider] of Object.entries(providers2)) {
        if (options.providers?.[key] === false || options.provider && options.provider !== key) {
          delete providers2[key];
        } else {
          const unifontProvider = provider instanceof Function ? provider : toUnifontProvider(key, provider);
          const providerOptions = options[key] || {};
          resolvedProviders.push(unifontProvider(providerOptions));
        }
      }
      for (const val of options.priority || []) {
        if (val in providers2) prioritisedProviders.add(val);
      }
      for (const provider in providers2) {
        prioritisedProviders.add(provider);
      }
      unifont = await createUnifont(resolvedProviders, { storage });
    });
    const { normalizeFontData } = await setupPublicAssetStrategy(options.assets);
    const { exposeFont } = setupDevtoolsConnection(nuxt.options.dev && !!options.devtools);
    function addFallbacks(fontFamily, font) {
      if (options.experimental?.disableLocalFallbacks) {
        return font;
      }
      return addLocalFallbacks(fontFamily, font);
    }
    async function resolveFontFaceWithOverride(fontFamily, override, fallbackOptions) {
      const fallbacks = override?.fallbacks || normalizedDefaults.fallbacks[fallbackOptions?.generic || "sans-serif"];
      if (override && "src" in override) {
        const fonts = addFallbacks(fontFamily, normalizeFontData({
          src: override.src,
          display: override.display,
          weight: override.weight,
          style: override.style
        }));
        exposeFont({
          type: "manual",
          fontFamily,
          fonts
        });
        return {
          fallbacks,
          fonts
        };
      }
      if (override?.provider === "none") {
        return;
      }
      const defaults = { ...normalizedDefaults, fallbacks };
      for (const key of ["weights", "styles", "subsets"]) {
        if (override?.[key]) {
          defaults[key] = override[key].map((v) => String(v));
        }
      }
      if (override?.provider) {
        if (override.provider in providers2) {
          const result2 = await unifont.resolveFont(fontFamily, defaults, [override.provider]);
          const fonts = normalizeFontData(result2?.fonts || []);
          if (!fonts.length || !result2) {
            logger.warn(`Could not produce font face declaration from \`${override.provider}\` for font family \`${fontFamily}\`.`);
            return;
          }
          const fontsWithLocalFallbacks = addFallbacks(fontFamily, fonts);
          exposeFont({
            type: "override",
            fontFamily,
            provider: override.provider,
            fonts: fontsWithLocalFallbacks
          });
          return {
            fallbacks: result2.fallbacks || defaults.fallbacks,
            fonts: fontsWithLocalFallbacks
          };
        }
        logger.warn(`Unknown provider \`${override.provider}\` for font family \`${fontFamily}\`. Falling back to default providers.`);
      }
      const result = await unifont.resolveFont(fontFamily, defaults, [...prioritisedProviders]);
      if (result) {
        const fonts = normalizeFontData(result.fonts);
        if (fonts.length > 0) {
          const fontsWithLocalFallbacks = addFallbacks(fontFamily, fonts);
          exposeFont({
            type: "auto",
            fontFamily,
            provider: result.provider || "unknown",
            fonts: fontsWithLocalFallbacks
          });
          return {
            fallbacks: result.fallbacks || defaults.fallbacks,
            fonts: fontsWithLocalFallbacks
          };
        }
        if (override) {
          logger.warn(`Could not produce font face declaration for \`${fontFamily}\` with override.`);
        }
      }
    }
    nuxt.options.css.push("#build/nuxt-fonts-global.css");
    addTemplate({
      filename: "nuxt-fonts-global.css",
      write: true,
      // Seemingly necessary to allow vite to process file 🤔
      async getContents() {
        let css = "";
        for (const family of options.families || []) {
          if (!family.global) continue;
          const result = await resolveFontFaceWithOverride(family.name, family);
          for (const font of result?.fonts || []) {
            css += generateFontFace(family.name, font) + "\n";
          }
        }
        return css;
      }
    });
    const fontMap = /* @__PURE__ */ new Map();
    let viteEntry;
    nuxt.hook("vite:extend", (ctx) => {
      viteEntry = relative(ctx.config.root || nuxt.options.srcDir, ctx.entry);
    });
    nuxt.hook("build:manifest", (manifest) => {
      const unprocessedPreloads = new Set([...fontMap.values()].flatMap((v) => [...v]));
      function addPreloadLinks(chunk, urls) {
        chunk.assets ||= [];
        for (const url of urls) {
          if (!chunk.assets.includes(url)) {
            chunk.assets.push(url);
            unprocessedPreloads.delete(url);
          }
          if (!manifest[url]) {
            manifest[url] = {
              file: relative(nuxt.options.app.buildAssetsDir, url),
              resourceType: "font",
              preload: true
            };
          }
        }
      }
      let entry;
      for (const chunk of Object.values(manifest)) {
        if (chunk.isEntry && chunk.src === viteEntry) {
          entry = chunk;
        }
        if (!chunk.css || chunk.css.length === 0) continue;
        for (const css of chunk.css) {
          const assetName = withoutLeadingSlash(join(nuxt.options.app.buildAssetsDir, css));
          if (fontMap.has(assetName)) {
            addPreloadLinks(chunk, fontMap.get(assetName));
          }
        }
      }
      for (const [id, urls] of fontMap) {
        const chunk = manifest[relative(nuxt.options.srcDir, id)];
        if (!chunk) continue;
        addPreloadLinks(chunk, urls);
      }
      if (entry) {
        addPreloadLinks(entry, unprocessedPreloads);
      }
    });
    addBuildPlugin(FontFamilyInjectionPlugin({
      dev: nuxt.options.dev,
      fontsToPreload: fontMap,
      processCSSVariables: options.experimental?.processCSSVariables ?? options.processCSSVariables,
      shouldPreload(fontFamily, fontFace) {
        const override = options.families?.find((f) => f.name === fontFamily);
        if (override && override.preload !== void 0) {
          return override.preload;
        }
        if (options.defaults?.preload !== void 0) {
          return options.defaults.preload;
        }
        return fontFace.src.some((s) => "url" in s) && !fontFace.unicodeRange;
      },
      async resolveFontFace(fontFamily, fallbackOptions) {
        const override = options.families?.find((f) => f.name === fontFamily);
        if (override?.global) {
          return;
        }
        return resolveFontFaceWithOverride(fontFamily, override, fallbackOptions);
      }
    }));
  }
});
async function resolveProviders(_providers = {}) {
  const nuxt = useNuxt();
  const jiti = createJiti(nuxt.options.rootDir, { alias: nuxt.options.alias });
  const providers2 = { ..._providers };
  for (const key in providers2) {
    const value = providers2[key];
    if (value === false) {
      delete providers2[key];
    }
    if (typeof value === "string") {
      providers2[key] = await jiti.import(value, { default: true });
    }
  }
  return providers2;
}

export { module as default };
