import { defineComponent, ref, toRefs, createBlock, openBlock, unref, normalizeStyle, withCtx, renderSlot } from 'vue';
import { c as createContext } from '../shared/createContext.js';
import { u as useDirection } from '../shared/useDirection.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const [injectScrollAreaRootContext, provideScrollAreaRootContext] = createContext("ScrollAreaRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const cornerWidth = ref(0);
    const cornerHeight = ref(0);
    const viewport = ref();
    const content = ref();
    const scrollbarX = ref();
    const scrollbarY = ref();
    const scrollbarXEnabled = ref(false);
    const scrollbarYEnabled = ref(false);
    const { type, dir: propDir, scrollHideDelay } = toRefs(props);
    const dir = useDirection(propDir);
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
    const { forwardRef, currentElement: scrollArea } = useForwardExpose();
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
      return openBlock(), createBlock(unref(Primitive), {
        ref: unref(forwardRef),
        "as-child": props.asChild,
        as: _ctx.as,
        dir: unref(dir),
        style: normalizeStyle({
          position: "relative",
          // Pass corner sizes as CSS vars to reduce re-renders of context consumers
          ["--reka-scroll-area-corner-width"]: `${cornerWidth.value}px`,
          ["--reka-scroll-area-corner-height"]: `${cornerHeight.value}px`
        })
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as-child", "as", "dir", "style"]);
    };
  }
});

export { _sfc_main as _, injectScrollAreaRootContext as i };
//# sourceMappingURL=ScrollAreaRoot.js.map
