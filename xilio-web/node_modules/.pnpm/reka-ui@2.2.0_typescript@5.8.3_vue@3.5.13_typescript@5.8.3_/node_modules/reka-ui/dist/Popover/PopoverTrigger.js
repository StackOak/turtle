import { defineComponent, onMounted, createBlock, openBlock, resolveDynamicComponent, unref, withCtx, createVNode, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../Popper/PopperAnchor.js';
import { i as injectPopoverRootContext } from './PopoverRoot.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useId } from '../shared/useId.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PopoverTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectPopoverRootContext();
    const { forwardRef, currentElement: triggerElement } = useForwardExpose();
    rootContext.triggerId ||= useId(void 0, "reka-popover-trigger");
    onMounted(() => {
      rootContext.triggerElement.value = triggerElement.value;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(unref(rootContext).hasCustomAnchor.value ? unref(Primitive) : unref(_sfc_main$1)), { "as-child": "" }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            id: unref(rootContext).triggerId,
            ref: unref(forwardRef),
            type: _ctx.as === "button" ? "button" : void 0,
            "aria-haspopup": "dialog",
            "aria-expanded": unref(rootContext).open.value,
            "aria-controls": unref(rootContext).contentId,
            "data-state": unref(rootContext).open.value ? "open" : "closed",
            as: _ctx.as,
            "as-child": props.asChild,
            onClick: unref(rootContext).onOpenToggle
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["id", "type", "aria-expanded", "aria-controls", "data-state", "as", "as-child", "onClick"])
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=PopoverTrigger.js.map
