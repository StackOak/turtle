'use strict';

const vue = require('vue');
const RadioGroup_Radio = require('./Radio.cjs');
const core = require('@vueuse/core');
const ohash = require('ohash');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const RadioGroup_RadioGroupRoot = require('./RadioGroupRoot.cjs');
const RovingFocus_RovingFocusItem = require('../RovingFocus/RovingFocusItem.cjs');

const [injectRadioGroupItemContext, provideRadiogroupItemContext] = shared_createContext.createContext("RadioGroupItem");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "RadioGroupItem",
  props: {
    id: {},
    value: {},
    disabled: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: { default: "button" },
    name: {},
    required: { type: Boolean }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const rootContext = RadioGroup_RadioGroupRoot.injectRadioGroupRootContext();
    const disabled = vue.computed(() => rootContext.disabled.value || props.disabled);
    const required = vue.computed(() => rootContext.required.value || props.required);
    const checked = vue.computed(() => ohash.isEqual(rootContext.modelValue?.value, props.value));
    provideRadiogroupItemContext({ disabled, checked });
    const isArrowKeyPressed = vue.ref(false);
    const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    core.useEventListener("keydown", (event) => {
      if (ARROW_KEYS.includes(event.key))
        isArrowKeyPressed.value = true;
    });
    core.useEventListener("keyup", () => {
      isArrowKeyPressed.value = false;
    });
    function handleFocus() {
      setTimeout(() => {
        if (isArrowKeyPressed.value)
          currentElement.value?.click();
      }, 0);
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(RovingFocus_RovingFocusItem._sfc_main), {
        checked: checked.value,
        disabled: disabled.value,
        "as-child": "",
        focusable: !disabled.value,
        active: checked.value
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(RadioGroup_Radio._sfc_main, vue.mergeProps({ ..._ctx.$attrs, ...props }, {
            ref: vue.unref(forwardRef),
            checked: checked.value,
            required: required.value,
            disabled: disabled.value,
            "onUpdate:checked": _cache[0] || (_cache[0] = ($event) => vue.unref(rootContext).changeModelValue(_ctx.value)),
            onSelect: _cache[1] || (_cache[1] = ($event) => emits("select", $event)),
            onKeydown: _cache[2] || (_cache[2] = vue.withKeys(vue.withModifiers(() => {
            }, ["prevent"]), ["enter"])),
            onFocus: handleFocus
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default", {
                checked: checked.value,
                required: required.value,
                disabled: disabled.value
              })
            ]),
            _: 3
          }, 16, ["checked", "required", "disabled"])
        ]),
        _: 3
      }, 8, ["checked", "disabled", "focusable", "active"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectRadioGroupItemContext = injectRadioGroupItemContext;
//# sourceMappingURL=RadioGroupItem.cjs.map
