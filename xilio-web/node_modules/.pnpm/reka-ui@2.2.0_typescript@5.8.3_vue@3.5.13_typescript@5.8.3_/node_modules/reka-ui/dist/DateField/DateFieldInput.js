import { defineComponent, ref, computed, createBlock, openBlock, unref, mergeProps, toHandlers, withCtx, renderSlot } from 'vue';
import { u as useDateField } from '../date/useDateField.js';
import { i as injectDateFieldRootContext } from './DateFieldRoot.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DateFieldInput",
  props: {
    part: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectDateFieldRootContext();
    const hasLeftFocus = ref(true);
    const lastKeyZero = ref(false);
    const {
      handleSegmentClick,
      handleSegmentKeydown,
      attributes
    } = useDateField({
      hasLeftFocus,
      lastKeyZero,
      placeholder: rootContext.placeholder,
      hourCycle: rootContext.hourCycle,
      segmentValues: rootContext.segmentValues,
      formatter: rootContext.formatter,
      part: props.part,
      disabled: rootContext.disabled,
      readonly: rootContext.readonly,
      focusNext: rootContext.focusNext,
      modelValue: rootContext.modelValue
    });
    const disabled = computed(() => rootContext.disabled.value);
    const readonly = computed(() => rootContext.readonly.value);
    const isInvalid = computed(() => rootContext.isInvalid.value);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps({
        as: _ctx.as,
        "as-child": _ctx.asChild
      }, unref(attributes), {
        contenteditable: disabled.value || readonly.value ? false : _ctx.part !== "literal",
        "data-reka-date-field-segment": _ctx.part,
        "aria-disabled": disabled.value ? true : void 0,
        "aria-readonly": readonly.value ? true : void 0,
        "data-disabled": disabled.value ? "" : void 0,
        "data-invalid": isInvalid.value ? "" : void 0,
        "aria-invalid": isInvalid.value ? true : void 0
      }, toHandlers(_ctx.part !== "literal" ? {
        mousedown: unref(handleSegmentClick),
        keydown: unref(handleSegmentKeydown),
        focusout: () => {
          hasLeftFocus.value = true;
        },
        focusin: (e) => {
          unref(rootContext).setFocusedElement(e.target);
        }
      } : {})), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["as", "as-child", "contenteditable", "data-reka-date-field-segment", "aria-disabled", "aria-readonly", "data-disabled", "data-invalid", "aria-invalid"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=DateFieldInput.js.map
