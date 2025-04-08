'use strict';

const kit = require('@nuxt/kit');
const constant = require('reka-ui/constant');

const index = kit.defineNuxtModule({
  meta: {
    name: "@reka-ui/nuxt",
    configKey: "reka",
    compatibility: {
      nuxt: ">=3.0.0"
    }
  },
  defaults: {
    prefix: "",
    components: true
  },
  setup(options) {
    function getComponents() {
      if (typeof options.components === "object") {
        return Object.entries(constant.components).filter(([name]) => options.components[name]).flatMap(([_, components]) => components);
      }
      if (options.components)
        return Object.values(constant.components).flat();
      return [];
    }
    for (const component of getComponents()) {
      kit.addComponent({
        name: `${options.prefix}${component}`,
        export: component,
        filePath: "reka-ui"
      });
    }
  }
});

module.exports = index;
