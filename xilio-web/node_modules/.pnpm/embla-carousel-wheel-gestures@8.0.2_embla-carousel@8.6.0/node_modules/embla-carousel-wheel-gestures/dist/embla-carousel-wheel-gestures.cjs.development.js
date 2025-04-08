'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var WheelGestures = _interopDefault(require('wheel-gestures'));

var defaultOptions = {
  active: true,
  breakpoints: {},
  wheelDraggingClass: 'is-wheel-dragging',
  forceWheelAxis: undefined,
  target: undefined
};
WheelGesturesPlugin.globalOptions = undefined;

function WheelGesturesPlugin(userOptions) {
  if (userOptions === void 0) {
    userOptions = {};
  }

  var options;

  var cleanup = function cleanup() {};

  function init(embla, optionsHandler) {
    var _options$target, _options$forceWheelAx;

    var mergeOptions = optionsHandler.mergeOptions,
        optionsAtMedia = optionsHandler.optionsAtMedia;
    var optionsBase = mergeOptions(defaultOptions, WheelGesturesPlugin.globalOptions);
    var allOptions = mergeOptions(optionsBase, userOptions);
    options = optionsAtMedia(allOptions);
    var engine = embla.internalEngine();
    var targetNode = (_options$target = options.target) != null ? _options$target : embla.containerNode().parentNode;
    var wheelAxis = (_options$forceWheelAx = options.forceWheelAxis) != null ? _options$forceWheelAx : engine.options.axis;
    var wheelGestures = WheelGestures({
      preventWheelAction: wheelAxis,
      reverseSign: [true, true, false]
    });
    var unobserveTargetNode = wheelGestures.observe(targetNode);
    var offWheel = wheelGestures.on('wheel', handleWheel);
    var isStarted = false;
    var startEvent;

    function wheelGestureStarted(state) {
      try {
        startEvent = new MouseEvent('mousedown', state.event);
        dispatchEvent(startEvent);
      } catch (e) {
        // Legacy Browsers like IE 10 & 11 will throw when attempting to create the Event
        {
          console.warn('Legacy browser requires events-polyfill (https://github.com/xiel/embla-carousel-wheel-gestures#legacy-browsers)');
        }

        return cleanup();
      }

      isStarted = true;
      addNativeMouseEventListeners();

      if (options.wheelDraggingClass) {
        targetNode.classList.add(options.wheelDraggingClass);
      }
    }

    function wheelGestureEnded(state) {
      isStarted = false;
      dispatchEvent(createRelativeMouseEvent('mouseup', state));
      removeNativeMouseEventListeners();

      if (options.wheelDraggingClass) {
        targetNode.classList.remove(options.wheelDraggingClass);
      }
    }

    function addNativeMouseEventListeners() {
      document.documentElement.addEventListener('mousemove', preventNativeMouseHandler, true);
      document.documentElement.addEventListener('mouseup', preventNativeMouseHandler, true);
      document.documentElement.addEventListener('mousedown', preventNativeMouseHandler, true);
    }

    function removeNativeMouseEventListeners() {
      document.documentElement.removeEventListener('mousemove', preventNativeMouseHandler, true);
      document.documentElement.removeEventListener('mouseup', preventNativeMouseHandler, true);
      document.documentElement.removeEventListener('mousedown', preventNativeMouseHandler, true);
    }

    function preventNativeMouseHandler(e) {
      if (isStarted && e.isTrusted) {
        e.stopImmediatePropagation();
      }
    }

    function createRelativeMouseEvent(type, state) {
      var moveX, moveY;

      if (wheelAxis === engine.options.axis) {
        var _state$axisMovement = state.axisMovement;
        moveX = _state$axisMovement[0];
        moveY = _state$axisMovement[1];
      } else {
        var _state$axisMovement2 = state.axisMovement;
        moveY = _state$axisMovement2[0];
        moveX = _state$axisMovement2[1];
      } // prevent skipping slides


      if (!engine.options.skipSnaps && !engine.options.dragFree) {
        var maxX = engine.containerRect.width;
        var maxY = engine.containerRect.height;
        moveX = moveX < 0 ? Math.max(moveX, -maxX) : Math.min(moveX, maxX);
        moveY = moveY < 0 ? Math.max(moveY, -maxY) : Math.min(moveY, maxY);
      }

      return new MouseEvent(type, {
        clientX: startEvent.clientX + moveX,
        clientY: startEvent.clientY + moveY,
        screenX: startEvent.screenX + moveX,
        screenY: startEvent.screenY + moveY,
        movementX: moveX,
        movementY: moveY,
        button: 0,
        bubbles: true,
        cancelable: true,
        composed: true
      });
    }

    function dispatchEvent(event) {
      embla.containerNode().dispatchEvent(event);
    }

    function handleWheel(state) {
      var _state$axisDelta = state.axisDelta,
          deltaX = _state$axisDelta[0],
          deltaY = _state$axisDelta[1];
      var primaryAxisDelta = wheelAxis === 'x' ? deltaX : deltaY;
      var crossAxisDelta = wheelAxis === 'x' ? deltaY : deltaX;
      var isRelease = state.isMomentum && state.previous && !state.previous.isMomentum;
      var isEndingOrRelease = state.isEnding && !state.isMomentum || isRelease;
      var primaryAxisDeltaIsDominant = Math.abs(primaryAxisDelta) > Math.abs(crossAxisDelta);

      if (primaryAxisDeltaIsDominant && !isStarted && !state.isMomentum) {
        wheelGestureStarted(state);
      }

      if (!isStarted) return;

      if (isEndingOrRelease) {
        wheelGestureEnded(state);
      } else {
        dispatchEvent(createRelativeMouseEvent('mousemove', state));
      }
    }

    cleanup = function cleanup() {
      unobserveTargetNode();
      offWheel();
      removeNativeMouseEventListeners();
    };
  }

  var self = {
    name: 'wheelGestures',
    options: userOptions,
    init: init,
    destroy: function destroy() {
      return cleanup();
    }
  };
  return self;
}

exports.WheelGesturesPlugin = WheelGesturesPlugin;
//# sourceMappingURL=embla-carousel-wheel-gestures.cjs.development.js.map
