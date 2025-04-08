'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const TagsInput_TagsInputRoot = require('./TagsInputRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "TagsInputClear",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    shared_useForwardExpose.useForwardExpose();
    const context = TagsInput_TagsInputRoot.injectTagsInputRootContext();
    function handleCancel() {
      if (context.disabled.value)
        return;
      context.modelValue.value = [];
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        type: _ctx.as === "button" ? "button" : void 0,
        "data-disabled": vue.unref(context).disabled.value ? "" : void 0,
        onClick: handleCancel
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["type", "data-disabled"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=TagsInputClear.cjs.map
