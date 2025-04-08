import { defineComponent, computed, ref, onMounted, createBlock, openBlock, unref, withCtx, createVNode, normalizeStyle, renderSlot, createCommentVNode } from 'vue';
import { m as makeTriggerId, a as makeContentId } from './utils.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Presence } from '../Presence/Presence.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectTabsRootContext } from './TabsRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TabsContent",
  props: {
    value: {},
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = useForwardExpose();
    const rootContext = injectTabsRootContext();
    const triggerId = computed(() => makeTriggerId(rootContext.baseId, props.value));
    const contentId = computed(() => makeContentId(rootContext.baseId, props.value));
    const isSelected = computed(() => props.value === rootContext.modelValue.value);
    const isMountAnimationPreventedRef = ref(isSelected.value);
    onMounted(() => {
      requestAnimationFrame(() => {
        isMountAnimationPreventedRef.value = false;
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || isSelected.value,
        "force-mount": ""
      }, {
        default: withCtx(({ present }) => [
          createVNode(unref(Primitive), {
            id: contentId.value,
            ref: unref(forwardRef),
            "as-child": _ctx.asChild,
            as: _ctx.as,
            role: "tabpanel",
            "data-state": isSelected.value ? "active" : "inactive",
            "data-orientation": unref(rootContext).orientation.value,
            "aria-labelledby": triggerId.value,
            hidden: !present,
            tabindex: "0",
            style: normalizeStyle({
              animationDuration: isMountAnimationPreventedRef.value ? "0s" : void 0
            })
          }, {
            default: withCtx(() => [
              (unref(rootContext).unmountOnHide.value ? present : true) ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("", true)
            ]),
            _: 2
          }, 1032, ["id", "as-child", "as", "data-state", "data-orientation", "aria-labelledby", "hidden", "style"])
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=TabsContent.js.map
