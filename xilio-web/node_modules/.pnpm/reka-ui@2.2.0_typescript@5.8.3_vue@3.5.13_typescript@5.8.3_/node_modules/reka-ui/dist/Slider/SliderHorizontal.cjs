'use strict';

const vue = require('vue');
const Slider_SliderImpl = require('./SliderImpl.cjs');
const Slider_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Slider_SliderRoot = require('./SliderRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SliderHorizontal",
  props: {
    dir: {},
    min: {},
    max: {},
    inverted: { type: Boolean }
  },
  emits: ["slideEnd", "slideStart", "slideMove", "homeKeyDown", "endKeyDown", "stepKeyDown"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { max, min, dir, inverted } = vue.toRefs(props);
    const { forwardRef, currentElement: sliderElement } = shared_useForwardExpose.useForwardExpose();
    const rootContext = Slider_SliderRoot.injectSliderRootContext();
    const offsetPosition = vue.ref();
    const rectRef = vue.ref();
    const isSlidingFromLeft = vue.computed(() => dir?.value === "ltr" && !inverted.value || dir?.value !== "ltr" && inverted.value);
    function getValueFromPointerEvent(event, slideStart) {
      const rect = rectRef.value || sliderElement.value.getBoundingClientRect();
      const thumb = [...rootContext.thumbElements.value][rootContext.valueIndexToChangeRef.value];
      const thumbWidth = rootContext.thumbAlignment.value === "contain" ? thumb.clientWidth : 0;
      if (!offsetPosition.value && !slideStart && rootContext.thumbAlignment.value === "contain") {
        offsetPosition.value = event.clientX - thumb.getBoundingClientRect().left;
      }
      const input = [0, rect.width - thumbWidth];
      const output = isSlidingFromLeft.value ? [min.value, max.value] : [max.value, min.value];
      const value = Slider_utils.linearScale(input, output);
      rectRef.value = rect;
      const position = slideStart ? event.clientX - rect.left - thumbWidth / 2 : event.clientX - rect.left - (offsetPosition.value ?? 0);
      return value(position);
    }
    Slider_utils.provideSliderOrientationContext({
      startEdge: isSlidingFromLeft.value ? "left" : "right",
      endEdge: isSlidingFromLeft.value ? "right" : "left",
      direction: isSlidingFromLeft.value ? 1 : -1,
      size: "width"
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Slider_SliderImpl._sfc_main, {
        ref: vue.unref(forwardRef),
        dir: vue.unref(dir),
        "data-orientation": "horizontal",
        style: vue.normalizeStyle({
          ["--reka-slider-thumb-transform"]: !isSlidingFromLeft.value && vue.unref(rootContext).thumbAlignment.value === "overflow" ? "translateX(50%)" : "translateX(-50%)"
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
          const slideDirection = isSlidingFromLeft.value ? "from-left" : "from-right";
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
      }, 8, ["dir", "style"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SliderHorizontal.cjs.map
