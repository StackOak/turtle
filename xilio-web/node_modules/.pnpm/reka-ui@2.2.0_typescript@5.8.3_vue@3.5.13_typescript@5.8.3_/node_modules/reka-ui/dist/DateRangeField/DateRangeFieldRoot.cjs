'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const date_comparators = require('../date/comparators.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useLocale = require('../shared/useLocale.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_useDateFormatter = require('../shared/useDateFormatter.cjs');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const VisuallyHidden_VisuallyHidden = require('../VisuallyHidden/VisuallyHidden.cjs');
const shared_useKbd = require('../shared/useKbd.cjs');
const date_segment = require('../date/segment.cjs');
const date_parser = require('../date/parser.cjs');

const [injectDateRangeFieldRootContext, provideDateRangeFieldRootContext] = shared_createContext.createContext("DateRangeFieldRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const { disabled, readonly, isDateUnavailable: propsIsDateUnavailable, dir: propDir, locale: propLocale } = vue.toRefs(props);
    const locale = shared_useLocale.useLocale(propLocale);
    const dir = shared_useDirection.useDirection(propDir);
    const formatter = shared_useDateFormatter.useDateFormatter(locale.value);
    const { primitiveElement, currentElement: parentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
    const segmentElements = vue.ref(/* @__PURE__ */ new Set());
    vue.onMounted(() => {
      date_segment.getSegmentElements(parentElement.value).forEach((item) => segmentElements.value.add(item));
    });
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? { start: void 0, end: void 0 },
      passive: props.modelValue === void 0
    });
    const defaultDate = date_comparators.getDefaultDate({
      defaultPlaceholder: props.placeholder,
      granularity: props.granularity,
      defaultValue: modelValue.value?.start,
      locale: props.locale
    });
    const placeholder = core.useVModel(props, "placeholder", emits, {
      defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
      passive: props.placeholder === void 0
    });
    const inferredGranularity = vue.computed(() => {
      if (props.granularity)
        return !date_comparators.hasTime(placeholder.value) ? "day" : props.granularity;
      return date_comparators.hasTime(placeholder.value) ? "minute" : "day";
    });
    const isStartInvalid = vue.computed(() => {
      if (!modelValue.value?.start)
        return false;
      if (propsIsDateUnavailable.value?.(modelValue.value.start))
        return true;
      if (props.minValue && date_comparators.isBefore(modelValue.value.start, props.minValue))
        return true;
      if (props.maxValue && date_comparators.isBefore(props.maxValue, modelValue.value.start))
        return true;
      return false;
    });
    const isEndInvalid = vue.computed(() => {
      if (!modelValue.value?.end)
        return false;
      if (propsIsDateUnavailable.value?.(modelValue.value.end))
        return true;
      if (props.minValue && date_comparators.isBefore(modelValue.value.end, props.minValue))
        return true;
      if (props.maxValue && date_comparators.isBefore(props.maxValue, modelValue.value.end))
        return true;
      return false;
    });
    const isInvalid = vue.computed(() => {
      if (isStartInvalid.value || isEndInvalid.value)
        return true;
      if (!modelValue.value?.start || !modelValue.value?.end)
        return false;
      if (!date_comparators.isBeforeOrSame(modelValue.value.start, modelValue.value.end))
        return true;
      if (propsIsDateUnavailable.value !== void 0) {
        const allValid = date_comparators.areAllDaysBetweenValid(
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
    const initialSegments = date_parser.initializeSegmentValues(inferredGranularity.value);
    const startSegmentValues = vue.ref(modelValue.value?.start ? { ...date_parser.syncSegmentValues({ value: modelValue.value.start, formatter }) } : { ...initialSegments });
    const endSegmentValues = vue.ref(modelValue.value?.end ? { ...date_parser.syncSegmentValues({ value: modelValue.value.end, formatter }) } : { ...initialSegments });
    const startSegmentContent = vue.computed(() => date_parser.createContent({
      granularity: inferredGranularity.value,
      dateRef: placeholder.value,
      formatter,
      hideTimeZone: props.hideTimeZone,
      hourCycle: props.hourCycle,
      segmentValues: startSegmentValues.value,
      locale
    }));
    const endSegmentContent = vue.computed(() => date_parser.createContent({
      granularity: inferredGranularity.value,
      dateRef: placeholder.value,
      formatter,
      hideTimeZone: props.hideTimeZone,
      hourCycle: props.hourCycle,
      segmentValues: endSegmentValues.value,
      locale
    }));
    const segmentContents = vue.computed(() => ({
      start: startSegmentContent.value.arr,
      end: endSegmentContent.value.arr
    }));
    const editableSegmentContents = vue.computed(() => ({ start: segmentContents.value.start.filter(({ part }) => part !== "literal"), end: segmentContents.value.end.filter(({ part }) => part !== "literal") }));
    const startValue = vue.ref(modelValue.value?.start?.copy());
    const endValue = vue.ref(modelValue.value?.end?.copy());
    vue.watch([startValue, endValue], ([_startValue, _endValue]) => {
      modelValue.value = { start: _startValue?.copy(), end: _endValue?.copy() };
    });
    vue.watch(modelValue, (_modelValue) => {
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
    vue.watch([startValue, locale], ([_startValue]) => {
      if (_startValue !== void 0) {
        startSegmentValues.value = { ...date_parser.syncSegmentValues({ value: _startValue, formatter }) };
      } else if (Object.values(startSegmentValues.value).every((value) => value !== null) && _startValue === void 0) {
        startSegmentValues.value = { ...initialSegments };
      }
    });
    vue.watch(locale, (value) => {
      if (formatter.getLocale() !== value) {
        formatter.setLocale(value);
        vue.nextTick(() => {
          segmentElements.value.clear();
          date_segment.getSegmentElements(parentElement.value).forEach((item) => segmentElements.value.add(item));
        });
      }
    });
    vue.watch(modelValue, (_modelValue) => {
      if (_modelValue && _modelValue.start !== void 0 && placeholder.value.compare(_modelValue.start) !== 0)
        placeholder.value = _modelValue.start.copy();
    });
    vue.watch([endValue, locale], ([_endValue]) => {
      if (_endValue !== void 0) {
        endSegmentValues.value = { ...date_parser.syncSegmentValues({ value: _endValue, formatter }) };
      } else if (Object.values(endSegmentValues.value).every((value) => value !== null) && _endValue === void 0) {
        endSegmentValues.value = { ...initialSegments };
      }
    });
    const currentFocusedElement = vue.ref(null);
    const currentSegmentIndex = vue.computed(() => Array.from(segmentElements.value).findIndex((el) => el.getAttribute("data-reka-date-field-segment") === currentFocusedElement.value?.getAttribute("data-reka-date-field-segment") && el.getAttribute("data-reka-date-range-field-segment-type") === currentFocusedElement.value?.getAttribute("data-reka-date-range-field-segment-type")));
    const nextFocusableSegment = vue.computed(() => {
      const sign = dir.value === "rtl" ? -1 : 1;
      const nextCondition = sign < 0 ? currentSegmentIndex.value < 0 : currentSegmentIndex.value > segmentElements.value.size - 1;
      if (nextCondition)
        return null;
      const segmentToFocus = Array.from(segmentElements.value)[currentSegmentIndex.value + sign];
      return segmentToFocus;
    });
    const prevFocusableSegment = vue.computed(() => {
      const sign = dir.value === "rtl" ? -1 : 1;
      const prevCondition = sign > 0 ? currentSegmentIndex.value < 0 : currentSegmentIndex.value > segmentElements.value.size - 1;
      if (prevCondition)
        return null;
      const segmentToFocus = Array.from(segmentElements.value)[currentSegmentIndex.value - sign];
      return segmentToFocus;
    });
    const kbd = shared_useKbd.useKbd();
    function handleKeydown(e) {
      if (!date_segment.isSegmentNavigationKey(e.key))
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
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(_ctx.$attrs, {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        role: "group",
        "aria-disabled": vue.unref(disabled) ? true : void 0,
        "data-disabled": vue.unref(disabled) ? "" : void 0,
        "data-readonly": vue.unref(readonly) ? "" : void 0,
        "data-invalid": isInvalid.value ? "" : void 0,
        dir: vue.unref(dir),
        onKeydown: vue.withKeys(handleKeydown, ["left", "right"])
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {
            modelValue: vue.unref(modelValue),
            segments: segmentContents.value
          }),
          vue.createVNode(vue.unref(VisuallyHidden_VisuallyHidden._sfc_main), {
            id: _ctx.id,
            as: "input",
            feature: "focusable",
            tabindex: "-1",
            value: `${vue.unref(modelValue)?.start?.toString()} - ${vue.unref(modelValue)?.end?.toString()}`,
            name: _ctx.name,
            disabled: vue.unref(disabled),
            required: _ctx.required,
            onFocus: _cache[0] || (_cache[0] = ($event) => Array.from(segmentElements.value)?.[0]?.focus())
          }, null, 8, ["id", "value", "name", "disabled", "required"])
        ]),
        _: 3
      }, 16, ["aria-disabled", "data-disabled", "data-readonly", "data-invalid", "dir"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectDateRangeFieldRootContext = injectDateRangeFieldRootContext;
//# sourceMappingURL=DateRangeFieldRoot.cjs.map
