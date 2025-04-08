import { defineComponent, computed, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseSeparator",
  props: {
    orientation: { default: "horizontal" },
    decorative: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const ORIENTATIONS = ["horizontal", "vertical"];
    function isValidOrientation(orientation) {
      return ORIENTATIONS.includes(orientation);
    }
    const computedOrientation = computed(
      () => isValidOrientation(props.orientation) ? props.orientation : "horizontal"
    );
    const ariaOrientation = computed(
      () => computedOrientation.value === "vertical" ? props.orientation : void 0
    );
    const semanticProps = computed(
      () => props.decorative ? { role: "none" } : { "aria-orientation": ariaOrientation.value, "role": "separator" }
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps({
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-orientation": computedOrientation.value
      }, semanticProps.value), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["as", "as-child", "data-orientation"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=BaseSeparator.js.map
