'use strict';

const node_url = require('node:url');
const pathe = require('pathe');
const unplugin = require('unplugin');
const defu = require('defu');
const tailwind = require('@tailwindcss/vite');
const templates = require('./shared/ui.BL-XB3u1.cjs');
const tinyglobby = require('tinyglobby');
const knitwork = require('knitwork');
const MagicString = require('magic-string');
const mlly = require('mlly');
const AutoImportComponents = require('unplugin-vue-components');
const AutoImport = require('unplugin-auto-import');
require('../dist/runtime/utils/index.js');
require('scule');
require('@nuxt/kit');
require('tailwindcss/colors');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const tailwind__default = /*#__PURE__*/_interopDefaultCompat(tailwind);
const MagicString__default = /*#__PURE__*/_interopDefaultCompat(MagicString);
const AutoImportComponents__default = /*#__PURE__*/_interopDefaultCompat(AutoImportComponents);
const AutoImport__default = /*#__PURE__*/_interopDefaultCompat(AutoImport);

function TemplatePlugin(options, appConfig) {
  const templates$1 = templates.getTemplates(options, appConfig.ui);
  const templateKeys = new Set(templates$1.map((t) => `#build/${t.filename}`));
  return {
    name: "nuxt:ui:templates",
    enforce: "pre",
    resolveId(id) {
      if (templateKeys.has(id + ".ts")) {
        return id.replace("#build/", "virtual:nuxt-ui-templates/") + ".ts";
      }
    },
    loadInclude: (id) => templateKeys.has(id.replace("virtual:nuxt-ui-templates/", "#build/")),
    load(id) {
      id = id.replace("virtual:nuxt-ui-templates/", "#build/");
      return templates$1.find((t) => `#build/${t.filename}` === id).getContents({});
    }
  };
}

function PluginsPlugin(options) {
  const plugins = tinyglobby.globSync(["**/*", "!*.d.ts"], { cwd: pathe.join(runtimeDir, "plugins"), absolute: true });
  plugins.unshift(mlly.resolvePathSync("../runtime/vue/plugins/head", { extensions: [".ts", ".mjs", ".js"], url: (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('unplugin.cjs', document.baseURI).href)) }));
  if (options.colorMode) {
    plugins.push(mlly.resolvePathSync("../runtime/vue/plugins/color-mode", { extensions: [".ts", ".mjs", ".js"], url: (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('unplugin.cjs', document.baseURI).href)) }));
  }
  return {
    name: "nuxt:ui:plugins",
    enforce: "pre",
    resolveId(id) {
      if (id === "@nuxt/ui/vue-plugin") {
        return "virtual:nuxt-ui-plugins";
      }
    },
    transform(code, id) {
      if (plugins.some((p) => id.startsWith(p)) && code.includes("import.meta.client")) {
        const s = new MagicString__default(code);
        s.replaceAll("import.meta.client", "true");
        if (s.hasChanged()) {
          return {
            code: s.toString(),
            map: s.generateMap({ hires: true })
          };
        }
      }
    },
    loadInclude: (id) => id === "virtual:nuxt-ui-plugins",
    load() {
      return `
        ${plugins.map((p) => `import ${knitwork.genSafeVariableName(p)} from "${p}"`).join("\n")}
export default {
  install (app) {
${plugins.map((p) => `    app.use(${knitwork.genSafeVariableName(p)})`).join("\n")}
  }
}
        `;
    },
    // Argument Vite specific configuration
    vite: {
      config() {
        return {
          // Opt-out Nuxt UI from Vite's pre-bundling,
          // as we need Vite's pipeline to resolve imports like `#imports`
          optimizeDeps: {
            exclude: ["@nuxt/ui"]
          }
        };
      }
    }
  };
}

function AppConfigPlugin(options, appConfig) {
  return {
    name: "nuxt:ui:app-config",
    enforce: "pre",
    resolveId(id) {
      if (id === "#build/app.config") {
        return "virtual:nuxt-ui-app-config";
      }
    },
    loadInclude: (id) => id === "virtual:nuxt-ui-app-config",
    load() {
      return `
          export default ${JSON.stringify(appConfig)}
        `;
    }
  };
}

function ComponentImportPlugin(options, meta) {
  const components = tinyglobby.globSync("**/*.vue", { cwd: pathe.join(runtimeDir, "components") });
  const componentNames = new Set(components.map((c) => `${options.prefix}${c.replace(/\.vue$/, "")}`));
  const overrides = tinyglobby.globSync("**/*.vue", { cwd: pathe.join(runtimeDir, "vue/components") });
  const overrideNames = new Set(overrides.map((c) => `${options.prefix}${c.replace(/\.vue$/, "")}`));
  const pluginOptions = defu.defu(options.components, {
    dts: options.dts ?? true,
    exclude: [
      /[\\/]node_modules[\\/](?!\.pnpm|@nuxt\/ui|@compodium\/examples)/,
      /[\\/]\.git[\\/]/,
      /[\\/]\.nuxt[\\/]/
    ],
    resolvers: [
      (componentName) => {
        if (overrideNames.has(componentName))
          return { name: "default", from: pathe.join(runtimeDir, "vue/components", `${componentName.slice(options.prefix.length)}.vue`) };
        if (componentNames.has(componentName))
          return { name: "default", from: pathe.join(runtimeDir, "components", `${componentName.slice(options.prefix.length)}.vue`) };
      }
    ]
  });
  return [
    /**
     * This plugin aims to ensure we override certain components with Vue-compatible versions:
     * <UIcon> and <ULink> currently.
     */
    {
      name: "nuxt:ui:components",
      enforce: "pre",
      resolveId(id, importer) {
        if (!importer || !pathe.normalize(importer).includes(runtimeDir)) {
          return;
        }
        if (!RELATIVE_IMPORT_RE.test(id)) {
          return;
        }
        const filename = id.match(/([^/]+)\.vue$/)?.[1];
        if (filename && overrideNames.has(`${options.prefix}${filename}`)) {
          return pathe.join(runtimeDir, "vue/components", `${filename}.vue`);
        }
      }
    },
    AutoImportComponents__default.raw(pluginOptions, meta)
  ];
}
const RELATIVE_IMPORT_RE = /^\.{1,2}\//;

function NuxtEnvironmentPlugin() {
  const stubPath = mlly.resolvePathSync("../runtime/vue/stubs", { extensions: [".ts", ".mjs", ".js"], url: (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('unplugin.cjs', document.baseURI).href)) });
  return {
    name: "nuxt:ui",
    enforce: "pre",
    resolveId(id) {
      if (id === "#imports") {
        return stubPath;
      }
    },
    transformInclude(id) {
      return pathe.normalize(id).includes(runtimeDir);
    },
    transform(code) {
      if (code.includes("import.meta.client")) {
        const s = new MagicString__default(code);
        s.replaceAll("import.meta.client", "true");
        if (s.hasChanged()) {
          return {
            code: s.toString(),
            map: s.generateMap({ hires: true })
          };
        }
      }
    }
  };
}

function AutoImportPlugin(options, meta) {
  const pluginOptions = defu.defu(options.autoImport, {
    dts: options.dts ?? true,
    dirs: [pathe.join(runtimeDir, "composables"), pathe.join(runtimeDir, "vue/composables")]
  });
  return AutoImport__default.raw(pluginOptions, meta);
}

const runtimeDir = pathe.normalize(node_url.fileURLToPath(new URL("./runtime", (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('unplugin.cjs', document.baseURI).href)))));
const NuxtUIPlugin = unplugin.createUnplugin((_options = {}, meta) => {
  const options = defu.defu(_options, { fonts: false }, templates.defaultOptions);
  options.theme = options.theme || {};
  options.theme.colors = templates.resolveColors(options.theme.colors);
  const appConfig = defu.defu({ ui: options.ui, colorMode: options.colorMode }, { ui: templates.getDefaultUiConfig(options.theme.colors) });
  return [
    NuxtEnvironmentPlugin(),
    ComponentImportPlugin(options, meta),
    AutoImportPlugin(options, meta),
    tailwind__default(),
    PluginsPlugin(options),
    TemplatePlugin(options, appConfig),
    AppConfigPlugin(options, appConfig),
    {
      name: "nuxt:ui:plugins-duplication-detection",
      vite: {
        configResolved(config) {
          const plugins = config.plugins || [];
          if (plugins.filter((i) => i.name === "unplugin-auto-import").length > 1) {
            throw new Error("[Nuxt UI] Multiple instances of `unplugin-auto-import` detected. Nuxt UI includes `unplugin-auto-import` already, and you can configure it using `autoImport` option in Nuxt UI module options.");
          }
          if (plugins.filter((i) => i.name === "unplugin-vue-components").length > 1) {
            throw new Error("[Nuxt UI] Multiple instances of `unplugin-vue-components` detected. Nuxt UI includes `unplugin-vue-components` already, and you can configure it using `components` option in Nuxt UI module options.");
          }
        }
      }
    }
  ].flat(1);
});

exports.NuxtUIPlugin = NuxtUIPlugin;
exports.runtimeDir = runtimeDir;
