'use strict';

const DATE_SEGMENT_PARTS = ["day", "month", "year"];
const TIME_SEGMENT_PARTS = ["hour", "minute", "second", "dayPeriod"];
const EDITABLE_SEGMENT_PARTS = [...DATE_SEGMENT_PARTS, ...TIME_SEGMENT_PARTS];
function isDateSegmentPart(part) {
  return DATE_SEGMENT_PARTS.includes(part);
}
function isSegmentPart(part) {
  return EDITABLE_SEGMENT_PARTS.includes(part);
}

exports.DATE_SEGMENT_PARTS = DATE_SEGMENT_PARTS;
exports.EDITABLE_SEGMENT_PARTS = EDITABLE_SEGMENT_PARTS;
exports.TIME_SEGMENT_PARTS = TIME_SEGMENT_PARTS;
exports.isDateSegmentPart = isDateSegmentPart;
exports.isSegmentPart = isSegmentPart;
//# sourceMappingURL=parts.cjs.map
