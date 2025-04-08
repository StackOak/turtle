'use strict';

const vue = require('vue');
const date_useDateField = require('../date/useDateField.cjs');
const DateRangeField_DateRangeFieldRoot = require('./DateRangeFieldRoot.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DateRangeFieldInput",
  props: {
    part: {},
    type: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = DateRangeField_DateRangeFieldRoot.injectDateRangeFieldRootContext();
    const hasLeftFocus = vue.ref(true);
    const lastKeyZero = vue.ref(false);
    const {
      handleSegmentClick,
      handleSegmentKeydown,
      attributes
    } = date_useDateField.useDateField({
      hasLeftFocus,
      lastKeyZero,
      placeholder: rootContext.placeholder,
      hourCycle: rootContext.hourCycle,
      segmentValues: rootContext.segmentValues[props.type],
      formatter: rootContext.formatter,
      part: props.part,
      disabled: rootContext.disabled,
      readonly: rootContext.readonly,
      focusNext: rootContext.focusNext,
      modelValue: props.type === "start" ? rootContext.startValue : rootContext.endValue
    });
    const disabled = vue.computed(() => rootContext.disabled.value);
    const readonly = vue.computed(() => rootContext.readonly.value);
    const isInvalid = vue.computed(() => rootContext.isInvalid.value);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
        as: _ctx.as,
        "as-child": _ctx.asChild
      }, vue.unref(attributes), {
        contenteditable: disabled.value || readonly.value ? false : _ctx.part !== "literal",
        "data-reka-date-field-segment": _ctx.part,
        "aria-disabled": disabled.value ? true : void 0,
        "aria-readonly": readonly.value ? true : void 0,
        "data-disabled": disabled.value ? "" : void 0,
        "data-reka-date-range-field-segment-type": _ctx.type,
        "data-invalid": isInvalid.value ? "" : void 0,
        "aria-invalid": isInvalid.value ? true : void 0
      }, vue.toHandlers(_ctx.part !== "literal" ? {
        mousedown: vue.unref(handleSegmentClick),
        keydown: vue.unref(handleSegmentKeydown),
        focusout: () => {
          hasLeftFocus.value = true;
        },
        focusin: (e) => {
          vue.unref(rootContext).setFocusedElement(e.target);
        }
      } : {})), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["as", "as-child", "contenteditable", "data-reka-date-field-segment", "aria-disabled", "aria-readonly", "data-disabled", "data-reka-date-range-field-segment-type", "data-invalid", "aria-invalid"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DateRangeFieldInput.cjs.map
