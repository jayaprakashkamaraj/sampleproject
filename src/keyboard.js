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
define(["require", "exports", "./notify-property-change", "./base"], function (require, exports, notify_property_change_1, base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var keyCode = {
        'backspace': 8,
        'tab': 9,
        'enter': 13,
        'shift': 16,
        'control': 17,
        'alt': 18,
        'pause': 19,
        'capslock': 20,
        'space': 22,
        'escape': 27,
        'pageup': 33,
        'pagedown': 34,
        'end': 35,
        'home': 36,
        'leftarrow': 37,
        'uparrow': 38,
        'rightarrow': 39,
        'downarrow': 40,
        'insert': 45,
        'delete': 46,
        'f1': 112,
        'f2': 113,
        'f3': 114,
        'f4': 115,
        'f5': 116,
        'f6': 117,
        'f7': 118,
        'f8': 119,
        'f9': 120,
        'f10': 121,
        'f11': 122,
        'f12': 123,
        'semicolon': 186,
        'plus': 187,
        'comma': 188,
        'minus': 189,
        'dot': 190,
        'forwardslash': 191,
        'graveaccent': 192,
        'openbracket': 219,
        'backslash': 220,
        'closebracket': 221,
        'singlequote': 222
    };
    var KeyboardEvents = KeyboardEvents_1 = (function (_super) {
        __extends(KeyboardEvents, _super);
        function KeyboardEvents(element, options) {
            var _this = _super.call(this, options, element) || this;
            _this.keyPressHandler = function (e) {
                var isAltKey = e.altKey;
                var isCtrlKey = e.ctrlKey;
                var isShiftKey = e.shiftKey;
                var curkeyCode = e.which;
                var keys = Object.keys(_this.keyConfigs);
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var key = keys_1[_i];
                    var rKeyObj = KeyboardEvents_1.getKeyConfigData(_this.keyConfigs[key]);
                    if (isAltKey === rKeyObj.altKey && isCtrlKey === rKeyObj.ctrlKey &&
                        isShiftKey === rKeyObj.shiftKey && curkeyCode === rKeyObj.keyCode) {
                        e.action = key;
                        if (_this.keyAction) {
                            _this.keyAction(e);
                        }
                    }
                }
            };
            _this.bind();
            return _this;
        }
        KeyboardEvents.prototype.destroy = function () {
            this.unwireEvents();
            _super.prototype.destroy.call(this);
        };
        KeyboardEvents.prototype.onPropertyChanged = function (newProp, oldProp) {
        };
        ;
        KeyboardEvents.prototype.bind = function () {
            this.wireEvents();
        };
        KeyboardEvents.prototype.getModuleName = function () {
            return 'keyboard';
        };
        KeyboardEvents.prototype.wireEvents = function () {
            this.element.addEventListener(this.eventName, this.keyPressHandler);
        };
        KeyboardEvents.prototype.unwireEvents = function () {
            this.element.removeEventListener(this.eventName, this.keyPressHandler);
        };
        KeyboardEvents.getKeyConfigData = function (config) {
            if (config in this.configCache) {
                return this.configCache[config];
            }
            var keys = config.toLowerCase().split('+');
            var keyData = {
                altKey: (keys.indexOf('alt') !== -1 ? true : false),
                ctrlKey: (keys.indexOf('ctrl') !== -1 ? true : false),
                shiftKey: (keys.indexOf('shift') !== -1 ? true : false),
                keyCode: null
            };
            if (keys[keys.length - 1].length > 1 && !!Number(keys[keys.length - 1])) {
                keyData.keyCode = Number(keys[keys.length - 1]);
            }
            else {
                keyData.keyCode = KeyboardEvents_1.getKeyCode(keys[keys.length - 1]);
            }
            KeyboardEvents_1.configCache[config] = keyData;
            return keyData;
        };
        KeyboardEvents.getKeyCode = function (keyVal) {
            return keyCode[keyVal] || keyVal.toUpperCase().charCodeAt(0);
        };
        return KeyboardEvents;
    }(base_1.Base));
    KeyboardEvents.configCache = {};
    __decorate([
        notify_property_change_1.Property({})
    ], KeyboardEvents.prototype, "keyConfigs", void 0);
    __decorate([
        notify_property_change_1.Property('keyup')
    ], KeyboardEvents.prototype, "eventName", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], KeyboardEvents.prototype, "keyAction", void 0);
    KeyboardEvents = KeyboardEvents_1 = __decorate([
        notify_property_change_1.NotifyPropertyChanges
    ], KeyboardEvents);
    exports.KeyboardEvents = KeyboardEvents;
    var KeyboardEvents_1;
});
