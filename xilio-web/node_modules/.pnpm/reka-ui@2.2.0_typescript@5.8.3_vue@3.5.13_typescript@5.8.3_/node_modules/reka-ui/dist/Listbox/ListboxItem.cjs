'use strict';

const vue = require('vue');
require('@floating-ui/vue');
const Listbox_utils = require('./utils.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useId = require('../shared/useId.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const shared_handleAndDispatchCustomEvent = require('../shared/handleAndDispatchCustomEvent.cjs');
const Listbox_ListboxRoot = require('./ListboxRoot.cjs');

const LISTBOX_SELECT = "listbox.select";
const [injectListboxItemContext, provideListboxItemContext] = shared_createContext.createContext("ListboxItem");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ListboxItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const id = shared_useId.useId(void 0, "reka-listbox-item");
    const { CollectionItem } = Collection_Collection.useCollection();
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const rootContext = Listbox_ListboxRoot.injectListboxRootContext();
    const isHighlighted = vue.computed(() => currentElement.value === rootContext.highlightedElement.value);
    const isSelected = vue.computed(() => Listbox_utils.valueComparator(rootContext.modelValue.value, props.value, rootContext.by));
    const disabled = vue.computed(() => rootContext.disabled.value || props.disabled);
    async function handleSelect(ev) {
      emits("select", ev);
      if (ev?.defaultPrevented)
        return;
      if (!disabled.value && ev) {
        rootContext.onValueChange(props.value);
        rootContext.changeHighlight(currentElement.value);
      }
    }
    function handleSelectCustomEvent(ev) {
      const eventDetail = { originalEvent: ev, value: props.value };
      shared_handleAndDispatchCustomEvent.handleAndDispatchCustomEvent(LISTBOX_SELECT, handleSelect, eventDetail);
    }
    provideListboxItemContext({
      isSelected
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(CollectionItem), { value: _ctx.value }, {
        default: vue.withCtx(() => [
          vue.withMemo([isHighlighted.value, isSelected.value], () => vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({ id: vue.unref(id) }, _ctx.$attrs, {
            ref: vue.unref(forwardRef),
            role: "option",
            tabindex: vue.unref(rootContext).focusable.value ? isHighlighted.value ? "0" : "-1" : -1,
            "aria-selected": isSelected.value,
            as: _ctx.as,
            "as-child": _ctx.asChild,
            disabled: disabled.value ? "" : void 0,
            "data-disabled": disabled.value ? "" : void 0,
            "data-highlighted": isHighlighted.value ? "" : void 0,
            "data-state": isSelected.value ? "checked" : "unchecked",
            onClick: handleSelectCustomEvent,
            onKeydown: vue.withKeys(vue.withModifiers(handleSelectCustomEvent, ["prevent"]), ["space"]),
            onPointermove: _cache[0] || (_cache[0] = (event) => {
              if (vue.unref(rootContext).highlightedElement.value === vue.unref(currentElement))
                return;
              if (vue.unref(rootContext).highlightOnHover.value)
                vue.unref(rootContext).changeHighlight(vue.unref(currentElement), false);
              else
                vue.unref(rootContext).focusable.value ? void 0 : vue.unref(rootContext).changeHighlight(vue.unref(currentElement), false);
            })
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["id", "tabindex", "aria-selected", "as", "as-child", "disabled", "data-disabled", "data-highlighted", "data-state", "onKeydown"]), _cache, 1)
        ]),
        _: 3
      }, 8, ["value"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectListboxItemContext = injectListboxItemContext;
//# sourceMappingURL=ListboxItem.cjs.map
