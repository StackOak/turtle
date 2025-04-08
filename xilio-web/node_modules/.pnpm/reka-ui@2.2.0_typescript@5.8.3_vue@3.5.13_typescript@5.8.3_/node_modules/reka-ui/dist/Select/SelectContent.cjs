'use strict';

const vue = require('vue');
const Select_SelectContentImpl = require('./SelectContentImpl.cjs');
const Select_SelectProvider = require('./SelectProvider.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const Select_SelectRoot = require('./SelectRoot.cjs');

const _hoisted_1 = { key: 1 };
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const forwarded = shared_useForwardPropsEmits.useForwardPropsEmits(props, emits);
    const rootContext = Select_SelectRoot.injectSelectRootContext();
    const fragment = vue.ref();
    vue.onMounted(() => {
      fragment.value = new DocumentFragment();
    });
    const presenceRef = vue.ref();
    const renderPresence = vue.computed(() => props.forceMount || rootContext.open.value);
    return (_ctx, _cache) => {
      return renderPresence.value ? (vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        key: 0,
        ref_key: "presenceRef",
        ref: presenceRef,
        present: true
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(Select_SelectContentImpl._sfc_main, vue.normalizeProps(vue.guardReactiveProps({ ...vue.unref(forwarded), ..._ctx.$attrs })), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 512)) : !presenceRef.value?.present && fragment.value ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        (vue.openBlock(), vue.createBlock(vue.Teleport, { to: fragment.value }, [
          vue.createVNode(Select_SelectProvider._sfc_main, { context: vue.unref(rootContext) }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["context"])
        ], 8, ["to"]))
      ])) : vue.createCommentVNode("", true);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SelectContent.cjs.map
