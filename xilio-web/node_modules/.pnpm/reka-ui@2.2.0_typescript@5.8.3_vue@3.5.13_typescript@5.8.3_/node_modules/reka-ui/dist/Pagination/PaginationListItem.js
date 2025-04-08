import { defineComponent, computed, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectPaginationRootContext } from './PaginationRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PaginationListItem",
  props: {
    value: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const rootContext = injectPaginationRootContext();
    const isSelected = computed(() => rootContext.page.value === props.value);
    const disabled = computed(() => rootContext.disabled.value);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        "data-type": "page",
        "aria-label": `Page ${_ctx.value}`,
        "aria-current": isSelected.value ? "page" : void 0,
        "data-selected": isSelected.value ? "true" : void 0,
        disabled: disabled.value,
        type: _ctx.as === "button" ? "button" : void 0,
        onClick: _cache[0] || (_cache[0] = ($event) => !disabled.value && unref(rootContext).onPageChange(_ctx.value))
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(_ctx.value), 1)
          ])
        ]),
        _: 3
      }, 16, ["aria-label", "aria-current", "data-selected", "disabled", "type"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=PaginationListItem.js.map
