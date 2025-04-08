'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Combobox_ComboboxGroup = require('./ComboboxGroup.cjs');
const shared_useId = require('../shared/useId.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ComboboxLabel",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(__props) {
    const props = __props;
    shared_useForwardExpose.useForwardExpose();
    const groupContext = Combobox_ComboboxGroup.injectComboboxGroupContext({ id: "", labelId: "" });
    groupContext.labelId ||= shared_useId.useId(void 0, "reka-combobox-group-label");
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        id: vue.unref(groupContext).labelId
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
//# sourceMappingURL=ComboboxLabel.cjs.map
