'use strict';

function clamp(value, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
  return Math.min(max, Math.max(min, value));
}
function roundToStepPrecision(value, step) {
  let roundedValue = value;
  const stepString = step.toString();
  const pointIndex = stepString.indexOf(".");
  const precision = pointIndex >= 0 ? stepString.length - pointIndex : 0;
  if (precision > 0) {
    const pow = 10 ** precision;
    roundedValue = Math.round(roundedValue * pow) / pow;
  }
  return roundedValue;
}
function snapValueToStep(value, min, max, step) {
  min = Number(min);
  max = Number(max);
  const remainder = (value - (Number.isNaN(min) ? 0 : min)) % step;
  let snappedValue = roundToStepPrecision(Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder, step);
  if (!Number.isNaN(min)) {
    if (snappedValue < min)
      snappedValue = min;
    else if (!Number.isNaN(max) && snappedValue > max)
      snappedValue = min + Math.floor(roundToStepPrecision((max - min) / step, step)) * step;
  } else if (!Number.isNaN(max) && snappedValue > max) {
    snappedValue = Math.floor(roundToStepPrecision(max / step, step)) * step;
  }
  snappedValue = roundToStepPrecision(snappedValue, step);
  return snappedValue;
}

exports.clamp = clamp;
exports.snapValueToStep = snapValueToStep;
//# sourceMappingURL=clamp.cjs.map
