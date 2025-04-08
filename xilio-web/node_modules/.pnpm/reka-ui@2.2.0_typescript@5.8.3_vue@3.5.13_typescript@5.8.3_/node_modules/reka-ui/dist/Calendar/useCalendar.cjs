'use strict';

const date = require('@internationalized/date');
const vue = require('vue');
const date_calendar = require('../date/calendar.cjs');
const date_comparators = require('../date/comparators.cjs');
const shared_useDateFormatter = require('../shared/useDateFormatter.cjs');

function useCalendarState(props) {
  function isDateSelected(dateObj) {
    if (Array.isArray(props.date.value))
      return props.date.value.some((d) => date.isSameDay(d, dateObj));
    else if (!props.date.value)
      return false;
    else
      return date.isSameDay(props.date.value, dateObj);
  }
  const isInvalid = vue.computed(
    () => {
      if (Array.isArray(props.date.value)) {
        if (!props.date.value.length)
          return false;
        for (const dateObj of props.date.value) {
          if (props.isDateDisabled?.(dateObj))
            return true;
          if (props.isDateUnavailable?.(dateObj))
            return true;
        }
      } else {
        if (!props.date.value)
          return false;
        if (props.isDateDisabled?.(props.date.value))
          return true;
        if (props.isDateUnavailable?.(props.date.value))
          return true;
      }
      return false;
    }
  );
  return {
    isDateSelected,
    isInvalid
  };
}
function handleNextDisabled(lastPeriodInView, nextPageFunc) {
  const firstPeriodOfNextPage = nextPageFunc(lastPeriodInView);
  const diff = firstPeriodOfNextPage.compare(lastPeriodInView);
  const duration = {};
  if (diff >= 7)
    duration.day = 1;
  if (diff >= date_comparators.getDaysInMonth(lastPeriodInView))
    duration.month = 1;
  return firstPeriodOfNextPage.set({ ...duration });
}
function handlePrevDisabled(firstPeriodInView, prevPageFunc) {
  const lastPeriodOfPrevPage = prevPageFunc(firstPeriodInView);
  const diff = firstPeriodInView.compare(lastPeriodOfPrevPage);
  const duration = {};
  if (diff >= 7)
    duration.day = 35;
  if (diff >= date_comparators.getDaysInMonth(firstPeriodInView))
    duration.month = 13;
  return lastPeriodOfPrevPage.set({ ...duration });
}
function handleNextPage(date, nextPageFunc) {
  return nextPageFunc(date);
}
function handlePrevPage(date, prevPageFunc) {
  return prevPageFunc(date);
}
function useCalendar(props) {
  const formatter = shared_useDateFormatter.useDateFormatter(props.locale.value);
  const headingFormatOptions = vue.computed(() => {
    const options = {
      calendar: props.placeholder.value.calendar.identifier
    };
    if (props.placeholder.value.calendar.identifier === "gregory" && props.placeholder.value.era === "BC")
      options.era = "short";
    return options;
  });
  const grid = vue.ref(date_calendar.createMonths({
    dateObj: props.placeholder.value,
    weekStartsOn: props.weekStartsOn.value,
    locale: props.locale.value,
    fixedWeeks: props.fixedWeeks.value,
    numberOfMonths: props.numberOfMonths.value
  }));
  const visibleView = vue.computed(() => {
    return grid.value.map((month) => month.value);
  });
  function isOutsideVisibleView(date$1) {
    return !visibleView.value.some((month) => date.isEqualMonth(date$1, month));
  }
  const isNextButtonDisabled = (nextPageFunc) => {
    if (!props.maxValue.value || !grid.value.length)
      return false;
    if (props.disabled.value)
      return true;
    const lastPeriodInView = grid.value[grid.value.length - 1].value;
    if (!nextPageFunc && !props.nextPage.value) {
      const firstPeriodOfNextPage2 = lastPeriodInView.add({ months: 1 }).set({ day: 1 });
      return date_comparators.isAfter(firstPeriodOfNextPage2, props.maxValue.value);
    }
    const firstPeriodOfNextPage = handleNextDisabled(lastPeriodInView, nextPageFunc || props.nextPage.value);
    return date_comparators.isAfter(firstPeriodOfNextPage, props.maxValue.value);
  };
  const isPrevButtonDisabled = (prevPageFunc) => {
    if (!props.minValue.value || !grid.value.length)
      return false;
    if (props.disabled.value)
      return true;
    const firstPeriodInView = grid.value[0].value;
    if (!prevPageFunc && !props.prevPage.value) {
      const lastPeriodOfPrevPage2 = firstPeriodInView.subtract({ months: 1 }).set({ day: 35 });
      return date_comparators.isBefore(lastPeriodOfPrevPage2, props.minValue.value);
    }
    const lastPeriodOfPrevPage = handlePrevDisabled(firstPeriodInView, prevPageFunc || props.prevPage.value);
    return date_comparators.isBefore(lastPeriodOfPrevPage, props.minValue.value);
  };
  function isDateDisabled(dateObj) {
    if (props.isDateDisabled?.(dateObj) || props.disabled.value)
      return true;
    if (props.maxValue.value && date_comparators.isAfter(dateObj, props.maxValue.value))
      return true;
    if (props.minValue.value && date_comparators.isBefore(dateObj, props.minValue.value))
      return true;
    return false;
  }
  const isDateUnavailable = (date) => {
    if (props.isDateUnavailable?.(date))
      return true;
    return false;
  };
  const weekdays = vue.computed(() => {
    if (!grid.value.length)
      return [];
    return grid.value[0].rows[0].map((date) => {
      return formatter.dayOfWeek(date_comparators.toDate(date), props.weekdayFormat.value);
    });
  });
  const nextPage = (nextPageFunc) => {
    const firstDate = grid.value[0].value;
    if (!nextPageFunc && !props.nextPage.value) {
      const newDate2 = firstDate.add({ months: props.pagedNavigation.value ? props.numberOfMonths.value : 1 });
      const newGrid2 = date_calendar.createMonths({
        dateObj: newDate2,
        weekStartsOn: props.weekStartsOn.value,
        locale: props.locale.value,
        fixedWeeks: props.fixedWeeks.value,
        numberOfMonths: props.numberOfMonths.value
      });
      grid.value = newGrid2;
      props.placeholder.value = newGrid2[0].value.set({ day: 1 });
      return;
    }
    const newDate = handleNextPage(firstDate, nextPageFunc || props.nextPage.value);
    const newGrid = date_calendar.createMonths({
      dateObj: newDate,
      weekStartsOn: props.weekStartsOn.value,
      locale: props.locale.value,
      fixedWeeks: props.fixedWeeks.value,
      numberOfMonths: props.numberOfMonths.value
    });
    grid.value = newGrid;
    const duration = {};
    if (!nextPageFunc) {
      const diff = newGrid[0].value.compare(firstDate);
      if (diff >= date_comparators.getDaysInMonth(firstDate))
        duration.day = 1;
      if (diff >= 365)
        duration.month = 1;
    }
    props.placeholder.value = newGrid[0].value.set({ ...duration });
  };
  const prevPage = (prevPageFunc) => {
    const firstDate = grid.value[0].value;
    if (!prevPageFunc && !props.prevPage.value) {
      const newDate2 = firstDate.subtract({ months: props.pagedNavigation.value ? props.numberOfMonths.value : 1 });
      const newGrid2 = date_calendar.createMonths({
        dateObj: newDate2,
        weekStartsOn: props.weekStartsOn.value,
        locale: props.locale.value,
        fixedWeeks: props.fixedWeeks.value,
        numberOfMonths: props.numberOfMonths.value
      });
      grid.value = newGrid2;
      props.placeholder.value = newGrid2[0].value.set({ day: 1 });
      return;
    }
    const newDate = handlePrevPage(firstDate, prevPageFunc || props.prevPage.value);
    const newGrid = date_calendar.createMonths({
      dateObj: newDate,
      weekStartsOn: props.weekStartsOn.value,
      locale: props.locale.value,
      fixedWeeks: props.fixedWeeks.value,
      numberOfMonths: props.numberOfMonths.value
    });
    grid.value = newGrid;
    const duration = {};
    if (!prevPageFunc) {
      const diff = firstDate.compare(newGrid[0].value);
      if (diff >= date_comparators.getDaysInMonth(firstDate))
        duration.day = 1;
      if (diff >= 365)
        duration.month = 1;
    }
    props.placeholder.value = newGrid[0].value.set({ ...duration });
  };
  vue.watch(props.placeholder, (value) => {
    if (visibleView.value.some((month) => date.isEqualMonth(month, value)))
      return;
    grid.value = date_calendar.createMonths({
      dateObj: value,
      weekStartsOn: props.weekStartsOn.value,
      locale: props.locale.value,
      fixedWeeks: props.fixedWeeks.value,
      numberOfMonths: props.numberOfMonths.value
    });
  });
  vue.watch([props.locale, props.weekStartsOn, props.fixedWeeks, props.numberOfMonths], () => {
    grid.value = date_calendar.createMonths({
      dateObj: props.placeholder.value,
      weekStartsOn: props.weekStartsOn.value,
      locale: props.locale.value,
      fixedWeeks: props.fixedWeeks.value,
      numberOfMonths: props.numberOfMonths.value
    });
  });
  const headingValue = vue.computed(() => {
    if (!grid.value.length)
      return "";
    if (props.locale.value !== formatter.getLocale())
      formatter.setLocale(props.locale.value);
    if (grid.value.length === 1) {
      const month = grid.value[0].value;
      return `${formatter.fullMonthAndYear(date_comparators.toDate(month), headingFormatOptions.value)}`;
    }
    const startMonth = date_comparators.toDate(grid.value[0].value);
    const endMonth = date_comparators.toDate(grid.value[grid.value.length - 1].value);
    const startMonthName = formatter.fullMonth(startMonth, headingFormatOptions.value);
    const endMonthName = formatter.fullMonth(endMonth, headingFormatOptions.value);
    const startMonthYear = formatter.fullYear(startMonth, headingFormatOptions.value);
    const endMonthYear = formatter.fullYear(endMonth, headingFormatOptions.value);
    const content = startMonthYear === endMonthYear ? `${startMonthName} - ${endMonthName} ${endMonthYear}` : `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
    return content;
  });
  const fullCalendarLabel = vue.computed(() => `${props.calendarLabel.value ?? "Event Date"}, ${headingValue.value}`);
  return {
    isDateDisabled,
    isDateUnavailable,
    isNextButtonDisabled,
    isPrevButtonDisabled,
    grid,
    weekdays,
    visibleView,
    isOutsideVisibleView,
    formatter,
    nextPage,
    prevPage,
    headingValue,
    fullCalendarLabel
  };
}

exports.useCalendar = useCalendar;
exports.useCalendarState = useCalendarState;
//# sourceMappingURL=useCalendar.cjs.map
