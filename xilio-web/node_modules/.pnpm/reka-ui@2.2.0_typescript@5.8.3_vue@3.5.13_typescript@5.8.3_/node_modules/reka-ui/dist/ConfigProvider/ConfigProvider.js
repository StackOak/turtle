import { defineComponent, toRefs, renderSlot } from 'vue';
import { c as createContext } from '../shared/createContext.js';

const [injectConfigProviderContext, provideConfigProviderContext] = createContext("ConfigProvider");
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const { dir, locale, scrollBody, nonce } = toRefs(props);
    provideConfigProviderContext({
      dir,
      locale,
      scrollBody,
      nonce,
      useId: props.useId
    });
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});

export { _sfc_main as _, injectConfigProviderContext as i };
//# sourceMappingURL=ConfigProvider.js.map
