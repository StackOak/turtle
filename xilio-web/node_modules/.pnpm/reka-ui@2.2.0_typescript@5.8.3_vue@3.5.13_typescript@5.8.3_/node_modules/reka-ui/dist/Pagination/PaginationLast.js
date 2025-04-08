import { defineComponent, computed, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot, createTextVNode } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectPaginationRootContext } from './PaginationRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PaginationLast",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectPaginationRootContext();
    useForwardExpose();
    const disabled = computed(() => rootContext.page.value === rootContext.pageCount.value || rootContext.disabled.value);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        "aria-label": "Last Page",
        type: _ctx.as === "button" ? "button" : void 0,
        disabled: disabled.value,
        onClick: _cache[0] || (_cache[0] = ($event) => !disabled.value && unref(rootContext).onPageChange(unref(rootContext).pageCount.value))
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            _cache[1] || (_cache[1] = createTextVNode("Last page"))
          ])
        ]),
        _: 3
      }, 16, ["type", "disabled"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=PaginationLast.js.map
