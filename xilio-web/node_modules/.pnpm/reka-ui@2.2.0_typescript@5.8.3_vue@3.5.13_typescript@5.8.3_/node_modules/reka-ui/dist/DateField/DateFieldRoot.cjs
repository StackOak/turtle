'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const date_comparators = require('../date/comparators.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useLocale = require('../shared/useLocale.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_useDateFormatter = require('../shared/useDateFormatter.cjs');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const date_segment = require('../date/segment.cjs');
const date_parser = require('../date/parser.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const VisuallyHidden_VisuallyHidden = require('../VisuallyHidden/VisuallyHidden.cjs');
const shared_useKbd = require('../shared/useKbd.cjs');
const shared_nullish = require('../shared/nullish.cjs');

const [injectDateFieldRootContext, provideDateFieldRootContext] = shared_createContext.createContext("DateFieldRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "DateFieldRoot",
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
    const { disabled, readonly, isDateUnavailable: propsIsDateUnavailable, granularity, defaultValue, dir: propDir, locale: propLocale } = vue.toRefs(props);
    const locale = shared_useLocale.useLocale(propLocale);
    const dir = shared_useDirection.useDirection(propDir);
    const formatter = shared_useDateFormatter.useDateFormatter(locale.value);
    const { primitiveElement, currentElement: parentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
    const segmentElements = vue.ref(/* @__PURE__ */ new Set());
    vue.onMounted(() => {
      date_segment.getSegmentElements(parentElement.value).forEach((item) => segmentElements.value.add(item));
    });
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: defaultValue.value,
      passive: props.modelValue === void 0
    });
    const defaultDate = date_comparators.getDefaultDate({
      defaultPlaceholder: props.placeholder,
      granularity: granularity.value,
      defaultValue: modelValue.value,
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
    const isInvalid = vue.computed(() => {
      if (!modelValue.value)
        return false;
      if (propsIsDateUnavailable.value?.(modelValue.value))
        return true;
      if (props.minValue && date_comparators.isBefore(modelValue.value, props.minValue))
        return true;
      if (props.maxValue && date_comparators.isBefore(props.maxValue, modelValue.value))
        return true;
      return false;
    });
    const initialSegments = date_parser.initializeSegmentValues(inferredGranularity.value);
    const segmentValues = vue.ref(modelValue.value ? { ...date_parser.syncSegmentValues({ value: modelValue.value, formatter }) } : { ...initialSegments });
    const allSegmentContent = vue.computed(() => date_parser.createContent({
      granularity: inferredGranularity.value,
      dateRef: placeholder.value,
      formatter,
      hideTimeZone: props.hideTimeZone,
      hourCycle: props.hourCycle,
      segmentValues: segmentValues.value,
      locale
    }));
    const segmentContents = vue.computed(() => allSegmentContent.value.arr);
    const editableSegmentContents = vue.computed(() => segmentContents.value.filter(({ part }) => part !== "literal"));
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
      if (!shared_nullish.isNullish(_modelValue) && placeholder.value.compare(_modelValue) !== 0) {
        placeholder.value = _modelValue.copy();
      }
    });
    vue.watch([modelValue, locale], ([_modelValue]) => {
      if (!shared_nullish.isNullish(_modelValue)) {
        segmentValues.value = { ...date_parser.syncSegmentValues({ value: _modelValue, formatter }) };
      } else if (Object.values(segmentValues.value).every((value) => value !== null) && shared_nullish.isNullish(_modelValue)) {
        segmentValues.value = { ...initialSegments };
      }
    });
    const currentFocusedElement = vue.ref(null);
    const currentSegmentIndex = vue.computed(() => Array.from(segmentElements.value).findIndex((el) => el.getAttribute("data-reka-date-field-segment") === currentFocusedElement.value?.getAttribute("data-reka-date-field-segment")));
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
    provideDateFieldRootContext({
      isDateUnavailable: propsIsDateUnavailable.value,
      locale,
      modelValue,
      placeholder,
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
            segments: segmentContents.value,
            isInvalid: isInvalid.value
          }),
          vue.createVNode(vue.unref(VisuallyHidden_VisuallyHidden._sfc_main), {
            id: _ctx.id,
            as: "input",
            feature: "focusable",
            tabindex: "-1",
            value: vue.unref(modelValue) ? vue.unref(modelValue).toString() : "",
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
exports.injectDateFieldRootContext = injectDateFieldRootContext;
//# sourceMappingURL=DateFieldRoot.cjs.map
