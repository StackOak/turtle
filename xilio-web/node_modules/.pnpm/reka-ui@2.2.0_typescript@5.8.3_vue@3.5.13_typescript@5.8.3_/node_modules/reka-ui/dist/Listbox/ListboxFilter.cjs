'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
require('@floating-ui/vue');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Listbox_ListboxRoot = require('./ListboxRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ListboxFilter",
  props: {
    modelValue: {},
    autoFocus: { type: Boolean },
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "input" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: "",
      passive: props.modelValue === void 0
    });
    const rootContext = Listbox_ListboxRoot.injectListboxRootContext();
    const { primitiveElement, currentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
    const disabled = vue.computed(() => props.disabled || rootContext.disabled.value || false);
    const activedescendant = vue.ref();
    vue.watchSyncEffect(() => activedescendant.value = rootContext.highlightedElement.value?.id);
    vue.onMounted(() => {
      rootContext.focusable.value = false;
      setTimeout(() => {
        if (props.autoFocus)
          currentElement.value?.focus();
      }, 1);
    });
    vue.onUnmounted(() => {
      rootContext.focusable.value = true;
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        as: _ctx.as,
        "as-child": _ctx.asChild,
        value: vue.unref(modelValue),
        disabled: disabled.value ? "" : void 0,
        "data-disabled": disabled.value ? "" : void 0,
        "aria-disabled": disabled.value ?? void 0,
        "aria-activedescendant": activedescendant.value,
        type: "text",
        onKeydown: [
          vue.withKeys(vue.withModifiers(vue.unref(rootContext).onKeydownNavigation, ["prevent"]), ["down", "up", "home", "end"]),
          vue.withKeys(vue.unref(rootContext).onKeydownEnter, ["enter"])
        ],
        onInput: _cache[0] || (_cache[0] = (event) => {
          modelValue.value = event.target.value;
          vue.unref(rootContext).highlightFirstItem(event);
        }),
        onCompositionstart: vue.unref(rootContext).onCompositionStart,
        onCompositionend: vue.unref(rootContext).onCompositionEnd
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { modelValue: vue.unref(modelValue) })
        ]),
        _: 3
      }, 8, ["as", "as-child", "value", "disabled", "data-disabled", "aria-disabled", "aria-activedescendant", "onKeydown", "onCompositionstart", "onCompositionend"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ListboxFilter.cjs.map
