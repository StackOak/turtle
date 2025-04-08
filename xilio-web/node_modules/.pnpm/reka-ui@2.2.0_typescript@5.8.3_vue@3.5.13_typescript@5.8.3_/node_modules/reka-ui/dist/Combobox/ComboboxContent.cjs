'use strict';

const vue = require('vue');
const Combobox_ComboboxContentImpl = require('./ComboboxContentImpl.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useId = require('../shared/useId.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const Combobox_ComboboxRoot = require('./ComboboxRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ComboboxContent",
  props: {
    forceMount: { type: Boolean },
    position: {},
    bodyLock: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    disableOutsidePointerEvents: { type: Boolean }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = shared_useForwardPropsEmits.useForwardPropsEmits(props, emits);
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const rootContext = Combobox_ComboboxRoot.injectComboboxRootContext();
    rootContext.contentId ||= shared_useId.useId(void 0, "reka-combobox-content");
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        present: _ctx.forceMount || vue.unref(rootContext).open.value
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(Combobox_ComboboxContentImpl._sfc_main, vue.mergeProps({ ...vue.unref(forwarded), ..._ctx.$attrs }, { ref: vue.unref(forwardRef) }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ComboboxContent.cjs.map
