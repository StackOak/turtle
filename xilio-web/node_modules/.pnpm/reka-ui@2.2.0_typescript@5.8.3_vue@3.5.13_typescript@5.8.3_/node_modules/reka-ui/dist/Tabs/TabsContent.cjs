'use strict';

const vue = require('vue');
const Tabs_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Tabs_TabsRoot = require('./TabsRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "TabsContent",
  props: {
    value: {},
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const rootContext = Tabs_TabsRoot.injectTabsRootContext();
    const triggerId = vue.computed(() => Tabs_utils.makeTriggerId(rootContext.baseId, props.value));
    const contentId = vue.computed(() => Tabs_utils.makeContentId(rootContext.baseId, props.value));
    const isSelected = vue.computed(() => props.value === rootContext.modelValue.value);
    const isMountAnimationPreventedRef = vue.ref(isSelected.value);
    vue.onMounted(() => {
      requestAnimationFrame(() => {
        isMountAnimationPreventedRef.value = false;
      });
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        present: _ctx.forceMount || isSelected.value,
        "force-mount": ""
      }, {
        default: vue.withCtx(({ present }) => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            id: contentId.value,
            ref: vue.unref(forwardRef),
            "as-child": _ctx.asChild,
            as: _ctx.as,
            role: "tabpanel",
            "data-state": isSelected.value ? "active" : "inactive",
            "data-orientation": vue.unref(rootContext).orientation.value,
            "aria-labelledby": triggerId.value,
            hidden: !present,
            tabindex: "0",
            style: vue.normalizeStyle({
              animationDuration: isMountAnimationPreventedRef.value ? "0s" : void 0
            })
          }, {
            default: vue.withCtx(() => [
              (vue.unref(rootContext).unmountOnHide.value ? present : true) ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : vue.createCommentVNode("", true)
            ]),
            _: 2
          }, 1032, ["id", "as-child", "as", "data-state", "data-orientation", "aria-labelledby", "hidden", "style"])
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=TabsContent.cjs.map
