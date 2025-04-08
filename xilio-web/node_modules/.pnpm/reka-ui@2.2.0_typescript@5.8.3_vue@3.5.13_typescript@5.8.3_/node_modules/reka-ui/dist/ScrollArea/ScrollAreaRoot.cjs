'use strict';

const vue = require('vue');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const [injectScrollAreaRootContext, provideScrollAreaRootContext] = shared_createContext.createContext("ScrollAreaRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ScrollAreaRoot",
  props: {
    type: { default: "hover" },
    dir: {},
    scrollHideDelay: { default: 600 },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const cornerWidth = vue.ref(0);
    const cornerHeight = vue.ref(0);
    const viewport = vue.ref();
    const content = vue.ref();
    const scrollbarX = vue.ref();
    const scrollbarY = vue.ref();
    const scrollbarXEnabled = vue.ref(false);
    const scrollbarYEnabled = vue.ref(false);
    const { type, dir: propDir, scrollHideDelay } = vue.toRefs(props);
    const dir = shared_useDirection.useDirection(propDir);
    function scrollTop() {
      viewport.value?.scrollTo({
        top: 0
      });
    }
    function scrollTopLeft() {
      viewport.value?.scrollTo({
        top: 0,
        left: 0
      });
    }
    __expose({
      /** Viewport element within ScrollArea */
      viewport,
      /** Scroll viewport to top */
      scrollTop,
      /** Scroll viewport to top-left */
      scrollTopLeft
    });
    const { forwardRef, currentElement: scrollArea } = shared_useForwardExpose.useForwardExpose();
    provideScrollAreaRootContext({
      type,
      dir,
      scrollHideDelay,
      scrollArea,
      viewport,
      onViewportChange: (el) => {
        viewport.value = el || void 0;
      },
      content,
      onContentChange: (el) => {
        content.value = el;
      },
      scrollbarX,
      scrollbarXEnabled,
      scrollbarY,
      scrollbarYEnabled,
      onScrollbarXChange: (scrollbar) => {
        scrollbarX.value = scrollbar || void 0;
      },
      onScrollbarYChange: (scrollbar) => {
        scrollbarY.value = scrollbar || void 0;
      },
      onScrollbarXEnabledChange: (rendered) => {
        scrollbarXEnabled.value = rendered;
      },
      onScrollbarYEnabledChange: (rendered) => {
        scrollbarYEnabled.value = rendered;
      },
      onCornerWidthChange: (width) => {
        cornerWidth.value = width;
      },
      onCornerHeightChange: (height) => {
        cornerHeight.value = height;
      }
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref: vue.unref(forwardRef),
        "as-child": props.asChild,
        as: _ctx.as,
        dir: vue.unref(dir),
        style: vue.normalizeStyle({
          position: "relative",
          // Pass corner sizes as CSS vars to reduce re-renders of context consumers
          ["--reka-scroll-area-corner-width"]: `${cornerWidth.value}px`,
          ["--reka-scroll-area-corner-height"]: `${cornerHeight.value}px`
        })
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as-child", "as", "dir", "style"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectScrollAreaRootContext = injectScrollAreaRootContext;
//# sourceMappingURL=ScrollAreaRoot.cjs.map
