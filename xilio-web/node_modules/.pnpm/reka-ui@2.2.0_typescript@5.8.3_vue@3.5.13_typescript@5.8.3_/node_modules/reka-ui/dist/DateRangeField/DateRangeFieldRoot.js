import { defineComponent, toRefs, ref, onMounted, computed, watch, nextTick, createBlock, openBlock, unref, mergeProps, withKeys, withCtx, renderSlot, createVNode } from 'vue';
import { useVModel } from '@vueuse/core';
import { n as getDefaultDate, h as hasTime, b as isBefore, d as isBeforeOrSame, m as areAllDaysBetweenValid } from '../date/comparators.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useLocale } from '../shared/useLocale.js';
import { u as useDirection } from '../shared/useDirection.js';
import { u as useDateFormatter } from '../shared/useDateFormatter.js';
import { u as usePrimitiveElement } from '../Primitive/usePrimitiveElement.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { _ as _sfc_main$1 } from '../VisuallyHidden/VisuallyHidden.js';
import { u as useKbd } from '../shared/useKbd.js';
import { g as getSegmentElements, i as isSegmentNavigationKey } from '../date/segment.js';
import { i as initializeSegmentValues, s as syncSegmentValues, c as createContent } from '../date/parser.js';

const [injectDateRangeFieldRootContext, provideDateRangeFieldRootContext] = createContext("DateRangeFieldRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "DateRangeFieldRoot",
  props: {
    defaultValue: { default: void 0 },
    defaultPlaceholder: {},
    placeholder: { default: void 0 },
    modelValue: {},
    hourCycle: {},
    granularity: {},
    hideTimeZone: { type: Boolean },
    maxValue: {},
    minValue: {},
    locale: {},
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    isDateUnavailable: { type: Function, default: void 0 },
    id: {},
    dir: {},
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue", "update:placeholder"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { disabled, readonly, isDateUnavailable: propsIsDateUnavailable, dir: propDir, locale: propLocale } = toRefs(props);
    const locale = useLocale(propLocale);
    const dir = useDirection(propDir);
    const formatter = useDateFormatter(locale.value);
    const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
    const segmentElements = ref(/* @__PURE__ */ new Set());
    onMounted(() => {
      getSegmentElements(parentElement.value).forEach((item) => segmentElements.value.add(item));
    });
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? { start: void 0, end: void 0 },
      passive: props.modelValue === void 0
    });
    const defaultDate = getDefaultDate({
      defaultPlaceholder: props.placeholder,
      granularity: props.granularity,
      defaultValue: modelValue.value?.start,
      locale: props.locale
    });
    const placeholder = useVModel(props, "placeholder", emits, {
      defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
      passive: props.placeholder === void 0
    });
    const inferredGranularity = computed(() => {
      if (props.granularity)
        return !hasTime(placeholder.value) ? "day" : props.granularity;
      return hasTime(placeholder.value) ? "minute" : "day";
    });
    const isStartInvalid = computed(() => {
      if (!modelValue.value?.start)
        return false;
      if (propsIsDateUnavailable.value?.(modelValue.value.start))
        return true;
      if (props.minValue && isBefore(modelValue.value.start, props.minValue))
        return true;
      if (props.maxValue && isBefore(props.maxValue, modelValue.value.start))
        return true;
      return false;
    });
    const isEndInvalid = computed(() => {
      if (!modelValue.value?.end)
        return false;
      if (propsIsDateUnavailable.value?.(modelValue.value.end))
        return true;
      if (props.minValue && isBefore(modelValue.value.end, props.minValue))
        return true;
      if (props.maxValue && isBefore(props.maxValue, modelValue.value.end))
        return true;
      return false;
    });
    const isInvalid = computed(() => {
      if (isStartInvalid.value || isEndInvalid.value)
        return true;
      if (!modelValue.value?.start || !modelValue.value?.end)
        return false;
      if (!isBeforeOrSame(modelValue.value.start, modelValue.value.end))
        return true;
      if (propsIsDateUnavailable.value !== void 0) {
        const allValid = areAllDaysBetweenValid(
          modelValue.value.start,
          modelValue.value.end,
          propsIsDateUnavailable.value,
          void 0
        );
        if (!allValid)
          return true;
      }
      return false;
    });
    const initialSegments = initializeSegmentValues(inferredGranularity.value);
    const startSegmentValues = ref(modelValue.value?.start ? { ...syncSegmentValues({ value: modelValue.value.start, formatter }) } : { ...initialSegments });
    const endSegmentValues = ref(modelValue.value?.end ? { ...syncSegmentValues({ value: modelValue.value.end, formatter }) } : { ...initialSegments });
    const startSegmentContent = computed(() => createContent({
      granularity: inferredGranularity.value,
      dateRef: placeholder.value,
      formatter,
      hideTimeZone: props.hideTimeZone,
      hourCycle: props.hourCycle,
      segmentValues: startSegmentValues.value,
      locale
    }));
    const endSegmentContent = computed(() => createContent({
      granularity: inferredGranularity.value,
      dateRef: placeholder.value,
      formatter,
      hideTimeZone: props.hideTimeZone,
      hourCycle: props.hourCycle,
      segmentValues: endSegmentValues.value,
      locale
    }));
    const segmentContents = computed(() => ({
      start: startSegmentContent.value.arr,
      end: endSegmentContent.value.arr
    }));
    const editableSegmentContents = computed(() => ({ start: segmentContents.value.start.filter(({ part }) => part !== "literal"), end: segmentContents.value.end.filter(({ part }) => part !== "literal") }));
    const startValue = ref(modelValue.value?.start?.copy());
    const endValue = ref(modelValue.value?.end?.copy());
    watch([startValue, endValue], ([_startValue, _endValue]) => {
      modelValue.value = { start: _startValue?.copy(), end: _endValue?.copy() };
    });
    watch(modelValue, (_modelValue) => {
      if (_modelValue && _modelValue.start && _modelValue.end) {
        if (!startValue.value || _modelValue.start.compare(startValue.value) !== 0)
          startValue.value = _modelValue.start.copy();
        if (!endValue.value || _modelValue.end.compare(endValue.value) !== 0)
          endValue.value = _modelValue.end.copy();
      }
      if (!_modelValue) {
        startValue.value = void 0;
        endValue.value = void 0;
      }
    });
    watch([startValue, locale], ([_startValue]) => {
      if (_startValue !== void 0) {
        startSegmentValues.value = { ...syncSegmentValues({ value: _startValue, formatter }) };
      } else if (Object.values(startSegmentValues.value).every((value) => value !== null) && _startValue === void 0) {
        startSegmentValues.value = { ...initialSegments };
      }
    });
    watch(locale, (value) => {
      if (formatter.getLocale() !== value) {
        formatter.setLocale(value);
        nextTick(() => {
          segmentElements.value.clear();
          getSegmentElements(parentElement.value).forEach((item) => segmentElements.value.add(item));
        });
      }
    });
    watch(modelValue, (_modelValue) => {
      if (_modelValue && _modelValue.start !== void 0 && placeholder.value.compare(_modelValue.start) !== 0)
        placeholder.value = _modelValue.start.copy();
    });
    watch([endValue, locale], ([_endValue]) => {
      if (_endValue !== void 0) {
        endSegmentValues.value = { ...syncSegmentValues({ value: _endValue, formatter }) };
      } else if (Object.values(endSegmentValues.value).every((value) => value !== null) && _endValue === void 0) {
        endSegmentValues.value = { ...initialSegments };
      }
    });
    const currentFocusedElement = ref(null);
    const currentSegmentIndex = computed(() => Array.from(segmentElements.value).findIndex((el) => el.getAttribute("data-reka-date-field-segment") === currentFocusedElement.value?.getAttribute("data-reka-date-field-segment") && el.getAttribute("data-reka-date-range-field-segment-type") === currentFocusedElement.value?.getAttribute("data-reka-date-range-field-segment-type")));
    const nextFocusableSegment = computed(() => {
      const sign = dir.value === "rtl" ? -1 : 1;
      const nextCondition = sign < 0 ? currentSegmentIndex.value < 0 : currentSegmentIndex.value > segmentElements.value.size - 1;
      if (nextCondition)
        return null;
      const segmentToFocus = Array.from(segmentElements.value)[currentSegmentIndex.value + sign];
      return segmentToFocus;
    });
    const prevFocusableSegment = computed(() => {
      const sign = dir.value === "rtl" ? -1 : 1;
      const prevCondition = sign > 0 ? currentSegmentIndex.value < 0 : currentSegmentIndex.value > segmentElements.value.size - 1;
      if (prevCondition)
        return null;
      const segmentToFocus = Array.from(segmentElements.value)[currentSegmentIndex.value - sign];
      return segmentToFocus;
    });
    const kbd = useKbd();
    function handleKeydown(e) {
      if (!isSegmentNavigationKey(e.key))
        return;
      if (e.key === kbd.ARROW_LEFT)
        prevFocusableSegment.value?.focus();
      if (e.key === kbd.ARROW_RIGHT)
        nextFocusableSegment.value?.focus();
    }
    function setFocusedElement(el) {
      currentFocusedElement.value = el;
    }
    provideDateRangeFieldRootContext({
      isDateUnavailable: propsIsDateUnavailable.value,
      locale,
      startValue,
      endValue,
      placeholder,
      disabled,
      formatter,
      hourCycle: props.hourCycle,
      readonly,
      segmentValues: { start: startSegmentValues, end: endSegmentValues },
      isInvalid,
      segmentContents: editableSegmentContents,
      elements: segmentElements,
      setFocusedElement,
      focusNext() {
        nextFocusableSegment.value?.focus();
      }
    });
    __expose({
      setFocusedElement
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(_ctx.$attrs, {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        role: "group",
        "aria-disabled": unref(disabled) ? true : void 0,
        "data-disabled": unref(disabled) ? "" : void 0,
        "data-readonly": unref(readonly) ? "" : void 0,
        "data-invalid": isInvalid.value ? "" : void 0,
        dir: unref(dir),
        onKeydown: withKeys(handleKeydown, ["left", "right"])
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {
            modelValue: unref(modelValue),
            segments: segmentContents.value
          }),
          createVNode(unref(_sfc_main$1), {
            id: _ctx.id,
            as: "input",
            feature: "focusable",
            tabindex: "-1",
            value: `${unref(modelValue)?.start?.toString()} - ${unref(modelValue)?.end?.toString()}`,
            name: _ctx.name,
            disabled: unref(disabled),
            required: _ctx.required,
            onFocus: _cache[0] || (_cache[0] = ($event) => Array.from(segmentElements.value)?.[0]?.focus())
          }, null, 8, ["id", "value", "name", "disabled", "required"])
        ]),
        _: 3
      }, 16, ["aria-disabled", "data-disabled", "data-readonly", "data-invalid", "dir"]);
    };
  }
});

export { _sfc_main as _, injectDateRangeFieldRootContext as i };
//# sourceMappingURL=DateRangeFieldRoot.js.map
