'use strict';

const vue = require('vue');
const Select_utils = require('./utils.cjs');
const Popper_PopperAnchor = require('../Popper/PopperAnchor.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const Select_SelectRoot = require('./SelectRoot.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useId = require('../shared/useId.cjs');
const shared_useTypeahead = require('../shared/useTypeahead.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SelectTrigger",
  props: {
    disabled: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = Select_SelectRoot.injectSelectRootContext();
    const { forwardRef, currentElement: triggerElement } = shared_useForwardExpose.useForwardExpose();
    const isDisabled = vue.computed(() => rootContext.disabled?.value || props.disabled);
    rootContext.contentId ||= shared_useId.useId(void 0, "reka-select-content");
    vue.onMounted(() => {
      rootContext.onTriggerChange(triggerElement.value);
    });
    const { getItems } = Collection_Collection.useCollection();
    const { search, handleTypeaheadSearch, resetTypeahead } = shared_useTypeahead.useTypeahead();
    function handleOpen() {
      if (!isDisabled.value) {
        rootContext.onOpenChange(true);
        resetTypeahead();
      }
    }
    function handlePointerOpen(event) {
      handleOpen();
      rootContext.triggerPointerDownPosRef.value = {
        x: Math.round(event.pageX),
        y: Math.round(event.pageY)
      };
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Popper_PopperAnchor._sfc_main), {
        "as-child": "",
        reference: _ctx.reference
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            ref: vue.unref(forwardRef),
            role: "combobox",
            type: _ctx.as === "button" ? "button" : void 0,
            "aria-controls": vue.unref(rootContext).contentId,
            "aria-expanded": vue.unref(rootContext).open.value || false,
            "aria-required": vue.unref(rootContext).required?.value,
            "aria-autocomplete": "none",
            disabled: isDisabled.value,
            dir: vue.unref(rootContext)?.dir.value,
            "data-state": vue.unref(rootContext)?.open.value ? "open" : "closed",
            "data-disabled": isDisabled.value ? "" : void 0,
            "data-placeholder": vue.unref(rootContext).modelValue?.value ? void 0 : "",
            "as-child": _ctx.asChild,
            as: _ctx.as,
            onClick: _cache[0] || (_cache[0] = (event) => {
              event?.currentTarget?.focus();
            }),
            onPointerdown: _cache[1] || (_cache[1] = (event) => {
              if (event.pointerType === "touch")
                return event.preventDefault();
              const target = event.target;
              if (target.hasPointerCapture(event.pointerId)) {
                target.releasePointerCapture(event.pointerId);
              }
              if (event.button === 0 && event.ctrlKey === false) {
                handlePointerOpen(event);
                event.preventDefault();
              }
            }),
            onPointerup: _cache[2] || (_cache[2] = vue.withModifiers(
              (event) => {
                if (event.pointerType === "touch")
                  handlePointerOpen(event);
              },
              ["prevent"]
            )),
            onKeydown: _cache[3] || (_cache[3] = (event) => {
              const isTypingAhead = vue.unref(search) !== "";
              const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
              if (!isModifierKey && event.key.length === 1) {
                if (isTypingAhead && event.key === " ") return;
              }
              vue.unref(handleTypeaheadSearch)(event.key, vue.unref(getItems)());
              if (vue.unref(Select_utils.OPEN_KEYS).includes(event.key)) {
                handleOpen();
                event.preventDefault();
              }
            })
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["type", "aria-controls", "aria-expanded", "aria-required", "disabled", "dir", "data-state", "data-disabled", "data-placeholder", "as-child", "as"])
        ]),
        _: 3
      }, 8, ["reference"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SelectTrigger.cjs.map
