'use strict';

const vue = require('vue');
const Slider_SliderImpl = require('./SliderImpl.cjs');
const Slider_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Slider_SliderRoot = require('./SliderRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SliderVertical",
  props: {
    min: {},
    max: {},
    inverted: { type: Boolean }
  },
  emits: ["slideEnd", "slideStart", "slideMove", "homeKeyDown", "endKeyDown", "stepKeyDown"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { max, min, inverted } = vue.toRefs(props);
    const rootContext = Slider_SliderRoot.injectSliderRootContext();
    const { forwardRef, currentElement: sliderElement } = shared_useForwardExpose.useForwardExpose();
    const offsetPosition = vue.ref();
    const rectRef = vue.ref();
    const isSlidingFromBottom = vue.computed(() => !inverted.value);
    function getValueFromPointerEvent(event, slideStart) {
      const rect = rectRef.value || sliderElement.value.getBoundingClientRect();
      const thumb = [...rootContext.thumbElements.value][rootContext.valueIndexToChangeRef.value];
      const thumbHeight = rootContext.thumbAlignment.value === "contain" ? thumb.clientHeight : 0;
      if (!offsetPosition.value && !slideStart && rootContext.thumbAlignment.value === "contain") {
        offsetPosition.value = event.clientY - thumb.getBoundingClientRect().top;
      }
      const input = [0, rect.height - thumbHeight];
      const output = isSlidingFromBottom.value ? [max.value, min.value] : [min.value, max.value];
      const value = Slider_utils.linearScale(input, output);
      const position = slideStart ? event.clientY - rect.top - thumbHeight / 2 : event.clientY - rect.top - (offsetPosition.value ?? 0);
      rectRef.value = rect;
      return value(position);
    }
    Slider_utils.provideSliderOrientationContext({
      startEdge: isSlidingFromBottom.value ? "bottom" : "top",
      endEdge: isSlidingFromBottom.value ? "top" : "bottom",
      size: "height",
      direction: isSlidingFromBottom.value ? 1 : -1
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Slider_SliderImpl._sfc_main, {
        ref: vue.unref(forwardRef),
        "data-orientation": "vertical",
        style: vue.normalizeStyle({
          ["--reka-slider-thumb-transform"]: !isSlidingFromBottom.value && vue.unref(rootContext).thumbAlignment.value === "overflow" ? "translateY(-50%)" : "translateY(50%)"
        }),
        onSlideStart: _cache[0] || (_cache[0] = (event) => {
          const value = getValueFromPointerEvent(event, true);
          emits("slideStart", value);
        }),
        onSlideMove: _cache[1] || (_cache[1] = (event) => {
          const value = getValueFromPointerEvent(event);
          emits("slideMove", value);
        }),
        onSlideEnd: _cache[2] || (_cache[2] = () => {
          rectRef.value = void 0;
          offsetPosition.value = void 0;
          emits("slideEnd");
        }),
        onStepKeyDown: _cache[3] || (_cache[3] = (event) => {
          const slideDirection = isSlidingFromBottom.value ? "from-bottom" : "from-top";
          const isBackKey = vue.unref(Slider_utils.BACK_KEYS)[slideDirection].includes(event.key);
          emits("stepKeyDown", event, isBackKey ? -1 : 1);
        }),
        onEndKeyDown: _cache[4] || (_cache[4] = ($event) => emits("endKeyDown", $event)),
        onHomeKeyDown: _cache[5] || (_cache[5] = ($event) => emits("homeKeyDown", $event))
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["style"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SliderVertical.cjs.map
