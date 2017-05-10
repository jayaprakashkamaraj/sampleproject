define(["require", "exports", "./util", "./dom", "./observer"], function (require, exports, util_1, dom_1, observer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Base = (function () {
        function Base(options, element) {
            this.isProtectedOnChange = true;
            this.properties = {};
            this.changedProperties = {};
            this.oldProperties = {};
            this.finalUpdate = function () { };
            this.childChangedProperties = {};
            this.modelObserver = new observer_1.Observer(this);
            if (!util_1.isUndefined(element)) {
                if ('string' === typeof (element)) {
                    this.element = document.querySelector(element);
                }
                else {
                    this.element = element;
                }
                if (!util_1.isNullOrUndefined(this.element)) {
                    this.isProtectedOnChange = false;
                    this.addInstance();
                }
            }
            if (!util_1.isUndefined(options)) {
                this.setProperties(options, true);
            }
            this.isDestroyed = false;
        }
        Base.prototype.setProperties = function (prop, muteOnChange) {
            var prevDetection = this.isProtectedOnChange;
            this.isProtectedOnChange = !!muteOnChange;
            util_1.merge(this, prop);
            if (muteOnChange !== true) {
                util_1.merge(this.changedProperties, prop);
                this.dataBind();
            }
            this.finalUpdate();
            this.changedProperties = {};
            this.oldProperties = {};
            this.isProtectedOnChange = prevDetection;
        };
        ;
        Base.callChildDataBind = function (obj, parent) {
            var keys = Object.keys(obj);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (parent[key] instanceof Array) {
                    for (var _a = 0, _b = parent[key]; _a < _b.length; _a++) {
                        var obj_1 = _b[_a];
                        if (obj_1.dataBind !== undefined) {
                            obj_1.dataBind();
                        }
                    }
                }
                else {
                    parent[key].dataBind();
                }
            }
        };
        Base.prototype.clearChanges = function () {
            this.finalUpdate();
            this.changedProperties = {};
            this.oldProperties = {};
            this.childChangedProperties = {};
        };
        Base.prototype.dataBind = function () {
            Base.callChildDataBind(this.childChangedProperties, this);
            if (Object.getOwnPropertyNames(this.changedProperties).length) {
                var prevDetection = this.isProtectedOnChange;
                var newChanges = this.changedProperties;
                var oldChanges = this.oldProperties;
                this.clearChanges();
                this.isProtectedOnChange = true;
                this.onPropertyChanged(newChanges, oldChanges);
                this.isProtectedOnChange = prevDetection;
            }
        };
        ;
        Base.prototype.saveChanges = function (key, newValue, oldValue) {
            if (this.isProtectedOnChange) {
                return;
            }
            this.oldProperties[key] = oldValue;
            this.changedProperties[key] = newValue;
            this.finalUpdate();
            this.finalUpdate = util_1.setImmediate(this.dataBind.bind(this));
        };
        ;
        Base.prototype.addEventListener = function (eventName, handler) {
            this.modelObserver.on(eventName, handler);
        };
        Base.prototype.removeEventListener = function (eventName, handler) {
            this.modelObserver.off(eventName, handler);
        };
        Base.prototype.trigger = function (eventName, eventProp) {
            if (this.isDestroyed !== true) {
                var prevDetection = this.isProtectedOnChange;
                this.isProtectedOnChange = false;
                this.modelObserver.notify(eventName, eventProp);
                this.isProtectedOnChange = prevDetection;
            }
        };
        Base.prototype.addInstance = function () {
            var moduleClass = 'e-' + this.getModuleName().toLowerCase();
            dom_1.addClass([this.element], ['e-control', moduleClass]);
            if (!util_1.isNullOrUndefined(this.element.ej2_instances)) {
                this.element.ej2_instances.push(this);
            }
            else {
                util_1.setValue('ej2_instances', [this], this.element);
            }
        };
        Base.prototype.destroy = function () {
            var _this = this;
            this.element.ej2_instances =
                this.element.ej2_instances.filter(function (i) { return i !== _this; });
            dom_1.removeClass([this.element], ['e-' + this.getModuleName()]);
            if (this.element.ej2_instances.length === 0) {
                dom_1.removeClass([this.element], ['e-control']);
            }
            this.clearChanges();
            this.modelObserver.destroy();
            this.isDestroyed = true;
        };
        return Base;
    }());
    exports.Base = Base;
});
