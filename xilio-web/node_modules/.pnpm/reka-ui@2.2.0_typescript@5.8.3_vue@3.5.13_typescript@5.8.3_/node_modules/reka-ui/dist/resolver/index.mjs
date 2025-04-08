import { components } from 'reka-ui/constant';

function index(options = {}) {
  const { prefix = "" } = options;
  return {
    type: "component",
    resolve: (name) => {
      if (name.toLowerCase().startsWith(prefix.toLowerCase())) {
        const componentName = name.substring(prefix.length);
        if (Object.values(components).flat().includes(componentName)) {
          return {
            name: componentName,
            from: "reka-ui"
          };
        }
      }
    }
  };
}

export { index as default };
