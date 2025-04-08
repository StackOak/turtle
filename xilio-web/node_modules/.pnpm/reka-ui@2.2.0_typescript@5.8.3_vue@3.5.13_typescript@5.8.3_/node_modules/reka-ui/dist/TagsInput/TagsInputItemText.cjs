'use strict';

const vue = require('vue');
const TagsInput_TagsInputItem = require('./TagsInputItem.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useId = require('../shared/useId.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "TagsInputItemText",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    const itemContext = TagsInput_TagsInputItem.injectTagsInputItemContext();
    shared_useForwardExpose.useForwardExpose();
    itemContext.textId ||= shared_useId.useId(void 0, "reka-tags-input-item-text");
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        id: vue.unref(itemContext).textId
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createTextVNode(vue.toDisplayString(vue.unref(itemContext).displayValue.value), 1)
          ])
        ]),
        _: 3
      }, 16, ["id"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=TagsInputItemText.cjs.map
