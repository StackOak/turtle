import { defineComponent, createBlock, openBlock, unref, withCtx, createVNode, mergeProps, renderSlot } from 'vue';
import { useVModel } from '@vueuse/core';
import { _ as _sfc_main$1 } from './ToastRootImpl.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Presence } from '../Presence/Presence.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ToastRoot",
  props: {
    defaultOpen: { type: Boolean, default: true },
    forceMount: { type: Boolean },
    type: { default: "foreground" },
    open: { type: Boolean, default: void 0 },
    duration: {},
    asChild: { type: Boolean },
    as: { default: "li" }
  },
  emits: ["escapeKeyDown", "pause", "resume", "swipeStart", "swipeMove", "swipeCancel", "swipeEnd", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { forwardRef } = useForwardExpose();
    const open = useVModel(props, "open", emits, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || unref(open)
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$1, mergeProps({
            ref: unref(forwardRef),
            open: unref(open),
            type: _ctx.type,
            as: _ctx.as,
            "as-child": _ctx.asChild,
            duration: _ctx.duration
          }, _ctx.$attrs, {
            onClose: _cache[0] || (_cache[0] = ($event) => open.value = false),
            onPause: _cache[1] || (_cache[1] = ($event) => emits("pause")),
            onResume: _cache[2] || (_cache[2] = ($event) => emits("resume")),
            onEscapeKeyDown: _cache[3] || (_cache[3] = ($event) => emits("escapeKeyDown", $event)),
            onSwipeStart: _cache[4] || (_cache[4] = (event) => {
              emits("swipeStart", event);
              event.currentTarget.setAttribute("data-swipe", "start");
            }),
            onSwipeMove: _cache[5] || (_cache[5] = (event) => {
              emits("swipeMove", event);
              const { x, y } = event.detail.delta;
              const target = event.currentTarget;
              target.setAttribute("data-swipe", "move");
              target.style.setProperty("--reka-toast-swipe-move-x", `${x}px`);
              target.style.setProperty("--reka-toast-swipe-move-y", `${y}px`);
            }),
            onSwipeCancel: _cache[6] || (_cache[6] = (event) => {
              emits("swipeCancel", event);
              const target = event.currentTarget;
              target.setAttribute("data-swipe", "cancel");
              target.style.removeProperty("--reka-toast-swipe-move-x");
              target.style.removeProperty("--reka-toast-swipe-move-y");
              target.style.removeProperty("--reka-toast-swipe-end-x");
              target.style.removeProperty("--reka-toast-swipe-end-y");
            }),
            onSwipeEnd: _cache[7] || (_cache[7] = (event) => {
              emits("swipeEnd", event);
              const { x, y } = event.detail.delta;
              const target = event.currentTarget;
              target.setAttribute("data-swipe", "end");
              target.style.removeProperty("--reka-toast-swipe-move-x");
              target.style.removeProperty("--reka-toast-swipe-move-y");
              target.style.setProperty("--reka-toast-swipe-end-x", `${x}px`);
              target.style.setProperty("--reka-toast-swipe-end-y", `${y}px`);
              open.value = false;
            })
          }), {
            default: withCtx(({ remaining, duration: _duration }) => [
              renderSlot(_ctx.$slots, "default", {
                remaining,
                duration: _duration,
                open: unref(open)
              })
            ]),
            _: 3
          }, 16, ["open", "type", "as", "as-child", "duration"])
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ToastRoot.js.map
