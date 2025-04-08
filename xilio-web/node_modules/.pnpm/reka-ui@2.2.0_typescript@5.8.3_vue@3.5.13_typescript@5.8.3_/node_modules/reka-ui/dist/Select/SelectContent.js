import { defineComponent, ref, onMounted, computed, createBlock, createElementBlock, createCommentVNode, openBlock, unref, withCtx, createVNode, normalizeProps, guardReactiveProps, renderSlot, Teleport } from 'vue';
import { _ as _sfc_main$1 } from './SelectContentImpl.js';
import { _ as _sfc_main$2 } from './SelectProvider.js';
import { u as useForwardPropsEmits } from '../shared/useForwardPropsEmits.js';
import { P as Presence } from '../Presence/Presence.js';
import { i as injectSelectRootContext } from './SelectRoot.js';

const _hoisted_1 = { key: 1 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "SelectContent",
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
    as: {}
  },
  emits: ["closeAutoFocus", "escapeKeyDown", "pointerDownOutside"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    const rootContext = injectSelectRootContext();
    const fragment = ref();
    onMounted(() => {
      fragment.value = new DocumentFragment();
    });
    const presenceRef = ref();
    const renderPresence = computed(() => props.forceMount || rootContext.open.value);
    return (_ctx, _cache) => {
      return renderPresence.value ? (openBlock(), createBlock(unref(Presence), {
        key: 0,
        ref_key: "presenceRef",
        ref: presenceRef,
        present: true
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$1, normalizeProps(guardReactiveProps({ ...unref(forwarded), ..._ctx.$attrs })), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 512)) : !presenceRef.value?.present && fragment.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
        (openBlock(), createBlock(Teleport, { to: fragment.value }, [
          createVNode(_sfc_main$2, { context: unref(rootContext) }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["context"])
        ], 8, ["to"]))
      ])) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=SelectContent.js.map
