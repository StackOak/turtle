import { defineComponent, computed, createBlock, openBlock, Teleport, unref, createVNode, withCtx, mergeProps, renderSlot } from 'vue';
import { g as getOpenState, w as whenMouse } from './utils.js';
import { reactiveOmit, isClient } from '@vueuse/shared';
import { _ as _sfc_main$1 } from './NavigationMenuContentImpl.js';
import { u as useForwardPropsEmits } from '../shared/useForwardPropsEmits.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Presence } from '../Presence/Presence.js';
import { i as injectNavigationMenuContext } from './NavigationMenuRoot.js';
import { i as injectNavigationMenuItemContext } from './NavigationMenuItem.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "NavigationMenuContent",
  props: {
    forceMount: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(reactiveOmit(props, "forceMount"), emits);
    const { forwardRef } = useForwardExpose();
    const menuContext = injectNavigationMenuContext();
    const itemContext = injectNavigationMenuItemContext();
    const open = computed(() => itemContext.value === menuContext.modelValue.value);
    const isLastActiveValue = computed(() => {
      if (menuContext.viewport.value) {
        if (!menuContext.modelValue.value && menuContext.previousValue.value)
          return menuContext.previousValue.value === itemContext.value;
      }
      return false;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, {
        to: unref(isClient) && unref(menuContext).viewport.value ? unref(menuContext).viewport.value : "body",
        disabled: unref(isClient) && unref(menuContext).viewport.value ? !unref(menuContext).viewport.value : true
      }, [
        createVNode(unref(Presence), {
          present: _ctx.forceMount || open.value || isLastActiveValue.value,
          "force-mount": !unref(menuContext).unmountOnHide.value
        }, {
          default: withCtx(({ present }) => [
            createVNode(_sfc_main$1, mergeProps({
              ref: unref(forwardRef),
              "data-state": unref(getOpenState)(open.value),
              style: {
                pointerEvents: !open.value && unref(menuContext).isRootMenu ? "none" : void 0
              }
            }, { ..._ctx.$attrs, ...unref(forwarded) }, {
              hidden: !present,
              onPointerenter: _cache[0] || (_cache[0] = ($event) => unref(menuContext).onContentEnter(unref(itemContext).value)),
              onPointerleave: _cache[1] || (_cache[1] = ($event) => unref(whenMouse)(() => unref(menuContext).onContentLeave())($event)),
              onPointerDownOutside: _cache[2] || (_cache[2] = ($event) => emits("pointerDownOutside", $event)),
              onFocusOutside: _cache[3] || (_cache[3] = ($event) => emits("focusOutside", $event)),
              onInteractOutside: _cache[4] || (_cache[4] = ($event) => emits("interactOutside", $event))
            }), {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default")
              ]),
              _: 2
            }, 1040, ["data-state", "style", "hidden"])
          ]),
          _: 3
        }, 8, ["present", "force-mount"])
      ], 8, ["to", "disabled"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=NavigationMenuContent.js.map
