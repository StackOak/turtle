'use strict';

const date = require('@internationalized/date');
const vue = require('vue');
const date_comparators = require('../date/comparators.cjs');

function useRangeCalendarState(props) {
  const isStartInvalid = vue.computed(() => {
    if (!props.start.value)
      return false;
    if (props.isDateDisabled(props.start.value))
      return true;
    return false;
  });
  const isEndInvalid = vue.computed(() => {
    if (!props.end.value)
      return false;
    if (props.isDateDisabled(props.end.value))
      return true;
    return false;
  });
  const isInvalid = vue.computed(
    () => {
      if (isStartInvalid.value || isEndInvalid.value)
        return false;
      if (props.start.value && props.end.value && date_comparators.isBefore(props.end.value, props.start.value))
        return true;
      return false;
    }
  );
  const isSelectionStart = (date$1) => {
    if (!props.start.value)
      return false;
    return date.isSameDay(props.start.value, date$1);
  };
  const isSelectionEnd = (date$1) => {
    if (!props.end.value)
      return false;
    return date.isSameDay(props.end.value, date$1);
  };
  const isSelected = (date$1) => {
    if (props.start.value && date.isSameDay(props.start.value, date$1))
      return true;
    if (props.end.value && date.isSameDay(props.end.value, date$1))
      return true;
    if (props.end.value && props.start.value)
      return date_comparators.isBetween(date$1, props.start.value, props.end.value);
    return false;
  };
  const highlightedRange = vue.computed(() => {
    if (props.start.value && props.end.value)
      return null;
    if (!props.start.value || !props.focusedValue.value)
      return null;
    const isStartBeforeFocused = date_comparators.isBefore(props.start.value, props.focusedValue.value);
    const start = isStartBeforeFocused ? props.start.value : props.focusedValue.value;
    const end = isStartBeforeFocused ? props.focusedValue.value : props.start.value;
    if (date.isSameDay(start, end)) {
      return {
        start,
        end
      };
    }
    const isValid = props.allowNonContiguousRanges.value || date_comparators.areAllDaysBetweenValid(start, end, props.isDateUnavailable, props.isDateDisabled);
    if (isValid) {
      return {
        start,
        end
      };
    }
    return null;
  });
  const isHighlightedStart = (date$1) => {
    if (!highlightedRange.value || !highlightedRange.value.start)
      return false;
    return date.isSameDay(highlightedRange.value.start, date$1);
  };
  const isHighlightedEnd = (date$1) => {
    if (!highlightedRange.value || !highlightedRange.value.end)
      return false;
    return date.isSameDay(highlightedRange.value.end, date$1);
  };
  return {
    isInvalid,
    isSelected,
    highlightedRange,
    isSelectionStart,
    isSelectionEnd,
    isHighlightedStart,
    isHighlightedEnd
  };
}

exports.useRangeCalendarState = useRangeCalendarState;
//# sourceMappingURL=useRangeCalendar.cjs.map
