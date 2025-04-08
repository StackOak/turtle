import { defineNuxtModule, addComponent } from '@nuxt/kit';
import { components } from 'reka-ui/constant';

const index = defineNuxtModule({
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
        return Object.entries(components).filter(([name]) => options.components[name]).flatMap(([_, components]) => components);
      }
      if (options.components)
        return Object.values(components).flat();
      return [];
    }
    for (const component of getComponents()) {
      addComponent({
        name: `${options.prefix}${component}`,
        export: component,
        filePath: "reka-ui"
      });
    }
  }
});

export { index as default };
