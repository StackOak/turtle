'use strict';

require('../date/calendar.cjs');
const date_comparators = require('../date/comparators.cjs');
const vue = require('vue');
const date = require('@internationalized/date');
const Calendar_utils = require('./utils.cjs');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const shared_useKbd = require('../shared/useKbd.cjs');
const Calendar_CalendarRoot = require('./CalendarRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "CalendarCellTrigger",
  props: {
    day: {},
    month: {},
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(__props) {
    const props = __props;
    const kbd = shared_useKbd.useKbd();
    const rootContext = Calendar_CalendarRoot.injectCalendarRootContext();
    const { primitiveElement, currentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
    const dayValue = vue.computed(() => props.day.day.toLocaleString(rootContext.locale.value));
    const labelText = vue.computed(() => {
      return rootContext.formatter.custom(date_comparators.toDate(props.day), {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    });
    const isDisabled = vue.computed(() => rootContext.isDateDisabled(props.day));
    const isUnavailable = vue.computed(
      () => rootContext.isDateUnavailable?.(props.day) ?? false
    );
    const isDateToday = vue.computed(() => {
      return date.isToday(props.day, date.getLocalTimeZone());
    });
    const isOutsideView = vue.computed(() => {
      return !date.isSameMonth(props.day, props.month);
    });
    const isOutsideVisibleView = vue.computed(
      () => rootContext.isOutsideVisibleView(props.day)
    );
    const isFocusedDate = vue.computed(() => {
      return !rootContext.disabled.value && date.isSameDay(props.day, rootContext.placeholder.value);
    });
    const isSelectedDate = vue.computed(() => rootContext.isDateSelected(props.day));
    function changeDate(date) {
      if (rootContext.readonly.value)
        return;
      if (rootContext.isDateDisabled(date) || rootContext.isDateUnavailable?.(date))
        return;
      rootContext.onDateChange(date);
    }
    function handleClick() {
      changeDate(props.day);
    }
    function handleArrowKey(e) {
      e.preventDefault();
      e.stopPropagation();
      const parentElement = rootContext.parentElement.value;
      const indexIncrementation = 7;
      const sign = rootContext.dir.value === "rtl" ? -1 : 1;
      switch (e.code) {
        case kbd.ARROW_RIGHT:
          shiftFocus(currentElement.value, sign);
          break;
        case kbd.ARROW_LEFT:
          shiftFocus(currentElement.value, -sign);
          break;
        case kbd.ARROW_UP:
          shiftFocus(currentElement.value, -7);
          break;
        case kbd.ARROW_DOWN:
          shiftFocus(currentElement.value, indexIncrementation);
          break;
        case kbd.ENTER:
        case kbd.SPACE_CODE:
          changeDate(props.day);
      }
      function shiftFocus(node, add) {
        const allCollectionItems = Calendar_utils.getSelectableCells(parentElement);
        if (!allCollectionItems.length)
          return;
        const index = allCollectionItems.indexOf(node);
        const newIndex = index + add;
        if (newIndex >= 0 && newIndex < allCollectionItems.length) {
          if (allCollectionItems[newIndex].hasAttribute("data-disabled")) {
            shiftFocus(allCollectionItems[newIndex], add);
          }
          allCollectionItems[newIndex].focus();
          return;
        }
        if (newIndex < 0) {
          if (rootContext.isPrevButtonDisabled())
            return;
          rootContext.prevPage();
          vue.nextTick(() => {
            const newCollectionItems = Calendar_utils.getSelectableCells(parentElement);
            if (!newCollectionItems.length)
              return;
            if (!rootContext.pagedNavigation.value && rootContext.numberOfMonths.value > 1) {
              const numberOfDays = date_comparators.getDaysInMonth(rootContext.placeholder.value);
              const computedIndex2 = numberOfDays - Math.abs(newIndex);
              if (newCollectionItems[computedIndex2].hasAttribute("data-disabled")) {
                shiftFocus(newCollectionItems[computedIndex2], add);
              }
              newCollectionItems[computedIndex2].focus();
              return;
            }
            const computedIndex = newCollectionItems.length - Math.abs(newIndex);
            if (newCollectionItems[computedIndex].hasAttribute("data-disabled")) {
              shiftFocus(newCollectionItems[computedIndex], add);
            }
            newCollectionItems[computedIndex].focus();
          });
          return;
        }
        if (newIndex >= allCollectionItems.length) {
          if (rootContext.isNextButtonDisabled())
            return;
          rootContext.nextPage();
          vue.nextTick(() => {
            const newCollectionItems = Calendar_utils.getSelectableCells(parentElement);
            if (!newCollectionItems.length)
              return;
            if (!rootContext.pagedNavigation.value && rootContext.numberOfMonths.value > 1) {
              const numberOfDays = date_comparators.getDaysInMonth(
                rootContext.placeholder.value.add({ months: rootContext.numberOfMonths.value - 1 })
              );
              const computedIndex2 = newIndex - allCollectionItems.length + (newCollectionItems.length - numberOfDays);
              if (newCollectionItems[computedIndex2].hasAttribute("data-disabled")) {
                shiftFocus(newCollectionItems[computedIndex2], add);
              }
              newCollectionItems[computedIndex2].focus();
              return;
            }
            const computedIndex = newIndex - allCollectionItems.length;
            if (newCollectionItems[computedIndex].hasAttribute("data-disabled")) {
              shiftFocus(newCollectionItems[computedIndex], add);
            }
            newCollectionItems[computedIndex].focus();
          });
        }
      }
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
        ref_key: "primitiveElement",
        ref: primitiveElement
      }, props, {
        role: "button",
        "aria-label": labelText.value,
        "data-reka-calendar-cell-trigger": "",
        "aria-disabled": isDisabled.value || isUnavailable.value ? true : void 0,
        "data-selected": isSelectedDate.value ? true : void 0,
        "data-value": _ctx.day.toString(),
        "data-disabled": isDisabled.value ? "" : void 0,
        "data-unavailable": isUnavailable.value ? "" : void 0,
        "data-today": isDateToday.value ? "" : void 0,
        "data-outside-view": isOutsideView.value ? "" : void 0,
        "data-outside-visible-view": isOutsideVisibleView.value ? "" : void 0,
        "data-focused": isFocusedDate.value ? "" : void 0,
        tabindex: isFocusedDate.value ? 0 : isOutsideView.value || isDisabled.value ? void 0 : -1,
        onClick: handleClick,
        onKeydown: [
          vue.withKeys(handleArrowKey, ["up", "down", "left", "right", "space", "enter"]),
          _cache[0] || (_cache[0] = vue.withKeys(vue.withModifiers(() => {
          }, ["prevent"]), ["enter"]))
        ]
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {
            dayValue: dayValue.value,
            disabled: isDisabled.value,
            today: isDateToday.value,
            selected: isSelectedDate.value,
            outsideView: isOutsideView.value,
            outsideVisibleView: isOutsideVisibleView.value,
            unavailable: isUnavailable.value
          }, () => [
            vue.createTextVNode(vue.toDisplayString(dayValue.value), 1)
          ])
        ]),
        _: 3
      }, 16, ["aria-label", "aria-disabled", "data-selected", "data-value", "data-disabled", "data-unavailable", "data-today", "data-outside-view", "data-outside-visible-view", "data-focused", "tabindex"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=CalendarCellTrigger.cjs.map
