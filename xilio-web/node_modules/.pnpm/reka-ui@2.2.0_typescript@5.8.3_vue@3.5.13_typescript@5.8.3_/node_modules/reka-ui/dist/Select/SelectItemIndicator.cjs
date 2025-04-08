'use strict';

const vue = require('vue');
const Select_SelectItem = require('./SelectItem.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SelectItemIndicator",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    const itemContext = Select_SelectItem.injectSelectItemContext();
    return (_ctx, _cache) => {
      return vue.unref(itemContext).isSelected.value ? (vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
        key: 0,
        "aria-hidden": "true"
      }, props), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16)) : vue.createCommentVNode("", true);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SelectItemIndicator.cjs.map
