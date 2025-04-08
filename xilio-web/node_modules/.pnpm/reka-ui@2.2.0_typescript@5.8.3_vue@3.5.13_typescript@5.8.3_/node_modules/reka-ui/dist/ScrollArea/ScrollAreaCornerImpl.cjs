'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const ScrollArea_ScrollAreaRoot = require('./ScrollAreaRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ScrollAreaCornerImpl",
  setup(__props) {
    const rootContext = ScrollArea_ScrollAreaRoot.injectScrollAreaRootContext();
    const width = vue.ref(0);
    const height = vue.ref(0);
    const hasSize = vue.computed(() => !!width.value && !!height.value);
    function setCornerHeight() {
      const offsetHeight = rootContext.scrollbarX.value?.offsetHeight || 0;
      rootContext.onCornerHeightChange(offsetHeight);
      height.value = offsetHeight;
    }
    function setCornerWidth() {
      const offsetWidth = rootContext.scrollbarY.value?.offsetWidth || 0;
      rootContext.onCornerWidthChange(offsetWidth);
      width.value = offsetWidth;
    }
    core.useResizeObserver(rootContext.scrollbarX.value, setCornerHeight);
    core.useResizeObserver(rootContext.scrollbarY.value, setCornerWidth);
    vue.watch(() => rootContext.scrollbarX.value, setCornerHeight);
    vue.watch(() => rootContext.scrollbarY.value, setCornerWidth);
    return (_ctx, _cache) => {
      return hasSize.value ? (vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
        key: 0,
        style: {
          width: `${width.value}px`,
          height: `${height.value}px`,
          position: "absolute",
          right: vue.unref(rootContext).dir.value === "ltr" ? 0 : void 0,
          left: vue.unref(rootContext).dir.value === "rtl" ? 0 : void 0,
          bottom: 0
        }
      }, _ctx.$parent?.$props), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["style"])) : vue.createCommentVNode("", true);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ScrollAreaCornerImpl.cjs.map
