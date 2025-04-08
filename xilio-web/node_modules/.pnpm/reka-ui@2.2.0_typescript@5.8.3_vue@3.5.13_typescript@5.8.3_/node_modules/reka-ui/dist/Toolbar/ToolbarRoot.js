import { defineComponent, toRefs, createBlock, openBlock, unref, withCtx, createVNode, renderSlot } from 'vue';
import { c as createContext } from '../shared/createContext.js';
import { u as useDirection } from '../shared/useDirection.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { _ as _sfc_main$1 } from '../RovingFocus/RovingFocusGroup.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const [injectToolbarRootContext, provideToolbarRootContext] = createContext("ToolbarRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ToolbarRoot",
  props: {
    orientation: { default: "horizontal" },
    dir: {},
    loop: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { orientation, dir: propDir } = toRefs(props);
    const dir = useDirection(propDir);
    const { forwardRef } = useForwardExpose();
    provideToolbarRootContext({ orientation, dir });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        "as-child": "",
        orientation: unref(orientation),
        dir: unref(dir),
        loop: _ctx.loop
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            ref: unref(forwardRef),
            role: "toolbar",
            "aria-orientation": unref(orientation),
            "as-child": _ctx.asChild,
            as: _ctx.as
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["aria-orientation", "as-child", "as"])
        ]),
        _: 3
      }, 8, ["orientation", "dir", "loop"]);
    };
  }
});

export { _sfc_main as _, injectToolbarRootContext as i };
//# sourceMappingURL=ToolbarRoot.js.map
