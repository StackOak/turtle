'use strict';

const date = require('@internationalized/date');

function getDefaultDate(props) {
  const { defaultValue, defaultPlaceholder, granularity = "day", locale = "en" } = props;
  if (Array.isArray(defaultValue) && defaultValue.length)
    return defaultValue.at(-1).copy();
  if (defaultValue && !Array.isArray(defaultValue))
    return defaultValue.copy();
  if (defaultPlaceholder)
    return defaultPlaceholder.copy();
  const date$1 = /* @__PURE__ */ new Date();
  const year = date$1.getFullYear();
  const month = date$1.getMonth() + 1;
  const day = date$1.getDate();
  const calendarDateTimeGranularities = ["hour", "minute", "second"];
  const defaultFormatter = new date.DateFormatter(locale);
  const calendar = date.createCalendar(defaultFormatter.resolvedOptions().calendar);
  if (calendarDateTimeGranularities.includes(granularity ?? "day"))
    return date.toCalendar(new date.CalendarDateTime(year, month, day, 0, 0, 0), calendar);
  return date.toCalendar(new date.CalendarDate(year, month, day), calendar);
}
function getDefaultTime(props) {
  const { defaultValue, defaultPlaceholder } = props;
  if (defaultValue) {
    return defaultValue.copy();
  }
  if (defaultPlaceholder) {
    return defaultPlaceholder.copy();
  }
  return new date.Time(0, 0, 0);
}

function parseStringToDateValue(dateStr, referenceVal) {
  let dateValue;
  if (isZonedDateTime(referenceVal))
    dateValue = date.parseZonedDateTime(dateStr);
  else if (isCalendarDateTime(referenceVal))
    dateValue = date.parseDateTime(dateStr);
  else
    dateValue = date.parseDate(dateStr);
  return dateValue.calendar !== referenceVal.calendar ? date.toCalendar(dateValue, referenceVal.calendar) : dateValue;
}
function toDate(dateValue, tz = date.getLocalTimeZone()) {
  if (isZonedDateTime(dateValue))
    return dateValue.toDate();
  else
    return dateValue.toDate(tz);
}
function isCalendarDateTime(dateValue) {
  return dateValue instanceof date.CalendarDateTime;
}
function isZonedDateTime(dateValue) {
  return dateValue instanceof date.ZonedDateTime;
}
function hasTime(dateValue) {
  return isCalendarDateTime(dateValue) || isZonedDateTime(dateValue);
}
function getDaysInMonth(date) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  } else {
    return date.set({ day: 100 }).day;
  }
}
function isBefore(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) < 0;
}
function isAfter(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) > 0;
}
function isBeforeOrSame(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) <= 0;
}
function isAfterOrSame(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) >= 0;
}
function isBetweenInclusive(date, start, end) {
  return isAfterOrSame(date, start) && isBeforeOrSame(date, end);
}
function isBetween(date, start, end) {
  return isAfter(date, start) && isBefore(date, end);
}
function getLastFirstDayOfWeek(date$1, firstDayOfWeek, locale) {
  const day = date.getDayOfWeek(date$1, locale);
  if (firstDayOfWeek > day)
    return date$1.subtract({ days: day + 7 - firstDayOfWeek });
  if (firstDayOfWeek === day)
    return date$1;
  return date$1.subtract({ days: day - firstDayOfWeek });
}
function getNextLastDayOfWeek(date$1, firstDayOfWeek, locale) {
  const day = date.getDayOfWeek(date$1, locale);
  const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  if (day === lastDayOfWeek)
    return date$1;
  if (day > lastDayOfWeek)
    return date$1.add({ days: 7 - day + lastDayOfWeek });
  return date$1.add({ days: lastDayOfWeek - day });
}
function areAllDaysBetweenValid(start, end, isUnavailable, isDisabled) {
  if (isUnavailable === void 0 && isDisabled === void 0)
    return true;
  let dCurrent = start.add({ days: 1 });
  if (isDisabled?.(dCurrent) || isUnavailable?.(dCurrent))
    return false;
  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    dCurrent = dCurrent.add({ days: 1 });
    if (isDisabled?.(dCurrent) || isUnavailable?.(dCurrent))
      return false;
  }
  return true;
}

exports.areAllDaysBetweenValid = areAllDaysBetweenValid;
exports.getDaysInMonth = getDaysInMonth;
exports.getDefaultDate = getDefaultDate;
exports.getDefaultTime = getDefaultTime;
exports.getLastFirstDayOfWeek = getLastFirstDayOfWeek;
exports.getNextLastDayOfWeek = getNextLastDayOfWeek;
exports.hasTime = hasTime;
exports.isAfter = isAfter;
exports.isAfterOrSame = isAfterOrSame;
exports.isBefore = isBefore;
exports.isBeforeOrSame = isBeforeOrSame;
exports.isBetween = isBetween;
exports.isBetweenInclusive = isBetweenInclusive;
exports.isCalendarDateTime = isCalendarDateTime;
exports.isZonedDateTime = isZonedDateTime;
exports.parseStringToDateValue = parseStringToDateValue;
exports.toDate = toDate;
//# sourceMappingURL=comparators.cjs.map
