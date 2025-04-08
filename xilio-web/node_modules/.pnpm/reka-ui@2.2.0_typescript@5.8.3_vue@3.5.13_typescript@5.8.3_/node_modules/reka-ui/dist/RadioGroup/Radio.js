import { defineComponent, toRefs, computed, createBlock, openBlock, unref, mergeProps, withModifiers, withCtx, renderSlot, createCommentVNode } from 'vue';
import { useVModel } from '@vueuse/core';
import { h as handleSelect } from './utils.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useFormControl } from '../shared/useFormControl.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { _ as _sfc_main$1 } from '../VisuallyHidden/VisuallyHiddenInput.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const checked = useVModel(props, "checked", emits, {
      passive: props.checked === void 0
    });
    const { value } = toRefs(props);
    const { forwardRef, currentElement: triggerElement } = useForwardExpose();
    const isFormControl = useFormControl(triggerElement);
    const ariaLabel = computed(() => props.id && triggerElement.value ? document.querySelector(`[for="${props.id}"]`)?.innerText ?? props.value : void 0);
    function handleClick(event) {
      handleSelect(event, props.value, (ev) => {
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
      return openBlock(), createBlock(unref(Primitive), mergeProps(_ctx.$attrs, {
        id: _ctx.id,
        ref: unref(forwardRef),
        role: "radio",
        type: _ctx.as === "button" ? "button" : void 0,
        as: _ctx.as,
        "aria-checked": unref(checked),
        "aria-label": ariaLabel.value,
        "as-child": _ctx.asChild,
        disabled: _ctx.disabled ? "" : void 0,
        "data-state": unref(checked) ? "checked" : "unchecked",
        "data-disabled": _ctx.disabled ? "" : void 0,
        value: unref(value),
        required: _ctx.required,
        name: _ctx.name,
        onClick: withModifiers(handleClick, ["stop"])
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { checked: unref(checked) }),
          unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(_sfc_main$1), {
            key: 0,
            type: "radio",
            tabindex: "-1",
            value: unref(value),
            checked: !!unref(checked),
            name: _ctx.name,
            disabled: _ctx.disabled,
            required: _ctx.required
          }, null, 8, ["value", "checked", "name", "disabled", "required"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["id", "type", "as", "aria-checked", "aria-label", "as-child", "disabled", "data-state", "data-disabled", "value", "required", "name"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=Radio.js.map
