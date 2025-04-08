'use strict';

const vue = require('vue');
const shared_createContext = require('../shared/createContext.cjs');

const [injectConfigProviderContext, provideConfigProviderContext] = shared_createContext.createContext("ConfigProvider");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ConfigProvider",
  props: {
    dir: { default: "ltr" },
    locale: { default: "en" },
    scrollBody: { type: [Boolean, Object], default: true },
    nonce: { default: void 0 },
    useId: { type: Function, default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const { dir, locale, scrollBody, nonce } = vue.toRefs(props);
    provideConfigProviderContext({
      dir,
      locale,
      scrollBody,
      nonce,
      useId: props.useId
    });
    return (_ctx, _cache) => {
      return vue.renderSlot(_ctx.$slots, "default");
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectConfigProviderContext = injectConfigProviderContext;
//# sourceMappingURL=ConfigProvider.cjs.map
