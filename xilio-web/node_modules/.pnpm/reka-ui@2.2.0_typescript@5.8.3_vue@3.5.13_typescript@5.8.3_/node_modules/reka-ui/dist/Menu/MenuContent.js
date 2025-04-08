import { defineComponent, createBlock, openBlock, unref, withCtx, normalizeProps, mergeProps, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './MenuRootContentModal.js';
import { _ as _sfc_main$2 } from './MenuRootContentNonModal.js';
import { u as useForwardPropsEmits } from '../shared/useForwardPropsEmits.js';
import { P as Presence } from '../Presence/Presence.js';
import { i as injectMenuContext, a as injectMenuRootContext } from './MenuRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MenuContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
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
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "entryFocus", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    const menuContext = injectMenuContext();
    const rootContext = injectMenuRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || unref(menuContext).open.value
      }, {
        default: withCtx(() => [
          unref(rootContext).modal.value ? (openBlock(), createBlock(_sfc_main$1, normalizeProps(mergeProps({ key: 0 }, { ..._ctx.$attrs, ...unref(forwarded) })), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)) : (openBlock(), createBlock(_sfc_main$2, normalizeProps(mergeProps({ key: 1 }, { ..._ctx.$attrs, ...unref(forwarded) })), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16))
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=MenuContent.js.map
