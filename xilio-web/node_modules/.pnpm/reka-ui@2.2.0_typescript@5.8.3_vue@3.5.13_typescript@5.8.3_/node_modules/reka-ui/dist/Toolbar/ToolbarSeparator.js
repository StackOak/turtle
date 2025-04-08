import { defineComponent, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../component/BaseSeparator.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectToolbarRootContext } from './ToolbarRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ToolbarSeparator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectToolbarRootContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, {
        orientation: unref(rootContext).orientation.value,
        "as-child": props.asChild,
        as: _ctx.as
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["orientation", "as-child", "as"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ToolbarSeparator.js.map
