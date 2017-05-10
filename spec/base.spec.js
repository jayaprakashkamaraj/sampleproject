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
define(["require", "exports", "../src/base", "../src/notify-property-change", "../src/dom"], function (require, exports, base_1, notify_property_change_1, dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DemoClass = (function (_super) {
        __extends(DemoClass, _super);
        function DemoClass(element) {
            var _this = _super.call(this, {}, element) || this;
            _this.testFunction = function () { };
            return _this;
        }
        DemoClass.prototype.getModuleName = function () {
            return 'demolib';
        };
        DemoClass.prototype.bind = function () {
        };
        DemoClass.prototype.onPropertyChanged = function (newProp, oldProp) {
            var keys = Object.keys(newProp);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var prop = keys_1[_i];
                switch (prop) {
                    case 'value':
                        this.text = this.value;
                        this.trigger('test', {});
                        break;
                }
            }
            this.testFunction(newProp, oldProp);
        };
        DemoClass.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return DemoClass;
    }(base_1.Base));
    __decorate([
        notify_property_change_1.Property('Value')
    ], DemoClass.prototype, "text", void 0);
    __decorate([
        notify_property_change_1.Property('Property')
    ], DemoClass.prototype, "value", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], DemoClass.prototype, "test", void 0);
    DemoClass = __decorate([
        notify_property_change_1.NotifyPropertyChanges
    ], DemoClass);
    var ele = dom_1.createElement('div', { id: 'singleEle', styles: 'height:100px;width:100px;' });
    var objClass = new DemoClass();
    describe('Library', function () {
        describe('base method availability', function () {
            it('addEvent Listener', function () {
                expect(typeof objClass.addEventListener).toEqual('function');
            });
            it('removeEvent Listener', function () {
                expect(typeof objClass.removeEventListener).toEqual('function');
            });
        });
        describe('element binding', function () {
            it('bind element in constructor', function () {
                var obj = new DemoClass(ele);
                expect(obj.element).toEqual(ele);
            });
            it(' destroy property', function () {
                var obj = new DemoClass(ele);
                expect(obj.isDestroyed).toEqual(false);
                obj.destroy();
                expect(obj.isDestroyed).toEqual(true);
            });
        });
        describe('event binding', function () {
            var propspy;
            var externalHandler;
            beforeEach(function () {
                propspy = jasmine.createSpy('functionSpy');
                externalHandler = jasmine.createSpy('temp');
            });
            it('addEventListener using property and external adding ', function () {
                var obj = new DemoClass(ele);
                obj.test = propspy;
                obj.addEventListener('test', externalHandler);
                obj.trigger('test');
                expect(propspy).toHaveBeenCalledTimes(1);
                expect(externalHandler).toHaveBeenCalled();
            });
            it('removeEventListener using  property value and external removal', function () {
                var obj = new DemoClass(ele);
                obj.test = propspy;
                var spy2 = jasmine.createSpy('temp');
                obj.test = undefined;
                obj.addEventListener('test', spy2);
                obj.removeEventListener('test', spy2);
                obj.trigger('test');
                expect(propspy).not.toHaveBeenCalled();
                expect(spy2).not.toHaveBeenCalled();
            });
            it('trigger event instance method', function () {
                var obj = new DemoClass(ele);
                obj.addEventListener('test', propspy);
                obj.trigger('test', { arg1: 'val1' });
                expect(propspy).toHaveBeenCalled();
            });
        });
        describe('Root class declaration', function () {
            it(' test module class name at class instance creation', function () {
                var obj = new DemoClass(ele);
                expect(obj.element.className.indexOf('e-control e-demolib')).toEqual(0);
            });
            it(' test module class name at class instance destroy', function () {
                var ele = dom_1.createElement('div', { id: 'element' });
                var obj = new DemoClass(ele);
                obj.destroy();
                expect(obj.element.className.indexOf('e-control e-demolib')).toEqual(-1);
            });
        });
        describe('check whether the notify trigger after component destroyed', function () {
            var destInst = new DemoClass(ele);
            it('check destroyed before notify', function () {
                var spy = jasmine.createSpy('test');
                destInst.test = spy;
                destInst.destroy();
                destInst.trigger('test');
                expect(spy).not.toHaveBeenCalled();
            });
        });
        describe('change detection inside of onproperty', function () {
            it('inside property change', function () {
                var obj = new DemoClass(ele);
                spyOn(obj, 'testFunction');
                obj.value = 'newVal';
                obj.dataBind();
                obj.dataBind();
                expect(obj.testFunction).toHaveBeenCalledTimes(1);
            });
            it('inside property change', function () {
                var obj = new DemoClass(ele);
                obj.test = function (arg) {
                    obj.value = 'ValueAdded';
                };
                spyOn(obj, 'testFunction');
                obj.value = 'newVal';
                obj.dataBind();
                obj.dataBind();
                expect(obj.testFunction).toHaveBeenCalledTimes(2);
            });
        });
    });
});
