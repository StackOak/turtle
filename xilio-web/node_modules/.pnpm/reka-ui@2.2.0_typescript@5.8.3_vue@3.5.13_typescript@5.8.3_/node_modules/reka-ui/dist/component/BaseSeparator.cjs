'use strict';

const vue = require('vue');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const computedOrientation = vue.computed(
      () => isValidOrientation(props.orientation) ? props.orientation : "horizontal"
    );
    const ariaOrientation = vue.computed(
      () => computedOrientation.value === "vertical" ? props.orientation : void 0
    );
    const semanticProps = vue.computed(
      () => props.decorative ? { role: "none" } : { "aria-orientation": ariaOrientation.value, "role": "separator" }
    );
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-orientation": computedOrientation.value
      }, semanticProps.value), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["as", "as-child", "data-orientation"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=BaseSeparator.cjs.map
