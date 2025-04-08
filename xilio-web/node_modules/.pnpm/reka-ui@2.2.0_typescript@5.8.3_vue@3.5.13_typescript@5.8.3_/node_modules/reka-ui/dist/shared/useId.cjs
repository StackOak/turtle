'use strict';

const vue = require('vue');
const ConfigProvider_ConfigProvider = require('../ConfigProvider/ConfigProvider.cjs');

function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const k in e) {
      if (k !== 'default') {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}

const vue__namespace = /*#__PURE__*/_interopNamespaceDefault(vue);

let count = 0;
function useId(deterministicId, prefix = "reka") {
  if (deterministicId)
    return deterministicId;
  const configProviderContext = ConfigProvider_ConfigProvider.injectConfigProviderContext({ useId: void 0 });
  if (vue__namespace.useId) {
    return `${prefix}-${vue__namespace.useId()}`;
  } else if (configProviderContext.useId) {
    return `${prefix}-${configProviderContext.useId()}`;
  }
  return `${prefix}-${++count}`;
}

exports.useId = useId;
//# sourceMappingURL=useId.cjs.map
