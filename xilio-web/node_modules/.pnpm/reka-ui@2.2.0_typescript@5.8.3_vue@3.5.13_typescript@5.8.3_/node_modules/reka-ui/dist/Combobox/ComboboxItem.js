import { defineComponent, computed, onMounted, onUnmounted, createBlock, createCommentVNode, openBlock, unref, mergeProps, withCtx, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { u as useId } from '../shared/useId.js';
import { u as usePrimitiveElement } from '../Primitive/usePrimitiveElement.js';
import { _ as _sfc_main$1 } from '../Listbox/ListboxItem.js';
import { i as injectComboboxRootContext } from './ComboboxRoot.js';
import { i as injectComboboxGroupContext } from './ComboboxGroup.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ComboboxItem",
  props: {
    textValue: {},
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const id = useId(void 0, "reka-combobox-item");
    const rootContext = injectComboboxRootContext();
    const groupContext = injectComboboxGroupContext(null);
    const { primitiveElement, currentElement } = usePrimitiveElement();
    if (props.value === "") {
      throw new Error(
        "A <ComboboxItem /> must have a value prop that is not an empty string. This is because the Combobox value can be set to an empty string to clear the selection and show the placeholder."
      );
    }
    const isRender = computed(() => {
      if (rootContext.isVirtual.value || rootContext.ignoreFilter.value || !rootContext.filterState.search) {
        return true;
      } else {
        const filteredCurrentItem = rootContext.filterState.filtered.items.get(id);
        if (filteredCurrentItem === void 0) {
          return true;
        }
        return filteredCurrentItem > 0;
      }
    });
    onMounted(() => {
      rootContext.allItems.value.set(id, props.textValue || currentElement.value.textContent || currentElement.value.innerText);
      const groupId = groupContext?.id;
      if (groupId) {
        if (!rootContext.allGroups.value.has(groupId)) {
          rootContext.allGroups.value.set(groupId, /* @__PURE__ */ new Set([id]));
        } else {
          rootContext.allGroups.value.get(groupId)?.add(id);
        }
      }
    });
    onUnmounted(() => {
      rootContext.allItems.value.delete(id);
    });
    return (_ctx, _cache) => {
      return isRender.value ? (openBlock(), createBlock(unref(_sfc_main$1), mergeProps({ key: 0 }, props, {
        id: unref(id),
        ref_key: "primitiveElement",
        ref: primitiveElement,
        onSelect: _cache[0] || (_cache[0] = (event) => {
          emits("select", event);
          if (event.defaultPrevented)
            return;
          if (!unref(rootContext).multiple.value) {
            event.preventDefault();
            unref(rootContext).onOpenChange(false);
            unref(rootContext).modelValue.value = props.value;
          }
        })
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(_ctx.value), 1)
          ])
        ]),
        _: 3
      }, 16, ["id"])) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ComboboxItem.js.map
