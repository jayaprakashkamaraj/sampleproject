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
define(["require", "exports", "./base", "./browser", "./dom", "./notify-property-change", "./event-handler", "./child-property", "./dom", "./util"], function (require, exports, base_1, browser_1, dom_1, notify_property_change_1, event_handler_1, child_property_1, dom_2, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var defaultPosition = { left: 0, right: 0, top: 0, bottom: 0 };
    var positionProp = ['offsetLeft', 'offsetTop'];
    var Position = (function (_super) {
        __extends(Position, _super);
        function Position() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Position;
    }(child_property_1.ChildProperty));
    __decorate([
        notify_property_change_1.Property(0)
    ], Position.prototype, "left", void 0);
    __decorate([
        notify_property_change_1.Property(0)
    ], Position.prototype, "right", void 0);
    __decorate([
        notify_property_change_1.Property(0)
    ], Position.prototype, "top", void 0);
    __decorate([
        notify_property_change_1.Property(0)
    ], Position.prototype, "bottom", void 0);
    exports.Position = Position;
    var Draggable = Draggable_1 = (function (_super) {
        __extends(Draggable, _super);
        function Draggable(element, options) {
            var _this = _super.call(this, options, element) || this;
            _this.dragLimit = Draggable_1.getDefaultPosition();
            _this.borderWidth = Draggable_1.getDefaultPosition();
            _this.padding = Draggable_1.getDefaultPosition();
            _this.diffX = 0;
            _this.diffY = 0;
            _this.droppables = {};
            _this.bind();
            return _this;
        }
        Draggable.prototype.bind = function () {
            this.toggleEvents();
            if (browser_1.Browser.isIE) {
                dom_2.addClass([this.element], 'e-block-touch');
            }
            this.droppables[this.scope] = {};
        };
        Draggable.getDefaultPosition = function () {
            return util_1.extend({}, defaultPosition);
        };
        Draggable.prototype.toggleEvents = function (isUnWire) {
            var ele;
            if (!util_1.isUndefined(this.handle)) {
                ele = dom_2.select(this.handle);
            }
            if (isUnWire) {
                event_handler_1.EventHandler.remove(ele || this.element, browser_1.Browser.touchStartEvent, this.initialize);
            }
            else {
                event_handler_1.EventHandler.add(ele || this.element, browser_1.Browser.touchStartEvent, this.initialize, this);
            }
        };
        Draggable.prototype.initialize = function (evt) {
            this.target = evt.currentTarget;
            if (!util_1.isUndefined(evt.changedTouches)) {
                evt.preventDefault();
            }
            if (this.abort) {
                if (!util_1.isNullOrUndefined(dom_2.closest(evt.target, this.abort))) {
                    return;
                }
            }
            this.element.setAttribute('aria-grabbed', 'true');
            var intCoord = this.getCoordinates(evt);
            this.initialPosition = { x: intCoord.pageX, y: intCoord.pageY };
            if (!this.clone) {
                var pos = this.element.getBoundingClientRect();
                this.relativeXPosition = intCoord.pageX - pos.left;
                this.relativeYPosition = intCoord.pageY - pos.top;
            }
            event_handler_1.EventHandler.add(document, browser_1.Browser.touchMoveEvent, this.intDragStart, this);
            event_handler_1.EventHandler.add(document, browser_1.Browser.touchEndEvent, this.intDestroy, this);
            this.toggleEvents(true);
            document.body.classList.add('e-prevent-select');
            event_handler_1.EventHandler.trigger(document.documentElement, browser_1.Browser.touchStartEvent, evt);
        };
        Draggable.prototype.intDragStart = function (evt) {
            if (!util_1.isUndefined(evt.changedTouches) && (evt.changedTouches.length !== 1)) {
                return;
            }
            var intCordinate = this.getCoordinates(evt);
            var pos;
            var styleProp = getComputedStyle(this.element);
            this.margin = {
                left: parseInt(styleProp.marginLeft, 10),
                top: parseInt(styleProp.marginTop, 10),
                right: parseInt(styleProp.marginRight, 10),
                bottom: parseInt(styleProp.marginBottom, 10),
            };
            var element = this.element;
            if (this.clone && this.dragTarget) {
                var intClosest = dom_2.closest(evt.target, this.dragTarget);
                if (!util_1.isNullOrUndefined(intClosest)) {
                    element = intClosest;
                }
            }
            this.offset = this.calculateParentPosition(element);
            this.position = this.getMousePosition(evt);
            var x = this.initialPosition.x - intCordinate.pageX;
            var y = this.initialPosition.y - intCordinate.pageY;
            var distance = Math.sqrt((x * x) + (y * y));
            if (distance >= this.distance) {
                var ele = this.getHelperElement(evt);
                if (!ele || util_1.isNullOrUndefined(ele)) {
                    return;
                }
                var dragTargetElement = this.helperElement = ele;
                this.parentClientRect = this.calculateParentPosition(dragTargetElement.offsetParent);
                if (this.dragStart) {
                    var curTarget = this.getProperTargetElement(evt);
                    this.trigger('dragStart', { event: evt, element: element, target: curTarget });
                }
                if (this.dragArea) {
                    this.setDragArea();
                }
                else {
                    this.dragLimit = { left: 0, right: 0, bottom: 0, top: 0 };
                    this.borderWidth = { top: 0, left: 0 };
                }
                pos = { left: this.position.left - this.parentClientRect.left, top: this.position.top - this.parentClientRect.top };
                if (this.clone) {
                    this.diffX = this.position.left - this.offset.left;
                    this.diffY = this.position.top - this.offset.top;
                }
                dom_2.setStyleAttribute(dragTargetElement, {
                    position: 'absolute', top: (pos.top - this.diffY) + 'px', left: (pos.left - this.diffX) + 'px'
                });
                event_handler_1.EventHandler.remove(document, browser_1.Browser.touchMoveEvent, this.intDragStart);
                event_handler_1.EventHandler.remove(document, browser_1.Browser.touchEndEvent, this.intDestroy);
                if (dom_1.isVisible(dragTargetElement)) {
                    event_handler_1.EventHandler.add(document, browser_1.Browser.touchMoveEvent, this.intDrag, this);
                    event_handler_1.EventHandler.add(document, browser_1.Browser.touchEndEvent, this.intDragStop, this);
                    this.setGlobalDroppables(false, this.element, dragTargetElement);
                }
                else {
                    document.body.classList.remove('e-prevent-select');
                }
            }
        };
        Draggable.prototype.calculateParentPosition = function (ele) {
            if (util_1.isNullOrUndefined(ele)) {
                return { left: 0, top: 0 };
            }
            var rect = ele.getBoundingClientRect();
            var style = getComputedStyle(ele);
            return {
                left: (rect.left + window.pageXOffset) - parseInt(style.marginLeft, 10),
                top: (rect.top + window.pageYOffset) - parseInt(style.marginTop, 10)
            };
        };
        Draggable.prototype.intDrag = function (evt) {
            if (!util_1.isUndefined(evt.changedTouches) && (evt.changedTouches.length !== 1)) {
                return;
            }
            var left;
            var top;
            this.position = this.getMousePosition(evt);
            var docHeight = this.getDocumentWidthHeight('Height');
            if (docHeight < this.position.top) {
                this.position.top = docHeight;
            }
            var docWidth = this.getDocumentWidthHeight('Width');
            if (docWidth < this.position.left) {
                this.position.left = docWidth;
            }
            if (this.drag) {
                var curTarget = this.getProperTargetElement(evt);
                this.trigger('drag', { event: evt, element: this.element, target: curTarget });
            }
            var eleObj = this.checkTargetElement(evt);
            if (eleObj.target && eleObj.instance) {
                eleObj.instance.intOver(evt, eleObj.target);
                eleObj.instance.dragData[this.scope] = this.droppables[this.scope];
                this.hoverObject = eleObj;
            }
            else if (this.hoverObject) {
                this.hoverObject.instance.intOut(evt, eleObj.target);
                this.hoverObject.instance.dragData[this.scope] = null;
                this.hoverObject = null;
            }
            var helperElement = this.droppables[this.scope].helper;
            this.parentClientRect = this.calculateParentPosition(this.helperElement.offsetParent);
            var tLeft = this.parentClientRect.left;
            var tTop = this.parentClientRect.top;
            var intCoord = this.getCoordinates(evt);
            var pagex = intCoord.pageX;
            var pagey = intCoord.pageY;
            var dLeft = this.position.left - this.diffX;
            var dTop = this.position.top - this.diffY;
            if (this.dragArea) {
                var styles = getComputedStyle(helperElement);
                if (this.pageX !== pagex) {
                    var helperWidth = helperElement.offsetWidth + (parseFloat(styles.marginLeft)
                        + parseFloat(styles.marginRight));
                    if (this.dragLimit.left > dLeft) {
                        left = this.dragLimit.left;
                    }
                    else if (this.dragLimit.right < dLeft + helperWidth) {
                        left = this.dragLimit.right - helperWidth;
                    }
                    else {
                        left = dLeft;
                    }
                }
                if (this.pageY !== pagey) {
                    var helperHeight = helperElement.offsetHeight + (parseFloat(styles.marginTop)
                        + parseFloat(styles.marginBottom));
                    if (this.dragLimit.top > dTop) {
                        top = this.dragLimit.top;
                    }
                    else if (this.dragLimit.bottom < dTop + helperHeight) {
                        top = this.dragLimit.bottom - helperHeight;
                    }
                    else {
                        top = dTop;
                    }
                }
            }
            else {
                left = dLeft;
                top = dTop;
            }
            var iTop = tTop + this.borderWidth.top;
            var iLeft = tLeft + this.borderWidth.left;
            dom_2.setStyleAttribute(helperElement, { top: (top - iTop) + 'px', left: (left - iLeft) + 'px' });
            this.position.left = left;
            this.position.top = top;
            this.pageX = pagex;
            this.pageY = pagey;
        };
        Draggable.prototype.getDocumentWidthHeight = function (str) {
            var docBody = document.body;
            var docEle = document.documentElement;
            var returnValue = Math.max(docBody['scroll' + str], docEle['scroll' + str], docBody['offset' + str], docEle['offset' + str], docEle['client' + str]);
            return returnValue;
        };
        Draggable.prototype.intDragStop = function (evt) {
            if (!util_1.isUndefined(evt.changedTouches) && (evt.changedTouches.length !== 1)) {
                return;
            }
            var type = ['touchend', 'pointerup', 'mouseup'];
            if (type.indexOf(evt.type) !== -1) {
                if (this.dragStop) {
                    var curTarget = this.getProperTargetElement(evt);
                    this.trigger('dragStop', { event: evt, element: this.element, target: curTarget, helper: this.helperElement });
                }
                this.intDestroy(evt);
            }
            else {
                this.element.setAttribute('aria-grabbed', 'false');
            }
            var eleObj = this.checkTargetElement(evt);
            if (eleObj.target && eleObj.instance) {
                eleObj.instance.dragStopCalled = true;
                eleObj.instance.dragData[this.scope] = this.droppables[this.scope];
                eleObj.instance.intDrop(evt, eleObj.target);
            }
            this.setGlobalDroppables(true);
            document.body.classList.remove('e-prevent-select');
        };
        Draggable.prototype.intDestroy = function (evt) {
            this.toggleEvents();
            document.body.classList.remove('e-prevent-select');
            this.element.setAttribute('aria-grabbed', 'false');
            event_handler_1.EventHandler.remove(document, browser_1.Browser.touchMoveEvent, this.intDragStart);
            event_handler_1.EventHandler.remove(document, browser_1.Browser.touchEndEvent, this.intDragStop);
            event_handler_1.EventHandler.remove(document, browser_1.Browser.touchEndEvent, this.intDestroy);
            event_handler_1.EventHandler.remove(document, browser_1.Browser.touchMoveEvent, this.intDrag);
        };
        Draggable.prototype.onPropertyChanged = function (newProp, oldProp) {
        };
        Draggable.prototype.getModuleName = function () {
            return 'draggable';
        };
        Draggable.prototype.setDragArea = function () {
            var eleWidthBound;
            var eleHeightBound;
            var top = 0;
            var left = 0;
            var ele;
            var type = typeof this.dragArea;
            if (type === 'string') {
                ele = dom_2.select(this.dragArea);
            }
            else {
                ele = this.dragArea;
            }
            if (ele) {
                var elementArea = ele.getBoundingClientRect();
                eleWidthBound = elementArea.width ? elementArea.width : elementArea.right - elementArea.left;
                eleHeightBound = elementArea.height ? elementArea.height : elementArea.bottom - elementArea.top;
                var keys = ['Top', 'Left', 'Bottom', 'Right'];
                var styles = getComputedStyle(ele);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var tborder = styles['border' + key + 'Width'];
                    var tpadding = styles['padding' + key];
                    var lowerKey = key.toLowerCase();
                    this.borderWidth[lowerKey] = isNaN(parseFloat(tborder)) ? 0 : parseFloat(tborder);
                    this.padding[lowerKey] = isNaN(parseFloat(tpadding)) ? 0 : parseFloat(tpadding);
                }
                top = elementArea.top;
                left = elementArea.left;
                this.dragLimit.left = left + this.borderWidth.left + this.padding.left;
                this.dragLimit.top = top + this.borderWidth.top + this.padding.top;
                this.dragLimit.right = left + eleWidthBound - (this.borderWidth.right + this.padding.right);
                this.dragLimit.bottom = top + eleHeightBound - (this.borderWidth.bottom + this.padding.bottom);
            }
        };
        Draggable.prototype.getProperTargetElement = function (evt) {
            var intCoord = this.getCoordinates(evt);
            var ele;
            if (evt.target === this.helperElement || evt.type.indexOf('touch') !== -1) {
                this.helperElement.style.display = 'none';
                ele = document.elementFromPoint(intCoord.clientX, intCoord.clientY);
                this.helperElement.style.display = '';
            }
            else {
                ele = evt.target;
            }
            return ele;
        };
        Draggable.prototype.getMousePosition = function (evt) {
            var intCoord = this.getCoordinates(evt);
            var pageX = this.clone ? intCoord.pageX : intCoord.pageX - this.relativeXPosition;
            var pageY = this.clone ? intCoord.pageY : intCoord.pageY - this.relativeYPosition;
            return {
                left: pageX - (this.margin.left + this.cursorAt.left),
                top: pageY - (this.margin.top + this.cursorAt.top)
            };
        };
        Draggable.prototype.getCoordinates = function (evt) {
            if (evt.type.indexOf('touch') > -1) {
                return evt.changedTouches[0];
            }
            return evt;
        };
        Draggable.prototype.getHelperElement = function (evt) {
            var element;
            if (this.clone) {
                if (this.helper) {
                    element = this.helper({ sender: evt, element: this.target });
                }
                else {
                    element = dom_2.createElement('div', { className: 'e-drag-helper e-block-touch', innerHTML: 'Draggable' });
                    document.body.appendChild(element);
                }
            }
            else {
                element = this.element;
            }
            return element;
        };
        Draggable.prototype.setGlobalDroppables = function (reset, drag, helper) {
            this.droppables[this.scope] = reset ? null : {
                draggable: drag,
                helper: helper
            };
        };
        Draggable.prototype.checkTargetElement = function (evt) {
            var target = this.getProperTargetElement(evt);
            if (this.helperElement && util_1.compareElementParent(target, this.helperElement)) {
                this.helperElement.style.display = 'none';
                var cord = this.getCoordinates(evt);
                target = document.elementFromPoint(cord.clientX, cord.clientY);
                this.helperElement.style.display = '';
            }
            var dropIns = this.getDropInstance(target);
            if (!dropIns && target && !util_1.isNullOrUndefined(target.parentNode)) {
                var parent_1 = dom_2.closest(target.parentNode, '.e-droppable') || target.parentElement;
                if (parent_1) {
                    dropIns = this.getDropInstance(parent_1);
                }
            }
            return { target: target, instance: dropIns };
        };
        Draggable.prototype.getDropInstance = function (ele) {
            var name = 'getModuleName';
            var drop;
            var eleInst = ele && ele.ej2_instances;
            if (eleInst) {
                for (var _i = 0, eleInst_1 = eleInst; _i < eleInst_1.length; _i++) {
                    var inst = eleInst_1[_i];
                    if (inst[name]() === 'droppable') {
                        drop = inst;
                        break;
                    }
                }
            }
            return drop;
        };
        Draggable.prototype.destroy = function () {
            this.toggleEvents(true);
            _super.prototype.destroy.call(this);
        };
        return Draggable;
    }(base_1.Base));
    __decorate([
        notify_property_change_1.Complex({}, Position)
    ], Draggable.prototype, "cursorAt", void 0);
    __decorate([
        notify_property_change_1.Property(true)
    ], Draggable.prototype, "clone", void 0);
    __decorate([
        notify_property_change_1.Property()
    ], Draggable.prototype, "dragArea", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], Draggable.prototype, "drag", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], Draggable.prototype, "dragStart", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], Draggable.prototype, "dragStop", void 0);
    __decorate([
        notify_property_change_1.Property(1)
    ], Draggable.prototype, "distance", void 0);
    __decorate([
        notify_property_change_1.Property()
    ], Draggable.prototype, "handle", void 0);
    __decorate([
        notify_property_change_1.Property()
    ], Draggable.prototype, "abort", void 0);
    __decorate([
        notify_property_change_1.Property()
    ], Draggable.prototype, "helper", void 0);
    __decorate([
        notify_property_change_1.Property('default')
    ], Draggable.prototype, "scope", void 0);
    __decorate([
        notify_property_change_1.Property('')
    ], Draggable.prototype, "dragTarget", void 0);
    Draggable = Draggable_1 = __decorate([
        notify_property_change_1.NotifyPropertyChanges
    ], Draggable);
    exports.Draggable = Draggable;
    var Draggable_1;
});
