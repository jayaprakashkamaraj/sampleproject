define(["require", "exports", "../src/dom", "../src/event-handler", "../src/form-validator"], function (require, exports, dom_1, event_handler_1, form_validator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var inputElement1 = '<div>'
        + dom_1.createElement('input', { attrs: { id: 'required', type: 'text', name: 'input1' } }).outerHTML + '</div>';
    var inputElement2 = '<div>' + dom_1.createElement('input', { attrs: { id: 'mail', type: 'text', name: 'input2' } }).outerHTML + '</div>';
    var check = '<div><input type=\'checkbox\' id=\'check\' name=\'input3\' /></div>';
    var radio = '<div><input type=\'radio\' id=\'radio\' name=\'input4\' /></div>';
    var intSelect = '<div><select name=\'select\' id=\'select\'><option value=\'\'>Year</option><option value=\'1\'>1990</option></select></div>';
    var submit = '<div><input type=\'submit\' id=\'submit\' name=\'submit\' value=\'Submit\' /></div>';
    var formElement = dom_1.createElement('form', { id: 'formId', innerHTML: inputElement1 });
    var formElement1 = dom_1.createElement('form', { id: 'formId1', innerHTML: inputElement1 + inputElement2 + submit });
    var formElement2 = dom_1.createElement('form', { id: 'formId2', innerHTML: inputElement1 + inputElement2 + check + radio + intSelect + submit });
    var formObj;
    var formObj1;
    var formObj2;
    function setInputValue(formObj, name, value) {
        formObj.element.querySelector('[name=' + name + ']').value = value;
    }
    describe('FormValidator # ', function () {
        beforeAll(function () {
            formObj = new form_validator_1.FormValidator(formElement);
        });
        it('initialize form object with id # ', function () {
            document.body.appendChild(formElement);
            var formObj = new form_validator_1.FormValidator('#formId');
            expect(formObj instanceof form_validator_1.FormValidator).toEqual(true);
            document.body.removeChild(formElement);
        });
        it('initialize form object with form element # ', function () {
            var formObj = new form_validator_1.FormValidator(formElement);
            expect(formObj instanceof form_validator_1.FormValidator).toEqual(true);
        });
        it('initialize form object with invalid form elements # ', function () {
            var formObj = new form_validator_1.FormValidator('#form', {});
            expect(formObj.element).toBeNull();
        });
        it('initialize form object with invalid element elements # ', function () {
            var div = dom_1.createElement('div', { id: 'divId' });
            var formObj = new form_validator_1.FormValidator(div.id, {});
            expect(formObj.element).toBeNull();
        });
        it('check novalidate attribute in the form element # ', function () {
            expect(formObj.element.getAttribute('novalidate')).toEqual('');
        });
        it('check default ignore # ', function () {
            expect(formObj.ignore).toEqual('e-hidden');
        });
        it('check default rules # ', function () {
            expect(formObj.rules).toEqual({});
        });
        it('check default errorClass # ', function () {
            expect(formObj.errorClass).toEqual('e-error');
        });
        it('check default validClass # ', function () {
            expect(formObj.validClass).toEqual('e-valid');
        });
        it('check default errorElement # ', function () {
            expect(formObj.errorElement).toEqual('label');
        });
        it('check default errorContainer # ', function () {
            expect(formObj.errorContainer).toEqual('div');
        });
        it('check default errorOption # ', function () {
            expect(formObj.errorOption).toEqual(form_validator_1.ErrorOption.Label);
        });
        it('check default focusout # ', function () {
            expect(formObj.focusout).toBeUndefined();
        });
        it('check default keyup # ', function () {
            expect(formObj.keyup).toBeUndefined();
        });
        it('check default click # ', function () {
            expect(formObj.click).toBeUndefined();
        });
        it('check default change # ', function () {
            expect(formObj.change).toBeUndefined();
        });
        it('check default submit # ', function () {
            expect(formObj.submit).toBeUndefined();
        });
        it('check default validationBegin # ', function () {
            expect(formObj.validationBegin).toBeUndefined();
        });
        it('check default validationBegin # ', function () {
            expect(formObj.validationComplete).toBeUndefined();
        });
        it('check default customPlacement # ', function () {
            expect(formObj.customPlacement).toBeUndefined();
        });
        it('check module name # ', function () {
            expect(formObj.getModuleName()).toEqual('formValidator');
        });
        it('check modified ignore # ', function () {
            formObj.ignore = 'ignore';
            expect(formObj.ignore).toEqual('ignore');
        });
        it('check modified rules # ', function () {
            var options = { rules: { 'input1': { required: true } } };
            formObj.rules = options.rules;
            expect(formObj.rules).not.toEqual({});
        });
        it('check modified errorClass # ', function () {
            formObj.errorClass = 'error';
            expect(formObj.errorClass).toEqual('error');
        });
        it('check modified validClass # ', function () {
            formObj.validClass = 'valid';
            expect(formObj.validClass).toEqual('valid');
        });
        it('check modified errorElement # ', function () {
            formObj.errorElement = 'div';
            expect(formObj.errorElement).toEqual('div');
        });
        it('check modified errorContainer # ', function () {
            formObj.errorContainer = 'span';
            expect(formObj.errorContainer).toEqual('span');
        });
        it('check modified errorOption # ', function () {
            formObj.errorOption = form_validator_1.ErrorOption.Message;
            expect(formObj.errorOption).toEqual(form_validator_1.ErrorOption.Message);
        });
        it('check modified focusout # ', function () {
            var onFocusOut = function (args) { return true; };
            formObj.focusout = onFocusOut;
            expect(formObj.focusout).not.toBeNull();
        });
        it('check modified keyup # ', function () {
            var onKeyup = function (args) { };
            formObj.keyup = onKeyup;
            expect(formObj.keyup).not.toBeNull();
        });
        it('check modified click # ', function () {
            var onClick = function (args) { };
            formObj.click = onClick;
            expect(formObj.click).not.toBeNull();
        });
        it('check modified change # ', function () {
            var onChange = function (args) { };
            formObj.change = onChange;
            expect(formObj.change).not.toBeNull();
        });
        it('check modified submit # ', function () {
            var onSubmit = function (args) { };
            formObj.submit = onSubmit;
            expect(formObj.submit).not.toBeNull();
        });
        it('check modified validationBegin # ', function () {
            var begin = function (args) { };
            formObj.validationBegin = begin;
            expect(formObj.validationBegin).not.toBeNull();
        });
        it('check modified validationComplete # ', function () {
            var complete = function (args) { };
            formObj.validationComplete = complete;
            expect(formObj.validationComplete).not.toBeNull();
        });
        it('check modified customPlacement # ', function () {
            var placeError = function (args) { };
            formObj.customPlacement = placeError;
            expect(formObj.customPlacement).not.toBeNull();
            formObj.customPlacement = null;
        });
        it('rules with array value # ', function () {
            var options = { rules: { 'input1': { range: [1, 5] } } };
            formObj.rules = options.rules;
            var arr = formObj.rules['input1']['range'];
            expect(arr).toEqual([1, 5]);
        });
        it('rules with array value # ', function () {
            var customFn = function (args) { return true; };
            var options = { rules: { 'input1': { range: customFn } } };
            formObj.rules = options.rules;
            var fn = formObj.rules['input1']['range'];
            expect(fn).toEqual(customFn);
        });
        it('custom rules in rules # ', function () {
            var options = { rules: { 'input1': { customRule: true } } };
            formObj.rules = options.rules;
            var customRule = formObj.rules['input1']['customRule'];
            expect(customRule).toBeDefined();
        });
        it('rules with custom message # ', function () {
            var options = { rules: { 'input1': { required: [true, 'This field must not empty'] } } };
            formObj.rules = options.rules;
            var input1 = formObj.rules['input1']['required'];
            expect(input1[1]).toEqual('This field must not empty');
        });
        afterAll(function () {
            formObj.destroy();
        });
        describe('addRules method # ', function () {
            var options;
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement);
                options = { rules: { 'input1': { required: true } } };
            });
            it('with new value # ', function () {
                formObj.addRules('input1', { required: true });
                expect(formObj.rules['input1']).toEqual(options.rules['input1']);
            });
            it('with existing value # ', function () {
                options = { rules: { 'input1': { required: true, email: true } } };
                formObj.addRules('input1', { email: true });
                expect(formObj.rules['input1']).toEqual(options.rules['input1']);
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('removeRules method # ', function () {
            it('with name and rule # ', function () {
                formObj.removeRules('input1', ['email']);
                expect(formObj.rules['input1']).toEqual({ required: true });
            });
            it('with not included name # ', function () {
                formObj.removeRules('max', ['email']);
                expect(formObj.rules['max']).toBeUndefined();
            });
            it('with correct name and no rule # ', function () {
                formObj.removeRules('input1');
                expect(formObj.rules['input1']).toBeUndefined();
            });
            it('with no name and no rule # ', function () {
                formObj.removeRules();
                expect(formObj.rules).toEqual({});
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('validate method # ', function () {
            beforeAll(function () {
                formObj1 = new form_validator_1.FormValidator(formElement1, { rules: { 'input1': { required: true, email: true }, 'input2': { required: true } } });
            });
            describe('with selected name # ', function () {
                it('testing current input with error element # ', function () {
                    formObj1.validate('input1');
                    var errorElement = formObj1.getInputElement('input1').nextSibling;
                    expect(errorElement !== null && errorElement.classList.contains('e-error')).toEqual(true);
                });
                it('testing next input with error element # ', function () {
                    var errorElement = formObj1.getInputElement('input2').nextSibling;
                    expect(errorElement !== null && errorElement.classList.contains('e-error')).toEqual(false);
                });
            });
            describe('with out selected name # ', function () {
                it('testing current input with error element # ', function () {
                    formObj1.validate();
                    var errorElement = formObj1.getInputElement('input1').nextSibling;
                    expect(errorElement !== null && errorElement.classList.contains('e-error')).toEqual(true);
                });
                it('testing next input with error element # ', function () {
                    formObj1.validate();
                    var errorElement = formObj1.getInputElement('input2').nextSibling;
                    expect(errorElement !== null && errorElement.classList.contains('e-error')).toEqual(true);
                });
            });
            afterAll(function () {
                formObj1.destroy();
            });
        });
        describe('reset method # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { required: true, email: true } } });
            });
            it('testing input without value before form reset # ', function () {
                var input = dom_1.select('#required', formObj.element);
                input.name = '';
                formObj.reset();
                expect(input.classList.contains(formObj.errorClass)).toEqual(false);
                input.name = 'input1';
            });
            it('testing input value before form reset # ', function () {
                setInputValue(formObj, 'input1', '1234');
                var value = formObj.getInputElement('input1').value;
                expect(value).toEqual('1234');
            });
            it('testing input value after form validate # ', function () {
                formObj.validate('input1');
                var value = formObj.getInputElement('input1').value;
                expect(value).toEqual('1234');
            });
            it('testing error element form validate # ', function () {
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement !== null && errorElement.classList.contains('e-error')).toEqual(true);
            });
            it('testing input attribute aria-invalid after form validate # ', function () {
                expect(formObj.getInputElement('input1').getAttribute('aria-invalid')).toEqual('true');
            });
            it('testing input error class after form validate # ', function () {
                expect(formObj.getInputElement('input1').classList.contains(formObj.errorClass)).toEqual(true);
            });
            it('testing input value after form reset # ', function () {
                formObj.reset();
                var value = formObj.getInputElement('input1').value;
                expect(value).toEqual('');
            });
            it('testing error element visible state after form reset # ', function () {
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(dom_1.isVisible(errorElement)).toEqual(false);
            });
            it('testing input attribute aria-invalid after form reset # ', function () {
                expect(formObj.getInputElement('input1').getAttribute('aria-invalid')).toEqual('false');
            });
            it('testing input error class after form reset # ', function () {
                expect(formObj.getInputElement('input1').classList.contains(formObj.errorClass)).toEqual(false);
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('getInputElement method # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { required: true } } });
            });
            it('with valid input element # ', function () {
                expect(formObj.getInputElement('input1') !== null).toEqual(true);
            });
            it('with invalid input element # ', function () {
                expect(formObj.getInputElement('inputs') === null).toEqual(true);
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('default messages # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement);
            });
            it('testing required message # ', function () {
                expect(formObj.defaultMessages['required']).toEqual('This field is required.');
            });
            it('testing email message # ', function () {
                expect(formObj.defaultMessages['email']).toEqual('Please enter a valid email address.');
            });
            it('testing url message # ', function () {
                expect(formObj.defaultMessages['url']).toEqual('Please enter a valid URL.');
            });
            it('testing date message # ', function () {
                expect(formObj.defaultMessages['date']).toEqual('Please enter a valid date.');
            });
            it('testing dateIso message # ', function () {
                expect(formObj.defaultMessages['dateIso']).toEqual('Please enter a valid date ( ISO ).');
            });
            it('testing number message # ', function () {
                expect(formObj.defaultMessages['number']).toEqual('Please enter a valid number.');
            });
            it('testing digits message # ', function () {
                expect(formObj.defaultMessages['digits']).toEqual('Please enter only digits.');
            });
            it('testing maxLength message # ', function () {
                expect(formObj.defaultMessages['maxLength']).toEqual('Please enter no more than {0} characters.');
            });
            it('testing minLength message # ', function () {
                expect(formObj.defaultMessages['minLength']).toEqual('Please enter at least {0} characters.');
            });
            it('testing rangeLength message # ', function () {
                expect(formObj.defaultMessages['rangeLength']).toEqual('Please enter a value between {0} and {1} characters long.');
            });
            it('testing range message # ', function () {
                expect(formObj.defaultMessages['range']).toEqual('Please enter a value between {0} and {1}.');
            });
            it('testing max message # ', function () {
                expect(formObj.defaultMessages['max']).toEqual('Please enter a value less than or equal to {0}.');
            });
            it('testing min message # ', function () {
                expect(formObj.defaultMessages['min']).toEqual('Please enter a value greater than or equal to {0}.');
            });
            it('testing regex message # ', function () {
                expect(formObj.defaultMessages['regex']).toEqual('Please enter a correct value.');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('ignore element #', function () {
            beforeAll(function () {
                formObj1 = new form_validator_1.FormValidator(formElement1, { rules: { 'input1': { required: true }, 'input2': { required: true } }, ignore: 'ignore' });
                formObj1.getInputElement('input2').classList.add('ignore');
            });
            it('with validate method of ignore element # ', function () {
                formObj1.validate('input2');
                var errorElement = formObj1.getInputElement('input2').nextSibling;
                expect(errorElement === null).toEqual(true);
            });
            describe('with validate method of no selected name # ', function () {
                it('testing error element # ', function () {
                    formObj1.validate();
                    var errorElement = formObj1.getInputElement('input1').nextSibling;
                    expect(errorElement !== null && errorElement.classList.contains(formObj1.errorClass)).toEqual(true);
                });
                it('testing ignore element # ', function () {
                    var errorElement = formObj1.getInputElement('input2').nextSibling;
                    expect(errorElement === null).toEqual(true);
                });
            });
            afterAll(function () {
                formObj1.destroy();
            });
        });
        describe('aria-invalid # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { required: true, email: true } } });
            });
            it('with invalid value # ', function () {
                setInputValue(formObj, 'input1', 'abc');
                formObj.validate('input1');
                var element = formObj.getInputElement('input1');
                expect(element.getAttribute('aria-invalid')).toEqual('true');
            });
            it('with valid value # ', function () {
                setInputValue(formObj, 'input1', 'a@s.com');
                formObj.validate('input1');
                var element = formObj.getInputElement('input1');
                expect(element.getAttribute('aria-invalid')).toEqual('false');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('aria-describedby # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { required: true, email: true } } });
            });
            it('with valid element # ', function () {
                setInputValue(formObj, 'input1', 'a@s.com');
                formObj.validate('input1');
                var element = formObj.getInputElement('input1');
                expect(element.getAttribute('aria-describedby')).toEqual(element.id + '-info');
            });
            it('with invalid element # ', function () {
                setInputValue(formObj, 'input1', 'abc');
                formObj.validate('input1');
                var element = formObj.getInputElement('input1');
                expect(element.getAttribute('aria-describedby')).toEqual(element.id + '-info');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('aria-required # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { required: true } } });
            });
            it('with invalid element # ', function () {
                setInputValue(formObj, 'input1', '');
                formObj.validate('input1');
                var element = formObj.getInputElement('input1');
                expect(element.getAttribute('aria-required')).toEqual('true');
            });
            it('with valid element # ', function () {
                setInputValue(formObj, 'input1', 'abc');
                formObj.validate('input1');
                var element = formObj.getInputElement('input1');
                expect(element.getAttribute('aria-required')).toEqual('true');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('required validation # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { required: true } } });
            });
            it('initial validation without value # ', function () {
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing error element # ', function () {
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.classList.contains('e-error')).toEqual(true);
            });
            it('required success # ', function () {
                setInputValue(formObj, 'input1', '1234');
                formObj.validate('input1');
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.style.display).toEqual('none');
                setInputValue(formObj, 'input1', '');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('email validation #', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { email: true } } });
            });
            it('initial validation without value # ', function () {
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing wrong email - case 1 # ', function () {
                setInputValue(formObj, 'input1', '@a.com');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing error element # ', function () {
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.classList.contains('e-error')).toEqual(true);
            });
            it('testing wrong email - case 2 # ', function () {
                setInputValue(formObj, 'input1', 'com');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong email - case 3 # ', function () {
                setInputValue(formObj, 'input1', '123@');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing correct email # ', function () {
                setInputValue(formObj, 'input1', 'a@s.com');
                expect(formObj.validate('input1')).toEqual(true);
                setInputValue(formObj, 'input1', '');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('url validation #', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { url: true } } });
            });
            it('initial validation without value # ', function () {
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing wrong url - case 1 # ', function () {
                setInputValue(formObj, 'input1', 'http');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing error element # ', function () {
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.classList.contains('e-error')).toEqual(true);
            });
            it('testing wrong url - case 2 # ', function () {
                setInputValue(formObj, 'input1', ':http//');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong url - case 3 # ', function () {
                setInputValue(formObj, 'input1', 's//:http.com');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong url - case 4 # ', function () {
                setInputValue(formObj, 'input1', 'www//:http.com');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing correct url # ', function () {
                setInputValue(formObj, 'input1', 'http://www.s.com/');
                expect(formObj.validate('input1')).toEqual(true);
                setInputValue(formObj, 'input1', '');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('date validation #', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { date: true } } });
            });
            it('initial validation without value # ', function () {
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing wrong date - case 1 # ', function () {
                setInputValue(formObj, 'input1', '12/0');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing error element # ', function () {
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.classList.contains('e-error')).toEqual(true);
            });
            it('testing wrong date - case 2 # ', function () {
                setInputValue(formObj, 'input1', '/23/12');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong date - case 3 # ', function () {
                setInputValue(formObj, 'input1', 'May');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong date - case 4 # ', function () {
                setInputValue(formObj, 'input1', '4th');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong date - case 5 # ', function () {
                setInputValue(formObj, 'input1', '90\'s');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing correct date - case 1 # ', function () {
                setInputValue(formObj, 'input1', '12/31/2014');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing correct date - case 2 # ', function () {
                setInputValue(formObj, 'input1', '01/13/2345');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing correct date - case 3 # ', function () {
                setInputValue(formObj, 'input1', '12/23/34');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing correct date - case 4 # ', function () {
                setInputValue(formObj, 'input1', '05/15/2016');
                expect(formObj.validate('input1')).toEqual(true);
                setInputValue(formObj, 'input1', '');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('dateIso validation # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { dateIso: true } } });
            });
            it('initial validation without value # ', function () {
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing wrong dateIso - case 1 # ', function () {
                setInputValue(formObj, 'input1', '12-12-12');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing error element # ', function () {
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.classList.contains('e-error')).toEqual(true);
            });
            it('testing wrong dateIso - case 2 # ', function () {
                setInputValue(formObj, 'input1', '12/04/2015');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong dateIso - case 3 # ', function () {
                setInputValue(formObj, 'input1', '1234-234-34');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong dateIso - case 4 # ', function () {
                setInputValue(formObj, 'input1', '2017-32-05');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing dateIso ends with 0 date # ', function () {
                setInputValue(formObj, 'input1', '2016-05-20');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing correct dateIso # ', function () {
                setInputValue(formObj, 'input1', '2016-05-15');
                expect(formObj.validate('input1')).toEqual(true);
                setInputValue(formObj, 'input1', '');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('number validation # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { number: true } } });
            });
            it('initial validation without value # ', function () {
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing wrong number - case 1 # ', function () {
                setInputValue(formObj, 'input1', '12-32');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing error element # ', function () {
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.classList.contains('e-error')).toEqual(true);
            });
            it('testing wrong number - case 2 # ', function () {
                setInputValue(formObj, 'input1', '23,34');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong number - case 3 # ', function () {
                setInputValue(formObj, 'input1', 'one');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong number - case 4 # ', function () {
                setInputValue(formObj, 'input1', '12fds');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing correct number - case 1 # ', function () {
                setInputValue(formObj, 'input1', '12345');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing white space - inbetween # ', function () {
                setInputValue(formObj, 'input1', '1 2');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing white space - begin # ', function () {
                setInputValue(formObj, 'input1', ' 1');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing white space - end # ', function () {
                setInputValue(formObj, 'input1', '1 ');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing correct number - case 2 # ', function () {
                setInputValue(formObj, 'input1', '-12.34');
                expect(formObj.validate('input1')).toEqual(true);
                setInputValue(formObj, 'input1', '');
                formObj.removeRules();
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('digits validation # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { digits: true } } });
            });
            it('initial validation without value # ', function () {
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing wrong digits - case 1 # ', function () {
                setInputValue(formObj, 'input1', '12-32');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing error element # ', function () {
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.classList.contains('e-error')).toEqual(true);
            });
            it('testing wrong digits - case 2 # ', function () {
                setInputValue(formObj, 'input1', '23,34');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong digits - case 3 # ', function () {
                setInputValue(formObj, 'input1', 'one');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong digits - case 4 # ', function () {
                setInputValue(formObj, 'input1', '12fds');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong digits - case 5 # ', function () {
                setInputValue(formObj, 'input1', '-12.34');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing correct digits # ', function () {
                setInputValue(formObj, 'input1', '12345');
                expect(formObj.validate('input1')).toEqual(true);
                setInputValue(formObj, 'input1', '');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('minLength validation # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { minLength: 5 } } });
            });
            it('initial validation without value # ', function () {
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing wrong minLength - case 1 # ', function () {
                setInputValue(formObj, 'input1', '12-2');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing error element # ', function () {
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.classList.contains('e-error')).toEqual(true);
            });
            it('testing wrong minLength - case 2 # ', function () {
                setInputValue(formObj, 'input1', '12');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong minLength - case 3 # ', function () {
                setInputValue(formObj, 'input1', 'one');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong minLength - case 4 # ', function () {
                setInputValue(formObj, 'input1', '12fd');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong minLength - case 5 # ', function () {
                setInputValue(formObj, 'input1', '-1.5');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing correct minLength - case 1 # ', function () {
                setInputValue(formObj, 'input1', '12345');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing correct minLength - case 2 # ', function () {
                setInputValue(formObj, 'input1', '123-34');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing correct minLength - case 3 # ', function () {
                setInputValue(formObj, 'input1', 'one, two');
                expect(formObj.validate('input1')).toEqual(true);
                setInputValue(formObj, 'input1', '');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('maxLength validation # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { maxLength: 5 } } });
            });
            it('initial validation without value # ', function () {
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing wrong maxLength - case 1 # ', function () {
                setInputValue(formObj, 'input1', '12-2235');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing error element # ', function () {
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.classList.contains('e-error')).toEqual(true);
            });
            it('testing wrong maxLength - case 2 # ', function () {
                setInputValue(formObj, 'input1', '1232435');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong maxLength - case 3 # ', function () {
                setInputValue(formObj, 'input1', 'one,two');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong maxLength - case 4 # ', function () {
                setInputValue(formObj, 'input1', '12fd23');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong maxLength - case 5 # ', function () {
                setInputValue(formObj, 'input1', '-1.5.56');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing correct maxLength - case 1 # ', function () {
                setInputValue(formObj, 'input1', '12345');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing correct maxLength - case 2 # ', function () {
                setInputValue(formObj, 'input1', '12-5');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing correct maxLength - case 3 # ', function () {
                setInputValue(formObj, 'input1', 'one');
                expect(formObj.validate('input1')).toEqual(true);
                setInputValue(formObj, 'input1', '');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('rangeLength validation # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { rangeLength: [1, 5] } } });
            });
            it('initial validation without value # ', function () {
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing wrong rangeLength - case 1 # ', function () {
                setInputValue(formObj, 'input1', '12-2235');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing error element # ', function () {
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.classList.contains('e-error')).toEqual(true);
            });
            it('testing wrong rangeLength - case 2 # ', function () {
                setInputValue(formObj, 'input1', '1232435');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong rangeLength - case 3 # ', function () {
                setInputValue(formObj, 'input1', 'one,two');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong rangeLength - case 4 # ', function () {
                setInputValue(formObj, 'input1', '12fd23');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong rangeLength - case 5 # ', function () {
                setInputValue(formObj, 'input1', '-1.5.56');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing correct rangeLength - case 1 # ', function () {
                setInputValue(formObj, 'input1', '12345');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing correct rangeLength - case 2 # ', function () {
                setInputValue(formObj, 'input1', '12-5');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing correct rangeLength - case 3 # ', function () {
                setInputValue(formObj, 'input1', 'one');
                expect(formObj.validate('input1')).toEqual(true);
                setInputValue(formObj, 'input1', '');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('range validation # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { range: [1, 5] } } });
            });
            it('initial validation without value # ', function () {
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing wrong range - case 1 # ', function () {
                setInputValue(formObj, 'input1', '0');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing error element # ', function () {
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.classList.contains('e-error')).toEqual(true);
            });
            it('testing wrong range - case 2 # ', function () {
                setInputValue(formObj, 'input1', '1232435');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong range - case 3 # ', function () {
                setInputValue(formObj, 'input1', 'one');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong range - case 4 # ', function () {
                setInputValue(formObj, 'input1', '12fd23');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong range - case 5 # ', function () {
                setInputValue(formObj, 'input1', '-1.5');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing correct range - case 1 # ', function () {
                setInputValue(formObj, 'input1', '1');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing correct range - case 2 # ', function () {
                setInputValue(formObj, 'input1', '3');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing correct range - case 3 # ', function () {
                setInputValue(formObj, 'input1', '5');
                expect(formObj.validate('input1')).toEqual(true);
                setInputValue(formObj, 'input1', '');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('max validation # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { max: 5 } } });
            });
            it('initial validation without value # ', function () {
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing wrong max - case 1 # ', function () {
                setInputValue(formObj, 'input1', '7');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing error element', function () {
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.classList.contains('e-error')).toEqual(true);
            });
            it('testing wrong max - case 2 # ', function () {
                setInputValue(formObj, 'input1', '1232435');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong max - case 3 # ', function () {
                setInputValue(formObj, 'input1', 'one');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong max - case 4 # ', function () {
                setInputValue(formObj, 'input1', '12fd23');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong max - case 5 # ', function () {
                setInputValue(formObj, 'input1', '5.1');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing correct max - case 1 # ', function () {
                setInputValue(formObj, 'input1', '1');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing correct max - case 2 # ', function () {
                setInputValue(formObj, 'input1', '0');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing correct max - case 3 # ', function () {
                setInputValue(formObj, 'input1', '-1.5');
                expect(formObj.validate('input1')).toEqual(true);
                setInputValue(formObj, 'input1', '');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('min validation # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { min: 5 } } });
            });
            it('initial validation without value # ', function () {
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing wrong min - case 1 # ', function () {
                setInputValue(formObj, 'input1', '1');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing error element # ', function () {
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.classList.contains('e-error')).toEqual(true);
            });
            it('testing wrong min - case 2 # ', function () {
                setInputValue(formObj, 'input1', '0');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong min - case 3 # ', function () {
                setInputValue(formObj, 'input1', '2.6');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong min - case 4 # ', function () {
                setInputValue(formObj, 'input1', '-1.5');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing wrong min - case 5 # ', function () {
                setInputValue(formObj, 'input1', 'one');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing correct min - case 1 # ', function () {
                setInputValue(formObj, 'input1', '10');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing correct min - case 2 # ', function () {
                setInputValue(formObj, 'input1', '5');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing correct min - case 3 # ', function () {
                setInputValue(formObj, 'input1', '5.1');
                expect(formObj.validate('input1')).toEqual(true);
                setInputValue(formObj, 'input1', '');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('regex validation # ', function () {
            beforeAll(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { regex: '^[0-5]*$' } } });
            });
            it('initial validation without value # ', function () {
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('testing wrong regex - case 1 # ', function () {
                setInputValue(formObj, 'input1', 'asfd');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing error element # ', function () {
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.classList.contains('e-error')).toEqual(true);
            });
            it('testing wrong regex - case 2 # ', function () {
                setInputValue(formObj, 'input1', '5.1');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('testing correct regex # ', function () {
                setInputValue(formObj, 'input1', '4');
                expect(formObj.validate('input1')).toEqual(true);
                setInputValue(formObj, 'input1', '');
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('errorOption # ', function () {
            beforeEach(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { required: true } } });
            });
            afterEach(function () {
                formObj.destroy();
            });
            it('with label option # ', function () {
                formObj.validate('input1');
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.tagName.toLowerCase() === formObj.errorElement).toEqual(true);
                formObj.destroy();
            });
            it('with message option # ', function () {
                formObj.errorOption = form_validator_1.ErrorOption.Message;
                formObj.validate('input1');
                var errorElement = formObj.getInputElement('input1').nextSibling;
                expect(errorElement.tagName.toLowerCase() === formObj.errorContainer).toEqual(true);
            });
        });
        describe('destroy method # ', function () {
            beforeEach(function () {
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { required: true, email: true } } });
            });
            describe('with error elements # ', function () {
                it('testing error element before destroy # ', function () {
                    formObj.validate('input1');
                    var errorElement = formObj.getInputElement('input1').nextSibling;
                    expect(errorElement !== null && formObj.getInputElement('input1').classList.contains(formObj.errorClass)).toEqual(true);
                });
                it('testing error element after destroy # ', function () {
                    formObj.destroy();
                    var errorElement = formObj.getInputElement('input1').nextSibling;
                    expect(errorElement).toBeNull();
                });
            });
            describe('with valid elements # ', function () {
                it('testing error element before destroy # ', function () {
                    formObj.validate('input1');
                    var errorElement = formObj.getInputElement('input1').nextSibling;
                    expect(errorElement !== null && formObj.getInputElement('input1').classList.contains(formObj.errorClass)).toEqual(true);
                });
                it('testing valid element before destroy # ', function () {
                    setInputValue(formObj, 'input1', 'a@s.com');
                    formObj.validate('input1');
                    var errorElement = formObj.getInputElement('input1').nextSibling;
                    expect(errorElement !== null && errorElement.style.display === 'none' &&
                        formObj.getInputElement('input1').classList.contains(formObj.validClass)).toEqual(true);
                });
                it('testing valid element after destroy # ', function () {
                    formObj.destroy();
                    var errorElement = formObj.getInputElement('input1').nextSibling;
                    expect(errorElement === null).toEqual(true);
                });
            });
        });
        describe('checkable elements # ', function () {
            var errorElement;
            beforeAll(function () {
                formObj2 = new form_validator_1.FormValidator(formElement2, { rules: { 'input3': { required: true }, 'input4': { required: true } } });
            });
            it('with checkbox invalid # ', function () {
                formObj2.validate('input3');
                errorElement = formObj2.getInputElement('input3').nextSibling;
                expect(errorElement !== null && errorElement.classList.contains(formObj2.errorClass)).toEqual(true);
            });
            it('with checkbox valid # ', function () {
                var check = dom_1.select('[name=input3]', formObj2.element);
                check.checked = true;
                formObj2.validate('input3');
                expect(dom_1.isVisible(errorElement)).toEqual(false);
            });
            it('with radio invalid # ', function () {
                formObj2.validate('input4');
                errorElement = formObj2.getInputElement('input4').nextSibling;
                expect(errorElement !== null && errorElement.classList.contains(formObj2.errorClass)).toEqual(true);
            });
            it('with radio valid # ', function () {
                var radio = dom_1.select('[name=input4]', formObj2.element);
                radio.checked = true;
                formObj2.validate('input4');
                expect(dom_1.isVisible(errorElement)).toEqual(false);
            });
            it('with invalid rule # ', function () {
                var options = { rules: { 'input3': { email: true } } };
                formObj2.rules = options.rules;
                expect(formObj2.validate('input3')).toEqual(true);
            });
            afterAll(function () {
                formObj2.destroy();
            });
        });
        describe('custom placement # ', function () {
            beforeAll(function () {
                var customPlace = function (element, error) {
                    element.parentNode.insertBefore(error, element.previousSibling);
                };
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { required: true } } });
                formObj.customPlacement = customPlace;
            });
            it('with invalid value # ', function () {
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('with valid value # ', function () {
                setInputValue(formObj, 'input1', '1234');
                expect(formObj.validate('input1')).toEqual(true);
                formObj.customPlacement = null;
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('custom fuction to rules # ', function () {
            beforeAll(function () {
                var customFn = function (args) {
                    return args['value'].length >= 5;
                };
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { minLength: [customFn, 'Need atleast 5 letters'] } } });
            });
            it('with invalid value # ', function () {
                setInputValue(formObj, 'input1', '234');
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('with valid value # ', function () {
                setInputValue(formObj, 'input1', '123456');
                expect(formObj.validate('input1')).toEqual(true);
            });
            afterAll(function () {
                formObj.destroy();
            });
        });
        describe('selectable  elements # ', function () {
            beforeAll(function () {
                formObj2 = new form_validator_1.FormValidator(formElement2, { rules: { 'select': { required: true } } });
            });
            it('with invalid value # ', function () {
                expect(formObj2.validate('select')).toEqual(false);
            });
            it('with valid value # ', function () {
                setInputValue(formObj2, 'select', '1');
                expect(formObj2.validate('select')).toEqual(true);
            });
            afterAll(function () {
                formObj2.destroy();
            });
        });
        describe('events # ', function () {
            beforeAll(function () {
                var options = {
                    rules: {
                        'input1': { required: true, min: 4 },
                        'input3': { required: true },
                        'input4': { required: true },
                        'select': { required: true }
                    }
                };
                formObj2 = new form_validator_1.FormValidator(formElement2);
                formObj2.rules = options.rules;
            });
            describe('with focusout event # ', function () {
                it('on not added rule value # ', function () {
                    var input = formObj2.getInputElement('input2');
                    event_handler_1.EventHandler.trigger(input, 'focusout', { target: input });
                    var errorElement = formObj2.getInputElement('input2').nextSibling;
                    expect(errorElement === null).toEqual(true);
                });
                it('on included rule value without required # ', function () {
                    formObj2.addRules('input2', { email: true });
                    var input = formObj2.getInputElement('input2');
                    event_handler_1.EventHandler.trigger(input, 'focusout', { target: input });
                    var errorElement = formObj2.getInputElement('input2').nextSibling;
                    expect(errorElement === null).toEqual(true);
                });
                it('on included rule without required and with out value # ', function () {
                    var input = formObj2.getInputElement('input2');
                    setInputValue(formObj2, 'input2', '');
                    event_handler_1.EventHandler.trigger(input, 'focusout', { target: input });
                    var errorElement = formObj2.getInputElement('input2').nextSibling;
                    expect(errorElement === null).toEqual(true);
                });
                it('on included rule value # ', function () {
                    var input = formObj2.getInputElement('input1');
                    setInputValue(formObj2, 'input1', '3');
                    event_handler_1.EventHandler.trigger(input, 'focusout', { target: input });
                    var errorElement = formObj2.getInputElement('input1').nextSibling;
                    expect(errorElement !== null && errorElement.classList.contains(formObj2.errorClass)).toEqual(true);
                });
            });
            describe('with click event # ', function () {
                var errorElement;
                it('validate the checkable element # ', function () {
                    formObj2.validate('input3');
                    errorElement = formObj2.getInputElement('input3').nextSibling;
                    expect(errorElement !== null && errorElement.style.display === 'block').toEqual(true);
                });
                it('with click event on checkable element # ', function () {
                    var input = formObj2.getInputElement('input3');
                    input.checked = true;
                    event_handler_1.EventHandler.trigger(input, 'click', { target: input });
                    expect(errorElement.style.display).toEqual('none');
                });
                it('with click event and submit element # ', function () {
                    var input = formObj2.getInputElement('submit');
                    event_handler_1.EventHandler.trigger(input, 'click', { target: input });
                    expect(errorElement.style.display).toEqual('none');
                });
            });
            describe('with change event # ', function () {
                it('on select element #', function () {
                    var input = formObj2.getInputElement('select');
                    event_handler_1.EventHandler.trigger(input, 'change', { target: input });
                    var errorElement = formObj2.getInputElement('select').nextSibling;
                    expect(errorElement !== null && errorElement.classList.contains(formObj2.errorClass)).toEqual(true);
                });
            });
            describe('with submit event # ', function () {
                beforeAll(function () {
                    formObj2.destroy();
                    formObj2 = new form_validator_1.FormValidator(formElement2, { rules: { 'input1': { required: true } } });
                });
                it('submit button with formnovalidate # ', function () {
                    var input = formObj2.getInputElement('submit');
                    input.setAttribute('formnovalidate', '');
                    event_handler_1.EventHandler.trigger(input, 'click', { target: input });
                    var errorElements = dom_1.selectAll('.' + formObj2.errorClass + ', .' + formObj2.validClass, formObj2.element);
                    expect(errorElements.length === 0).toEqual(true);
                });
                it('allow submit # ', function () {
                    setInputValue(formObj2, 'input1', '123');
                    event_handler_1.EventHandler.trigger(formObj2.element, 'submit', { preventDefault: function () { return false; } });
                    var errorElements = dom_1.selectAll('.' + formObj2.errorClass + ', .' + formObj2.validClass, formObj2.element);
                    expect(errorElements.length === 0).toEqual(true);
                });
                it('prevent submit with validate # ', function () {
                    setInputValue(formObj2, 'input1', '');
                    event_handler_1.EventHandler.trigger(formObj2.element, 'submit', { preventDefault: function () { return false; } });
                    var errorElements = dom_1.selectAll('.' + formObj2.errorClass + ', .' + formObj2.validClass, formObj2.element);
                    expect(errorElements.length > 0).toEqual(true);
                });
            });
            describe('with keyup event # ', function () {
                beforeAll(function () {
                    formObj2.destroy();
                    formObj2 = new form_validator_1.FormValidator(formElement2, { rules: { 'input1': { required: true, min: 4 }, 'input2': { email: true } } });
                });
                it('with value # ', function () {
                    var input = formObj2.getInputElement('input1');
                    setInputValue(formObj2, 'input1', '3');
                    event_handler_1.EventHandler.trigger(input, 'keyup', { target: input });
                    var errorElement = formObj2.getInputElement('input1').nextSibling;
                    expect(errorElement === null).toEqual(true);
                });
                it('with tab key # ', function () {
                    var input = formObj2.getInputElement('input2');
                    event_handler_1.EventHandler.trigger(input, 'keyup', { target: input, which: 9 });
                    var errorElement = formObj2.getInputElement('input2').nextSibling;
                    expect(errorElement === null).toEqual(true);
                });
            });
            afterAll(function () {
                formObj2.destroy();
            });
        });
        describe('custom events # ', function () {
            beforeAll(function () {
                var options = {
                    rules: {
                        'input1': { required: true, min: 4 },
                        'input2': { email: true },
                        'input3': { required: true },
                        'input4': { required: true },
                        'select': { required: true }
                    }
                };
                formObj2 = new form_validator_1.FormValidator(formElement2);
                formObj2.rules = options.rules;
            });
            it('check focusout # ', function () {
                var onFocusout = function () { };
                formObj2.focusout = onFocusout;
                spyOn(formObj2, 'focusout');
                expect(formObj2.focusout).not.toHaveBeenCalled();
                var input = formObj2.getInputElement('input1');
                event_handler_1.EventHandler.trigger(input, 'focusout', { target: input });
                expect(formObj2.focusout).toHaveBeenCalled();
            });
            it('check keyup # ', function () {
                var onKeyup = function () { };
                formObj2.keyup = onKeyup;
                spyOn(formObj2, 'keyup');
                expect(formObj2.keyup).not.toHaveBeenCalled();
                var input = formObj2.getInputElement('input1');
                event_handler_1.EventHandler.trigger(input, 'keyup', { target: input });
                expect(formObj2.keyup).toHaveBeenCalled();
            });
            it('check click # ', function () {
                var onClick = function () { };
                formObj2.keyup = onClick;
                formObj2.click = onClick;
                spyOn(formObj2, 'click');
                expect(formObj2.click).not.toHaveBeenCalled();
                var input = formObj2.getInputElement('input4');
                event_handler_1.EventHandler.trigger(input, 'click', { target: input });
                expect(formObj2.click).toHaveBeenCalled();
            });
            it('check change # ', function () {
                var onChange = function () { };
                formObj2.change = onChange;
                spyOn(formObj2, 'change');
                expect(formObj2.change).not.toHaveBeenCalled();
                var input = formObj2.getInputElement('select');
                event_handler_1.EventHandler.trigger(input, 'change', { target: input });
                expect(formObj2.change).toHaveBeenCalled();
            });
            it('check submit # ', function () {
                var onSubmit = function () { };
                formObj2.submit = onSubmit;
                spyOn(formObj2, 'submit');
                expect(formObj2.submit).not.toHaveBeenCalled();
                event_handler_1.EventHandler.trigger(formObj2.element, 'submit', { preventDefault: function () { return false; } });
                expect(formObj2.submit).toHaveBeenCalled();
            });
            it('check validationBegin # ', function () {
                var onValidationBegin = function () { };
                formObj2.validationBegin = onValidationBegin;
                spyOn(formObj2, 'validationBegin');
                expect(formObj2.validationBegin).not.toHaveBeenCalled();
                formObj2.validate();
                expect(formObj2.validationBegin).toHaveBeenCalled();
            });
            it('check validationComplete # ', function () {
                var onValidationComplete = function () { };
                formObj2.validationComplete = onValidationComplete;
                spyOn(formObj2, 'validationComplete');
                expect(formObj2.validationComplete).not.toHaveBeenCalled();
                formObj2.validate();
                expect(formObj2.validationComplete).toHaveBeenCalled();
            });
        });
        describe('EJ2-902: customPlacement not working properly # ', function () {
            beforeAll(function () {
                document.body.appendChild(formElement);
                var customPlace = function (element, error) {
                    element.parentNode.insertBefore(error, element);
                };
                formObj = new form_validator_1.FormValidator(formElement, { rules: { 'input1': { required: true } } });
                formObj.customPlacement = customPlace;
            });
            it('with invalid value # ', function () {
                expect(formObj.validate('input1')).toEqual(false);
            });
            it('check error element from custom placement with error # ', function () {
                var inputElement = formObj.getInputElement('input1');
                var errorElement = dom_1.select(formObj.errorElement + '.' + formObj.errorClass + '[for="input1"]');
                expect(inputElement.previousSibling).toEqual(errorElement);
            });
            it('with valid value # ', function () {
                setInputValue(formObj, 'input1', '1234');
                expect(formObj.validate('input1')).toEqual(true);
            });
            it('check error element from custom placement with valid value # ', function () {
                var errorElement = dom_1.select(formObj.errorElement + '.' + formObj.errorClass + '[for="input1"]');
                expect(errorElement.style.display).toEqual('none');
            });
            afterAll(function () {
                document.body.removeChild(formElement);
                formObj.customPlacement = null;
                formObj.destroy();
            });
        });
        afterAll(function () {
            formObj2.destroy();
        });
    });
});
