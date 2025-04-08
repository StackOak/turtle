'use strict';

const vue = require('vue');
const Dialog_DialogRoot = require('./DialogRoot.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useId = require('../shared/useId.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DialogTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = Dialog_DialogRoot.injectDialogRootContext();
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    rootContext.contentId ||= shared_useId.useId(void 0, "reka-dialog-content");
    vue.onMounted(() => {
      rootContext.triggerElement.value = currentElement.value;
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        ref: vue.unref(forwardRef),
        type: _ctx.as === "button" ? "button" : void 0,
        "aria-haspopup": "dialog",
        "aria-expanded": vue.unref(rootContext).open.value || false,
        "aria-controls": vue.unref(rootContext).open.value ? vue.unref(rootContext).contentId : void 0,
        "data-state": vue.unref(rootContext).open.value ? "open" : "closed",
        onClick: vue.unref(rootContext).onOpenToggle
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["type", "aria-expanded", "aria-controls", "data-state", "onClick"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DialogTrigger.cjs.map
