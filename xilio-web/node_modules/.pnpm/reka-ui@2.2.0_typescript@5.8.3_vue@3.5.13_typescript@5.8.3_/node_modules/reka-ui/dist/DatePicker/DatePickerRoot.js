import { defineComponent, toRefs, computed, ref, watch, createBlock, openBlock, unref, isRef, withCtx, renderSlot } from 'vue';
import { useVModel } from '@vueuse/core';
import '@floating-ui/vue';
import { c as createContext } from '../shared/createContext.js';
import { u as useDirection } from '../shared/useDirection.js';
import { n as getDefaultDate } from '../date/comparators.js';
import { _ as _sfc_main$1 } from '../Popover/PopoverRoot.js';

const [injectDatePickerRootContext, provideDatePickerRootContext] = createContext("DatePickerRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "DatePickerRoot",
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
    preventDeselect: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "update:placeholder", "update:open"],
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
      defaultValue,
      dir: propDir
    } = toRefs(props);
    const dir = useDirection(propDir);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: defaultValue.value,
      passive: props.modelValue === void 0
    });
    const defaultDate = computed(() => getDefaultDate({
      defaultPlaceholder: props.placeholder,
      granularity: props.granularity,
      defaultValue: modelValue.value,
      locale: props.locale
    }));
    const placeholder = useVModel(props, "placeholder", emits, {
      defaultValue: props.defaultPlaceholder ?? defaultDate.value.copy(),
      passive: props.placeholder === void 0
    });
    const open = useVModel(props, "open", emits, {
      defaultValue: defaultOpen.value,
      passive: props.open === void 0
    });
    const dateFieldRef = ref();
    watch(modelValue, (value) => {
      if (value && value.compare(placeholder.value) !== 0) {
        placeholder.value = value.copy();
      }
    });
    provideDatePickerRootContext({
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
      onDateChange(date) {
        if (!date || !modelValue.value) {
          modelValue.value = date?.copy() ?? void 0;
        } else if (!preventDeselect.value && date && modelValue.value.compare(date) === 0) {
          modelValue.value = void 0;
        } else {
          modelValue.value = date.copy();
        }
      },
      onPlaceholderChange(date) {
        placeholder.value = date.copy();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        open: unref(open),
        "onUpdate:open": _cache[0] || (_cache[0] = ($event) => isRef(open) ? open.value = $event : null),
        "default-open": unref(defaultOpen),
        modal: unref(modal)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["open", "default-open", "modal"]);
    };
  }
});

export { _sfc_main as _, injectDatePickerRootContext as i };
//# sourceMappingURL=DatePickerRoot.js.map
