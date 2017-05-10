var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "./util", "./notify-property-change", "./browser", "./base", "./child-property", "./event-handler"], function (require, exports, util_1, notify_property_change_1, browser_1, base_1, child_property_1, event_handler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SwipeSettings = (function (_super) {
        __extends(SwipeSettings, _super);
        function SwipeSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SwipeSettings;
    }(child_property_1.ChildProperty));
    __decorate([
        notify_property_change_1.Property(50)
    ], SwipeSettings.prototype, "swipeThresholdDistance", void 0);
    exports.SwipeSettings = SwipeSettings;
    var swipeRegex = /(Up|Down)/;
    var Touch = (function (_super) {
        __extends(Touch, _super);
        function Touch(element, options) {
            var _this = _super.call(this, options, element) || this;
            _this.startEvent = function (evt) {
                var point = (evt.changedTouches ? evt.changedTouches[0] : evt);
                _this.isTouchMoved = false;
                _this.movedDirection = '';
                _this.startPoint = _this.lastMovedPoint = { clientX: point.clientX, clientY: point.clientY };
                _this.startEventData = point;
                _this.hScrollLocked = _this.vScrollLocked = false;
                _this.tStampStart = Date.now();
                _this.timeOutTapHold = setTimeout(function () { _this.tapholdEvent(evt); }, _this.tapholdThreshold);
                event_handler_1.EventHandler.add(_this.element, browser_1.Browser.touchMoveEvent, _this.moveEvent, _this);
                event_handler_1.EventHandler.add(_this.element, browser_1.Browser.touchEndEvent, _this.endEvent, _this);
            };
            _this.moveEvent = function (evt) {
                var point = evt.changedTouches ? evt.changedTouches[0] : evt;
                _this.movedPoint = point;
                _this.isTouchMoved = !(point.clientX === _this.startPoint.clientX && point.clientY === _this.startPoint.clientY);
                var eScrollArgs = {};
                if (_this.isTouchMoved) {
                    clearTimeout(_this.timeOutTapHold);
                    _this.calcScrollPoints(evt);
                    var scrollArg = {
                        startEvents: _this.startEventData,
                        originalEvent: evt, startX: _this.startPoint.clientX,
                        startY: _this.startPoint.clientY, distanceX: _this.distanceX,
                        distanceY: _this.distanceY, scrollDirection: _this.scrollDirection,
                        velocity: _this.getVelocity(point)
                    };
                    eScrollArgs = util_1.extend(eScrollArgs, {}, scrollArg);
                    _this.trigger('scroll', eScrollArgs);
                    _this.lastMovedPoint = { clientX: point.clientX, clientY: point.clientY };
                }
            };
            _this.endEvent = function (evt) {
                clearTimeout(_this.timeOutTapHold);
                var point = evt;
                if (evt.changedTouches) {
                    point = evt.changedTouches[0];
                }
                _this.isTouchMoved = !(point.clientX === _this.startPoint.clientX && point.clientY === _this.startPoint.clientY);
                _this.endPoint = point;
                var dblTapTriggred = false;
                var eDblTapArgs;
                var eTapArgs;
                var eSwipeArgs;
                var tDistance = _this.swipeSettings.swipeThresholdDistance;
                _this.calcPoints(evt);
                var swipeArgs = {
                    originalEvent: evt,
                    startEvents: _this.startEventData,
                    startX: _this.startPoint.clientX,
                    startY: _this.startPoint.clientY,
                    distanceX: _this.distanceX, distanceY: _this.distanceY, swipeDirection: _this.movedDirection,
                    velocity: _this.getVelocity(point)
                };
                if (!_this.isTouchMoved) {
                    eDblTapArgs = util_1.extend(eDblTapArgs, _this.defaultArgs, {});
                    if (!util_1.isNullOrUndefined(_this.lastTapTime) && (new Date().getTime() - _this.lastTapTime) < _this.doubleTapThreshold) {
                        clearTimeout(_this.timeOutTap);
                        dblTapTriggred = true;
                        _this.trigger('doubleTap', eDblTapArgs);
                    }
                    if (!dblTapTriggred) {
                        eTapArgs = util_1.extend(eTapArgs, _this.defaultArgs, {});
                        _this.timeOutTap = setTimeout(function () {
                            _this.trigger('tap', eTapArgs);
                        }, (typeof _this.doubleTap !== 'function' ? 0 : _this.doubleTapThreshold));
                    }
                }
                else {
                    eSwipeArgs = util_1.extend(eSwipeArgs, _this.defaultArgs, swipeArgs);
                    var canTrigger = false;
                    var ele = _this.element;
                    var scrollBool = _this.isScrollable(ele);
                    var moved = swipeRegex.test(_this.movedDirection);
                    if ((tDistance < _this.distanceX && !moved) || (tDistance < _this.distanceY && moved)) {
                        if (!scrollBool) {
                            canTrigger = true;
                        }
                        else {
                            canTrigger = _this.checkSwipe(ele, moved);
                        }
                    }
                    if (canTrigger) {
                        _this.trigger('swipe', eSwipeArgs);
                    }
                }
                _this.lastTapTime = new Date().getTime();
                event_handler_1.EventHandler.remove(_this.element, browser_1.Browser.touchMoveEvent, _this.moveEvent);
                event_handler_1.EventHandler.remove(_this.element, browser_1.Browser.touchEndEvent, _this.endEvent);
            };
            _this.bind();
            return _this;
        }
        Touch.prototype.onPropertyChanged = function (newProp, oldProp) {
        };
        Touch.prototype.bind = function () {
            this.wireEvents();
            if (browser_1.Browser.isIE) {
                this.element.classList.add('e-block-touch');
            }
        };
        Touch.prototype.destroy = function () {
            this.unwireEvents();
            _super.prototype.destroy.call(this);
        };
        Touch.prototype.wireEvents = function () {
            event_handler_1.EventHandler.add(this.element, browser_1.Browser.touchStartEvent, this.startEvent, this);
        };
        Touch.prototype.unwireEvents = function () {
            event_handler_1.EventHandler.remove(this.element, browser_1.Browser.touchStartEvent, this.startEvent);
        };
        Touch.prototype.getModuleName = function () {
            return 'touch';
        };
        Touch.prototype.isScrollable = function (element) {
            var eleStyle = getComputedStyle(element);
            var style = eleStyle.overflow + eleStyle.overflowX + eleStyle.overflowY;
            if ((/(auto|scroll)/).test(style)) {
                return true;
            }
            return false;
        };
        Touch.prototype.tapholdEvent = function (evt) {
            var eTapArgs;
            event_handler_1.EventHandler.remove(this.element, browser_1.Browser.touchMoveEvent, this.moveEvent);
            event_handler_1.EventHandler.remove(this.element, browser_1.Browser.touchEndEvent, this.endEvent);
            eTapArgs = { originalEvent: evt };
            this.trigger('taphold', eTapArgs);
        };
        Touch.prototype.calcPoints = function (evt) {
            var point = evt.changedTouches ? evt.changedTouches[0] : evt;
            this.defaultArgs = { originalEvent: evt };
            this.distanceX = Math.abs((Math.abs(point.clientX) - Math.abs(this.startPoint.clientX)));
            this.distanceY = Math.abs((Math.abs(point.clientY) - Math.abs(this.startPoint.clientY)));
            if (this.distanceX > this.distanceY) {
                this.movedDirection = (point.clientX > this.startPoint.clientX) ? 'Right' : 'Left';
            }
            else {
                this.movedDirection = (point.clientY < this.startPoint.clientY) ? 'Up' : 'Down';
            }
        };
        Touch.prototype.calcScrollPoints = function (evt) {
            var point = evt.changedTouches ? evt.changedTouches[0] : evt;
            this.defaultArgs = { originalEvent: evt };
            this.distanceX = Math.abs((Math.abs(point.clientX) - Math.abs(this.lastMovedPoint.clientX)));
            this.distanceY = Math.abs((Math.abs(point.clientY) - Math.abs(this.lastMovedPoint.clientY)));
            if ((this.distanceX > this.distanceY || this.hScrollLocked === true) && this.vScrollLocked === false) {
                this.scrollDirection = (point.clientX > this.lastMovedPoint.clientX) ? 'Right' : 'Left';
                this.hScrollLocked = true;
            }
            else {
                this.scrollDirection = (point.clientY < this.lastMovedPoint.clientY) ? 'Up' : 'Down';
                this.vScrollLocked = true;
            }
        };
        Touch.prototype.getVelocity = function (pnt) {
            var newX = pnt.clientX;
            var newY = pnt.clientY;
            var newT = Date.now();
            var xDist = newX - this.startPoint.clientX;
            var yDist = newY - this.startPoint.clientX;
            var interval = newT - this.tStampStart;
            return Math.sqrt(xDist * xDist + yDist * yDist) / interval;
        };
        Touch.prototype.checkSwipe = function (ele, flag) {
            var keys = ['scroll', 'offset'];
            var temp = flag ? ['Height', 'Top'] : ['Width', 'Left'];
            if ((ele[keys[0] + temp[0]] <= ele[keys[1] + temp[0]])) {
                return true;
            }
            return (ele[keys[0] + temp[1]] === 0) ||
                (ele[keys[1] + temp[0]] + ele[keys[0] + temp[1]] >= ele[keys[0] + temp[0]]);
        };
        return Touch;
    }(base_1.Base));
    __decorate([
        notify_property_change_1.Event()
    ], Touch.prototype, "tap", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], Touch.prototype, "doubleTap", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], Touch.prototype, "taphold", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], Touch.prototype, "swipe", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], Touch.prototype, "scroll", void 0);
    __decorate([
        notify_property_change_1.Property(500)
    ], Touch.prototype, "doubleTapThreshold", void 0);
    __decorate([
        notify_property_change_1.Property(750)
    ], Touch.prototype, "tapholdThreshold", void 0);
    __decorate([
        notify_property_change_1.Complex({}, SwipeSettings)
    ], Touch.prototype, "swipeSettings", void 0);
    Touch = __decorate([
        notify_property_change_1.NotifyPropertyChanges
    ], Touch);
    exports.Touch = Touch;
});
