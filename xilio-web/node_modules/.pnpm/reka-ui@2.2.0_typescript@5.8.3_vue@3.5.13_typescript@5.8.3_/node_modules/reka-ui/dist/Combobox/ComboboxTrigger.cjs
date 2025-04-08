'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Combobox_ComboboxRoot = require('./ComboboxRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ComboboxTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const rootContext = Combobox_ComboboxRoot.injectComboboxRootContext();
    const disabled = vue.computed(() => props.disabled || rootContext.disabled.value || false);
    vue.onMounted(() => {
      if (currentElement.value)
        rootContext.onTriggerElementChange(currentElement.value);
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        ref: vue.unref(forwardRef),
        type: _ctx.as === "button" ? "button" : void 0,
        tabindex: "-1",
        "aria-label": "Show popup",
        "aria-haspopup": "listbox",
        "aria-expanded": vue.unref(rootContext).open.value,
        "aria-controls": vue.unref(rootContext).contentId,
        "data-state": vue.unref(rootContext).open.value ? "open" : "closed",
        disabled: disabled.value,
        "data-disabled": disabled.value ? "" : void 0,
        "aria-disabled": disabled.value ?? void 0,
        onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(rootContext).onOpenChange(!vue.unref(rootContext).open.value))
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["type", "aria-expanded", "aria-controls", "data-state", "disabled", "data-disabled", "aria-disabled"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ComboboxTrigger.cjs.map
