'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Combobox_ComboboxRoot = require('./ComboboxRoot.cjs');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const Listbox_ListboxFilter = require('../Listbox/ListboxFilter.cjs');
const Listbox_ListboxRoot = require('../Listbox/ListboxRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ComboboxInput",
  props: {
    displayValue: {},
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
    const rootContext = Combobox_ComboboxRoot.injectComboboxRootContext();
    const listboxContext = Listbox_ListboxRoot.injectListboxRootContext();
    const { primitiveElement, currentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
    const modelValue = core.useVModel(props, "modelValue", emits, {
      passive: props.modelValue === void 0
    });
    vue.onMounted(() => {
      if (currentElement.value)
        rootContext.onInputElementChange(currentElement.value);
    });
    function handleKeyDown(ev) {
      if (!rootContext.open.value)
        rootContext.onOpenChange(true);
    }
    function handleInput(event) {
      const target = event.target;
      if (!rootContext.open.value) {
        rootContext.onOpenChange(true);
        vue.nextTick(() => {
          if (target.value) {
            rootContext.filterState.search = target.value;
            listboxContext.highlightFirstItem(event);
          }
        });
      } else {
        rootContext.filterState.search = target.value;
      }
    }
    function resetSearchTerm() {
      const rootModelValue = rootContext.modelValue.value;
      if (props.displayValue) {
        modelValue.value = props.displayValue(rootModelValue);
      } else if (!rootContext.multiple.value && rootModelValue && !Array.isArray(rootModelValue)) {
        if (typeof rootModelValue !== "object")
          modelValue.value = rootModelValue.toString();
        else modelValue.value = "";
      } else {
        modelValue.value = "";
      }
      vue.nextTick(() => {
        modelValue.value = modelValue.value;
      });
    }
    rootContext.onResetSearchTerm(() => {
      resetSearchTerm();
    });
    vue.watch(rootContext.modelValue, async () => {
      if (!rootContext.isUserInputted.value && rootContext.resetSearchTermOnSelect.value)
        resetSearchTerm();
    }, { immediate: true, deep: true });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Listbox_ListboxFilter._sfc_main), {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        modelValue: vue.unref(modelValue),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(modelValue) ? modelValue.value = $event : null),
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "auto-focus": _ctx.autoFocus,
        "aria-expanded": vue.unref(rootContext).open.value,
        "aria-controls": vue.unref(rootContext).contentId,
        "aria-autocomplete": "list",
        role: "combobox",
        autocomplete: "false",
        onInput: handleInput,
        onKeydown: vue.withKeys(vue.withModifiers(handleKeyDown, ["prevent"]), ["down", "up"])
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["modelValue", "as", "as-child", "auto-focus", "aria-expanded", "aria-controls", "onKeydown"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ComboboxInput.cjs.map
