import { defineComponent, createBlock, openBlock, normalizeProps, guardReactiveProps, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../component/BaseSeparator.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Separator",
  props: {
    orientation: { default: "horizontal" },
    decorative: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=Separator.js.map
