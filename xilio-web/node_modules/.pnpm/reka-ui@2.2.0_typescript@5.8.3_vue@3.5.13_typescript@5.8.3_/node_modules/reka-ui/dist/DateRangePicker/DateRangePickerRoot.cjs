'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
require('@floating-ui/vue');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const date_comparators = require('../date/comparators.cjs');
const Popover_PopoverRoot = require('../Popover/PopoverRoot.cjs');

const [injectDateRangePickerRootContext, provideDateRangePickerRootContext] = shared_createContext.createContext("DateRangePickerRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "DateRangePickerRoot",
  props: {
    defaultValue: { default: () => ({ start: void 0, end: void 0 }) },
    defaultPlaceholder: {},
    placeholder: { default: void 0 },
    modelValue: {},
    hourCycle: {},
    granularity: {},
    hideTimeZone: { type: Boolean },
    maxValue: {},
    minValue: {},
    locale: { default: "en" },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    isDateUnavailable: { type: Function, default: void 0 },
    id: {},
    dir: {},
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean },
    defaultOpen: { type: Boolean, default: false },
    open: { type: Boolean, default: void 0 },
    modal: { type: Boolean, default: false },
    isDateDisabled: { type: Function, default: void 0 },
    pagedNavigation: { type: Boolean, default: false },
    weekStartsOn: { default: 0 },
    weekdayFormat: { default: "narrow" },
    fixedWeeks: { type: Boolean, default: false },
    numberOfMonths: { default: 1 },
    preventDeselect: { type: Boolean, default: false },
    allowNonContiguousRanges: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "update:placeholder", "update:startValue", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      locale,
      disabled,
      readonly,
      pagedNavigation,
      weekStartsOn,
      weekdayFormat,
      fixedWeeks,
      numberOfMonths,
      preventDeselect,
      isDateDisabled: propsIsDateDisabled,
      isDateUnavailable: propsIsDateUnavailable,
      defaultOpen,
      modal,
      id,
      name,
      required,
      minValue,
      maxValue,
      granularity,
      hideTimeZone,
      hourCycle,
      dir: propsDir,
      allowNonContiguousRanges
    } = vue.toRefs(props);
    const dir = shared_useDirection.useDirection(propsDir);
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
    const open = core.useVModel(props, "open", emits, {
      defaultValue: defaultOpen.value,
      passive: props.open === void 0
    });
    const dateFieldRef = vue.ref();
    vue.watch(modelValue, (value) => {
      if (value && value.start && value.start.compare(placeholder.value) !== 0) {
        placeholder.value = value.start.copy();
      }
    });
    provideDateRangePickerRootContext({
      allowNonContiguousRanges,
      isDateUnavailable: propsIsDateUnavailable.value,
      isDateDisabled: propsIsDateDisabled.value,
      locale,
      disabled,
      pagedNavigation,
      weekStartsOn,
      weekdayFormat,
      fixedWeeks,
      numberOfMonths,
      readonly,
      preventDeselect,
      modelValue,
      placeholder,
      defaultOpen,
      modal,
      open,
      id,
      name,
      required,
      minValue,
      maxValue,
      granularity,
      hideTimeZone,
      hourCycle,
      dateFieldRef,
      dir,
      onStartValueChange(date) {
        emits("update:startValue", date);
      },
      onDateChange(date) {
        modelValue.value = { start: date.start?.copy(), end: date.end?.copy() };
      },
      onPlaceholderChange(date) {
        placeholder.value = date.copy();
      }
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Popover_PopoverRoot._sfc_main), {
        open: vue.unref(open),
        "onUpdate:open": _cache[0] || (_cache[0] = ($event) => vue.isRef(open) ? open.value = $event : null),
        "default-open": vue.unref(defaultOpen),
        modal: vue.unref(modal)
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {
            modelValue: vue.unref(modelValue),
            open: vue.unref(open)
          })
        ]),
        _: 3
      }, 8, ["open", "default-open", "modal"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectDateRangePickerRootContext = injectDateRangePickerRootContext;
//# sourceMappingURL=DateRangePickerRoot.cjs.map
