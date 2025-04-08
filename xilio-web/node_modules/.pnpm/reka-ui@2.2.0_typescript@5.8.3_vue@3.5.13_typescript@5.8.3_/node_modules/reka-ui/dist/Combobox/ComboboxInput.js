import { defineComponent, onMounted, watch, createBlock, openBlock, unref, withKeys, withModifiers, isRef, withCtx, renderSlot, nextTick } from 'vue';
import { useVModel } from '@vueuse/core';
import { i as injectComboboxRootContext } from './ComboboxRoot.js';
import { u as usePrimitiveElement } from '../Primitive/usePrimitiveElement.js';
import { _ as _sfc_main$1 } from '../Listbox/ListboxFilter.js';
import { i as injectListboxRootContext } from '../Listbox/ListboxRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const rootContext = injectComboboxRootContext();
    const listboxContext = injectListboxRootContext();
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const modelValue = useVModel(props, "modelValue", emits, {
      passive: props.modelValue === void 0
    });
    onMounted(() => {
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
        nextTick(() => {
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
      nextTick(() => {
        modelValue.value = modelValue.value;
      });
    }
    rootContext.onResetSearchTerm(() => {
      resetSearchTerm();
    });
    watch(rootContext.modelValue, async () => {
      if (!rootContext.isUserInputted.value && rootContext.resetSearchTermOnSelect.value)
        resetSearchTerm();
    }, { immediate: true, deep: true });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        modelValue: unref(modelValue),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "auto-focus": _ctx.autoFocus,
        "aria-expanded": unref(rootContext).open.value,
        "aria-controls": unref(rootContext).contentId,
        "aria-autocomplete": "list",
        role: "combobox",
        autocomplete: "false",
        onInput: handleInput,
        onKeydown: withKeys(withModifiers(handleKeyDown, ["prevent"]), ["down", "up"])
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["modelValue", "as", "as-child", "auto-focus", "aria-expanded", "aria-controls", "onKeydown"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ComboboxInput.js.map
