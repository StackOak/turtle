'use strict';

const vue = require('vue');
const ConfigProvider_ConfigProvider = require('../ConfigProvider/ConfigProvider.cjs');

function useNonce(nonce) {
  const context = ConfigProvider_ConfigProvider.injectConfigProviderContext({
    nonce: vue.ref()
  });
  return vue.computed(() => nonce?.value || context.nonce?.value);
}

exports.useNonce = useNonce;
//# sourceMappingURL=useNonce.cjs.map
