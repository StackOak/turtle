const DATE_SEGMENT_PARTS = ["day", "month", "year"];
const TIME_SEGMENT_PARTS = ["hour", "minute", "second", "dayPeriod"];
const EDITABLE_SEGMENT_PARTS = [...DATE_SEGMENT_PARTS, ...TIME_SEGMENT_PARTS];
function isDateSegmentPart(part) {
  return DATE_SEGMENT_PARTS.includes(part);
}
function isSegmentPart(part) {
  return EDITABLE_SEGMENT_PARTS.includes(part);
}

export { DATE_SEGMENT_PARTS as D, EDITABLE_SEGMENT_PARTS as E, TIME_SEGMENT_PARTS as T, isDateSegmentPart as a, isSegmentPart as i };
//# sourceMappingURL=parts.js.map
