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
define(["require", "exports", "./util", "./module-loader", "./base", "./observer", "./child-property", "./notify-property-change", "./internationalization"], function (require, exports, util_1, module_loader_1, base_1, observer_1, child_property_1, notify_property_change_1, internationalization_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component(options, selector) {
            var _this = _super.call(this, options, selector) || this;
            _this.needsID = false;
            if (util_1.isNullOrUndefined(_this.enableRtl)) {
                _this.setProperties({ 'enableRtl': internationalization_1.rightToLeft }, true);
            }
            if (util_1.isNullOrUndefined(_this.locale)) {
                _this.setProperties({ 'locale': internationalization_1.defaultCulture }, true);
            }
            _this.moduleLoader = new module_loader_1.ModuleLoader(_this);
            _this.localObserver = new observer_1.Observer(_this);
            _this.detectFunction = new Function('args', 'var prop = Object.keys(args); if(prop.length){this[prop[0]] = args[prop[0]];}');
            internationalization_1.onIntlChange.on('notifyExternalChange', _this.detectFunction, _this);
            if (_this.enablePersistence) {
                window.addEventListener('unload', _this.setPersistData.bind(_this));
            }
            if (!util_1.isUndefined(selector)) {
                _this.appendTo();
            }
            return _this;
        }
        Component.prototype.requiredModules = function () {
            return [];
        };
        ;
        Component.prototype.destroy = function () {
            this.trigger('destroyed', { cancel: false });
            _super.prototype.destroy.call(this);
            internationalization_1.onIntlChange.off('notifyExternalChange', this.detectFunction);
            this.moduleLoader.clean();
            this.localObserver.destroy();
            if (this.enablePersistence) {
                this.setPersistData();
            }
        };
        Component.prototype.refresh = function () {
            this.clearChanges();
            this.preRender();
            this.injectModules();
            this.render();
        };
        Component.prototype.appendTo = function (selector) {
            if (!util_1.isNullOrUndefined(selector) && typeof (selector) === 'string') {
                this.element = document.querySelector(selector);
            }
            else if (!util_1.isNullOrUndefined(selector)) {
                this.element = selector;
            }
            if (!util_1.isNullOrUndefined(this.element)) {
                if (this.needsID && !this.element.id) {
                    this.element.id = util_1.getUniqueID(this.getModuleName());
                }
                this.isProtectedOnChange = false;
                var inst = util_1.getValue('ej2_instances', this.element);
                if (!inst || inst.indexOf(this) === -1) {
                    _super.prototype.addInstance.call(this);
                }
                this.preRender();
                if (this.enablePersistence) {
                    this.mergePersistData();
                }
                this.injectModules();
                this.render();
                this.trigger('created');
            }
        };
        Component.prototype.dataBind = function () {
            this.injectModules();
            _super.prototype.dataBind.call(this);
        };
        ;
        Component.prototype.on = function (event, handler, context) {
            if (typeof event === 'string') {
                this.localObserver.on(event, handler, context);
            }
            else {
                for (var _i = 0, event_1 = event; _i < event_1.length; _i++) {
                    var arg = event_1[_i];
                    this.localObserver.on(arg.event, arg.handler, arg.context);
                }
            }
        };
        Component.prototype.off = function (event, handler) {
            if (typeof event === 'string') {
                this.localObserver.off(event, handler);
            }
            else {
                for (var _i = 0, event_2 = event; _i < event_2.length; _i++) {
                    var arg = event_2[_i];
                    this.localObserver.off(arg.event, arg.handler);
                }
            }
        };
        Component.prototype.notify = function (property, argument) {
            this.localObserver.notify(property, argument);
        };
        Component.prototype.getInjectedModules = function () {
            return this.injectedModules;
        };
        ;
        Component.Inject = function () {
            var moduleList = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                moduleList[_i] = arguments[_i];
            }
            if (!this.prototype.injectedModules) {
                this.prototype.injectedModules = [];
            }
            for (var i = 0; i < moduleList.length; i++) {
                if (this.prototype.injectedModules.indexOf(moduleList[i]) === -1) {
                    this.prototype.injectedModules.push(moduleList[i]);
                }
            }
        };
        Component.prototype.injectModules = function () {
            if (this.injectedModules && this.injectedModules.length) {
                this.moduleLoader.inject(this.requiredModules(), this.injectedModules);
            }
        };
        Component.prototype.mergePersistData = function () {
            var data = window.localStorage.getItem(this.getModuleName() + this.element.id);
            if (!(util_1.isNullOrUndefined(data) || (data === ''))) {
                this.setProperties(JSON.parse(data), true);
            }
        };
        Component.prototype.setPersistData = function () {
            window.localStorage.setItem(this.getModuleName() + this.element.id, this.getPersistData());
        };
        Component.prototype.addOnPersist = function (options) {
            var _this = this;
            var persistObj = {};
            for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                var key = options_1[_i];
                var objValue = void 0;
                objValue = util_1.getValue(key, this);
                if (!util_1.isUndefined(objValue)) {
                    util_1.setValue(key, this.getActualProperties(objValue), persistObj);
                }
            }
            return JSON.stringify(persistObj, function (key, value) {
                return _this.getActualProperties(value);
            });
        };
        Component.prototype.getActualProperties = function (obj) {
            if (obj instanceof child_property_1.ChildProperty) {
                return util_1.getValue('properties', obj);
            }
            else {
                return obj;
            }
        };
        Component.prototype.ignoreOnPersist = function (options) {
            return JSON.stringify(this.iterateJsonProperties(this.properties, options));
        };
        Component.prototype.iterateJsonProperties = function (obj, ignoreList) {
            var newObj = {};
            var _loop_1 = function (key) {
                if (ignoreList.indexOf(key) === -1) {
                    var value = obj[key];
                    if (typeof value === 'object' && !(value instanceof Array)) {
                        var newList = ignoreList.filter(function (str) {
                            return new RegExp(key + '.').test(str);
                        }).map(function (str) {
                            return str.replace(key + '.', '');
                        });
                        newObj[key] = this_1.iterateJsonProperties(this_1.getActualProperties(value), newList);
                    }
                    else {
                        newObj[key] = value;
                    }
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
                var key = _a[_i];
                _loop_1(key);
            }
            return newObj;
        };
        return Component;
    }(base_1.Base));
    __decorate([
        notify_property_change_1.Property(false)
    ], Component.prototype, "enablePersistence", void 0);
    __decorate([
        notify_property_change_1.Property()
    ], Component.prototype, "enableRtl", void 0);
    __decorate([
        notify_property_change_1.Property()
    ], Component.prototype, "locale", void 0);
    Component = __decorate([
        notify_property_change_1.NotifyPropertyChanges
    ], Component);
    exports.Component = Component;
});
