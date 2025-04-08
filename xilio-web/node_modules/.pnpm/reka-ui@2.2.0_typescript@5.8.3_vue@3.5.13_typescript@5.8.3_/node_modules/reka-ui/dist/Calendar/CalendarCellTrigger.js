import '../date/calendar.js';
import { t as toDate, g as getDaysInMonth } from '../date/comparators.js';
import { defineComponent, computed, createBlock, openBlock, unref, mergeProps, withKeys, withModifiers, withCtx, renderSlot, createTextVNode, toDisplayString, nextTick } from 'vue';
import { isToday, getLocalTimeZone, isSameMonth, isSameDay } from '@internationalized/date';
import { g as getSelectableCells } from './utils.js';
import { u as usePrimitiveElement } from '../Primitive/usePrimitiveElement.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { u as useKbd } from '../shared/useKbd.js';
import { i as injectCalendarRootContext } from './CalendarRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CalendarCellTrigger",
  props: {
    day: {},
    month: {},
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(__props) {
    const props = __props;
    const kbd = useKbd();
    const rootContext = injectCalendarRootContext();
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const dayValue = computed(() => props.day.day.toLocaleString(rootContext.locale.value));
    const labelText = computed(() => {
      return rootContext.formatter.custom(toDate(props.day), {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    });
    const isDisabled = computed(() => rootContext.isDateDisabled(props.day));
    const isUnavailable = computed(
      () => rootContext.isDateUnavailable?.(props.day) ?? false
    );
    const isDateToday = computed(() => {
      return isToday(props.day, getLocalTimeZone());
    });
    const isOutsideView = computed(() => {
      return !isSameMonth(props.day, props.month);
    });
    const isOutsideVisibleView = computed(
      () => rootContext.isOutsideVisibleView(props.day)
    );
    const isFocusedDate = computed(() => {
      return !rootContext.disabled.value && isSameDay(props.day, rootContext.placeholder.value);
    });
    const isSelectedDate = computed(() => rootContext.isDateSelected(props.day));
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
        const allCollectionItems = getSelectableCells(parentElement);
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
          nextTick(() => {
            const newCollectionItems = getSelectableCells(parentElement);
            if (!newCollectionItems.length)
              return;
            if (!rootContext.pagedNavigation.value && rootContext.numberOfMonths.value > 1) {
              const numberOfDays = getDaysInMonth(rootContext.placeholder.value);
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
          nextTick(() => {
            const newCollectionItems = getSelectableCells(parentElement);
            if (!newCollectionItems.length)
              return;
            if (!rootContext.pagedNavigation.value && rootContext.numberOfMonths.value > 1) {
              const numberOfDays = getDaysInMonth(
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
      return openBlock(), createBlock(unref(Primitive), mergeProps({
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
          withKeys(handleArrowKey, ["up", "down", "left", "right", "space", "enter"]),
          _cache[0] || (_cache[0] = withKeys(withModifiers(() => {
          }, ["prevent"]), ["enter"]))
        ]
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {
            dayValue: dayValue.value,
            disabled: isDisabled.value,
            today: isDateToday.value,
            selected: isSelectedDate.value,
            outsideView: isOutsideView.value,
            outsideVisibleView: isOutsideVisibleView.value,
            unavailable: isUnavailable.value
          }, () => [
            createTextVNode(toDisplayString(dayValue.value), 1)
          ])
        ]),
        _: 3
      }, 16, ["aria-label", "aria-disabled", "data-selected", "data-value", "data-disabled", "data-unavailable", "data-today", "data-outside-view", "data-outside-visible-view", "data-focused", "tabindex"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=CalendarCellTrigger.js.map
