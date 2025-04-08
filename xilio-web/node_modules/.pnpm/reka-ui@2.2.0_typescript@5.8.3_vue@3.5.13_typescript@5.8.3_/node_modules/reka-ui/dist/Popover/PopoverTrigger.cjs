'use strict';

const vue = require('vue');
const Popper_PopperAnchor = require('../Popper/PopperAnchor.cjs');
const Popover_PopoverRoot = require('./PopoverRoot.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useId = require('../shared/useId.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "PopoverTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = Popover_PopoverRoot.injectPopoverRootContext();
    const { forwardRef, currentElement: triggerElement } = shared_useForwardExpose.useForwardExpose();
    rootContext.triggerId ||= shared_useId.useId(void 0, "reka-popover-trigger");
    vue.onMounted(() => {
      rootContext.triggerElement.value = triggerElement.value;
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(rootContext).hasCustomAnchor.value ? vue.unref(Primitive_Primitive.Primitive) : vue.unref(Popper_PopperAnchor._sfc_main)), { "as-child": "" }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            id: vue.unref(rootContext).triggerId,
            ref: vue.unref(forwardRef),
            type: _ctx.as === "button" ? "button" : void 0,
            "aria-haspopup": "dialog",
            "aria-expanded": vue.unref(rootContext).open.value,
            "aria-controls": vue.unref(rootContext).contentId,
            "data-state": vue.unref(rootContext).open.value ? "open" : "closed",
            as: _ctx.as,
            "as-child": props.asChild,
            onClick: vue.unref(rootContext).onOpenToggle
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["id", "type", "aria-expanded", "aria-controls", "data-state", "as", "as-child", "onClick"])
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=PopoverTrigger.cjs.map
