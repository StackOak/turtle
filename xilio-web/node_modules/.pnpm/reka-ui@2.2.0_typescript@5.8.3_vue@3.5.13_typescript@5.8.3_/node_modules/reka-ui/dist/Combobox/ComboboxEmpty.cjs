'use strict';

const vue = require('vue');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Combobox_ComboboxRoot = require('./ComboboxRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ComboboxEmpty",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = Combobox_ComboboxRoot.injectComboboxRootContext();
    const isRender = vue.computed(
      () => rootContext.ignoreFilter.value ? rootContext.allItems.value.size === 0 : !!rootContext.filterState.search && rootContext.filterState.filtered.count === 0
    );
    return (_ctx, _cache) => {
      return isRender.value ? (vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.normalizeProps(vue.mergeProps({ key: 0 }, props)), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            _cache[0] || (_cache[0] = vue.createTextVNode("No options"))
          ])
        ]),
        _: 3
      }, 16)) : vue.createCommentVNode("", true);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ComboboxEmpty.cjs.map
