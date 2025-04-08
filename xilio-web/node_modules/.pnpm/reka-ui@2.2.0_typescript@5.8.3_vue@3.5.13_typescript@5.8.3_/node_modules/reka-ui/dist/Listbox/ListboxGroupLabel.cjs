'use strict';

const vue = require('vue');
const Listbox_ListboxGroup = require('./ListboxGroup.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ListboxGroupLabel",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(__props) {
    const props = __props;
    const groupContext = Listbox_ListboxGroup.injectListboxGroupContext({ id: "" });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        id: vue.unref(groupContext).id
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["id"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ListboxGroupLabel.cjs.map
