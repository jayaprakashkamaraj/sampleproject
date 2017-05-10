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
define(["require", "exports", "./dom", "./base", "./util", "./event-handler", "./notify-property-change"], function (require, exports, dom_1, base_1, util_1, event_handler_1, notify_property_change_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ErrorOption;
    (function (ErrorOption) {
        ErrorOption[ErrorOption["Message"] = 0] = "Message";
        ErrorOption[ErrorOption["Label"] = 1] = "Label";
    })(ErrorOption = exports.ErrorOption || (exports.ErrorOption = {}));
    var FormValidator = FormValidator_1 = (function (_super) {
        __extends(FormValidator, _super);
        function FormValidator(element, options) {
            var _this = _super.call(this, options, element) || this;
            _this.validated = [];
            _this.errorRules = [];
            _this.allowSubmit = false;
            _this.required = 'required';
            _this.infoElement = null;
            _this.inputElement = null;
            _this.selectQuery = 'input:not([type=reset]):not([type=button]), select, textarea';
            _this.defaultMessages = {
                required: 'This field is required.',
                email: 'Please enter a valid email address.',
                url: 'Please enter a valid URL.',
                date: 'Please enter a valid date.',
                dateIso: 'Please enter a valid date ( ISO ).',
                number: 'Please enter a valid number.',
                digits: 'Please enter only digits.',
                maxLength: 'Please enter no more than {0} characters.',
                minLength: 'Please enter at least {0} characters.',
                rangeLength: 'Please enter a value between {0} and {1} characters long.',
                range: 'Please enter a value between {0} and {1}.',
                max: 'Please enter a value less than or equal to {0}.',
                min: 'Please enter a value greater than or equal to {0}.',
                regex: 'Please enter a correct value.'
            };
            element = typeof element === 'string' ? dom_1.select(element, document) : element;
            if (_this.element != null) {
                _this.element.setAttribute('novalidate', '');
                _this.wireEvents();
            }
            else {
                return undefined;
            }
            return _this;
        }
        FormValidator.prototype.addRules = function (name, rules) {
            if (this.rules.hasOwnProperty(name)) {
                util_1.extend(this.rules[name], rules, {});
            }
            else {
                this.rules[name] = rules;
            }
        };
        FormValidator.prototype.removeRules = function (name, rules) {
            if (!name && !rules) {
                this.rules = {};
            }
            else if (this.rules[name] && !rules) {
                delete this.rules[name];
            }
            else if (!util_1.isNullOrUndefined(this.rules[name] && rules)) {
                for (var i = 0; i < rules.length; i++) {
                    delete this.rules[name][rules[i]];
                }
            }
            else {
                return;
            }
        };
        FormValidator.prototype.validate = function (selected) {
            if (selected) {
                this.validateRules(selected);
            }
            else {
                var rules = Object.keys(this.rules);
                for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                    var name_1 = rules_1[_i];
                    if (this.rules[name_1][this.required]) {
                        this.validateRules(name_1);
                    }
                }
            }
            return this.errorRules.length === 0;
        };
        FormValidator.prototype.reset = function () {
            this.errorRules = [];
            this.validated = [];
            this.element.reset();
            var elements = dom_1.selectAll(this.selectQuery, this.element);
            for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                var element = elements_1[_i];
                var input = element;
                input.removeAttribute('aria-invalid');
                input.classList.remove(this.errorClass);
                if (input.name.length > 0) {
                    this.getInputElement(input.name);
                    this.getErrorElement(input.name);
                    this.hideMessage(input.name);
                }
                input.classList.remove(this.validClass);
            }
        };
        FormValidator.prototype.getInputElement = function (name) {
            this.inputElement = (dom_1.select('[name=' + name + ']', this.element));
            return this.inputElement;
        };
        FormValidator.prototype.destroy = function () {
            this.reset();
            this.unwireEvents();
            var elements = dom_1.selectAll('.' + this.errorClass + ', .' + this.validClass, this.element);
            for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
                var element = elements_2[_i];
                element.remove();
            }
            _super.prototype.destroy.call(this);
        };
        FormValidator.prototype.onPropertyChanged = function (newProp, oldProp) {
        };
        ;
        FormValidator.prototype.getModuleName = function () {
            return 'formValidator';
        };
        FormValidator.prototype.wireEvents = function () {
            var inputElements = dom_1.selectAll(this.selectQuery, this.element);
            for (var _i = 0, inputElements_1 = inputElements; _i < inputElements_1.length; _i++) {
                var input = inputElements_1[_i];
                if (FormValidator_1.isCheckable(input)) {
                    event_handler_1.EventHandler.add(input, 'click', this.clickHandler, this);
                }
                else if (input.tagName === 'SELECT') {
                    event_handler_1.EventHandler.add(input, 'change', this.changeHandler, this);
                }
                else {
                    event_handler_1.EventHandler.add(input, 'focusout', this.focusOutHandler, this);
                    event_handler_1.EventHandler.add(input, 'keyup', this.keyUpHandler, this);
                }
            }
            event_handler_1.EventHandler.add(this.element, 'submit', this.submitHandler, this);
        };
        FormValidator.prototype.unwireEvents = function () {
            var inputElements = dom_1.selectAll(this.selectQuery, this.element);
            for (var _i = 0, inputElements_2 = inputElements; _i < inputElements_2.length; _i++) {
                var input = inputElements_2[_i];
                event_handler_1.EventHandler.clearEvents(input);
            }
            event_handler_1.EventHandler.remove(this.element, 'submit', this.submitHandler);
        };
        FormValidator.prototype.focusOutHandler = function (e) {
            this.trigger('focusout', e);
            var element = e.target;
            if (this.rules[element.name]) {
                if (this.rules[element.name][this.required] || element.value.length > 0) {
                    this.validate(element.name);
                }
                else if (this.validated.indexOf(element.name) === -1) {
                    this.validated.push(element.name);
                }
            }
        };
        FormValidator.prototype.keyUpHandler = function (e) {
            this.trigger('keyup', e);
            var element = e.target;
            var excludeKeys = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
            if (e.which === 9 && !this.rules[element.name][this.required]) {
                return;
            }
            if (this.validated.indexOf(element.name) !== -1 && this.rules[element.name] && excludeKeys.indexOf(e.which) === -1) {
                this.validate(element.name);
            }
        };
        FormValidator.prototype.clickHandler = function (e) {
            this.trigger('click', e);
            var element = e.target;
            if (element.type !== 'submit') {
                this.validate(element.name);
            }
            else if (element.getAttribute('formnovalidate') !== null) {
                this.allowSubmit = true;
            }
        };
        FormValidator.prototype.changeHandler = function (e) {
            this.trigger('change', e);
            var element = e.target;
            this.validate(element.name);
        };
        FormValidator.prototype.submitHandler = function (e) {
            this.trigger('submit', e);
            if (!this.allowSubmit && !this.validate()) {
                e.preventDefault();
            }
            else {
                this.allowSubmit = false;
            }
        };
        FormValidator.prototype.validateRules = function (name) {
            var rules = Object.keys(this.rules[name]);
            this.getInputElement(name);
            this.getErrorElement(name);
            for (var _i = 0, rules_2 = rules; _i < rules_2.length; _i++) {
                var rule = rules_2[_i];
                var errorRule = { name: name, message: this.getErrorMessage(this.rules[name][rule], rule) };
                if (!this.isValid(name, rule) && !this.inputElement.classList.contains(this.ignore)) {
                    this.removeErrorRules(name);
                    this.errorRules.push(errorRule);
                    this.inputElement.setAttribute('aria-invalid', 'true');
                    this.inputElement.setAttribute('aria-describedby', this.inputElement.id + '-info');
                    if (!this.infoElement) {
                        this.createErrorElement(name, errorRule.message);
                    }
                    else {
                        this.showMessage(errorRule);
                    }
                    this.inputElement.classList.add(this.errorClass);
                    this.inputElement.classList.remove(this.validClass);
                    this.trigger('validationComplete', errorRule);
                    if (rule === 'required') {
                        this.inputElement.setAttribute('aria-required', 'true');
                        break;
                    }
                }
                else {
                    this.hideMessage(name);
                }
            }
        };
        FormValidator.prototype.isValid = function (name, rule) {
            var params = this.rules[name][rule];
            var param = (params instanceof Array && typeof params[1] === 'string') ? params[0] : params;
            var currentRule = this.rules[name][rule];
            var args = { value: this.inputElement.value, param: param, element: this.inputElement };
            this.trigger('validationBegin', args);
            if (typeof currentRule[0] === 'function') {
                var fn = currentRule[0];
                return fn.call(this, { element: this.inputElement, value: this.inputElement.value });
            }
            else if (FormValidator_1.isCheckable(this.inputElement)) {
                if (rule !== 'required') {
                    return true;
                }
                return dom_1.selectAll('input[name=' + name + ']:checked', this.element).length > 0;
            }
            else {
                return FormValidator_1.checkValidator[rule](args);
            }
        };
        FormValidator.prototype.getErrorMessage = function (ruleValue, rule) {
            var message = (ruleValue instanceof Array && typeof ruleValue[1] === 'string') ? ruleValue[1] : this.defaultMessages[rule];
            var formats = message.match(/{(\d)}/g);
            if (!util_1.isNullOrUndefined(formats)) {
                for (var i = 0; i < formats.length; i++) {
                    var value = ruleValue instanceof Array ? ruleValue[i] : ruleValue;
                    message = message.replace(formats[i], value);
                }
            }
            return message;
        };
        FormValidator.prototype.createErrorElement = function (name, message) {
            var errorElement = dom_1.createElement(this.errorElement, {
                className: this.errorClass,
                innerHTML: message,
                attrs: { for: name }
            });
            if (this.errorOption === ErrorOption.Message) {
                errorElement.classList.remove(this.errorClass);
                errorElement.classList.add('e-message');
                errorElement = dom_1.createElement(this.errorContainer, { className: this.errorClass, innerHTML: errorElement.outerHTML });
            }
            errorElement.id = this.inputElement.name + '-info';
            if (this.customPlacement != null) {
                this.customPlacement.call(this, this.inputElement, errorElement);
            }
            else {
                this.inputElement.parentNode.insertBefore(errorElement, this.inputElement.nextSibling);
            }
            errorElement.style.display = 'block';
            this.getErrorElement(name);
            this.validated.push(name);
            this.checkRequired(name);
        };
        FormValidator.prototype.getErrorElement = function (name) {
            this.infoElement = dom_1.select(this.errorElement + '.' + this.errorClass, this.inputElement.parentElement);
            if (!this.infoElement) {
                this.infoElement = dom_1.select(this.errorElement + '.' + this.errorClass + '[for="' + name + '"]');
            }
            return this.infoElement;
        };
        FormValidator.prototype.removeErrorRules = function (name) {
            for (var i = 0; i < this.errorRules.length; i++) {
                var rule = this.errorRules[i];
                if (rule.name === name) {
                    this.errorRules.splice(i, 1);
                }
            }
        };
        FormValidator.prototype.showMessage = function (errorRule) {
            this.infoElement.style.display = 'block';
            this.infoElement.innerHTML = errorRule.message;
            this.checkRequired(errorRule.name);
        };
        FormValidator.prototype.hideMessage = function (name) {
            if (this.infoElement) {
                this.infoElement.style.display = 'none';
                this.removeErrorRules(name);
                this.inputElement.classList.add(this.validClass);
                this.inputElement.classList.remove(this.errorClass);
                this.inputElement.setAttribute('aria-invalid', 'false');
            }
        };
        FormValidator.prototype.checkRequired = function (name) {
            if (!this.rules[name][this.required] && !this.inputElement.value.length) {
                this.infoElement.innerHTML = this.inputElement.value;
                this.infoElement.setAttribute('aria-invalid', 'false');
                this.hideMessage(name);
            }
        };
        FormValidator.isCheckable = function (input) {
            var inputType = input.getAttribute('type');
            return inputType && (inputType === 'checkbox' || inputType === 'radio' || inputType === 'submit');
        };
        return FormValidator;
    }(base_1.Base));
    FormValidator.checkValidator = {
        required: function (option) {
            return option.value.length > 0;
        },
        email: function (option) {
            return new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
                '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$').test(option.value);
        },
        url: function (option) {
            return new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_\‌​+~#=]+)' +
                '+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?').test(option.value);
        },
        date: function (option) {
            return !isNaN(new Date(option.value).getTime());
        },
        dateIso: function (option) {
            return new RegExp('^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$').test(option.value);
        },
        number: function (option) {
            return !isNaN(Number(option.value)) && option.value.indexOf(' ') === -1;
        },
        digits: function (option) {
            return new RegExp('^[0-9]*$').test(option.value);
        },
        maxLength: function (option) {
            return option.value.length <= option.param;
        },
        minLength: function (option) {
            return option.value.length >= option.param;
        },
        rangeLength: function (option) {
            var param = option.param;
            return option.value.length >= param[0] && option.value.length <= param[1];
        },
        range: function (option) {
            var param = option.param;
            return !isNaN(Number(option.value)) && Number(option.value) >= param[0] && Number(option.value) <= param[1];
        },
        max: function (option) {
            return !isNaN(Number(option.value)) && Number(option.value) <= option.param;
        },
        min: function (option) {
            return !isNaN(Number(option.value)) && Number(option.value) >= option.param;
        },
        regex: function (option) {
            return new RegExp(option.param).test(option.value);
        }
    };
    __decorate([
        notify_property_change_1.Property('e-hidden')
    ], FormValidator.prototype, "ignore", void 0);
    __decorate([
        notify_property_change_1.Property({})
    ], FormValidator.prototype, "rules", void 0);
    __decorate([
        notify_property_change_1.Property('e-error')
    ], FormValidator.prototype, "errorClass", void 0);
    __decorate([
        notify_property_change_1.Property('e-valid')
    ], FormValidator.prototype, "validClass", void 0);
    __decorate([
        notify_property_change_1.Property('label')
    ], FormValidator.prototype, "errorElement", void 0);
    __decorate([
        notify_property_change_1.Property('div')
    ], FormValidator.prototype, "errorContainer", void 0);
    __decorate([
        notify_property_change_1.Property(ErrorOption.Label)
    ], FormValidator.prototype, "errorOption", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], FormValidator.prototype, "focusout", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], FormValidator.prototype, "keyup", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], FormValidator.prototype, "click", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], FormValidator.prototype, "change", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], FormValidator.prototype, "submit", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], FormValidator.prototype, "validationBegin", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], FormValidator.prototype, "validationComplete", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], FormValidator.prototype, "customPlacement", void 0);
    FormValidator = FormValidator_1 = __decorate([
        notify_property_change_1.NotifyPropertyChanges
    ], FormValidator);
    exports.FormValidator = FormValidator;
    var FormValidator_1;
});
