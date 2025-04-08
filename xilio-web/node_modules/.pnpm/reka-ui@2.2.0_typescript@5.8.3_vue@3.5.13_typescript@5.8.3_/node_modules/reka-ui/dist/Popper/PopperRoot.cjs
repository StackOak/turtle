'use strict';

const vue = require('vue');
const shared_createContext = require('../shared/createContext.cjs');

const [injectPopperRootContext, providePopperRootContext] = shared_createContext.createContext("PopperRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PopperRoot",
  setup(__props) {
    const anchor = vue.ref();
    providePopperRootContext({
      anchor,
      onAnchorChange: (element) => anchor.value = element
    });
    return (_ctx, _cache) => {
      return vue.renderSlot(_ctx.$slots, "default");
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectPopperRootContext = injectPopperRootContext;
//# sourceMappingURL=PopperRoot.cjs.map
