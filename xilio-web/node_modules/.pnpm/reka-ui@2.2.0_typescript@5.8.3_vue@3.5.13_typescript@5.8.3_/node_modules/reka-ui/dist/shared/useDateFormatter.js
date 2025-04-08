import { today, getLocalTimeZone, DateFormatter } from '@internationalized/date';
import { t as toDate, h as hasTime, a as isZonedDateTime } from '../date/comparators.js';
import { ref } from 'vue';

function useDateFormatter(initialLocale) {
  const locale = ref(initialLocale);
  function getLocale() {
    return locale.value;
  }
  function setLocale(newLocale) {
    locale.value = newLocale;
  }
  function custom(date, options) {
    return new DateFormatter(locale.value, options).format(date);
  }
  function selectedDate(date, includeTime = true) {
    if (hasTime(date) && includeTime) {
      return custom(toDate(date), {
        dateStyle: "long",
        timeStyle: "long"
      });
    } else {
      return custom(toDate(date), {
        dateStyle: "long"
      });
    }
  }
  function fullMonthAndYear(date, options = {}) {
    return new DateFormatter(locale.value, { month: "long", year: "numeric", ...options }).format(date);
  }
  function fullMonth(date, options = {}) {
    return new DateFormatter(locale.value, { month: "long", ...options }).format(date);
  }
  function getMonths() {
    const defaultDate = today(getLocalTimeZone());
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return months.map((item) => ({ label: fullMonth(toDate(defaultDate.set({ month: item }))), value: item }));
  }
  function fullYear(date, options = {}) {
    return new DateFormatter(locale.value, { year: "numeric", ...options }).format(date);
  }
  function toParts(date, options) {
    if (isZonedDateTime(date)) {
      return new DateFormatter(locale.value, {
        ...options,
        timeZone: date.timeZone
      }).formatToParts(toDate(date));
    } else {
      return new DateFormatter(locale.value, options).formatToParts(toDate(date));
    }
  }
  function dayOfWeek(date, length = "narrow") {
    return new DateFormatter(locale.value, { weekday: length }).format(date);
  }
  function dayPeriod(date) {
    const parts = new DateFormatter(locale.value, {
      hour: "numeric",
      minute: "numeric"
    }).formatToParts(date);
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

export { useDateFormatter as u };
//# sourceMappingURL=useDateFormatter.js.map
