import { defineComponent, computed, onMounted, onUnmounted, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { c as createContext } from '../shared/createContext.js';
import { u as useId } from '../shared/useId.js';
import { _ as _sfc_main$1 } from '../Listbox/ListboxGroup.js';
import { i as injectComboboxRootContext } from './ComboboxRoot.js';

const [injectComboboxGroupContext, provideComboboxGroupContext] = createContext("ComboboxGroup");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ComboboxGroup",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const id = useId(void 0, "reka-combobox-group");
    const rootContext = injectComboboxRootContext();
    const isRender = computed(() => rootContext.ignoreFilter.value ? true : !rootContext.filterState.search ? true : rootContext.filterState.filtered.groups.has(id));
    const context = provideComboboxGroupContext({
      id,
      labelId: ""
    });
    onMounted(() => {
      if (!rootContext.allGroups.value.has(id))
        rootContext.allGroups.value.set(id, /* @__PURE__ */ new Set());
    });
    onUnmounted(() => {
      rootContext.allGroups.value.delete(id);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), mergeProps({
        id: unref(id),
        "aria-labelledby": unref(context).labelId
      }, props, {
        hidden: isRender.value ? void 0 : true
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["id", "aria-labelledby", "hidden"]);
    };
  }
});

export { _sfc_main as _, injectComboboxGroupContext as i };
//# sourceMappingURL=ComboboxGroup.js.map
