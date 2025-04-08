'use strict';

const vue = require('vue');
const HoverCard_utils = require('./utils.cjs');
const HoverCard_HoverCardContentImpl = require('./HoverCardContentImpl.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const HoverCard_HoverCardRoot = require('./HoverCardRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "HoverCardContent",
  props: {
    forceMount: { type: Boolean },
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
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = shared_useForwardPropsEmits.useForwardPropsEmits(props, emits);
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const rootContext = HoverCard_HoverCardRoot.injectHoverCardRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        present: _ctx.forceMount || vue.unref(rootContext).open.value
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(HoverCard_HoverCardContentImpl._sfc_main, vue.mergeProps(vue.unref(forwarded), {
            ref: vue.unref(forwardRef),
            onPointerenter: _cache[0] || (_cache[0] = ($event) => vue.unref(HoverCard_utils.excludeTouch)(vue.unref(rootContext).onOpen)($event))
          }), {
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
//# sourceMappingURL=HoverCardContent.cjs.map
