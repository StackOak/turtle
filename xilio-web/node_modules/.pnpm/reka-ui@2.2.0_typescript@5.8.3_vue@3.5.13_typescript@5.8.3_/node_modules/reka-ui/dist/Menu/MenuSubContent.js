import { defineComponent, createBlock, openBlock, unref, withCtx, createVNode, mergeProps, withModifiers, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './MenuContentImpl.js';
import { d as SUB_CLOSE_KEYS } from './utils.js';
import { u as useForwardPropsEmits } from '../shared/useForwardPropsEmits.js';
import { i as injectMenuSubContext } from './MenuSub.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useId } from '../shared/useId.js';
import { P as Presence } from '../Presence/Presence.js';
import { i as injectMenuContext, a as injectMenuRootContext } from './MenuRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MenuSubContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    sideOffset: {},
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
    prioritizePosition: { type: Boolean, default: true },
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
    const menuSubContext = injectMenuSubContext();
    const { forwardRef, currentElement: subContentElement } = useForwardExpose();
    menuSubContext.contentId ||= useId(void 0, "reka-menu-sub-content");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || unref(menuContext).open.value
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$1, mergeProps(unref(forwarded), {
            id: unref(menuSubContext).contentId,
            ref: unref(forwardRef),
            "aria-labelledby": unref(menuSubContext).triggerId,
            align: "start",
            side: unref(rootContext).dir.value === "rtl" ? "left" : "right",
            "disable-outside-pointer-events": false,
            "disable-outside-scroll": false,
            "trap-focus": false,
            onOpenAutoFocus: _cache[0] || (_cache[0] = withModifiers((event) => {
              if (unref(rootContext).isUsingKeyboardRef.value) unref(subContentElement)?.focus();
            }, ["prevent"])),
            onCloseAutoFocus: _cache[1] || (_cache[1] = withModifiers(() => {
            }, ["prevent"])),
            onFocusOutside: _cache[2] || (_cache[2] = (event) => {
              if (event.defaultPrevented) return;
              if (event.target !== unref(menuSubContext).trigger.value)
                unref(menuContext).onOpenChange(false);
            }),
            onEscapeKeyDown: _cache[3] || (_cache[3] = (event) => {
              unref(rootContext).onClose();
              event.preventDefault();
            }),
            onKeydown: _cache[4] || (_cache[4] = (event) => {
              const isKeyDownInside = event.currentTarget?.contains(event.target);
              const isCloseKey = unref(SUB_CLOSE_KEYS)[unref(rootContext).dir.value].includes(event.key);
              if (isKeyDownInside && isCloseKey) {
                unref(menuContext).onOpenChange(false);
                unref(menuSubContext).trigger.value?.focus();
                event.preventDefault();
              }
            })
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["id", "aria-labelledby", "side"])
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=MenuSubContent.js.map
