'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Pagination_PaginationRoot = require('./PaginationRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "PaginationLast",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = Pagination_PaginationRoot.injectPaginationRootContext();
    shared_useForwardExpose.useForwardExpose();
    const disabled = vue.computed(() => rootContext.page.value === rootContext.pageCount.value || rootContext.disabled.value);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        "aria-label": "Last Page",
        type: _ctx.as === "button" ? "button" : void 0,
        disabled: disabled.value,
        onClick: _cache[0] || (_cache[0] = ($event) => !disabled.value && vue.unref(rootContext).onPageChange(vue.unref(rootContext).pageCount.value))
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            _cache[1] || (_cache[1] = vue.createTextVNode("Last page"))
          ])
        ]),
        _: 3
      }, 16, ["type", "disabled"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=PaginationLast.cjs.map
