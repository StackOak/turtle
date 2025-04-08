'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const [injectPaginationRootContext, providePaginationRootContext] = shared_createContext.createContext("PaginationRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const { siblingCount, disabled, showEdges } = vue.toRefs(props);
    shared_useForwardExpose.useForwardExpose();
    const page = core.useVModel(props, "page", emits, {
      defaultValue: props.defaultPage,
      passive: props.page === void 0
    });
    const pageCount = vue.computed(() => Math.max(1, Math.ceil(props.total / (props.itemsPerPage || 1))));
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
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        as: _ctx.as,
        "as-child": _ctx.asChild
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {
            page: vue.unref(page),
            pageCount: pageCount.value
          })
        ]),
        _: 3
      }, 8, ["as", "as-child"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectPaginationRootContext = injectPaginationRootContext;
//# sourceMappingURL=PaginationRoot.cjs.map
