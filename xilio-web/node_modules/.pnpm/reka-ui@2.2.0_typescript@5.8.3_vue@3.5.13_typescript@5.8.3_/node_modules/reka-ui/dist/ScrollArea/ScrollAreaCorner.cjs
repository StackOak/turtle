'use strict';

const vue = require('vue');
const ScrollArea_ScrollAreaCornerImpl = require('./ScrollAreaCornerImpl.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const ScrollArea_ScrollAreaRoot = require('./ScrollAreaRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ScrollAreaCorner",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const rootContext = ScrollArea_ScrollAreaRoot.injectScrollAreaRootContext();
    const hasBothScrollbarsVisible = vue.computed(
      () => !!rootContext.scrollbarX.value && !!rootContext.scrollbarY.value
    );
    const hasCorner = vue.computed(
      () => rootContext.type.value !== "scroll" && hasBothScrollbarsVisible.value
    );
    return (_ctx, _cache) => {
      return hasCorner.value ? (vue.openBlock(), vue.createBlock(ScrollArea_ScrollAreaCornerImpl._sfc_main, vue.mergeProps({ key: 0 }, props, { ref: vue.unref(forwardRef) }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16)) : vue.createCommentVNode("", true);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ScrollAreaCorner.cjs.map
