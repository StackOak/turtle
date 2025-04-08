'use strict';

const vue = require('vue');
const Pagination_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Pagination_PaginationRoot = require('./PaginationRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "PaginationList",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    shared_useForwardExpose.useForwardExpose();
    const rootContext = Pagination_PaginationRoot.injectPaginationRootContext();
    const transformedRange = vue.computed(() => {
      return Pagination_utils.transform(
        Pagination_utils.getRange(
          rootContext.page.value,
          rootContext.pageCount.value,
          rootContext.siblingCount.value,
          rootContext.showEdges.value
        )
      );
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.normalizeProps(vue.guardReactiveProps(props)), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { items: transformedRange.value })
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=PaginationList.cjs.map
