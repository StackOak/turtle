import { defineComponent, toRefs, computed, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { useVModel } from '@vueuse/core';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const [injectPaginationRootContext, providePaginationRootContext] = createContext("PaginationRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PaginationRoot",
  props: {
    page: {},
    defaultPage: { default: 1 },
    itemsPerPage: {},
    total: { default: 0 },
    siblingCount: { default: 2 },
    disabled: { type: Boolean },
    showEdges: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: { default: "nav" }
  },
  emits: ["update:page"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { siblingCount, disabled, showEdges } = toRefs(props);
    useForwardExpose();
    const page = useVModel(props, "page", emits, {
      defaultValue: props.defaultPage,
      passive: props.page === void 0
    });
    const pageCount = computed(() => Math.max(1, Math.ceil(props.total / (props.itemsPerPage || 1))));
    providePaginationRootContext({
      page,
      onPageChange(value) {
        page.value = value;
      },
      pageCount,
      siblingCount,
      disabled,
      showEdges
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: _ctx.as,
        "as-child": _ctx.asChild
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {
            page: unref(page),
            pageCount: pageCount.value
          })
        ]),
        _: 3
      }, 8, ["as", "as-child"]);
    };
  }
});

export { _sfc_main as _, injectPaginationRootContext as i };
//# sourceMappingURL=PaginationRoot.js.map
