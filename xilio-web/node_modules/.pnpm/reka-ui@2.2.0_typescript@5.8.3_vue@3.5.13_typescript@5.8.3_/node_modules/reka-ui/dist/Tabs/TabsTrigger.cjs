'use strict';

const vue = require('vue');
const Tabs_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const RovingFocus_RovingFocusItem = require('../RovingFocus/RovingFocusItem.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Tabs_TabsRoot = require('./TabsRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "TabsTrigger",
  props: {
    value: {},
    disabled: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const rootContext = Tabs_TabsRoot.injectTabsRootContext();
    const triggerId = vue.computed(() => Tabs_utils.makeTriggerId(rootContext.baseId, props.value));
    const contentId = vue.computed(() => Tabs_utils.makeContentId(rootContext.baseId, props.value));
    const isSelected = vue.computed(() => props.value === rootContext.modelValue.value);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(RovingFocus_RovingFocusItem._sfc_main), {
        "as-child": "",
        focusable: !_ctx.disabled,
        active: isSelected.value
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            id: triggerId.value,
            ref: vue.unref(forwardRef),
            role: "tab",
            type: _ctx.as === "button" ? "button" : void 0,
            as: _ctx.as,
            "as-child": _ctx.asChild,
            "aria-selected": isSelected.value ? "true" : "false",
            "aria-controls": contentId.value,
            "data-state": isSelected.value ? "active" : "inactive",
            disabled: _ctx.disabled,
            "data-disabled": _ctx.disabled ? "" : void 0,
            "data-orientation": vue.unref(rootContext).orientation.value,
            onMousedown: _cache[0] || (_cache[0] = vue.withModifiers((event) => {
              if (!_ctx.disabled && event.ctrlKey === false) {
                vue.unref(rootContext).changeModelValue(_ctx.value);
              } else {
                event.preventDefault();
              }
            }, ["left"])),
            onKeydown: _cache[1] || (_cache[1] = vue.withKeys(($event) => vue.unref(rootContext).changeModelValue(_ctx.value), ["enter", "space"])),
            onFocus: _cache[2] || (_cache[2] = () => {
              const isAutomaticActivation = vue.unref(rootContext).activationMode !== "manual";
              if (!isSelected.value && !_ctx.disabled && isAutomaticActivation) {
                vue.unref(rootContext).changeModelValue(_ctx.value);
              }
            })
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["id", "type", "as", "as-child", "aria-selected", "aria-controls", "data-state", "disabled", "data-disabled", "data-orientation"])
        ]),
        _: 3
      }, 8, ["focusable", "active"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=TabsTrigger.cjs.map
