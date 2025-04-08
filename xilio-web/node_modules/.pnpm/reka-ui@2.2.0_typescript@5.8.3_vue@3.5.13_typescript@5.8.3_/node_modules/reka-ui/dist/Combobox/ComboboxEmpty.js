import { defineComponent, computed, createBlock, createCommentVNode, openBlock, unref, normalizeProps, mergeProps, withCtx, renderSlot, createTextVNode } from 'vue';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectComboboxRootContext } from './ComboboxRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ComboboxEmpty",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectComboboxRootContext();
    const isRender = computed(
      () => rootContext.ignoreFilter.value ? rootContext.allItems.value.size === 0 : !!rootContext.filterState.search && rootContext.filterState.filtered.count === 0
    );
    return (_ctx, _cache) => {
      return isRender.value ? (openBlock(), createBlock(unref(Primitive), normalizeProps(mergeProps({ key: 0 }, props)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            _cache[0] || (_cache[0] = createTextVNode("No options"))
          ])
        ]),
        _: 3
      }, 16)) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ComboboxEmpty.js.map
