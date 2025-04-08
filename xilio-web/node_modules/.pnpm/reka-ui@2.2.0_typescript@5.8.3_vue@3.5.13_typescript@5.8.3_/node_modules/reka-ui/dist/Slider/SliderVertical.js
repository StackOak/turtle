import { defineComponent, toRefs, ref, computed, createBlock, openBlock, normalizeStyle, unref, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './SliderImpl.js';
import { p as provideSliderOrientationContext, B as BACK_KEYS, l as linearScale } from './utils.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectSliderRootContext } from './SliderRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const { max, min, inverted } = toRefs(props);
    const rootContext = injectSliderRootContext();
    const { forwardRef, currentElement: sliderElement } = useForwardExpose();
    const offsetPosition = ref();
    const rectRef = ref();
    const isSlidingFromBottom = computed(() => !inverted.value);
    function getValueFromPointerEvent(event, slideStart) {
      const rect = rectRef.value || sliderElement.value.getBoundingClientRect();
      const thumb = [...rootContext.thumbElements.value][rootContext.valueIndexToChangeRef.value];
      const thumbHeight = rootContext.thumbAlignment.value === "contain" ? thumb.clientHeight : 0;
      if (!offsetPosition.value && !slideStart && rootContext.thumbAlignment.value === "contain") {
        offsetPosition.value = event.clientY - thumb.getBoundingClientRect().top;
      }
      const input = [0, rect.height - thumbHeight];
      const output = isSlidingFromBottom.value ? [max.value, min.value] : [min.value, max.value];
      const value = linearScale(input, output);
      const position = slideStart ? event.clientY - rect.top - thumbHeight / 2 : event.clientY - rect.top - (offsetPosition.value ?? 0);
      rectRef.value = rect;
      return value(position);
    }
    provideSliderOrientationContext({
      startEdge: isSlidingFromBottom.value ? "bottom" : "top",
      endEdge: isSlidingFromBottom.value ? "top" : "bottom",
      size: "height",
      direction: isSlidingFromBottom.value ? 1 : -1
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, {
        ref: unref(forwardRef),
        "data-orientation": "vertical",
        style: normalizeStyle({
          ["--reka-slider-thumb-transform"]: !isSlidingFromBottom.value && unref(rootContext).thumbAlignment.value === "overflow" ? "translateY(-50%)" : "translateY(50%)"
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
          const isBackKey = unref(BACK_KEYS)[slideDirection].includes(event.key);
          emits("stepKeyDown", event, isBackKey ? -1 : 1);
        }),
        onEndKeyDown: _cache[4] || (_cache[4] = ($event) => emits("endKeyDown", $event)),
        onHomeKeyDown: _cache[5] || (_cache[5] = ($event) => emits("homeKeyDown", $event))
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["style"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=SliderVertical.js.map
