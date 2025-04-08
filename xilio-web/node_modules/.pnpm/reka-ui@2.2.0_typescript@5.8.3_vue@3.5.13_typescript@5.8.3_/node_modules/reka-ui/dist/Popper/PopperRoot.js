import { defineComponent, ref, renderSlot } from 'vue';
import { c as createContext } from '../shared/createContext.js';

const [injectPopperRootContext, providePopperRootContext] = createContext("PopperRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PopperRoot",
  setup(__props) {
    const anchor = ref();
    providePopperRootContext({
      anchor,
      onAnchorChange: (element) => anchor.value = element
    });
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});

export { _sfc_main as _, injectPopperRootContext as i };
//# sourceMappingURL=PopperRoot.js.map
