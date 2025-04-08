import { defu } from 'defu';
import { defineNuxtModule, createResolver, addVitePlugin, addPlugin, addComponentsDir, addImportsDir, hasNuxtModule, installModule } from '@nuxt/kit';
import { d as defaultOptions, r as resolveColors, a as getDefaultUiConfig, b as addTemplates } from './shared/ui.BkNUP964.mjs';
import '../dist/runtime/utils/index.js';
import 'node:url';
import 'scule';
import 'tailwindcss/colors';

const module = defineNuxtModule({
  meta: {
    name: "ui",
    configKey: "ui",
    compatibility: {
      nuxt: ">=3.16.0"
    },
    docs: "https://ui.nuxt.com/getting-started/installation/nuxt"
  },
  defaults: defaultOptions,
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    options.theme = options.theme || {};
    options.theme.colors = resolveColors(options.theme.colors);
    nuxt.options.ui = options;
    nuxt.options.alias["#ui"] = resolve("./runtime");
    nuxt.options.appConfig.ui = defu(nuxt.options.appConfig.ui || {}, getDefaultUiConfig(options.theme.colors));
    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {};
    nuxt.options.app.rootAttrs.class = [nuxt.options.app.rootAttrs.class, "isolate"].filter(Boolean).join(" ");
    if (nuxt.options.builder === "@nuxt/vite-builder") {
      const plugin = await import('@tailwindcss/vite').then((r) => r.default);
      addVitePlugin(plugin());
    } else {
      nuxt.options.postcss.plugins["@tailwindcss/postcss"] = {};
    }
    async function registerModule(name, key, options2) {
      if (!hasNuxtModule(name)) {
        await installModule(name, options2);
      } else {
        nuxt.options[key] = defu(nuxt.options[key], options2);
      }
    }
    await registerModule("@nuxt/icon", "icon", { cssLayer: "components" });
    if (options.fonts) {
      await registerModule("@nuxt/fonts", "fonts", { experimental: { processCSSVariables: true } });
    }
    if (options.colorMode) {
      await registerModule("@nuxtjs/color-mode", "colorMode", { classSuffix: "", disableTransition: true });
    }
    addPlugin({ src: resolve("./runtime/plugins/colors") });
    addComponentsDir({
      path: resolve("./runtime/components"),
      prefix: options.prefix,
      pathPrefix: false
    });
    addImportsDir(resolve("./runtime/composables"));
    addTemplates(options, nuxt, resolve);
  }
});

export { module as default };
