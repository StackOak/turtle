'use strict';

const vue = require('vue');
const Select_utils = require('./utils.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useId = require('../shared/useId.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const shared_handleAndDispatchCustomEvent = require('../shared/handleAndDispatchCustomEvent.cjs');
const shared_getActiveElement = require('../shared/getActiveElement.cjs');
const Select_SelectRoot = require('./SelectRoot.cjs');
const Select_SelectContentImpl = require('./SelectContentImpl.cjs');

const [injectSelectItemContext, provideSelectItemContext] = shared_createContext.createContext("SelectItem");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SelectItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { disabled } = vue.toRefs(props);
    const rootContext = Select_SelectRoot.injectSelectRootContext();
    const contentContext = Select_SelectContentImpl.injectSelectContentContext();
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const { CollectionItem } = Collection_Collection.useCollection();
    const isSelected = vue.computed(() => Select_utils.valueComparator(rootContext.modelValue?.value, props.value, rootContext.by));
    const isFocused = vue.ref(false);
    const textValue = vue.ref(props.textValue ?? "");
    const textId = shared_useId.useId(void 0, "reka-select-item-text");
    const SELECT_SELECT = "select.select";
    async function handleSelectCustomEvent(ev) {
      if (ev.defaultPrevented)
        return;
      const eventDetail = { originalEvent: ev, value: props.value };
      shared_handleAndDispatchCustomEvent.handleAndDispatchCustomEvent(SELECT_SELECT, handleSelect, eventDetail);
    }
    async function handleSelect(ev) {
      await vue.nextTick();
      emits("select", ev);
      if (ev.defaultPrevented)
        return;
      if (!disabled.value) {
        rootContext.onValueChange(props.value);
        if (!rootContext.multiple.value)
          rootContext.onOpenChange(false);
      }
    }
    async function handlePointerMove(event) {
      await vue.nextTick();
      if (event.defaultPrevented)
        return;
      if (disabled.value) {
        contentContext.onItemLeave?.();
      } else {
        event.currentTarget.focus({ preventScroll: true });
      }
    }
    async function handlePointerLeave(event) {
      await vue.nextTick();
      if (event.defaultPrevented)
        return;
      if (event.currentTarget === shared_getActiveElement.getActiveElement())
        contentContext.onItemLeave?.();
    }
    async function handleKeyDown(event) {
      await vue.nextTick();
      if (event.defaultPrevented)
        return;
      const isTypingAhead = contentContext.searchRef?.value !== "";
      if (isTypingAhead && event.key === " ")
        return;
      if (Select_utils.SELECTION_KEYS.includes(event.key))
        handleSelectCustomEvent(event);
      if (event.key === " ")
        event.preventDefault();
    }
    if (props.value === "") {
      throw new Error(
        "A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    }
    vue.onMounted(() => {
      if (!currentElement.value)
        return;
      contentContext.itemRefCallback(
        currentElement.value,
        props.value,
        props.disabled
      );
    });
    provideSelectItemContext({
      value: props.value,
      disabled,
      textId,
      isSelected,
      onItemTextChange: (node) => {
        textValue.value = ((textValue.value || node?.textContent) ?? "").trim();
      }
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(CollectionItem), {
        value: { textValue: textValue.value }
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            ref: vue.unref(forwardRef),
            role: "option",
            "aria-labelledby": vue.unref(textId),
            "data-highlighted": isFocused.value ? "" : void 0,
            "aria-selected": isSelected.value,
            "data-state": isSelected.value ? "checked" : "unchecked",
            "aria-disabled": vue.unref(disabled) || void 0,
            "data-disabled": vue.unref(disabled) ? "" : void 0,
            tabindex: vue.unref(disabled) ? void 0 : -1,
            as: _ctx.as,
            "as-child": _ctx.asChild,
            onFocus: _cache[0] || (_cache[0] = ($event) => isFocused.value = true),
            onBlur: _cache[1] || (_cache[1] = ($event) => isFocused.value = false),
            onPointerup: handleSelectCustomEvent,
            onPointerdown: _cache[2] || (_cache[2] = (event) => {
              event.currentTarget.focus({ preventScroll: true });
            }),
            onTouchend: _cache[3] || (_cache[3] = vue.withModifiers(() => {
            }, ["prevent", "stop"])),
            onPointermove: handlePointerMove,
            onPointerleave: handlePointerLeave,
            onKeydown: handleKeyDown
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["aria-labelledby", "data-highlighted", "aria-selected", "data-state", "aria-disabled", "data-disabled", "tabindex", "as", "as-child"])
        ]),
        _: 3
      }, 8, ["value"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectSelectItemContext = injectSelectItemContext;
//# sourceMappingURL=SelectItem.cjs.map
