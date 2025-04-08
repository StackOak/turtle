'use strict';

const vue = require('vue');
const ConfigProvider_ConfigProvider = require('../ConfigProvider/ConfigProvider.cjs');

function useDirection(dir) {
  const context = ConfigProvider_ConfigProvider.injectConfigProviderContext({
    dir: vue.ref("ltr")
  });
  return vue.computed(() => dir?.value || context.dir?.value || "ltr");
}

exports.useDirection = useDirection;
//# sourceMappingURL=useDirection.cjs.map
