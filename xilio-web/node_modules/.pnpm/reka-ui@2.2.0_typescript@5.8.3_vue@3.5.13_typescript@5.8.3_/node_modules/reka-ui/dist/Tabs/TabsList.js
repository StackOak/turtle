import { defineComponent, toRefs, createBlock, openBlock, unref, withCtx, createVNode, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectTabsRootContext } from './TabsRoot.js';
import { _ as _sfc_main$1 } from '../RovingFocus/RovingFocusGroup.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TabsList",
  props: {
    loop: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { loop } = toRefs(props);
    const { forwardRef, currentElement } = useForwardExpose();
    const context = injectTabsRootContext();
    context.tabsList = currentElement;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        "as-child": "",
        orientation: unref(context).orientation.value,
        dir: unref(context).dir.value,
        loop: unref(loop)
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            ref: unref(forwardRef),
            role: "tablist",
            "as-child": _ctx.asChild,
            as: _ctx.as,
            "aria-orientation": unref(context).orientation.value
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["as-child", "as", "aria-orientation"])
        ]),
        _: 3
      }, 8, ["orientation", "dir", "loop"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=TabsList.js.map
