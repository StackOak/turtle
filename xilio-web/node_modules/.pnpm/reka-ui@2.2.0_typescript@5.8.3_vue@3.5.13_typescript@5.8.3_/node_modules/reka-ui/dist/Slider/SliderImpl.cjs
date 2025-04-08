'use strict';

const vue = require('vue');
const Slider_utils = require('./utils.cjs');
const Slider_SliderRoot = require('./SliderRoot.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SliderImpl",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  emits: ["slideStart", "slideMove", "slideEnd", "homeKeyDown", "endKeyDown", "stepKeyDown"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = Slider_SliderRoot.injectSliderRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({ "data-slider-impl": "" }, props, {
        onKeydown: _cache[0] || (_cache[0] = (event) => {
          if (event.key === "Home") {
            emits("homeKeyDown", event);
            event.preventDefault();
          } else if (event.key === "End") {
            emits("endKeyDown", event);
            event.preventDefault();
          } else if (vue.unref(Slider_utils.PAGE_KEYS).concat(vue.unref(Slider_utils.ARROW_KEYS)).includes(event.key)) {
            emits("stepKeyDown", event);
            event.preventDefault();
          }
        }),
        onPointerdown: _cache[1] || (_cache[1] = (event) => {
          const target = event.target;
          target.setPointerCapture(event.pointerId);
          event.preventDefault();
          if (vue.unref(rootContext).thumbElements.value.includes(target)) {
            target.focus();
          } else {
            emits("slideStart", event);
          }
        }),
        onPointermove: _cache[2] || (_cache[2] = (event) => {
          const target = event.target;
          if (target.hasPointerCapture(event.pointerId)) emits("slideMove", event);
        }),
        onPointerup: _cache[3] || (_cache[3] = (event) => {
          const target = event.target;
          if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
            emits("slideEnd", event);
          }
        })
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SliderImpl.cjs.map
