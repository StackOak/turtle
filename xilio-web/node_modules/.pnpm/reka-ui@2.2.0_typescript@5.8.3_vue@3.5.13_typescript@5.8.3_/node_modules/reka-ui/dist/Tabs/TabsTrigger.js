import { defineComponent, computed, createBlock, openBlock, unref, withCtx, createVNode, withKeys, withModifiers, renderSlot } from 'vue';
import { m as makeTriggerId, a as makeContentId } from './utils.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { _ as _sfc_main$1 } from '../RovingFocus/RovingFocusItem.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectTabsRootContext } from './TabsRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TabsTrigger",
  props: {
    value: {},
    disabled: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = useForwardExpose();
    const rootContext = injectTabsRootContext();
    const triggerId = computed(() => makeTriggerId(rootContext.baseId, props.value));
    const contentId = computed(() => makeContentId(rootContext.baseId, props.value));
    const isSelected = computed(() => props.value === rootContext.modelValue.value);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        "as-child": "",
        focusable: !_ctx.disabled,
        active: isSelected.value
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            id: triggerId.value,
            ref: unref(forwardRef),
            role: "tab",
            type: _ctx.as === "button" ? "button" : void 0,
            as: _ctx.as,
            "as-child": _ctx.asChild,
            "aria-selected": isSelected.value ? "true" : "false",
            "aria-controls": contentId.value,
            "data-state": isSelected.value ? "active" : "inactive",
            disabled: _ctx.disabled,
            "data-disabled": _ctx.disabled ? "" : void 0,
            "data-orientation": unref(rootContext).orientation.value,
            onMousedown: _cache[0] || (_cache[0] = withModifiers((event) => {
              if (!_ctx.disabled && event.ctrlKey === false) {
                unref(rootContext).changeModelValue(_ctx.value);
              } else {
                event.preventDefault();
              }
            }, ["left"])),
            onKeydown: _cache[1] || (_cache[1] = withKeys(($event) => unref(rootContext).changeModelValue(_ctx.value), ["enter", "space"])),
            onFocus: _cache[2] || (_cache[2] = () => {
              const isAutomaticActivation = unref(rootContext).activationMode !== "manual";
              if (!isSelected.value && !_ctx.disabled && isAutomaticActivation) {
                unref(rootContext).changeModelValue(_ctx.value);
              }
            })
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["id", "type", "as", "as-child", "aria-selected", "aria-controls", "data-state", "disabled", "data-disabled", "data-orientation"])
        ]),
        _: 3
      }, 8, ["focusable", "active"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=TabsTrigger.js.map
