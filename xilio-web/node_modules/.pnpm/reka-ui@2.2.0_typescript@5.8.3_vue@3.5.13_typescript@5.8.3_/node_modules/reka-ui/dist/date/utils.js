function getOptsByGranularity(granularity, hourCycle, isTimeValue = false) {
  const opts = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
    hourCycle: hourCycle === 24 ? "h23" : void 0,
    hour12: hourCycle === 24 ? false : void 0
  };
  if (isTimeValue) {
    delete opts.year;
    delete opts.month;
    delete opts.day;
  }
  if (granularity === "day") {
    delete opts.second;
    delete opts.hour;
    delete opts.minute;
    delete opts.timeZoneName;
  }
  if (granularity === "hour") {
    delete opts.minute;
    delete opts.second;
  }
  if (granularity === "minute")
    delete opts.second;
  return opts;
}
function handleCalendarInitialFocus(calendar) {
  const selectedDay = calendar.querySelector("[data-selected]");
  if (selectedDay)
    return selectedDay.focus();
  const today = calendar.querySelector("[data-today]");
  if (today)
    return today.focus();
  const firstDay = calendar.querySelector("[data-reka-calendar-day]");
  if (firstDay)
    return firstDay.focus();
}

function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size)
    result.push(arr.slice(i, i + size));
  return result;
}

export { chunk as c, getOptsByGranularity as g, handleCalendarInitialFocus as h };
//# sourceMappingURL=utils.js.map
