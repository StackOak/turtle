'use strict';

const vue = require('vue');
const date = require('@internationalized/date');
const date_comparators = require('../date/comparators.cjs');
const Calendar_utils = require('../Calendar/utils.cjs');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const shared_useKbd = require('../shared/useKbd.cjs');
const RangeCalendar_RangeCalendarRoot = require('./RangeCalendarRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "RangeCalendarCellTrigger",
  props: {
    day: {},
    month: {},
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = RangeCalendar_RangeCalendarRoot.injectRangeCalendarRootContext();
    const kbd = shared_useKbd.useKbd();
    const { primitiveElement, currentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
    const labelText = vue.computed(() => rootContext.formatter.custom(date_comparators.toDate(props.day), {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }));
    const isDisabled = vue.computed(() => rootContext.isDateDisabled(props.day));
    const isUnavailable = vue.computed(() => rootContext.isDateUnavailable?.(props.day) ?? false);
    const isSelectedDate = vue.computed(() => rootContext.isSelected(props.day));
    const isSelectionStart = vue.computed(() => rootContext.isSelectionStart(props.day));
    const isSelectionEnd = vue.computed(() => rootContext.isSelectionEnd(props.day));
    const isHighlightStart = vue.computed(() => rootContext.isHighlightedStart(props.day));
    const isHighlightEnd = vue.computed(() => rootContext.isHighlightedEnd(props.day));
    const isHighlighted = vue.computed(() => rootContext.highlightedRange.value ? date_comparators.isBetweenInclusive(props.day, rootContext.highlightedRange.value.start, rootContext.highlightedRange.value.end) : false);
    const isDateToday = vue.computed(() => {
      return date.isToday(props.day, date.getLocalTimeZone());
    });
    const isOutsideView = vue.computed(() => {
      return !date.isSameMonth(props.day, props.month);
    });
    const isOutsideVisibleView = vue.computed(
      () => rootContext.isOutsideVisibleView(props.day)
    );
    const dayValue = vue.computed(() => props.day.day.toLocaleString(rootContext.locale.value));
    const isFocusedDate = vue.computed(() => {
      return !rootContext.disabled.value && date.isSameDay(props.day, rootContext.placeholder.value);
    });
    function changeDate(e, date$1) {
      if (rootContext.readonly.value)
        return;
      if (rootContext.isDateDisabled(date$1) || rootContext.isDateUnavailable?.(date$1))
        return;
      rootContext.lastPressedDateValue.value = date$1.copy();
      if (rootContext.startValue.value && rootContext.highlightedRange.value === null) {
        if (date.isSameDay(date$1, rootContext.startValue.value) && !rootContext.preventDeselect.value && !rootContext.endValue.value) {
          rootContext.startValue.value = void 0;
          rootContext.onPlaceholderChange(date$1);
          return;
        } else if (!rootContext.endValue.value) {
          e.preventDefault();
          if (rootContext.lastPressedDateValue.value && date.isSameDay(rootContext.lastPressedDateValue.value, date$1))
            rootContext.startValue.value = date$1.copy();
          return;
        }
      }
      if (rootContext.startValue.value && rootContext.endValue.value && date.isSameDay(rootContext.endValue.value, date$1) && !rootContext.preventDeselect.value) {
        rootContext.startValue.value = void 0;
        rootContext.endValue.value = void 0;
        rootContext.onPlaceholderChange(date$1);
        return;
      }
      if (!rootContext.startValue.value) {
        rootContext.startValue.value = date$1.copy();
      } else if (!rootContext.endValue.value) {
        rootContext.endValue.value = date$1.copy();
      } else if (rootContext.endValue.value && rootContext.startValue.value) {
        rootContext.endValue.value = void 0;
        rootContext.startValue.value = date$1.copy();
      }
    }
    function handleClick(e) {
      changeDate(e, props.day);
    }
    function handleFocus() {
      if (rootContext.isDateDisabled(props.day) || rootContext.isDateUnavailable?.(props.day))
        return;
      rootContext.focusedValue.value = props.day.copy();
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
          changeDate(e, props.day);
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
        "aria-selected": isSelectedDate.value && !isUnavailable.value ? true : void 0,
        "aria-disabled": isDisabled.value || isUnavailable.value ? true : void 0,
        "data-highlighted": isHighlighted.value && !isUnavailable.value ? "" : void 0,
        "data-selection-start": isSelectionStart.value ? true : void 0,
        "data-selection-end": isSelectionEnd.value ? true : void 0,
        "data-highlighted-start": isHighlightStart.value ? true : void 0,
        "data-highlighted-end": isHighlightEnd.value ? true : void 0,
        "data-selected": isSelectedDate.value && !isUnavailable.value ? true : void 0,
        "data-outside-visible-view": isOutsideVisibleView.value ? "" : void 0,
        "data-value": _ctx.day.toString(),
        "data-disabled": isDisabled.value ? "" : void 0,
        "data-unavailable": isUnavailable.value ? "" : void 0,
        "data-today": isDateToday.value ? "" : void 0,
        "data-outside-view": isOutsideView.value ? "" : void 0,
        "data-focused": isFocusedDate.value ? "" : void 0,
        tabindex: isFocusedDate.value ? 0 : isOutsideView.value || isDisabled.value ? void 0 : -1,
        onClick: handleClick,
        onFocusin: handleFocus,
        onMouseenter: handleFocus,
        onKeydown: vue.withKeys(handleArrowKey, ["up", "down", "left", "right", "enter", "space"])
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {
            dayValue: dayValue.value,
            disabled: isDisabled.value,
            today: isDateToday.value,
            selected: isSelectedDate.value,
            outsideView: isOutsideView.value,
            outsideVisibleView: isOutsideVisibleView.value,
            unavailable: isUnavailable.value,
            highlighted: isHighlighted.value && !isUnavailable.value,
            highlightedStart: isHighlightStart.value,
            highlightedEnd: isHighlightEnd.value,
            selectionStart: isSelectionStart.value,
            selectionEnd: isSelectionEnd.value
          }, () => [
            vue.createTextVNode(vue.toDisplayString(dayValue.value), 1)
          ])
        ]),
        _: 3
      }, 16, ["aria-label", "aria-selected", "aria-disabled", "data-highlighted", "data-selection-start", "data-selection-end", "data-highlighted-start", "data-highlighted-end", "data-selected", "data-outside-visible-view", "data-value", "data-disabled", "data-unavailable", "data-today", "data-outside-view", "data-focused", "tabindex"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=RangeCalendarCellTrigger.cjs.map
