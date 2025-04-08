'use strict';

const vue = require('vue');
const Menu_MenuAnchor = require('../Menu/MenuAnchor.cjs');
const DropdownMenu_DropdownMenuRoot = require('./DropdownMenuRoot.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useId = require('../shared/useId.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DropdownMenuTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = DropdownMenu_DropdownMenuRoot.injectDropdownMenuRootContext();
    const { forwardRef, currentElement: triggerElement } = shared_useForwardExpose.useForwardExpose();
    vue.onMounted(() => {
      rootContext.triggerElement = triggerElement;
    });
    rootContext.triggerId ||= shared_useId.useId(void 0, "reka-dropdown-menu-trigger");
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Menu_MenuAnchor._sfc_main), { "as-child": "" }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            id: vue.unref(rootContext).triggerId,
            ref: vue.unref(forwardRef),
            type: _ctx.as === "button" ? "button" : void 0,
            "as-child": props.asChild,
            as: _ctx.as,
            "aria-haspopup": "menu",
            "aria-expanded": vue.unref(rootContext).open.value,
            "aria-controls": vue.unref(rootContext).open.value ? vue.unref(rootContext).contentId : void 0,
            "data-disabled": _ctx.disabled ? "" : void 0,
            disabled: _ctx.disabled,
            "data-state": vue.unref(rootContext).open.value ? "open" : "closed",
            onClick: _cache[0] || (_cache[0] = async (event) => {
              if (!_ctx.disabled && event.button === 0 && event.ctrlKey === false) {
                vue.unref(rootContext)?.onOpenToggle();
                await vue.nextTick();
                if (vue.unref(rootContext).open.value) event.preventDefault();
              }
            }),
            onKeydown: _cache[1] || (_cache[1] = vue.withKeys(
              (event) => {
                if (_ctx.disabled) return;
                if (["Enter", " "].includes(event.key)) vue.unref(rootContext).onOpenToggle();
                if (event.key === "ArrowDown") vue.unref(rootContext).onOpenChange(true);
                if (["Enter", " ", "ArrowDown"].includes(event.key))
                  event.preventDefault();
              },
              ["enter", "space", "arrow-down"]
            ))
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["id", "type", "as-child", "as", "aria-expanded", "aria-controls", "data-disabled", "disabled", "data-state"])
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DropdownMenuTrigger.cjs.map
