import { defineComponent, toRefs, createElementBlock, openBlock, Fragment, createVNode, unref, mergeProps, withCtx, renderSlot, createTextVNode } from 'vue';
import { u as useNonce } from '../shared/useNonce.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Viewport",
  props: {
    nonce: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = useForwardExpose();
    const { nonce: propNonce } = toRefs(props);
    const nonce = useNonce(propNonce);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(unref(Primitive), mergeProps({ ..._ctx.$attrs, ...props }, {
          ref: unref(forwardRef),
          "data-reka-viewport": "",
          role: "presentation",
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            overflow: "auto"
          }
        }), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16),
        createVNode(unref(Primitive), {
          as: "style",
          nonce: unref(nonce)
        }, {
          default: withCtx(() => _cache[0] || (_cache[0] = [
            createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-viewport]::-webkit-scrollbar { display: none; } ")
          ])),
          _: 1
        }, 8, ["nonce"])
      ], 64);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=Viewport.js.map
