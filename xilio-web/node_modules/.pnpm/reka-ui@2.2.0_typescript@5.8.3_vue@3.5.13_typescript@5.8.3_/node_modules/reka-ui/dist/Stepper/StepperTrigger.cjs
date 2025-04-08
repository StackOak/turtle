'use strict';

const vue = require('vue');
const Stepper_StepperItem = require('./StepperItem.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const shared_useKbd = require('../shared/useKbd.cjs');
const shared_useArrowNavigation = require('../shared/useArrowNavigation.cjs');
const shared_getActiveElement = require('../shared/getActiveElement.cjs');
const Stepper_StepperRoot = require('./StepperRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "StepperTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const rootContext = Stepper_StepperRoot.injectStepperRootContext();
    const itemContext = Stepper_StepperItem.injectStepperItemContext();
    const kbd = shared_useKbd.useKbd();
    const stepperItems = vue.computed(() => Array.from(rootContext.totalStepperItems.value));
    function handleMouseDown(event) {
      if (itemContext.disabled.value)
        return;
      if (rootContext.linear.value) {
        if (itemContext.step.value <= rootContext.modelValue.value || itemContext.step.value === rootContext.modelValue.value + 1) {
          if (event.ctrlKey === false) {
            rootContext.changeModelValue(itemContext.step.value);
            return;
          }
        }
      } else {
        if (event.ctrlKey === false) {
          rootContext.changeModelValue(itemContext.step.value);
          return;
        }
      }
      event.preventDefault();
    }
    function handleKeyDown(event) {
      event.preventDefault();
      if (itemContext.disabled.value)
        return;
      if ((event.key === kbd.ENTER || event.key === kbd.SPACE) && !event.ctrlKey && !event.shiftKey)
        rootContext.changeModelValue(itemContext.step.value);
      if ([kbd.ARROW_LEFT, kbd.ARROW_RIGHT, kbd.ARROW_UP, kbd.ARROW_DOWN].includes(event.key)) {
        shared_useArrowNavigation.useArrowNavigation(event, shared_getActiveElement.getActiveElement(), void 0, {
          itemsArray: stepperItems.value,
          focus: true,
          loop: false,
          arrowKeyOptions: rootContext.orientation.value,
          dir: rootContext.dir.value
        });
      }
    }
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    vue.onMounted(() => {
      rootContext.totalStepperItems.value.add(currentElement.value);
    });
    vue.onUnmounted(() => {
      rootContext.totalStepperItems.value.delete(currentElement.value);
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref: vue.unref(forwardRef),
        type: _ctx.as === "button" ? "button" : void 0,
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-state": vue.unref(itemContext).state.value,
        disabled: vue.unref(itemContext).disabled.value || !vue.unref(itemContext).isFocusable.value ? "" : void 0,
        "data-disabled": vue.unref(itemContext).disabled.value || !vue.unref(itemContext).isFocusable.value ? "" : void 0,
        "data-orientation": vue.unref(rootContext).orientation.value,
        tabindex: vue.unref(itemContext).isFocusable.value ? 0 : -1,
        "aria-describedby": vue.unref(itemContext).descriptionId,
        "aria-labelledby": vue.unref(itemContext).titleId,
        onMousedown: vue.withModifiers(handleMouseDown, ["left"]),
        onKeydown: vue.withKeys(handleKeyDown, ["enter", "space", "left", "right", "up", "down"])
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["type", "as", "as-child", "data-state", "disabled", "data-disabled", "data-orientation", "tabindex", "aria-describedby", "aria-labelledby"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=StepperTrigger.cjs.map
