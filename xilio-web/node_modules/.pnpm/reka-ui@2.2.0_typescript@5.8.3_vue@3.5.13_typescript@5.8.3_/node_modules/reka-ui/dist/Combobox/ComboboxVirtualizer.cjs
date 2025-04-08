'use strict';

const vue = require('vue');
const Listbox_ListboxVirtualizer = require('../Listbox/ListboxVirtualizer.cjs');
const Combobox_ComboboxRoot = require('./ComboboxRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ComboboxVirtualizer",
  props: {
    options: {},
    overscan: {},
    estimateSize: {},
    textContent: { type: Function }
  },
  setup(__props) {
    const props = __props;
    const rootContext = Combobox_ComboboxRoot.injectComboboxRootContext();
    rootContext.isVirtual.value = true;
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Listbox_ListboxVirtualizer._sfc_main, vue.normalizeProps(vue.guardReactiveProps(props)), {
        default: vue.withCtx((slotProps) => [
          vue.renderSlot(_ctx.$slots, "default", vue.normalizeProps(vue.guardReactiveProps(slotProps)))
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ComboboxVirtualizer.cjs.map
