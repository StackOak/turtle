import { defineComponent, createBlock, openBlock, normalizeProps, guardReactiveProps, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../Listbox/ListboxVirtualizer.js';
import { i as injectComboboxRootContext } from './ComboboxRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ComboboxVirtualizer",
  props: {
    options: {},
    overscan: {},
    estimateSize: {},
    textContent: { type: Function }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectComboboxRootContext();
    rootContext.isVirtual.value = true;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, normalizeProps(guardReactiveProps(props)), {
        default: withCtx((slotProps) => [
          renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps)))
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ComboboxVirtualizer.js.map
