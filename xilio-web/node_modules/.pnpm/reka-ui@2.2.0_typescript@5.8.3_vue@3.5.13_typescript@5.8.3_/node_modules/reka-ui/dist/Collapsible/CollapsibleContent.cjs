'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const shared_useId = require('../shared/useId.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Collapsible_CollapsibleRoot = require('./CollapsibleRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "CollapsibleContent",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["contentFound"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = Collapsible_CollapsibleRoot.injectCollapsibleRootContext();
    rootContext.contentId ||= shared_useId.useId(void 0, "reka-collapsible-content");
    const presentRef = vue.ref();
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const width = vue.ref(0);
    const height = vue.ref(0);
    const isOpen = vue.computed(() => rootContext.open.value);
    const isMountAnimationPrevented = vue.ref(isOpen.value);
    const currentStyle = vue.ref();
    vue.watch(
      () => [isOpen.value, presentRef.value?.present],
      async () => {
        await vue.nextTick();
        const node = currentElement.value;
        if (!node)
          return;
        currentStyle.value = currentStyle.value || {
          transitionDuration: node.style.transitionDuration,
          animationName: node.style.animationName
        };
        node.style.transitionDuration = "0s";
        node.style.animationName = "none";
        const rect = node.getBoundingClientRect();
        height.value = rect.height;
        width.value = rect.width;
        if (!isMountAnimationPrevented.value) {
          node.style.transitionDuration = currentStyle.value.transitionDuration;
          node.style.animationName = currentStyle.value.animationName;
        }
      },
      {
        immediate: true
      }
    );
    const skipAnimation = vue.computed(() => isMountAnimationPrevented.value && rootContext.open.value);
    vue.onMounted(() => {
      requestAnimationFrame(() => {
        isMountAnimationPrevented.value = false;
      });
    });
    core.useEventListener(currentElement, "beforematch", (ev) => {
      requestAnimationFrame(() => {
        rootContext.onOpenToggle();
        emits("contentFound");
      });
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        ref_key: "presentRef",
        ref: presentRef,
        present: _ctx.forceMount || vue.unref(rootContext).open.value,
        "force-mount": true
      }, {
        default: vue.withCtx(({ present }) => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(_ctx.$attrs, {
            id: vue.unref(rootContext).contentId,
            ref: vue.unref(forwardRef),
            "as-child": props.asChild,
            as: _ctx.as,
            hidden: !present ? vue.unref(rootContext).unmountOnHide.value ? "" : "until-found" : void 0,
            "data-state": skipAnimation.value ? void 0 : vue.unref(rootContext).open.value ? "open" : "closed",
            "data-disabled": vue.unref(rootContext).disabled?.value ? "" : void 0,
            style: {
              [`--reka-collapsible-content-height`]: `${height.value}px`,
              [`--reka-collapsible-content-width`]: `${width.value}px`
            }
          }), {
            default: vue.withCtx(() => [
              (vue.unref(rootContext).unmountOnHide.value ? present : true) ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : vue.createCommentVNode("", true)
            ]),
            _: 2
          }, 1040, ["id", "as-child", "as", "hidden", "data-state", "data-disabled", "style"])
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=CollapsibleContent.cjs.map
