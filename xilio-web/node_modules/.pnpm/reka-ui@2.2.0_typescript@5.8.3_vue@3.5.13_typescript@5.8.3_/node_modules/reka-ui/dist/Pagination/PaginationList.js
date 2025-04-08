import { defineComponent, computed, createBlock, openBlock, unref, normalizeProps, guardReactiveProps, withCtx, renderSlot } from 'vue';
import { t as transform, g as getRange } from './utils.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectPaginationRootContext } from './PaginationRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PaginationList",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const rootContext = injectPaginationRootContext();
    const transformedRange = computed(() => {
      return transform(
        getRange(
          rootContext.page.value,
          rootContext.pageCount.value,
          rootContext.siblingCount.value,
          rootContext.showEdges.value
        )
      );
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { items: transformedRange.value })
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=PaginationList.js.map
