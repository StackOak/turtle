import { defineComponent, toRefs, createElementBlock, openBlock, Fragment, createVNode, unref, mergeProps, withCtx, renderSlot, createTextVNode } from 'vue';
import { u as useNonce } from '../shared/useNonce.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectComboboxRootContext } from './ComboboxRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ComboboxViewport",
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
    const rootContext = injectComboboxRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(unref(Primitive), mergeProps({ ..._ctx.$attrs, ...props }, {
          ref: unref(forwardRef),
          "data-reka-combobox-viewport": "",
          role: "presentation",
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: unref(rootContext).isVirtual.value ? void 0 : 1,
            overflow: "auto"
          }
        }), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["style"]),
        createVNode(unref(Primitive), {
          as: "style",
          nonce: unref(nonce)
        }, {
          default: withCtx(() => _cache[0] || (_cache[0] = [
            createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-combobox-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-combobox-viewport]::-webkit-scrollbar { display: none; } ")
          ])),
          _: 1
        }, 8, ["nonce"])
      ], 64);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ComboboxViewport.js.map
