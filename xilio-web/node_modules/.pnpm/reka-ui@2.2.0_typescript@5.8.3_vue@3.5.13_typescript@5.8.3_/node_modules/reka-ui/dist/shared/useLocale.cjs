'use strict';

const vue = require('vue');
const ConfigProvider_ConfigProvider = require('../ConfigProvider/ConfigProvider.cjs');

function useLocale(locale) {
  const context = ConfigProvider_ConfigProvider.injectConfigProviderContext({
    locale: vue.ref("en")
  });
  return vue.computed(() => locale?.value || context.locale?.value || "en");
}

exports.useLocale = useLocale;
//# sourceMappingURL=useLocale.cjs.map
