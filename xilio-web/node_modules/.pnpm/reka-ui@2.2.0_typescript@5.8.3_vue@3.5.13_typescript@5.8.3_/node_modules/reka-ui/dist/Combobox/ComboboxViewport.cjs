'use strict';

const vue = require('vue');
const shared_useNonce = require('../shared/useNonce.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Combobox_ComboboxRoot = require('./ComboboxRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ComboboxViewport",
  props: {
    nonce: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const { nonce: propNonce } = vue.toRefs(props);
    const nonce = shared_useNonce.useNonce(propNonce);
    const rootContext = Combobox_ComboboxRoot.injectComboboxRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({ ..._ctx.$attrs, ...props }, {
          ref: vue.unref(forwardRef),
          "data-reka-combobox-viewport": "",
          role: "presentation",
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: vue.unref(rootContext).isVirtual.value ? void 0 : 1,
            overflow: "auto"
          }
        }), {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["style"]),
        vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
          as: "style",
          nonce: vue.unref(nonce)
        }, {
          default: vue.withCtx(() => _cache[0] || (_cache[0] = [
            vue.createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-combobox-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-combobox-viewport]::-webkit-scrollbar { display: none; } ")
          ])),
          _: 1
        }, 8, ["nonce"])
      ], 64);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ComboboxViewport.cjs.map
