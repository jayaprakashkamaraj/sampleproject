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
define(["require", "exports", "./base", "./browser", "./dom", "./notify-property-change", "./event-handler", "./util"], function (require, exports, base_1, browser_1, dom_1, notify_property_change_1, event_handler_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Droppable = (function (_super) {
        __extends(Droppable, _super);
        function Droppable(element, options) {
            var _this = _super.call(this, options, element) || this;
            _this.mouseOver = false;
            _this.dragData = {};
            _this.dragStopCalled = false;
            _this.bind();
            return _this;
        }
        Droppable.prototype.bind = function () {
            this.wireEvents();
        };
        Droppable.prototype.wireEvents = function () {
            event_handler_1.EventHandler.add(this.element, browser_1.Browser.touchEndEvent, this.intDrop, this);
        };
        Droppable.prototype.onPropertyChanged = function (newProp, oldProp) {
        };
        Droppable.prototype.getModuleName = function () {
            return 'droppable';
        };
        Droppable.prototype.intOver = function (event, element) {
            if (!this.mouseOver) {
                this.trigger('over', { event: event, target: element });
                this.mouseOver = true;
            }
        };
        Droppable.prototype.intOut = function (event, element) {
            if (this.mouseOver) {
                this.trigger('out', { evt: event, target: element });
                this.mouseOver = false;
            }
        };
        Droppable.prototype.intDrop = function (evt, element) {
            if (!this.dragStopCalled) {
                return;
            }
            else {
                this.dragStopCalled = false;
            }
            var accept = true;
            var drag = this.dragData[this.scope];
            var isDrag = drag ? (drag.helper && dom_1.isVisible(drag.helper)) : false;
            var area;
            if (isDrag) {
                area = this.isDropArea(evt, drag.helper, element);
                if (this.accept) {
                    accept = dom_1.matches(drag.helper, this.accept);
                }
            }
            if (isDrag && this.drop && area.canDrop && accept) {
                this.trigger('drop', { event: evt, target: area.target, droppedElement: drag.helper, dragData: drag });
            }
        };
        Droppable.prototype.isDropArea = function (evt, helper, element) {
            var area = { canDrop: true, target: element || evt.target };
            var isTouch = evt.type === 'touchend';
            if (isTouch || area.target === helper) {
                helper.style.display = 'none';
                var coord = isTouch ? (evt.changedTouches[0]) : evt;
                var ele = document.elementFromPoint(coord.clientX, coord.clientY);
                area.canDrop = false;
                area.canDrop = util_1.compareElementParent(ele, this.element);
                if (area.canDrop) {
                    area.target = ele;
                }
                helper.style.display = '';
            }
            return area;
        };
        Droppable.prototype.destroy = function () {
            event_handler_1.EventHandler.remove(this.element, browser_1.Browser.touchEndEvent, this.intDrop);
            _super.prototype.destroy.call(this);
        };
        return Droppable;
    }(base_1.Base));
    __decorate([
        notify_property_change_1.Property()
    ], Droppable.prototype, "accept", void 0);
    __decorate([
        notify_property_change_1.Property('default')
    ], Droppable.prototype, "scope", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], Droppable.prototype, "drop", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], Droppable.prototype, "over", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], Droppable.prototype, "out", void 0);
    Droppable = __decorate([
        notify_property_change_1.NotifyPropertyChanges
    ], Droppable);
    exports.Droppable = Droppable;
});
