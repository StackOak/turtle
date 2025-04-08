import { defineComponent, toRefs, ref, computed, onMounted, watch, nextTick, createBlock, openBlock, unref, mergeProps, withKeys, withCtx, renderSlot, createVNode } from 'vue';
import { useVModel } from '@vueuse/core';
import { today, Time, isEqualDay, toCalendarDateTime, getLocalTimeZone } from '@internationalized/date';
import { o as getDefaultTime, b as isBefore } from '../date/comparators.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useLocale } from '../shared/useLocale.js';
import { u as useDirection } from '../shared/useDirection.js';
import { u as useDateFormatter } from '../shared/useDateFormatter.js';
import { u as usePrimitiveElement } from '../Primitive/usePrimitiveElement.js';
import { a as getTimeFieldSegmentElements, i as isSegmentNavigationKey } from '../date/segment.js';
import { a as initializeTimeSegmentValues, b as syncTimeSegmentValues, c as createContent } from '../date/parser.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { _ as _sfc_main$1 } from '../VisuallyHidden/VisuallyHidden.js';
import { u as useKbd } from '../shared/useKbd.js';
import { i as isNullish } from '../shared/nullish.js';

const [injectTimeFieldRootContext, provideTimeFieldRootContext] = createContext("TimeFieldRoot");
function convertValue(value, date = today(getLocalTimeZone())) {
  if (value && "day" in value) {
    return value;
  }
  return toCalendarDateTime(date, value);
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "TimeFieldRoot",
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
    const { disabled, readonly, granularity, defaultValue, minValue, maxValue, dir: propDir, locale: propLocale } = toRefs(props);
    const locale = useLocale(propLocale);
    const dir = useDirection(propDir);
    const formatter = useDateFormatter(locale.value);
    const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
    const segmentElements = ref(/* @__PURE__ */ new Set());
    const convertedMinValue = computed(() => minValue.value ? convertValue(minValue.value) : void 0);
    const convertedMaxValue = computed(() => maxValue.value ? convertValue(maxValue.value) : void 0);
    onMounted(() => {
      getTimeFieldSegmentElements(parentElement.value).forEach((item) => segmentElements.value.add(item));
    });
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: defaultValue.value,
      passive: props.modelValue === void 0
    });
    const convertedModelValue = computed({
      get() {
        if (isNullish(modelValue.value))
          return modelValue.value;
        return convertValue(modelValue.value);
      },
      set(newValue) {
        if (newValue)
          modelValue.value = modelValue.value && "day" in modelValue.value ? newValue : new Time(newValue.hour, newValue.minute, newValue.second, modelValue.value?.millisecond);
        return newValue;
      }
    });
    const defaultDate = getDefaultTime({
      defaultPlaceholder: props.placeholder,
      defaultValue: modelValue.value
    });
    const placeholder = useVModel(props, "placeholder", emits, {
      defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
      passive: props.placeholder === void 0
    });
    const convertedPlaceholder = computed({
      get() {
        return convertValue(placeholder.value);
      },
      set(newValue) {
        if (newValue)
          placeholder.value = "day" in placeholder.value ? newValue.copy() : new Time(newValue.hour, newValue.minute, newValue.second, placeholder.value?.millisecond);
        return newValue;
      }
    });
    const inferredGranularity = computed(() => {
      if (granularity.value)
        return granularity.value;
      return "minute";
    });
    const isInvalid = computed(() => {
      if (!modelValue.value)
        return false;
      if (convertedMinValue.value && isBefore(convertedModelValue.value, convertedMinValue.value))
        return true;
      if (convertedMaxValue.value && isBefore(convertedMaxValue.value, convertedModelValue.value))
        return true;
      return false;
    });
    const initialSegments = initializeTimeSegmentValues(inferredGranularity.value);
    const segmentValues = ref(modelValue.value ? { ...syncTimeSegmentValues({ value: convertedModelValue.value, formatter }) } : { ...initialSegments });
    const allSegmentContent = computed(() => createContent({
      granularity: inferredGranularity.value,
      dateRef: convertedPlaceholder.value,
      formatter,
      hideTimeZone: props.hideTimeZone,
      hourCycle: props.hourCycle,
      segmentValues: segmentValues.value,
      locale,
      isTimeValue: true
    }));
    const segmentContents = computed(() => allSegmentContent.value.arr);
    const editableSegmentContents = computed(() => segmentContents.value.filter(({ part }) => part !== "literal"));
    watch(locale, (value) => {
      if (formatter.getLocale() !== value) {
        formatter.setLocale(value);
        nextTick(() => {
          segmentElements.value.clear();
          getTimeFieldSegmentElements(parentElement.value).forEach((item) => segmentElements.value.add(item));
        });
      }
    });
    watch(convertedModelValue, (_modelValue) => {
      if (!isNullish(_modelValue) && (!isEqualDay(convertedPlaceholder.value, _modelValue) || convertedPlaceholder.value.compare(_modelValue) !== 0))
        placeholder.value = _modelValue.copy();
    });
    watch([convertedModelValue, locale], ([_modelValue]) => {
      if (!isNullish(_modelValue)) {
        segmentValues.value = { ...syncTimeSegmentValues({ value: _modelValue, formatter }) };
      } else if (Object.values(segmentValues.value).every((value) => value === null) || isNullish(_modelValue)) {
        segmentValues.value = { ...initialSegments };
      }
    });
    const currentFocusedElement = ref(null);
    const currentSegmentIndex = computed(() => Array.from(segmentElements.value).findIndex((el) => el.getAttribute("data-reka-time-field-segment") === currentFocusedElement.value?.getAttribute("data-reka-time-field-segment")));
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
    provideTimeFieldRootContext({
      locale,
      modelValue: convertedModelValue,
      placeholder: convertedPlaceholder,
      disabled,
      formatter,
      hourCycle: props.hourCycle,
      readonly,
      segmentValues,
      isInvalid,
      segmentContents: editableSegmentContents,
      elements: segmentElements,
      setFocusedElement,
      focusNext() {
        nextFocusableSegment.value?.focus();
      }
    });
    __expose({
      /** Helper to set the focused element inside the DateField */
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
            segments: segmentContents.value,
            isInvalid: isInvalid.value
          }),
          createVNode(unref(_sfc_main$1), {
            id: _ctx.id,
            as: "input",
            feature: "focusable",
            tabindex: "-1",
            value: unref(modelValue) ? unref(modelValue).toString() : "",
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

export { _sfc_main as _, injectTimeFieldRootContext as i };
//# sourceMappingURL=TimeFieldRoot.js.map
