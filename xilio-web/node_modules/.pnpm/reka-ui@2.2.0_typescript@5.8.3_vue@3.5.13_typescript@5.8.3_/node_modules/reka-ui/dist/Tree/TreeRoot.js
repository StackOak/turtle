import { defineComponent, toRefs, ref, computed, createBlock, openBlock, unref, withCtx, createVNode, withKeys, withModifiers, renderSlot, nextTick } from 'vue';
import { createEventHook, useVModel } from '@vueuse/core';
import { M as MAP_KEY_TO_FOCUS_INTENT } from '../RovingFocus/utils.js';
import { f as flatten } from './utils.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useTypeahead } from '../shared/useTypeahead.js';
import { u as useDirection } from '../shared/useDirection.js';
import { u as useSelectionBehavior } from '../shared/useSelectionBehavior.js';
import { _ as _sfc_main$1 } from '../RovingFocus/RovingFocusGroup.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { g as getActiveElement } from '../shared/getActiveElement.js';

const [injectTreeRootContext, provideTreeRootContext] = createContext("TreeRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TreeRoot",
  props: {
    modelValue: {},
    defaultValue: {},
    items: {},
    expanded: {},
    defaultExpanded: {},
    getKey: {},
    getChildren: { type: Function, default: (val) => val.children },
    selectionBehavior: { default: "toggle" },
    multiple: { type: Boolean },
    dir: {},
    disabled: { type: Boolean },
    propagateSelect: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "ul" }
  },
  emits: ["update:modelValue", "update:expanded"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { items, multiple, disabled, propagateSelect, dir: propDir } = toRefs(props);
    const { handleTypeaheadSearch } = useTypeahead();
    const dir = useDirection(propDir);
    const rovingFocusGroupRef = ref();
    const isVirtual = ref(false);
    const virtualKeydownHook = createEventHook();
    const modelValue = useVModel(props, "modelValue", emits, {
      // @ts-expect-error idk
      defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
      passive: props.modelValue === void 0,
      deep: true
    });
    const expanded = useVModel(props, "expanded", emits, {
      // @ts-expect-error idk
      defaultValue: props.defaultExpanded ?? [],
      passive: props.expanded === void 0,
      deep: true
    });
    const { onSelectItem, handleMultipleReplace } = useSelectionBehavior(modelValue, props);
    const selectedKeys = computed(() => {
      if (multiple.value && Array.isArray(modelValue.value))
        return modelValue.value.map((i) => props.getKey(i));
      else
        return [props.getKey(modelValue.value ?? {})];
    });
    function flattenItems(items2, level = 1, parentItem) {
      return items2.reduce((acc, item, index) => {
        const key = props.getKey(item);
        const children = props.getChildren(item);
        const isExpanded = expanded.value.includes(key);
        const flattenedItem = {
          _id: key,
          value: item,
          index,
          level,
          parentItem,
          hasChildren: !!children,
          bind: {
            "value": item,
            level,
            "aria-setsize": items2.length,
            "aria-posinset": index + 1
          }
        };
        acc.push(flattenedItem);
        if (children && isExpanded)
          acc.push(...flattenItems(children, level + 1, item));
        return acc;
      }, []);
    }
    const expandedItems = computed(() => {
      const items2 = props.items;
      expanded.value.map((i) => i);
      return flattenItems(items2 ?? []);
    });
    function handleKeydown(event) {
      if (isVirtual.value) {
        virtualKeydownHook.trigger(event);
      } else {
        const collections = rovingFocusGroupRef.value?.getItems() ?? [];
        handleTypeaheadSearch(event.key, collections);
      }
    }
    function handleKeydownNavigation(event) {
      if (isVirtual.value)
        return;
      const intent = MAP_KEY_TO_FOCUS_INTENT[event.key];
      nextTick(() => {
        handleMultipleReplace(
          intent,
          getActiveElement(),
          rovingFocusGroupRef.value?.getItems,
          expandedItems.value.map((i) => i.value)
        );
      });
    }
    provideTreeRootContext({
      modelValue,
      selectedKeys,
      onSelect: (val) => {
        const condition = (baseValue) => props.getKey(baseValue ?? {}) === props.getKey(val);
        const exist = props.multiple && Array.isArray(modelValue.value) ? modelValue.value?.findIndex(condition) !== -1 : void 0;
        onSelectItem(val, condition);
        if (props.propagateSelect && props.multiple && Array.isArray(modelValue.value)) {
          const children = flatten(props.getChildren(val) ?? []);
          if (exist) {
            modelValue.value = [...modelValue.value].filter((i) => !children.some((child) => props.getKey(i ?? {}) === props.getKey(child)));
          } else {
            modelValue.value = [...modelValue.value, ...children];
          }
        }
      },
      expanded,
      onToggle(val) {
        const children = val ? props.getChildren(val) : void 0;
        if (!children)
          return;
        const key = props.getKey(val) ?? val;
        if (expanded.value.includes(key))
          expanded.value = expanded.value.filter((val2) => val2 !== key);
        else
          expanded.value.push(key);
      },
      getKey: props.getKey,
      getChildren: props.getChildren,
      items,
      expandedItems,
      disabled,
      multiple,
      dir,
      propagateSelect,
      isVirtual,
      virtualKeydownHook,
      handleMultipleReplace
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        ref_key: "rovingFocusGroupRef",
        ref: rovingFocusGroupRef,
        "as-child": "",
        orientation: "vertical",
        dir: unref(dir)
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            role: "tree",
            as: _ctx.as,
            "as-child": _ctx.asChild,
            "aria-multiselectable": unref(multiple) ? true : void 0,
            onKeydown: [
              handleKeydown,
              withKeys(withModifiers(handleKeydownNavigation, ["shift"]), ["up", "down"])
            ]
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {
                flattenItems: expandedItems.value,
                modelValue: unref(modelValue),
                expanded: unref(expanded)
              })
            ]),
            _: 3
          }, 8, ["as", "as-child", "aria-multiselectable", "onKeydown"])
        ]),
        _: 3
      }, 8, ["dir"]);
    };
  }
});

export { _sfc_main as _, injectTreeRootContext as i };
//# sourceMappingURL=TreeRoot.js.map
