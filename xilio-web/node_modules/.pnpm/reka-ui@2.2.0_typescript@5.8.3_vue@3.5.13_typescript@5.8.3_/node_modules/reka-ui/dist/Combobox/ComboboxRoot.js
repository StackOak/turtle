import { defineComponent, toRefs, ref, computed, reactive, watch, nextTick, getCurrentInstance, onMounted, createBlock, openBlock, unref, withCtx, createVNode, mergeProps, isRef, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../Popper/PopperRoot.js';
import { useVModel, createEventHook } from '@vueuse/core';
import { c as createContext } from '../shared/createContext.js';
import { u as usePrimitiveElement } from '../Primitive/usePrimitiveElement.js';
import { u as useDirection } from '../shared/useDirection.js';
import { u as useFilter } from '../shared/useFilter.js';
import { _ as _sfc_main$2 } from '../Listbox/ListboxRoot.js';

const [injectComboboxRootContext, provideComboboxRootContext] = createContext("ComboboxRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ComboboxRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean },
    resetSearchTermOnBlur: { type: Boolean, default: true },
    resetSearchTermOnSelect: { type: Boolean, default: true },
    ignoreFilter: { type: Boolean },
    modelValue: {},
    defaultValue: {},
    multiple: { type: Boolean },
    dir: {},
    disabled: { type: Boolean },
    highlightOnHover: { type: Boolean },
    by: {},
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue", "highlight", "update:open"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
    const { multiple, disabled, ignoreFilter, resetSearchTermOnSelect, dir: propDir } = toRefs(props);
    const dir = useDirection(propDir);
    const modelValue = useVModel(props, "modelValue", emits, {
      // @ts-expect-error ignore the type error here
      defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
      passive: props.modelValue === void 0,
      deep: true
    });
    const open = useVModel(props, "open", emits, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    async function onOpenChange(val) {
      open.value = val;
      filterState.search = "";
      if (val) {
        await nextTick();
        primitiveElement.value?.highlightSelected();
        isUserInputted.value = true;
      } else {
        isUserInputted.value = false;
      }
      inputElement.value?.focus();
      setTimeout(() => {
        if (!val && props.resetSearchTermOnBlur)
          resetSearchTerm.trigger();
      }, 1);
    }
    const resetSearchTerm = createEventHook();
    const isUserInputted = ref(false);
    const isVirtual = ref(false);
    const inputElement = ref();
    const triggerElement = ref();
    const highlightedElement = computed(() => primitiveElement.value?.highlightedElement ?? void 0);
    const allItems = ref(/* @__PURE__ */ new Map());
    const allGroups = ref(/* @__PURE__ */ new Map());
    const { contains } = useFilter({ sensitivity: "base" });
    const filterState = reactive({
      search: "",
      filtered: {
        /** The count of all visible items. */
        count: 0,
        /** Map from visible item id to its search score. */
        items: /* @__PURE__ */ new Map(),
        /** Set of groups with at least one visible item. */
        groups: /* @__PURE__ */ new Set()
      }
    });
    function filterItems() {
      if (!filterState.search || props.ignoreFilter || isVirtual.value) {
        filterState.filtered.count = allItems.value.size;
        return;
      }
      filterState.filtered.groups = /* @__PURE__ */ new Set();
      let itemCount = 0;
      for (const [id, value] of allItems.value) {
        const score = contains(value, filterState.search);
        filterState.filtered.items.set(id, score ? 1 : 0);
        if (score)
          itemCount++;
      }
      for (const [groupId, group] of allGroups.value) {
        for (const itemId of group) {
          if (filterState.filtered.items.get(itemId) > 0) {
            filterState.filtered.groups.add(groupId);
            break;
          }
        }
      }
      filterState.filtered.count = itemCount;
    }
    watch([() => filterState.search, () => allItems.value.size], () => {
      filterItems();
    }, { immediate: true });
    watch(() => open.value, () => {
      nextTick(() => {
        if (open.value)
          filterItems();
      });
    }, { flush: "post" });
    const inst = getCurrentInstance();
    onMounted(() => {
      if (inst?.exposed) {
        inst.exposed.highlightItem = primitiveElement.value?.highlightItem;
        inst.exposed.highlightFirstItem = primitiveElement.value?.highlightFirstItem;
        inst.exposed.highlightSelected = primitiveElement.value?.highlightSelected;
      }
    });
    __expose({
      filtered: computed(() => filterState.filtered),
      highlightedElement,
      highlightItem: primitiveElement.value?.highlightItem,
      highlightFirstItem: primitiveElement.value?.highlightFirstItem,
      highlightSelected: primitiveElement.value?.highlightSelected
    });
    provideComboboxRootContext({
      modelValue,
      multiple,
      disabled,
      open,
      onOpenChange,
      contentId: "",
      isUserInputted,
      isVirtual,
      inputElement,
      highlightedElement,
      onInputElementChange: (val) => inputElement.value = val,
      triggerElement,
      onTriggerElementChange: (val) => triggerElement.value = val,
      parentElement,
      resetSearchTermOnSelect,
      onResetSearchTerm: resetSearchTerm.on,
      allItems,
      allGroups,
      filterState,
      ignoreFilter
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), null, {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$2), mergeProps({
            ref_key: "primitiveElement",
            ref: primitiveElement
          }, _ctx.$attrs, {
            modelValue: unref(modelValue),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
            style: {
              pointerEvents: unref(open) ? "auto" : void 0
            },
            as: _ctx.as,
            "as-child": _ctx.asChild,
            dir: unref(dir),
            multiple: unref(multiple),
            name: _ctx.name,
            required: _ctx.required,
            disabled: unref(disabled),
            "highlight-on-hover": true,
            by: props.by,
            onHighlight: _cache[1] || (_cache[1] = ($event) => emits("highlight", $event))
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {
                open: unref(open),
                modelValue: unref(modelValue)
              })
            ]),
            _: 3
          }, 16, ["modelValue", "style", "as", "as-child", "dir", "multiple", "name", "required", "disabled", "by"])
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _, injectComboboxRootContext as i };
//# sourceMappingURL=ComboboxRoot.js.map
