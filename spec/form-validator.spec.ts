import { createElement, isVisible, select, selectAll } from '../src/dom';
import { EventHandler } from '../src/event-handler';
import { FormValidatorModel } from '../src/form-validator-model';
import { FormValidator, ErrorOption } from '../src/form-validator';

/**
 * FormValidator specification 
 */

// input elements initialization
let inputElement1: string = '<div>'
    + createElement('input', { attrs: { id: 'required', type: 'text', name: 'input1' } }).outerHTML + '</div>';
let inputElement2: string = '<div>' + createElement('input', { attrs: { id: 'mail', type: 'text', name: 'input2' } }).outerHTML + '</div>';
let check: string = '<div><input type=\'checkbox\' id=\'check\' name=\'input3\' /></div>';
let radio: string = '<div><input type=\'radio\' id=\'radio\' name=\'input4\' /></div>';
// tslint:disable-next-line:max-line-length
let intSelect: string = '<div><select name=\'select\' id=\'select\'><option value=\'\'>Year</option><option value=\'1\'>1990</option></select></div>';
let submit: string = '<div><input type=\'submit\' id=\'submit\' name=\'submit\' value=\'Submit\' /></div>';

// form elements initialization
let formElement: HTMLFormElement = <HTMLFormElement>createElement('form', { id: 'formId', innerHTML: inputElement1 });
let formElement1: HTMLFormElement = <HTMLFormElement>createElement('form', { id: 'formId1', innerHTML: inputElement1 + inputElement2 + submit });
let formElement2: HTMLFormElement = <HTMLFormElement>createElement('form', { id: 'formId2', innerHTML: inputElement1 + inputElement2 + check + radio + intSelect + submit });

// form object initialization
let formObj: FormValidator;
let formObj1: FormValidator;
let formObj2: FormValidator;

function setInputValue(formObj: FormValidator, name: string, value: string): void {
    (<HTMLInputElement>formObj.element.querySelector('[name=' + name + ']')).value = value;
}

describe('FormValidator # ', () => {
    beforeAll(() => {
        formObj = new FormValidator(formElement);
    });

    it('initialize form object with id # ', () => {
        document.body.appendChild(formElement);
        let formObj: FormValidator = new FormValidator('#formId');
        expect(formObj instanceof FormValidator).toEqual(true);
        document.body.removeChild(formElement);
    });

    it('initialize form object with form element # ', () => {
        let formObj: FormValidator = new FormValidator(formElement);
        expect(formObj instanceof FormValidator).toEqual(true);
    });

    it('initialize form object with invalid form elements # ', () => {
        let formObj: FormValidator = new FormValidator('#form', {});
        expect(formObj.element).toBeNull();
    });

    it('initialize form object with invalid element elements # ', () => {
        let div: HTMLElement = createElement('div', { id: 'divId' });
        let formObj: FormValidator = new FormValidator(div.id, {});
        expect(formObj.element).toBeNull();
    });

    it('check novalidate attribute in the form element # ', () => {
        expect(formObj.element.getAttribute('novalidate')).toEqual('');
    });

    it('check default ignore # ', () => {
        expect(formObj.ignore).toEqual('e-hidden');
    });

    it('check default rules # ', () => {
        expect(formObj.rules).toEqual({});
    });

    it('check default errorClass # ', () => {
        expect(formObj.errorClass).toEqual('e-error');
    });

    it('check default validClass # ', () => {
        expect(formObj.validClass).toEqual('e-valid');
    });

    it('check default errorElement # ', () => {
        expect(formObj.errorElement).toEqual('label');
    });

    it('check default errorContainer # ', () => {
        expect(formObj.errorContainer).toEqual('div');
    });

    it('check default errorOption # ', () => {
        expect(formObj.errorOption).toEqual(ErrorOption.Label);
    });

    it('check default focusout # ', () => {
        expect(formObj.focusout).toBeUndefined();
    });

    it('check default keyup # ', () => {
        expect(formObj.keyup).toBeUndefined();
    });

    it('check default click # ', () => {
        expect(formObj.click).toBeUndefined();
    });

    it('check default change # ', () => {
        expect(formObj.change).toBeUndefined();
    });

    it('check default submit # ', () => {
        expect(formObj.submit).toBeUndefined();
    });

    it('check default validationBegin # ', () => {
        expect(formObj.validationBegin).toBeUndefined();
    });

    it('check default validationBegin # ', () => {
        expect(formObj.validationComplete).toBeUndefined();
    });

    it('check default customPlacement # ', () => {
        expect(formObj.customPlacement).toBeUndefined();
    });

    it('check module name # ', () => {
        expect(formObj.getModuleName()).toEqual('formValidator');
    });

    it('check modified ignore # ', () => {
        formObj.ignore = 'ignore';
        expect(formObj.ignore).toEqual('ignore');
    });

    it('check modified rules # ', () => {
        let options: FormValidatorModel = { rules: { 'input1': { required: true } } };
        formObj.rules = options.rules;
        expect(formObj.rules).not.toEqual({});
    });

    it('check modified errorClass # ', () => {
        formObj.errorClass = 'error';
        expect(formObj.errorClass).toEqual('error');
    });

    it('check modified validClass # ', () => {
        formObj.validClass = 'valid';
        expect(formObj.validClass).toEqual('valid');
    });

    it('check modified errorElement # ', () => {
        formObj.errorElement = 'div';
        expect(formObj.errorElement).toEqual('div');
    });

    it('check modified errorContainer # ', () => {
        formObj.errorContainer = 'span';
        expect(formObj.errorContainer).toEqual('span');
    });

    it('check modified errorOption # ', () => {
        formObj.errorOption = ErrorOption.Message;
        expect(formObj.errorOption).toEqual(ErrorOption.Message);
    });

    it('check modified focusout # ', () => {
        let onFocusOut: (args: Object) => void = (args: Object) => { return true; };
        formObj.focusout = onFocusOut;
        expect(formObj.focusout).not.toBeNull();
    });

    it('check modified keyup # ', () => {
        let onKeyup: (args: Object) => void = (args: Object) => { };
        formObj.keyup = onKeyup;
        expect(formObj.keyup).not.toBeNull();
    });

    it('check modified click # ', () => {
        let onClick: (args: Object) => void = (args: Object) => { };
        formObj.click = onClick;
        expect(formObj.click).not.toBeNull();
    });

    it('check modified change # ', () => {
        let onChange: (args: Object) => void = (args: Object) => { };
        formObj.change = onChange;
        expect(formObj.change).not.toBeNull();
    });

    it('check modified submit # ', () => {
        let onSubmit: (args: Object) => void = (args: Object) => { };
        formObj.submit = onSubmit;
        expect(formObj.submit).not.toBeNull();
    });

    it('check modified validationBegin # ', () => {
        let begin: (args: Object) => void = (args: Object) => { };
        formObj.validationBegin = begin;
        expect(formObj.validationBegin).not.toBeNull();
    });

    it('check modified validationComplete # ', () => {
        let complete: (args: Object) => void = (args: Object) => { };
        formObj.validationComplete = complete;
        expect(formObj.validationComplete).not.toBeNull();
    });

    it('check modified customPlacement # ', () => {
        let placeError: (args: Object) => void = (args: Object) => { };
        formObj.customPlacement = placeError;
        expect(formObj.customPlacement).not.toBeNull();
        formObj.customPlacement = null;
    });

    it('rules with array value # ', () => {
        let options: FormValidatorModel = { rules: { 'input1': { range: [1, 5] } } };
        formObj.rules = options.rules;
        let arr: number[] = <number[]>formObj.rules['input1']['range'];
        expect(arr).toEqual([1, 5]);
    });

    it('rules with array value # ', () => {
        let customFn: (args: Object) => boolean = (args: Object) => { return true; };
        let options: FormValidatorModel = { rules: { 'input1': { range: customFn } } };
        formObj.rules = options.rules;
        let fn: Function = <Function>formObj.rules['input1']['range'];
        expect(fn).toEqual(customFn);
    });

    it('custom rules in rules # ', () => {
        let options: FormValidatorModel = { rules: { 'input1': { customRule: true } } };
        formObj.rules = options.rules;
        let customRule: boolean = <boolean>formObj.rules['input1']['customRule'];
        expect(customRule).toBeDefined();
    });

    it('rules with custom message # ', () => {
        let options: FormValidatorModel = { rules: { 'input1': { required: [true, 'This field must not empty'] } } };
        formObj.rules = options.rules;
        let input1: Object[] = <Object[]>formObj.rules['input1']['required'];
        expect(input1[1]).toEqual('This field must not empty');
    });

    afterAll(() => {
        formObj.destroy();
    });

    describe('addRules method # ', () => {
        let options: FormValidatorModel;
        beforeAll(() => {
            formObj = new FormValidator(formElement);
            options = { rules: { 'input1': { required: true } } };
        });

        it('with new value # ', () => {
            formObj.addRules('input1', { required: true });
            expect(formObj.rules['input1']).toEqual(options.rules['input1']);
        });

        it('with existing value # ', () => {
            options = { rules: { 'input1': { required: true, email: true } } };
            formObj.addRules('input1', { email: true });
            expect(formObj.rules['input1']).toEqual(options.rules['input1']);
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('removeRules method # ', () => {
        it('with name and rule # ', () => {
            formObj.removeRules('input1', ['email']);
            expect(formObj.rules['input1']).toEqual({ required: true });
        });

        it('with not included name # ', () => {
            formObj.removeRules('max', ['email']);
            expect(formObj.rules['max']).toBeUndefined();
        });

        it('with correct name and no rule # ', () => {
            formObj.removeRules('input1');
            expect(formObj.rules['input1']).toBeUndefined();
        });

        it('with no name and no rule # ', () => {
            formObj.removeRules();
            expect(formObj.rules).toEqual({});
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('validate method # ', () => {
        beforeAll(() => {
            formObj1 = new FormValidator(formElement1, { rules: { 'input1': { required: true, email: true }, 'input2': { required: true } } });
        });

        describe('with selected name # ', () => {
            it('testing current input with error element # ', () => {
                formObj1.validate('input1');
                let errorElement: HTMLElement = <HTMLElement>formObj1.getInputElement('input1').nextSibling;
                expect(errorElement !== null && errorElement.classList.contains('e-error')).toEqual(true);
            });

            it('testing next input with error element # ', () => {
                let errorElement: HTMLElement = <HTMLElement>formObj1.getInputElement('input2').nextSibling;
                expect(errorElement !== null && errorElement.classList.contains('e-error')).toEqual(false);
            });
        });

        describe('with out selected name # ', () => {
            it('testing current input with error element # ', () => {
                formObj1.validate();
                let errorElement: HTMLElement = <HTMLElement>formObj1.getInputElement('input1').nextSibling;
                expect(errorElement !== null && errorElement.classList.contains('e-error')).toEqual(true);
            });

            it('testing next input with error element # ', () => {
                formObj1.validate();
                let errorElement: HTMLElement = <HTMLElement>formObj1.getInputElement('input2').nextSibling;
                expect(errorElement !== null && errorElement.classList.contains('e-error')).toEqual(true);
            });
        });

        afterAll(() => {
            formObj1.destroy();
        });
    });

    describe('reset method # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { required: true, email: true } } });
        });

        it('testing input without value before form reset # ', () => {
            let input: HTMLInputElement = <HTMLInputElement>select('#required', formObj.element);
            input.name = '';
            formObj.reset();
            expect(input.classList.contains(formObj.errorClass)).toEqual(false);
            input.name = 'input1';
        });

        it('testing input value before form reset # ', () => {
            setInputValue(formObj, 'input1', '1234');
            let value: string = formObj.getInputElement('input1').value;
            expect(value).toEqual('1234');
        });

        it('testing input value after form validate # ', () => {
            formObj.validate('input1');
            let value: string = formObj.getInputElement('input1').value;
            expect(value).toEqual('1234');
        });

        it('testing error element form validate # ', () => {
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement !== null && errorElement.classList.contains('e-error')).toEqual(true);
        });

        it('testing input attribute aria-invalid after form validate # ', () => {
            expect(formObj.getInputElement('input1').getAttribute('aria-invalid')).toEqual('true');
        });

        it('testing input error class after form validate # ', () => {
            expect(formObj.getInputElement('input1').classList.contains(formObj.errorClass)).toEqual(true);
        });

        it('testing input value after form reset # ', () => {
            formObj.reset();
            let value: string = formObj.getInputElement('input1').value;
            expect(value).toEqual('');
        });

        it('testing error element visible state after form reset # ', () => {
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(isVisible(errorElement)).toEqual(false);
        });

        it('testing input attribute aria-invalid after form reset # ', () => {
            expect(formObj.getInputElement('input1').getAttribute('aria-invalid')).toEqual('false');
        });

        it('testing input error class after form reset # ', () => {
            expect(formObj.getInputElement('input1').classList.contains(formObj.errorClass)).toEqual(false);
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('getInputElement method # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { required: true } } });
        });

        it('with valid input element # ', () => {
            expect(formObj.getInputElement('input1') !== null).toEqual(true);
        });

        it('with invalid input element # ', () => {
            expect(formObj.getInputElement('inputs') === null).toEqual(true);
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('default messages # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement);
        });

        it('testing required message # ', () => {
            expect(formObj.defaultMessages['required']).toEqual('This field is required.');
        });

        it('testing email message # ', () => {
            expect(formObj.defaultMessages['email']).toEqual('Please enter a valid email address.');
        });

        it('testing url message # ', () => {
            expect(formObj.defaultMessages['url']).toEqual('Please enter a valid URL.');
        });

        it('testing date message # ', () => {
            expect(formObj.defaultMessages['date']).toEqual('Please enter a valid date.');
        });

        it('testing dateIso message # ', () => {
            expect(formObj.defaultMessages['dateIso']).toEqual('Please enter a valid date ( ISO ).');
        });

        it('testing number message # ', () => {
            expect(formObj.defaultMessages['number']).toEqual('Please enter a valid number.');
        });

        it('testing digits message # ', () => {
            expect(formObj.defaultMessages['digits']).toEqual('Please enter only digits.');
        });

        it('testing maxLength message # ', () => {
            expect(formObj.defaultMessages['maxLength']).toEqual('Please enter no more than {0} characters.');
        });

        it('testing minLength message # ', () => {
            expect(formObj.defaultMessages['minLength']).toEqual('Please enter at least {0} characters.');
        });

        it('testing rangeLength message # ', () => {
            expect(formObj.defaultMessages['rangeLength']).toEqual('Please enter a value between {0} and {1} characters long.');
        });

        it('testing range message # ', () => {
            expect(formObj.defaultMessages['range']).toEqual('Please enter a value between {0} and {1}.');
        });

        it('testing max message # ', () => {
            expect(formObj.defaultMessages['max']).toEqual('Please enter a value less than or equal to {0}.');
        });

        it('testing min message # ', () => {
            expect(formObj.defaultMessages['min']).toEqual('Please enter a value greater than or equal to {0}.');
        });

        it('testing regex message # ', () => {
            expect(formObj.defaultMessages['regex']).toEqual('Please enter a correct value.');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('ignore element #', () => {
        beforeAll(() => {
            formObj1 = new FormValidator(formElement1, { rules: { 'input1': { required: true }, 'input2': { required: true } }, ignore: 'ignore' });
            formObj1.getInputElement('input2').classList.add('ignore');
        });

        it('with validate method of ignore element # ', () => {
            formObj1.validate('input2');
            let errorElement: HTMLElement = <HTMLElement>formObj1.getInputElement('input2').nextSibling;
            expect(errorElement === null).toEqual(true);
        });

        describe('with validate method of no selected name # ', () => {
            it('testing error element # ', () => {
                formObj1.validate();
                let errorElement: HTMLElement = <HTMLElement>formObj1.getInputElement('input1').nextSibling;
                expect(errorElement !== null && errorElement.classList.contains(formObj1.errorClass)).toEqual(true);
            });

            it('testing ignore element # ', () => {
                let errorElement: HTMLElement = <HTMLElement>formObj1.getInputElement('input2').nextSibling;
                expect(errorElement === null).toEqual(true);
            });
        });

        afterAll(() => {
            formObj1.destroy();
        });
    });

    describe('aria-invalid # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { required: true, email: true } } });
        });

        it('with invalid value # ', () => {
            setInputValue(formObj, 'input1', 'abc');
            formObj.validate('input1');
            let element: HTMLElement = formObj.getInputElement('input1');
            expect(element.getAttribute('aria-invalid')).toEqual('true');
        });

        it('with valid value # ', () => {
            setInputValue(formObj, 'input1', 'a@s.com');
            formObj.validate('input1');
            let element: HTMLElement = formObj.getInputElement('input1');
            expect(element.getAttribute('aria-invalid')).toEqual('false');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('aria-describedby # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { required: true, email: true } } });
        });

        it('with valid element # ', () => {
            setInputValue(formObj, 'input1', 'a@s.com');
            formObj.validate('input1');
            let element: HTMLElement = formObj.getInputElement('input1');
            expect(element.getAttribute('aria-describedby')).toEqual(element.id + '-info');
        });

        it('with invalid element # ', () => {
            setInputValue(formObj, 'input1', 'abc');
            formObj.validate('input1');
            let element: HTMLElement = formObj.getInputElement('input1');
            expect(element.getAttribute('aria-describedby')).toEqual(element.id + '-info');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('aria-required # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { required: true } } });
        });

        it('with invalid element # ', () => {
            setInputValue(formObj, 'input1', '');
            formObj.validate('input1');
            let element: HTMLElement = formObj.getInputElement('input1');
            expect(element.getAttribute('aria-required')).toEqual('true');
        });

        it('with valid element # ', () => {
            setInputValue(formObj, 'input1', 'abc');
            formObj.validate('input1');
            let element: HTMLElement = formObj.getInputElement('input1');
            expect(element.getAttribute('aria-required')).toEqual('true');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('required validation # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { required: true } } });
        });

        it('initial validation without value # ', () => {
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing error element # ', () => {
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.classList.contains('e-error')).toEqual(true);
        });

        it('required success # ', () => {
            setInputValue(formObj, 'input1', '1234');
            formObj.validate('input1');
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.style.display).toEqual('none');
            setInputValue(formObj, 'input1', '');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('email validation #', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { email: true } } });
        });

        it('initial validation without value # ', () => {
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing wrong email - case 1 # ', () => {
            setInputValue(formObj, 'input1', '@a.com');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing error element # ', () => {
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.classList.contains('e-error')).toEqual(true);
        });

        it('testing wrong email - case 2 # ', () => {
            setInputValue(formObj, 'input1', 'com');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong email - case 3 # ', () => {
            setInputValue(formObj, 'input1', '123@');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing correct email # ', () => {
            setInputValue(formObj, 'input1', 'a@s.com');
            expect(formObj.validate('input1')).toEqual(true);
            setInputValue(formObj, 'input1', '');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('url validation #', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { url: true } } });
        });

        it('initial validation without value # ', () => {
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing wrong url - case 1 # ', () => {
            setInputValue(formObj, 'input1', 'http');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing error element # ', () => {
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.classList.contains('e-error')).toEqual(true);
        });

        it('testing wrong url - case 2 # ', () => {
            setInputValue(formObj, 'input1', ':http//');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong url - case 3 # ', () => {
            setInputValue(formObj, 'input1', 's//:http.com');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong url - case 4 # ', () => {
            setInputValue(formObj, 'input1', 'www//:http.com');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing correct url # ', () => {
            setInputValue(formObj, 'input1', 'http://www.s.com/');
            expect(formObj.validate('input1')).toEqual(true);
            setInputValue(formObj, 'input1', '');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('date validation #', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { date: true } } });
        });

        it('initial validation without value # ', () => {
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing wrong date - case 1 # ', () => {
            setInputValue(formObj, 'input1', '12/0');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing error element # ', () => {
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.classList.contains('e-error')).toEqual(true);
        });

        it('testing wrong date - case 2 # ', () => {
            setInputValue(formObj, 'input1', '/23/12');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong date - case 3 # ', () => {
            setInputValue(formObj, 'input1', 'May');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong date - case 4 # ', () => {
            setInputValue(formObj, 'input1', '4th');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong date - case 5 # ', () => {
            setInputValue(formObj, 'input1', '90\'s');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing correct date - case 1 # ', () => {
            setInputValue(formObj, 'input1', '12/31/2014');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing correct date - case 2 # ', () => {
            setInputValue(formObj, 'input1', '01/13/2345');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing correct date - case 3 # ', () => {
            setInputValue(formObj, 'input1', '12/23/34');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing correct date - case 4 # ', () => {
            setInputValue(formObj, 'input1', '05/15/2016');
            expect(formObj.validate('input1')).toEqual(true);
            setInputValue(formObj, 'input1', '');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('dateIso validation # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { dateIso: true } } });
        });

        it('initial validation without value # ', () => {
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing wrong dateIso - case 1 # ', () => {
            setInputValue(formObj, 'input1', '12-12-12');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing error element # ', () => {
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.classList.contains('e-error')).toEqual(true);
        });

        it('testing wrong dateIso - case 2 # ', () => {
            setInputValue(formObj, 'input1', '12/04/2015');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong dateIso - case 3 # ', () => {
            setInputValue(formObj, 'input1', '1234-234-34');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong dateIso - case 4 # ', () => {
            setInputValue(formObj, 'input1', '2017-32-05');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing dateIso ends with 0 date # ', () => {
            setInputValue(formObj, 'input1', '2016-05-20');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing correct dateIso # ', () => {
            setInputValue(formObj, 'input1', '2016-05-15');
            expect(formObj.validate('input1')).toEqual(true);
            setInputValue(formObj, 'input1', '');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('number validation # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { number: true } } });
        });

        it('initial validation without value # ', () => {
            expect(formObj.validate('input1')).toEqual(true);
        });


        it('testing wrong number - case 1 # ', () => {
            setInputValue(formObj, 'input1', '12-32');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing error element # ', () => {
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.classList.contains('e-error')).toEqual(true);
        });

        it('testing wrong number - case 2 # ', () => {
            setInputValue(formObj, 'input1', '23,34');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong number - case 3 # ', () => {
            setInputValue(formObj, 'input1', 'one');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong number - case 4 # ', () => {
            setInputValue(formObj, 'input1', '12fds');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing correct number - case 1 # ', () => {
            setInputValue(formObj, 'input1', '12345');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing white space - inbetween # ', () => {
            setInputValue(formObj, 'input1', '1 2');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing white space - begin # ', () => {
            setInputValue(formObj, 'input1', ' 1');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing white space - end # ', () => {
            setInputValue(formObj, 'input1', '1 ');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing correct number - case 2 # ', () => {
            setInputValue(formObj, 'input1', '-12.34');
            expect(formObj.validate('input1')).toEqual(true);
            setInputValue(formObj, 'input1', '');
            formObj.removeRules();
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('digits validation # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { digits: true } } });
        });

        it('initial validation without value # ', () => {
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing wrong digits - case 1 # ', () => {
            setInputValue(formObj, 'input1', '12-32');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing error element # ', () => {
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.classList.contains('e-error')).toEqual(true);
        });

        it('testing wrong digits - case 2 # ', () => {
            setInputValue(formObj, 'input1', '23,34');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong digits - case 3 # ', () => {
            setInputValue(formObj, 'input1', 'one');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong digits - case 4 # ', () => {
            setInputValue(formObj, 'input1', '12fds');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong digits - case 5 # ', () => {
            setInputValue(formObj, 'input1', '-12.34');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing correct digits # ', () => {
            setInputValue(formObj, 'input1', '12345');
            expect(formObj.validate('input1')).toEqual(true);
            setInputValue(formObj, 'input1', '');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('minLength validation # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { minLength: 5 } } });
        });

        it('initial validation without value # ', () => {
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing wrong minLength - case 1 # ', () => {
            setInputValue(formObj, 'input1', '12-2');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing error element # ', () => {
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.classList.contains('e-error')).toEqual(true);
        });

        it('testing wrong minLength - case 2 # ', () => {
            setInputValue(formObj, 'input1', '12');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong minLength - case 3 # ', () => {
            setInputValue(formObj, 'input1', 'one');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong minLength - case 4 # ', () => {
            setInputValue(formObj, 'input1', '12fd');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong minLength - case 5 # ', () => {
            setInputValue(formObj, 'input1', '-1.5');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing correct minLength - case 1 # ', () => {
            setInputValue(formObj, 'input1', '12345');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing correct minLength - case 2 # ', () => {
            setInputValue(formObj, 'input1', '123-34');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing correct minLength - case 3 # ', () => {
            setInputValue(formObj, 'input1', 'one, two');
            expect(formObj.validate('input1')).toEqual(true);
            setInputValue(formObj, 'input1', '');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('maxLength validation # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { maxLength: 5 } } });
        });

        it('initial validation without value # ', () => {
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing wrong maxLength - case 1 # ', () => {
            setInputValue(formObj, 'input1', '12-2235');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing error element # ', () => {
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.classList.contains('e-error')).toEqual(true);
        });

        it('testing wrong maxLength - case 2 # ', () => {
            setInputValue(formObj, 'input1', '1232435');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong maxLength - case 3 # ', () => {
            setInputValue(formObj, 'input1', 'one,two');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong maxLength - case 4 # ', () => {
            setInputValue(formObj, 'input1', '12fd23');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong maxLength - case 5 # ', () => {
            setInputValue(formObj, 'input1', '-1.5.56');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing correct maxLength - case 1 # ', () => {
            setInputValue(formObj, 'input1', '12345');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing correct maxLength - case 2 # ', () => {
            setInputValue(formObj, 'input1', '12-5');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing correct maxLength - case 3 # ', () => {
            setInputValue(formObj, 'input1', 'one');
            expect(formObj.validate('input1')).toEqual(true);
            setInputValue(formObj, 'input1', '');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('rangeLength validation # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { rangeLength: [1, 5] } } });
        });

        it('initial validation without value # ', () => {
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing wrong rangeLength - case 1 # ', () => {
            setInputValue(formObj, 'input1', '12-2235');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing error element # ', () => {
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.classList.contains('e-error')).toEqual(true);
        });


        it('testing wrong rangeLength - case 2 # ', () => {
            setInputValue(formObj, 'input1', '1232435');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong rangeLength - case 3 # ', () => {
            setInputValue(formObj, 'input1', 'one,two');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong rangeLength - case 4 # ', () => {
            setInputValue(formObj, 'input1', '12fd23');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong rangeLength - case 5 # ', () => {
            setInputValue(formObj, 'input1', '-1.5.56');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing correct rangeLength - case 1 # ', () => {
            setInputValue(formObj, 'input1', '12345');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing correct rangeLength - case 2 # ', () => {
            setInputValue(formObj, 'input1', '12-5');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing correct rangeLength - case 3 # ', () => {
            setInputValue(formObj, 'input1', 'one');
            expect(formObj.validate('input1')).toEqual(true);
            setInputValue(formObj, 'input1', '');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('range validation # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { range: [1, 5] } } });
        });

        it('initial validation without value # ', () => {
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing wrong range - case 1 # ', () => {
            setInputValue(formObj, 'input1', '0');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing error element # ', () => {
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.classList.contains('e-error')).toEqual(true);
        });


        it('testing wrong range - case 2 # ', () => {
            setInputValue(formObj, 'input1', '1232435');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong range - case 3 # ', () => {
            setInputValue(formObj, 'input1', 'one');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong range - case 4 # ', () => {
            setInputValue(formObj, 'input1', '12fd23');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong range - case 5 # ', () => {
            setInputValue(formObj, 'input1', '-1.5');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing correct range - case 1 # ', () => {
            setInputValue(formObj, 'input1', '1');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing correct range - case 2 # ', () => {
            setInputValue(formObj, 'input1', '3');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing correct range - case 3 # ', () => {
            setInputValue(formObj, 'input1', '5');
            expect(formObj.validate('input1')).toEqual(true);
            setInputValue(formObj, 'input1', '');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('max validation # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { max: 5 } } });
        });

        it('initial validation without value # ', () => {
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing wrong max - case 1 # ', () => {
            setInputValue(formObj, 'input1', '7');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing error element', () => {
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.classList.contains('e-error')).toEqual(true);
        });
        it('testing wrong max - case 2 # ', () => {
            setInputValue(formObj, 'input1', '1232435');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong max - case 3 # ', () => {
            setInputValue(formObj, 'input1', 'one');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong max - case 4 # ', () => {
            setInputValue(formObj, 'input1', '12fd23');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong max - case 5 # ', () => {
            setInputValue(formObj, 'input1', '5.1');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing correct max - case 1 # ', () => {
            setInputValue(formObj, 'input1', '1');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing correct max - case 2 # ', () => {
            setInputValue(formObj, 'input1', '0');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing correct max - case 3 # ', () => {
            setInputValue(formObj, 'input1', '-1.5');
            expect(formObj.validate('input1')).toEqual(true);
            setInputValue(formObj, 'input1', '');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('min validation # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { min: 5 } } });
        });

        it('initial validation without value # ', () => {
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing wrong min - case 1 # ', () => {
            setInputValue(formObj, 'input1', '1');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing error element # ', () => {
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.classList.contains('e-error')).toEqual(true);
        });

        it('testing wrong min - case 2 # ', () => {
            setInputValue(formObj, 'input1', '0');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong min - case 3 # ', () => {
            setInputValue(formObj, 'input1', '2.6');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong min - case 4 # ', () => {
            setInputValue(formObj, 'input1', '-1.5');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing wrong min - case 5 # ', () => {
            setInputValue(formObj, 'input1', 'one');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing correct min - case 1 # ', () => {
            setInputValue(formObj, 'input1', '10');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing correct min - case 2 # ', () => {
            setInputValue(formObj, 'input1', '5');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing correct min - case 3 # ', () => {
            setInputValue(formObj, 'input1', '5.1');
            expect(formObj.validate('input1')).toEqual(true);
            setInputValue(formObj, 'input1', '');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('regex validation # ', () => {
        beforeAll(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { regex: '^[0-5]*$' } } });
        });

        it('initial validation without value # ', () => {
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('testing wrong regex - case 1 # ', () => {
            setInputValue(formObj, 'input1', 'asfd');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing error element # ', () => {
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.classList.contains('e-error')).toEqual(true);
        });

        it('testing wrong regex - case 2 # ', () => {
            setInputValue(formObj, 'input1', '5.1');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('testing correct regex # ', () => {
            setInputValue(formObj, 'input1', '4');
            expect(formObj.validate('input1')).toEqual(true);
            setInputValue(formObj, 'input1', '');
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('errorOption # ', () => {
        beforeEach(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { required: true } } });
        });

        afterEach(() => {
            formObj.destroy();
        });

        it('with label option # ', () => {
            formObj.validate('input1');
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.tagName.toLowerCase() === formObj.errorElement).toEqual(true);
            formObj.destroy();
        });


        it('with message option # ', () => {
            formObj.errorOption = ErrorOption.Message;
            formObj.validate('input1');
            let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
            expect(errorElement.tagName.toLowerCase() === formObj.errorContainer).toEqual(true);
        });
    });

    describe('destroy method # ', () => {
        beforeEach(() => {
            formObj = new FormValidator(formElement, { rules: { 'input1': { required: true, email: true } } });
        });

        describe('with error elements # ', () => {
            it('testing error element before destroy # ', () => {
                formObj.validate('input1');
                let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
                expect(errorElement !== null && formObj.getInputElement('input1').classList.contains(formObj.errorClass)).toEqual(true);
            });

            it('testing error element after destroy # ', () => {
                formObj.destroy();
                let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
                expect(errorElement).toBeNull();
            });
        });

        describe('with valid elements # ', () => {
            it('testing error element before destroy # ', () => {
                formObj.validate('input1');
                let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
                expect(errorElement !== null && formObj.getInputElement('input1').classList.contains(formObj.errorClass)).toEqual(true);
            });

            it('testing valid element before destroy # ', () => {
                setInputValue(formObj, 'input1', 'a@s.com');
                formObj.validate('input1');
                let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
                expect(
                    errorElement !== null && errorElement.style.display === 'none' &&
                    formObj.getInputElement('input1').classList.contains(formObj.validClass)).toEqual(true);
            });

            it('testing valid element after destroy # ', () => {
                formObj.destroy();
                let errorElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1').nextSibling;
                expect(errorElement === null).toEqual(true);
            });
        });
    });

    describe('checkable elements # ', () => {
        let errorElement: HTMLElement;
        beforeAll(() => {
            formObj2 = new FormValidator(formElement2, { rules: { 'input3': { required: true }, 'input4': { required: true } } });
        });

        it('with checkbox invalid # ', () => {
            formObj2.validate('input3');
            errorElement = <HTMLElement>formObj2.getInputElement('input3').nextSibling;
            expect(errorElement !== null && errorElement.classList.contains(formObj2.errorClass)).toEqual(true);
        });

        it('with checkbox valid # ', () => {
            let check: HTMLInputElement = <HTMLInputElement>select('[name=input3]', formObj2.element);
            check.checked = true;
            formObj2.validate('input3');
            expect(isVisible(errorElement)).toEqual(false);
        });

        it('with radio invalid # ', () => {
            formObj2.validate('input4');
            errorElement = <HTMLElement>formObj2.getInputElement('input4').nextSibling;
            expect(errorElement !== null && errorElement.classList.contains(formObj2.errorClass)).toEqual(true);
        });

        it('with radio valid # ', () => {
            let radio: HTMLInputElement = <HTMLInputElement>select('[name=input4]', formObj2.element);
            radio.checked = true;
            formObj2.validate('input4');
            expect(isVisible(errorElement)).toEqual(false);
        });

        it('with invalid rule # ', () => {
            let options: FormValidatorModel = { rules: { 'input3': { email: true } } };
            formObj2.rules = options.rules;
            expect(formObj2.validate('input3')).toEqual(true);
        });

        afterAll(() => {
            formObj2.destroy();
        });
    });

    describe('custom placement # ', () => {
        beforeAll(() => {
            let customPlace: (element: HTMLElement, error: HTMLElement) => void = (element: HTMLElement, error: HTMLElement) => {
                element.parentNode.insertBefore(error, element.previousSibling);
            };
            formObj = new FormValidator(formElement, { rules: { 'input1': { required: true } } });
            formObj.customPlacement = customPlace;
        });

        it('with invalid value # ', () => {

            expect(formObj.validate('input1')).toEqual(false);
        });

        it('with valid value # ', () => {
            setInputValue(formObj, 'input1', '1234');
            expect(formObj.validate('input1')).toEqual(true);
            formObj.customPlacement = null;
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('custom fuction to rules # ', () => {
        beforeAll(() => {
            let customFn: (args: { [key: string]: string }) => boolean = (args: { [key: string]: string }) => {
                return args['value'].length >= 5;
            };
            formObj = new FormValidator(formElement, { rules: { 'input1': { minLength: [customFn, 'Need atleast 5 letters'] } } });
        });

        it('with invalid value # ', () => {
            setInputValue(formObj, 'input1', '234');
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('with valid value # ', () => {
            setInputValue(formObj, 'input1', '123456');
            expect(formObj.validate('input1')).toEqual(true);
        });

        afterAll(() => {
            formObj.destroy();
        });
    });

    describe('selectable  elements # ', () => {
        beforeAll(() => {
            formObj2 = new FormValidator(formElement2, { rules: { 'select': { required: true } } });
        });

        it('with invalid value # ', () => {
            expect(formObj2.validate('select')).toEqual(false);
        });

        it('with valid value # ', () => {
            setInputValue(formObj2, 'select', '1');
            expect(formObj2.validate('select')).toEqual(true);
        });

        afterAll(() => {
            formObj2.destroy();
        });
    });

    describe('events # ', () => {
        beforeAll(() => {
            let options: FormValidatorModel = {
                rules: {
                    'input1': { required: true, min: 4 },
                    'input3': { required: true },
                    'input4': { required: true },
                    'select': { required: true }
                }
            };
            formObj2 = new FormValidator(formElement2);
            formObj2.rules = options.rules;
        });

        describe('with focusout event # ', () => {
            it('on not added rule value # ', () => {
                let input: HTMLInputElement = formObj2.getInputElement('input2');
                EventHandler.trigger(input, 'focusout', { target: input });
                let errorElement: HTMLElement = <HTMLElement>formObj2.getInputElement('input2').nextSibling;
                expect(errorElement === null).toEqual(true);
            });

            it('on included rule value without required # ', () => {
                formObj2.addRules('input2', { email: true });
                let input: HTMLInputElement = formObj2.getInputElement('input2');
                EventHandler.trigger(input, 'focusout', { target: input });
                let errorElement: HTMLElement = <HTMLElement>formObj2.getInputElement('input2').nextSibling;
                expect(errorElement === null).toEqual(true);
            });

            it('on included rule without required and with out value # ', () => {
                let input: HTMLInputElement = formObj2.getInputElement('input2');
                setInputValue(formObj2, 'input2', '');
                EventHandler.trigger(input, 'focusout', { target: input });
                let errorElement: HTMLElement = <HTMLElement>formObj2.getInputElement('input2').nextSibling;
                expect(errorElement === null).toEqual(true);
            });

            it('on included rule value # ', () => {
                let input: HTMLInputElement = formObj2.getInputElement('input1');
                setInputValue(formObj2, 'input1', '3');
                EventHandler.trigger(input, 'focusout', { target: input });
                let errorElement: HTMLElement = <HTMLElement>formObj2.getInputElement('input1').nextSibling;
                expect(errorElement !== null && errorElement.classList.contains(formObj2.errorClass)).toEqual(true);
            });
        });

        describe('with click event # ', () => {
            let errorElement: HTMLElement;
            it('validate the checkable element # ', () => {
                formObj2.validate('input3');
                errorElement = <HTMLElement>formObj2.getInputElement('input3').nextSibling;
                expect(errorElement !== null && errorElement.style.display === 'block').toEqual(true);
            });

            it('with click event on checkable element # ', () => {
                let input: HTMLInputElement = formObj2.getInputElement('input3');
                input.checked = true;
                EventHandler.trigger(input, 'click', { target: input });
                expect(errorElement.style.display).toEqual('none');
            });

            it('with click event and submit element # ', () => {
                let input: HTMLInputElement = formObj2.getInputElement('submit');
                EventHandler.trigger(input, 'click', { target: input });
                expect(errorElement.style.display).toEqual('none');
            });
        });

        describe('with change event # ', () => {
            it('on select element #', () => {
                let input: HTMLInputElement = formObj2.getInputElement('select');
                EventHandler.trigger(input, 'change', { target: input });
                let errorElement: HTMLElement = <HTMLElement>formObj2.getInputElement('select').nextSibling;
                expect(errorElement !== null && errorElement.classList.contains(formObj2.errorClass)).toEqual(true);
            });
        });

        describe('with submit event # ', () => {
            beforeAll(() => {
                formObj2.destroy();
                formObj2 = new FormValidator(formElement2, { rules: { 'input1': { required: true } } });
            });

            it('submit button with formnovalidate # ', () => {
                let input: HTMLInputElement = formObj2.getInputElement('submit');
                input.setAttribute('formnovalidate', '');
                EventHandler.trigger(input, 'click', { target: input });
                let errorElements: Element[] = selectAll('.' + formObj2.errorClass + ', .' + formObj2.validClass, formObj2.element);
                expect(errorElements.length === 0).toEqual(true);
            });

            it('allow submit # ', () => {
                setInputValue(formObj2, 'input1', '123');
                EventHandler.trigger(formObj2.element, 'submit', { preventDefault: () => { return false; } });
                let errorElements: Element[] = selectAll('.' + formObj2.errorClass + ', .' + formObj2.validClass, formObj2.element);
                expect(errorElements.length === 0).toEqual(true);
            });

            it('prevent submit with validate # ', () => {
                setInputValue(formObj2, 'input1', '');
                EventHandler.trigger(formObj2.element, 'submit', { preventDefault: () => { return false; } });
                let errorElements: Element[] = selectAll('.' + formObj2.errorClass + ', .' + formObj2.validClass, formObj2.element);
                expect(errorElements.length > 0).toEqual(true);
            });
        });

        describe('with keyup event # ', () => {
            beforeAll(() => {
                formObj2.destroy();
                formObj2 = new FormValidator(formElement2, { rules: { 'input1': { required: true, min: 4 }, 'input2': { email: true } } });
            });

            it('with value # ', () => {
                let input: HTMLInputElement = formObj2.getInputElement('input1');
                setInputValue(formObj2, 'input1', '3');
                EventHandler.trigger(input, 'keyup', { target: input });
                let errorElement: HTMLElement = <HTMLElement>formObj2.getInputElement('input1').nextSibling;
                expect(errorElement === null).toEqual(true);
            });

            it('with tab key # ', () => {
                let input: HTMLInputElement = formObj2.getInputElement('input2');
                EventHandler.trigger(input, 'keyup', { target: input, which: 9 });
                let errorElement: HTMLElement = <HTMLElement>formObj2.getInputElement('input2').nextSibling;
                expect(errorElement === null).toEqual(true);
            });
        });

        afterAll(() => {
            formObj2.destroy();
        });
    });

    describe('custom events # ', () => {
        beforeAll(() => {
            let options: FormValidatorModel = {
                rules: {
                    'input1': { required: true, min: 4 },
                    'input2': { email: true },
                    'input3': { required: true },
                    'input4': { required: true },
                    'select': { required: true }
                }
            };
            formObj2 = new FormValidator(formElement2);
            formObj2.rules = options.rules;
        });

        it('check focusout # ', () => {
            let onFocusout: () => void = () => { };
            formObj2.focusout = onFocusout;
            spyOn(formObj2, 'focusout');
            expect(formObj2.focusout).not.toHaveBeenCalled();
            let input: HTMLInputElement = formObj2.getInputElement('input1');
            EventHandler.trigger(input, 'focusout', { target: input });
            expect(formObj2.focusout).toHaveBeenCalled();
        });

        it('check keyup # ', () => {
            let onKeyup: () => void = () => { };
            formObj2.keyup = onKeyup;
            spyOn(formObj2, 'keyup');
            expect(formObj2.keyup).not.toHaveBeenCalled();
            let input: HTMLInputElement = formObj2.getInputElement('input1');
            EventHandler.trigger(input, 'keyup', { target: input });
            expect(formObj2.keyup).toHaveBeenCalled();
        });

        it('check click # ', () => {
            let onClick: () => void = () => { };
            formObj2.keyup = onClick;
            formObj2.click = onClick;
            spyOn(formObj2, 'click');
            expect(formObj2.click).not.toHaveBeenCalled();
            let input: HTMLInputElement = formObj2.getInputElement('input4');
            EventHandler.trigger(input, 'click', { target: input });
            expect(formObj2.click).toHaveBeenCalled();
        });

        it('check change # ', () => {
            let onChange: () => void = () => { };
            formObj2.change = onChange;
            spyOn(formObj2, 'change');
            expect(formObj2.change).not.toHaveBeenCalled();
            let input: HTMLInputElement = formObj2.getInputElement('select');
            EventHandler.trigger(input, 'change', { target: input });
            expect(formObj2.change).toHaveBeenCalled();
        });

        it('check submit # ', () => {
            let onSubmit: () => void = () => { };
            formObj2.submit = onSubmit;
            spyOn(formObj2, 'submit');
            expect(formObj2.submit).not.toHaveBeenCalled();
            EventHandler.trigger(formObj2.element, 'submit', { preventDefault: () => { return false; } });
            expect(formObj2.submit).toHaveBeenCalled();
        });

        it('check validationBegin # ', () => {
            let onValidationBegin: () => void = () => { };
            formObj2.validationBegin = onValidationBegin;
            spyOn(formObj2, 'validationBegin');
            expect(formObj2.validationBegin).not.toHaveBeenCalled();
            formObj2.validate();
            expect(formObj2.validationBegin).toHaveBeenCalled();
        });

        it('check validationComplete # ', () => {
            let onValidationComplete: () => void = () => { };
            formObj2.validationComplete = onValidationComplete;
            spyOn(formObj2, 'validationComplete');
            expect(formObj2.validationComplete).not.toHaveBeenCalled();
            formObj2.validate();
            expect(formObj2.validationComplete).toHaveBeenCalled();
        });
    });

    describe('EJ2-902: customPlacement not working properly # ', () => {
        beforeAll(() => {
            document.body.appendChild(formElement);
            let customPlace: (element: HTMLElement, error: HTMLElement) => void = (element: HTMLElement, error: HTMLElement) => {
                element.parentNode.insertBefore(error, element);
            };
            formObj = new FormValidator(formElement, { rules: { 'input1': { required: true } } });
            formObj.customPlacement = customPlace;
        });

        it('with invalid value # ', () => {
            expect(formObj.validate('input1')).toEqual(false);
        });

        it('check error element from custom placement with error # ', () => {
            let inputElement: HTMLElement = <HTMLElement>formObj.getInputElement('input1');
            let errorElement: HTMLElement = <HTMLElement>select(formObj.errorElement + '.' + formObj.errorClass + '[for="input1"]');
            expect(inputElement.previousSibling).toEqual(errorElement);
        });

        it('with valid value # ', () => {
            setInputValue(formObj, 'input1', '1234');
            expect(formObj.validate('input1')).toEqual(true);
        });

        it('check error element from custom placement with valid value # ', () => {
            let errorElement: HTMLElement = <HTMLElement>select(formObj.errorElement + '.' + formObj.errorClass + '[for="input1"]');
            expect(errorElement.style.display).toEqual('none');
        });

        afterAll(() => {
            document.body.removeChild(formElement);
            formObj.customPlacement = null;
            formObj.destroy();
        });
    });

    afterAll(() => {
        formObj2.destroy();
    });
});
