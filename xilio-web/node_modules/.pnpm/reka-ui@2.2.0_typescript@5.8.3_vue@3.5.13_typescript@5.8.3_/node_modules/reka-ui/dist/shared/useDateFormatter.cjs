'use strict';

const date = require('@internationalized/date');
const date_comparators = require('../date/comparators.cjs');
const vue = require('vue');

function useDateFormatter(initialLocale) {
  const locale = vue.ref(initialLocale);
  function getLocale() {
    return locale.value;
  }
  function setLocale(newLocale) {
    locale.value = newLocale;
  }
  function custom(date$1, options) {
    return new date.DateFormatter(locale.value, options).format(date$1);
  }
  function selectedDate(date, includeTime = true) {
    if (date_comparators.hasTime(date) && includeTime) {
      return custom(date_comparators.toDate(date), {
        dateStyle: "long",
        timeStyle: "long"
      });
    } else {
      return custom(date_comparators.toDate(date), {
        dateStyle: "long"
      });
    }
  }
  function fullMonthAndYear(date$1, options = {}) {
    return new date.DateFormatter(locale.value, { month: "long", year: "numeric", ...options }).format(date$1);
  }
  function fullMonth(date$1, options = {}) {
    return new date.DateFormatter(locale.value, { month: "long", ...options }).format(date$1);
  }
  function getMonths() {
    const defaultDate = date.today(date.getLocalTimeZone());
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return months.map((item) => ({ label: fullMonth(date_comparators.toDate(defaultDate.set({ month: item }))), value: item }));
  }
  function fullYear(date$1, options = {}) {
    return new date.DateFormatter(locale.value, { year: "numeric", ...options }).format(date$1);
  }
  function toParts(date$1, options) {
    if (date_comparators.isZonedDateTime(date$1)) {
      return new date.DateFormatter(locale.value, {
        ...options,
        timeZone: date$1.timeZone
      }).formatToParts(date_comparators.toDate(date$1));
    } else {
      return new date.DateFormatter(locale.value, options).formatToParts(date_comparators.toDate(date$1));
    }
  }
  function dayOfWeek(date$1, length = "narrow") {
    return new date.DateFormatter(locale.value, { weekday: length }).format(date$1);
  }
  function dayPeriod(date$1) {
    const parts = new date.DateFormatter(locale.value, {
      hour: "numeric",
      minute: "numeric"
    }).formatToParts(date$1);
    const value = parts.find((p) => p.type === "dayPeriod")?.value;
    if (value === "PM")
      return "PM";
    return "AM";
  }
  const defaultPartOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };
  function part(dateObj, type, options = {}) {
    const opts = { ...defaultPartOptions, ...options };
    const parts = toParts(dateObj, opts);
    const part2 = parts.find((p) => p.type === type);
    return part2 ? part2.value : "";
  }
  return {
    setLocale,
    getLocale,
    fullMonth,
    fullYear,
    fullMonthAndYear,
    toParts,
    custom,
    part,
    dayPeriod,
    selectedDate,
    dayOfWeek,
    getMonths
  };
}

exports.useDateFormatter = useDateFormatter;
//# sourceMappingURL=useDateFormatter.cjs.map
