'use strict';

const defu = require('defu');
const kit = require('@nuxt/kit');
const templates = require('./shared/ui.BL-XB3u1.cjs');
require('../dist/runtime/utils/index.js');
require('node:url');
require('scule');
require('tailwindcss/colors');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
const module$1 = kit.defineNuxtModule({
  meta: {
    name: "ui",
    configKey: "ui",
    compatibility: {
      nuxt: ">=3.16.0"
    },
    docs: "https://ui.nuxt.com/getting-started/installation/nuxt"
  },
  defaults: templates.defaultOptions,
  async setup(options, nuxt) {
    const { resolve } = kit.createResolver((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('module.cjs', document.baseURI).href)));
    options.theme = options.theme || {};
    options.theme.colors = templates.resolveColors(options.theme.colors);
    nuxt.options.ui = options;
    nuxt.options.alias["#ui"] = resolve("./runtime");
    nuxt.options.appConfig.ui = defu.defu(nuxt.options.appConfig.ui || {}, templates.getDefaultUiConfig(options.theme.colors));
    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {};
    nuxt.options.app.rootAttrs.class = [nuxt.options.app.rootAttrs.class, "isolate"].filter(Boolean).join(" ");
    if (nuxt.options.builder === "@nuxt/vite-builder") {
      const plugin = await import('@tailwindcss/vite').then((r) => r.default);
      kit.addVitePlugin(plugin());
    } else {
      nuxt.options.postcss.plugins["@tailwindcss/postcss"] = {};
    }
    async function registerModule(name, key, options2) {
      if (!kit.hasNuxtModule(name)) {
        await kit.installModule(name, options2);
      } else {
        nuxt.options[key] = defu.defu(nuxt.options[key], options2);
      }
    }
    await registerModule("@nuxt/icon", "icon", { cssLayer: "components" });
    if (options.fonts) {
      await registerModule("@nuxt/fonts", "fonts", { experimental: { processCSSVariables: true } });
    }
    if (options.colorMode) {
      await registerModule("@nuxtjs/color-mode", "colorMode", { classSuffix: "", disableTransition: true });
    }
    kit.addPlugin({ src: resolve("./runtime/plugins/colors") });
    kit.addComponentsDir({
      path: resolve("./runtime/components"),
      prefix: options.prefix,
      pathPrefix: false
    });
    kit.addImportsDir(resolve("./runtime/composables"));
    templates.addTemplates(options, nuxt, resolve);
  }
});

module.exports = module$1;
