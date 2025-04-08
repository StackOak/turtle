import { defineComponent, onMounted, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { i as injectDialogRootContext } from './DialogRoot.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useId } from '../shared/useId.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DialogTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectDialogRootContext();
    const { forwardRef, currentElement } = useForwardExpose();
    rootContext.contentId ||= useId(void 0, "reka-dialog-content");
    onMounted(() => {
      rootContext.triggerElement.value = currentElement.value;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        ref: unref(forwardRef),
        type: _ctx.as === "button" ? "button" : void 0,
        "aria-haspopup": "dialog",
        "aria-expanded": unref(rootContext).open.value || false,
        "aria-controls": unref(rootContext).open.value ? unref(rootContext).contentId : void 0,
        "data-state": unref(rootContext).open.value ? "open" : "closed",
        onClick: unref(rootContext).onOpenToggle
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["type", "aria-expanded", "aria-controls", "data-state", "onClick"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=DialogTrigger.js.map
