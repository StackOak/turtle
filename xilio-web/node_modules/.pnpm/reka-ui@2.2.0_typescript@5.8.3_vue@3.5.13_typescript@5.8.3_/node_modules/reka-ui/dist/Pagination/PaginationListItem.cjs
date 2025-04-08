'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Pagination_PaginationRoot = require('./PaginationRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "PaginationListItem",
  props: {
    value: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    shared_useForwardExpose.useForwardExpose();
    const rootContext = Pagination_PaginationRoot.injectPaginationRootContext();
    const isSelected = vue.computed(() => rootContext.page.value === props.value);
    const disabled = vue.computed(() => rootContext.disabled.value);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        "data-type": "page",
        "aria-label": `Page ${_ctx.value}`,
        "aria-current": isSelected.value ? "page" : void 0,
        "data-selected": isSelected.value ? "true" : void 0,
        disabled: disabled.value,
        type: _ctx.as === "button" ? "button" : void 0,
        onClick: _cache[0] || (_cache[0] = ($event) => !disabled.value && vue.unref(rootContext).onPageChange(_ctx.value))
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createTextVNode(vue.toDisplayString(_ctx.value), 1)
          ])
        ]),
        _: 3
      }, 16, ["aria-label", "aria-current", "data-selected", "disabled", "type"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=PaginationListItem.cjs.map
