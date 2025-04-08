'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const RadioGroup_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useFormControl = require('../shared/useFormControl.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const VisuallyHidden_VisuallyHiddenInput = require('../VisuallyHidden/VisuallyHiddenInput.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "Radio",
  props: {
    id: {},
    value: {},
    disabled: { type: Boolean, default: false },
    checked: { type: Boolean, default: void 0 },
    asChild: { type: Boolean },
    as: { default: "button" },
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:checked", "select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const checked = core.useVModel(props, "checked", emits, {
      passive: props.checked === void 0
    });
    const { value } = vue.toRefs(props);
    const { forwardRef, currentElement: triggerElement } = shared_useForwardExpose.useForwardExpose();
    const isFormControl = shared_useFormControl.useFormControl(triggerElement);
    const ariaLabel = vue.computed(() => props.id && triggerElement.value ? document.querySelector(`[for="${props.id}"]`)?.innerText ?? props.value : void 0);
    function handleClick(event) {
      RadioGroup_utils.handleSelect(event, props.value, (ev) => {
        emits("select", ev);
        if (ev?.defaultPrevented)
          return;
        checked.value = true;
        if (isFormControl.value) {
          ev.stopPropagation();
        }
      });
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(_ctx.$attrs, {
        id: _ctx.id,
        ref: vue.unref(forwardRef),
        role: "radio",
        type: _ctx.as === "button" ? "button" : void 0,
        as: _ctx.as,
        "aria-checked": vue.unref(checked),
        "aria-label": ariaLabel.value,
        "as-child": _ctx.asChild,
        disabled: _ctx.disabled ? "" : void 0,
        "data-state": vue.unref(checked) ? "checked" : "unchecked",
        "data-disabled": _ctx.disabled ? "" : void 0,
        value: vue.unref(value),
        required: _ctx.required,
        name: _ctx.name,
        onClick: vue.withModifiers(handleClick, ["stop"])
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { checked: vue.unref(checked) }),
          vue.unref(isFormControl) && _ctx.name ? (vue.openBlock(), vue.createBlock(vue.unref(VisuallyHidden_VisuallyHiddenInput._sfc_main), {
            key: 0,
            type: "radio",
            tabindex: "-1",
            value: vue.unref(value),
            checked: !!vue.unref(checked),
            name: _ctx.name,
            disabled: _ctx.disabled,
            required: _ctx.required
          }, null, 8, ["value", "checked", "name", "disabled", "required"])) : vue.createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["id", "type", "as", "aria-checked", "aria-label", "as-child", "disabled", "data-state", "data-disabled", "value", "required", "name"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=Radio.cjs.map
