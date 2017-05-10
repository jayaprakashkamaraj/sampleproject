define(["require", "exports", "./util", "./base"], function (require, exports, util_1, base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChildProperty = (function () {
        function ChildProperty(parent, propName, defaultValue, isArray) {
            this.properties = {};
            this.changedProperties = {};
            this.childChangedProperties = {};
            this.oldProperties = {};
            this.finalUpdate = function () { };
            this.callChildDataBind = util_1.getValue('callChildDataBind', base_1.Base);
            this.parentObj = parent;
            this.controlParent = this.parentObj.controlParent || this.parentObj;
            this.propName = propName;
            this.setProperties(defaultValue, true);
            this.isParentArray = isArray;
        }
        ChildProperty.prototype.updateChange = function (val, propName) {
            if (val === true) {
                this.parentObj.childChangedProperties[propName] = val;
            }
            else {
                delete this.parentObj.childChangedProperties[propName];
            }
            if (this.parentObj.updateChange) {
                this.parentObj.updateChange(val, this.parentObj.propName);
            }
        };
        ChildProperty.prototype.updateTimeOut = function () {
            if (this.parentObj.updateTimeOut) {
                this.parentObj.finalUpdate();
                this.parentObj.updateTimeOut();
            }
            else {
                this.parentObj.finalUpdate = util_1.setImmediate(this.parentObj.dataBind.bind(this.parentObj));
            }
        };
        ChildProperty.prototype.clearChanges = function () {
            this.finalUpdate();
            this.updateChange(false, this.propName);
            this.oldProperties = {};
            this.changedProperties = {};
        };
        ChildProperty.prototype.setProperties = function (prop, muteOnChange) {
            if (muteOnChange === true) {
                util_1.merge(this, prop);
                this.updateChange(false, this.propName);
                this.clearChanges();
            }
            else {
                util_1.merge(this, prop);
            }
        };
        ChildProperty.prototype.dataBind = function () {
            this.callChildDataBind(this.childChangedProperties, this);
            if (this.isParentArray) {
                var curIndex = this.parentObj[this.propName].indexOf(this);
                if (Object.keys(this.changedProperties).length) {
                    util_1.setValue(this.propName + '.' + curIndex, this.changedProperties, this.parentObj.changedProperties);
                    util_1.setValue(this.propName + '.' + curIndex, this.oldProperties, this.parentObj.oldProperties);
                }
            }
            else {
                this.parentObj.changedProperties[this.propName] = this.changedProperties;
                this.parentObj.oldProperties[this.propName] = this.oldProperties;
            }
            this.clearChanges();
        };
        ChildProperty.prototype.saveChanges = function (key, newValue, oldValue) {
            if (this.controlParent.isProtectedOnChange) {
                return;
            }
            this.oldProperties[key] = oldValue;
            this.changedProperties[key] = newValue;
            this.updateChange(true, this.propName);
            this.finalUpdate();
            this.updateTimeOut();
        };
        return ChildProperty;
    }());
    exports.ChildProperty = ChildProperty;
});
