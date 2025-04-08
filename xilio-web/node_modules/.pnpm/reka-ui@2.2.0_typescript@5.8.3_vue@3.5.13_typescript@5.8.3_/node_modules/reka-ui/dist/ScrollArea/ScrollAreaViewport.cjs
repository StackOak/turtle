'use strict';

const vue = require('vue');
const shared_useNonce = require('../shared/useNonce.cjs');
const ScrollArea_ScrollAreaRoot = require('./ScrollAreaRoot.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ScrollAreaViewport",
  props: {
    nonce: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { nonce: propNonce } = vue.toRefs(props);
    const nonce = shared_useNonce.useNonce(propNonce);
    const rootContext = ScrollArea_ScrollAreaRoot.injectScrollAreaRootContext();
    const viewportElement = vue.ref();
    vue.onMounted(() => {
      rootContext.onViewportChange(viewportElement.value);
      rootContext.onContentChange(contentElement.value);
    });
    __expose({
      viewportElement
    });
    const { forwardRef, currentElement: contentElement } = shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        vue.createElementVNode("div", vue.mergeProps({
          ref_key: "viewportElement",
          ref: viewportElement,
          "data-reka-scroll-area-viewport": "",
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflowed#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: vue.unref(rootContext).scrollbarXEnabled.value ? "scroll" : "hidden",
            overflowY: vue.unref(rootContext).scrollbarYEnabled.value ? "scroll" : "hidden"
          }
        }, _ctx.$attrs, { tabindex: 0 }), [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            ref: vue.unref(forwardRef),
            style: vue.normalizeStyle({
              /**
               * When horizontal scrollbar is visible: this element should be at least
               * as wide as its children for size calculations to work correctly.
               *
               * When horizontal scrollbar is NOT visible: this element's width should
               * be constrained by the parent container to enable `text-overflow: ellipsis`
               */
              minWidth: vue.unref(rootContext).scrollbarXEnabled.value ? "fit-content" : void 0
            }),
            "as-child": props.asChild,
            as: _ctx.as
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["style", "as-child", "as"])
        ], 16),
        vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
          as: "style",
          nonce: vue.unref(nonce)
        }, {
          default: vue.withCtx(() => _cache[0] || (_cache[0] = [
            vue.createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-scroll-area-viewport] { scrollbar-width:none; -ms-overflow-style:none; -webkit-overflow-scrolling:touch; } [data-reka-scroll-area-viewport]::-webkit-scrollbar { display:none; } ")
          ])),
          _: 1
        }, 8, ["nonce"])
      ], 64);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ScrollAreaViewport.cjs.map
