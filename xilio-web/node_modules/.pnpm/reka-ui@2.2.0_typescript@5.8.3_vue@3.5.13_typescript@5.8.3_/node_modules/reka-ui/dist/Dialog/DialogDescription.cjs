'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Dialog_DialogRoot = require('./DialogRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DialogDescription",
  props: {
    asChild: { type: Boolean },
    as: { default: "p" }
  },
  setup(__props) {
    const props = __props;
    shared_useForwardExpose.useForwardExpose();
    const rootContext = Dialog_DialogRoot.injectDialogRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        id: vue.unref(rootContext).descriptionId
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["id"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DialogDescription.cjs.map
