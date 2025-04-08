'use strict';

const constant = require('reka-ui/constant');

function index(options = {}) {
  const { prefix = "" } = options;
  return {
    type: "component",
    resolve: (name) => {
      if (name.toLowerCase().startsWith(prefix.toLowerCase())) {
        const componentName = name.substring(prefix.length);
        if (Object.values(constant.components).flat().includes(componentName)) {
          return {
            name: componentName,
            from: "reka-ui"
          };
        }
      }
    }
  };
}

module.exports = index;
