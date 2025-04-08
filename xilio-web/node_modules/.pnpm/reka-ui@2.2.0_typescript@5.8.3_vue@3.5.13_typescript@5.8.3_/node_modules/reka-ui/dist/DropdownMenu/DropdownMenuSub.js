import { defineComponent, createBlock, openBlock, unref, isRef, withCtx, renderSlot } from 'vue';
import { useVModel } from '@vueuse/core';
import { _ as _sfc_main$1 } from '../Menu/MenuSub.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSub",
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean, default: void 0 }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = useVModel(props, "open", emit, {
      passive: props.open === void 0,
      defaultValue: props.defaultOpen ?? false
    });
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        open: unref(open),
        "onUpdate:open": _cache[0] || (_cache[0] = ($event) => isRef(open) ? open.value = $event : null)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { open: unref(open) })
        ]),
        _: 3
      }, 8, ["open"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=DropdownMenuSub.js.map
