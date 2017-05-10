define(["require", "exports", "./util"], function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getObject(instance, curKey, defaultValue, type) {
        if (!instance.properties.hasOwnProperty(curKey)) {
            instance.properties[curKey] = util_1.createInstance(type, [instance, curKey, defaultValue]);
        }
        return instance.properties[curKey];
    }
    function getObjectArray(instance, curKey, defaultValue, type, isSetter) {
        var result = [];
        var len = defaultValue.length;
        for (var i = 0; i < len; i++) {
            if (isSetter) {
                var inst = util_1.createInstance(type, [instance, curKey, {}, true]);
                inst.setProperties(defaultValue[i], true);
                result.push(inst);
            }
            else {
                result.push(util_1.createInstance(type, [instance, curKey, defaultValue[i], true]));
            }
        }
        return result;
    }
    function propertyGetter(defaultValue, curKey) {
        return function () {
            if (!this.properties.hasOwnProperty(curKey)) {
                this.properties[curKey] = defaultValue;
            }
            return this.properties[curKey];
        };
    }
    function propertySetter(defaultValue, curKey) {
        return function (newValue) {
            if (this.properties[curKey] !== newValue) {
                var oldVal = this.properties.hasOwnProperty(curKey) ? this.properties[curKey] : defaultValue;
                this.saveChanges(curKey, newValue, oldVal);
                this.properties[curKey] = newValue;
            }
        };
    }
    function complexGetter(defaultValue, curKey, type) {
        return function () {
            return getObject(this, curKey, defaultValue, type);
        };
    }
    function complexSetter(defaultValue, curKey, type) {
        return function (newValue) {
            getObject(this, curKey, defaultValue, type).setProperties(newValue);
        };
    }
    function complexArrayGetter(defaultValue, curKey, type) {
        return function () {
            if (!this.properties.hasOwnProperty(curKey)) {
                var defCollection = getObjectArray(this, curKey, defaultValue, type);
                this.properties[curKey] = defCollection;
            }
            return this.properties[curKey];
        };
    }
    function complexArraySetter(defaultValue, curKey, type) {
        return function (newValue) {
            var oldValueCollection = getObjectArray(this, curKey, defaultValue, type);
            var newValCollection = getObjectArray(this, curKey, newValue, type, true);
            this.saveChanges(curKey, newValCollection, oldValueCollection);
            this.properties[curKey] = newValCollection;
        };
    }
    function Property(defaultValue) {
        return function (target, key) {
            var propertyDescriptor = {
                set: propertySetter(defaultValue, key),
                get: propertyGetter(defaultValue, key),
                enumerable: true,
                configurable: true
            };
            Object.defineProperty(target, key, propertyDescriptor);
            addPropertyCollection(target, key, 'prop', defaultValue);
        };
    }
    exports.Property = Property;
    function Complex(defaultValue, type) {
        return function (target, key) {
            var propertyDescriptor = {
                set: complexSetter(defaultValue, key, type),
                get: complexGetter(defaultValue, key, type),
                enumerable: true,
                configurable: true
            };
            Object.defineProperty(target, key, propertyDescriptor);
            addPropertyCollection(target, key, 'complexProp', defaultValue, type);
        };
    }
    exports.Complex = Complex;
    function Collection(defaultValue, type) {
        return function (target, key) {
            var propertyDescriptor = {
                set: complexArraySetter(defaultValue, key, type),
                get: complexArrayGetter(defaultValue, key, type),
                enumerable: true,
                configurable: true
            };
            Object.defineProperty(target, key, propertyDescriptor);
            addPropertyCollection(target, key, 'colProp', defaultValue, type);
        };
    }
    exports.Collection = Collection;
    function Event() {
        return function (target, key) {
            var eventDescriptor = {
                set: function (newValue) {
                    var oldValue = this.properties[key];
                    if (oldValue !== newValue) {
                        var finalContext = getParentContext(this, key);
                        if (util_1.isUndefined(oldValue) === false) {
                            finalContext.context.removeEventListener(finalContext.prefix, oldValue);
                        }
                        finalContext.context.addEventListener(finalContext.prefix, newValue);
                        this.properties[key] = newValue;
                    }
                },
                get: propertyGetter(undefined, key),
                enumerable: true,
                configurable: true
            };
            Object.defineProperty(target, key, eventDescriptor);
            addPropertyCollection(target, key, 'event');
        };
    }
    exports.Event = Event;
    function NotifyPropertyChanges(classConstructor) {
    }
    exports.NotifyPropertyChanges = NotifyPropertyChanges;
    function addPropertyCollection(target, key, propertyType, defaultValue, type) {
        if (util_1.isUndefined(target.propList)) {
            target.propList = {
                props: [],
                complexProps: [],
                colProps: [],
                events: [],
                propNames: [],
                complexPropNames: [],
                colPropNames: [],
                eventNames: []
            };
        }
        target.propList[propertyType + 's'].push({
            propertyName: key,
            defaultValue: defaultValue,
            type: type
        });
        target.propList[propertyType + 'Names'].push(key);
    }
    function getBuilderProperties(component) {
        if (util_1.isUndefined(component.prototype.builderObject)) {
            component.prototype.builderObject = {
                properties: {}, propCollections: [], add: function () {
                    this.isPropertyArray = true;
                    this.propCollections.push(util_1.extend({}, this.properties, {}));
                }
            };
            var rex = /complex/;
            for (var _i = 0, _a = Object.keys(component.prototype.propList); _i < _a.length; _i++) {
                var key = _a[_i];
                var _loop_1 = function (prop) {
                    if (rex.test(key)) {
                        component.prototype.builderObject[prop.propertyName] = function (value) {
                            var childType = {};
                            util_1.merge(childType, getBuilderProperties(prop.type));
                            value(childType);
                            var tempValue;
                            if (!childType.isPropertyArray) {
                                tempValue = util_1.extend({}, childType.properties, {});
                            }
                            else {
                                tempValue = childType.propCollections;
                            }
                            this.properties[prop.propertyName] = tempValue;
                            childType.properties = {};
                            childType.propCollections = [];
                            childType.isPropertyArray = false;
                            return this;
                        };
                    }
                    else {
                        component.prototype.builderObject[prop.propertyName] = function (value) {
                            this.properties[prop.propertyName] = value;
                            return this;
                        };
                    }
                };
                for (var _b = 0, _c = component.prototype.propList[key]; _b < _c.length; _b++) {
                    var prop = _c[_b];
                    _loop_1(prop);
                }
            }
        }
        return component.prototype.builderObject;
    }
    function CreateBuilder(component) {
        var builderFunction = function (element) {
            this.element = element;
            return this;
        };
        var instanceFunction = function (element) {
            if (!builderFunction.prototype.hasOwnProperty('create')) {
                builderFunction.prototype = getBuilderProperties(component);
                builderFunction.prototype.create = function () {
                    var temp = util_1.extend({}, {}, this.properties);
                    this.properties = {};
                    return new component(temp, this.element);
                };
            }
            return new builderFunction(element);
        };
        return instanceFunction;
    }
    exports.CreateBuilder = CreateBuilder;
    function getParentContext(context, prefix) {
        if (context.hasOwnProperty('parentObj') === false) {
            return { context: context, prefix: prefix };
        }
        else {
            var curText = util_1.getValue('propName', context);
            if (curText) {
                prefix = curText + '-' + prefix;
            }
            return getParentContext(util_1.getValue('parentObj', context), prefix);
        }
    }
});
