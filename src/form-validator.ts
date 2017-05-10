import { selectAll, select, createElement } from './dom';
import { Base, EmitType } from './base';
import { extend, isNullOrUndefined, IKeyValue } from './util';
import { EventHandler } from './event-handler';
import { FormValidatorModel } from './form-validator-model';
import { Property, NotifyPropertyChanges, INotifyPropertyChanged, Event } from './notify-property-change';

/**
 * ErrorOption values
 */
export enum ErrorOption {
    Message,
    Label
}

/**
 * FormValidator class enables you to validate the form fields based on your defined rules
 * ```html
 * <form id='formId'>
 *  <input type='text' name='Name' />
 *  <input type='text' name='Age' />
 * </form>
 * <script>
 *   let formObject = new FormValidator('#formId', {
 *      rules: { Name: { required: true }, Age: { range: [18, 30] } };
 *   }); 
 *   formObject.validate();
 * </script>
 * ```
 */
@NotifyPropertyChanges
export class FormValidator extends Base<HTMLFormElement> implements INotifyPropertyChanged {
    private validated: string[] = [];
    private errorRules: ErrorRule[] = [];
    private allowSubmit: boolean = false;
    private required: string = 'required';
    private infoElement: HTMLElement = null;
    private inputElement: HTMLInputElement = null;
    private selectQuery: string = 'input:not([type=reset]):not([type=button]), select, textarea';

    /**
     * Ignores input fields based on the class name
     * @default 'e-hidden';
     */
    @Property('e-hidden')
    public ignore: string;

    /**
     * Maps the input fields with validation rules
     * @default {};
     */
    @Property({})
    public rules: { [name: string]: { [rule: string]: Object } };

    /**
     * Sets the defined css class to error fields 
     * @default 'e-error';
     */
    @Property('e-error')
    public errorClass: string;

    /**
     * Sets the defined css class to valid fields 
     * @default : 'e-valid';
     */
    @Property('e-valid')
    public validClass: string;

    /**
     * Specify HTML element for error
     * @default : 'label';
     */
    @Property('label')
    public errorElement: string;

    /**
     * Specify HTML element for error container 
     * @default : 'div';
     */
    @Property('div')
    public errorContainer: string;

    /**
     * Option to display the error
     * @default : ErrorOption.Label;
     */
    @Property(ErrorOption.Label)
    public errorOption: ErrorOption;

    /**
     * Triggers when a field's focused  out
     * @event
     */
    @Event()
    public focusout: EmitType<Event>;

    /**
     * Trigger when keyup is triggered in any fields
     * @event
     */
    @Event()
    public keyup: EmitType<KeyboardEvent>;

    /**
     * Triggers when a check box field is clicked
     * @event
     */
    @Event()
    public click: EmitType<Event>;

    /**
     * Trigger when a select/drop-down field is changed
     * @event
     */
    @Event()
    public change: EmitType<Event>;

    /**
     * Triggers before form is being submitted
     * @event
     */
    @Event()
    public submit: EmitType<Event>;

    /**
     * Triggers before validation starts
     * @event
     */
    @Event()
    public validationBegin: EmitType<Object>;

    /**
     * Triggers after validation is completed
     * @event
     */
    @Event()
    public validationComplete: EmitType<Object>;

    /**
     * Assigns the custom function to place the error message in the page.
     * @event
     */
    @Event()
    public customPlacement: EmitType<Object>;

    /**
     * Add validation rules to the corresponding input element based on `name` attribute.   
     * @param {string} name `name` of form field. 
     * @param {Object} rules Validation rules for the corresponding element. 
     * @return {void}
     */
    public addRules(name: string, rules: Object): void {
        if (this.rules.hasOwnProperty(name)) {
            extend(this.rules[name], rules, {});
        } else {
            this.rules[name] = <IKeyValue>rules;
        }
    }

    /**
     * Remove validation to the corresponding field based on name attribute.   
     * When no parameter is passed, remove all the validations in the form.
     * @param {string} name Input name attribute value.
     * @param {string[]} rules List of validation rules need to be remove from the corresponding element. 
     * @return {void}
     */
    public removeRules(name?: string, rules?: string[]): void {
        if (!name && !rules) {
            this.rules = {};
        } else if (this.rules[name] && !rules) {
            delete this.rules[name];
        } else if (!isNullOrUndefined(this.rules[name] && rules)) {
            for (let i: number = 0; i < rules.length; i++) {
                delete this.rules[name][rules[i]];
            }
        } else {
            return;
        }
    }

    /**
     * Validate the current form values using defined rules.
     * Returns `true` when the form is valid otherwise `false`
     * @param {string} selected - Optional parameter to validate specified element.    
     * @return {boolean} 
     */
    public validate(selected?: string): boolean {
        if (selected) {
            this.validateRules(selected);
        } else {
            let rules: string[] = Object.keys(this.rules);
            for (let name of rules) {
                if (this.rules[name][this.required]) {
                    this.validateRules(name);
                }
            }
        }
        return this.errorRules.length === 0;
    }

    /**
     * Reset the value of all the fields in form.
     * @return {void}
     */
    public reset(): void {
        this.errorRules = [];
        this.validated = [];
        this.element.reset();
        let elements: HTMLElement[] = selectAll(this.selectQuery, this.element);
        for (let element of elements) {
            let input: HTMLInputElement = <HTMLInputElement>element;
            input.removeAttribute('aria-invalid');
            input.classList.remove(this.errorClass);
            if (input.name.length > 0) {
                this.getInputElement(input.name);
                this.getErrorElement(input.name);
                this.hideMessage(input.name);
            }
            input.classList.remove(this.validClass);
        }
    }

    /**
     * Get input element by name. 
     * @param {string} name - Input element name attribute value.            
     * @return {HTMLInputElement}
     */
    public getInputElement(name: string): HTMLInputElement {
        this.inputElement = <HTMLInputElement>(select('[name=' + name + ']', this.element));
        return this.inputElement;
    }

    /**
     * Destroy the form validator object and error elements.      
     * @return {void}
     */
    public destroy(): void {
        this.reset();
        this.unwireEvents();
        let elements: HTMLElement[] = selectAll('.' + this.errorClass + ', .' + this.validClass, this.element);
        for (let element of elements) {
            element.remove();
        }
        super.destroy();
    }

    /**
     * Specifies the default messages for validation rules.
     * @default : { List of validation message };
     */
    public defaultMessages: { [rule: string]: string } = {
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

    /**
     * @private
     */
    public onPropertyChanged(newProp: FormValidatorModel, oldProp?: FormValidatorModel): void {
        // No code are needed
    };

    /**
     * @private
     */
    public getModuleName(): string {
        return 'formValidator';
    }

    // Initializes the FormValidator 
    constructor(element: string | HTMLFormElement, options?: FormValidatorModel) {
        super(options, element);
        element = typeof element === 'string' ? <HTMLFormElement>select(element, document) : element;
        // Set novalidate to prevent default HTML5 form validation
        if (this.element != null) {
            this.element.setAttribute('novalidate', '');
            this.wireEvents();
        } else {
            return undefined;
        }
    }

    // Wire events to the form elements
    private wireEvents(): void {
        let inputElements: HTMLElement[] = selectAll(this.selectQuery, this.element);
        for (let input of inputElements) {
            if (FormValidator.isCheckable(input)) {
                EventHandler.add(input, 'click', this.clickHandler, this);
            } else if (input.tagName === 'SELECT') {
                EventHandler.add(input, 'change', this.changeHandler, this);
            } else {
                EventHandler.add(input, 'focusout', this.focusOutHandler, this);
                EventHandler.add(input, 'keyup', this.keyUpHandler, this);
            }
        }
        EventHandler.add(this.element, 'submit', this.submitHandler, this);
    }

    // UnWire events to the form elements
    private unwireEvents(): void {
        let inputElements: HTMLElement[] = selectAll(this.selectQuery, this.element);
        for (let input of inputElements) {
            EventHandler.clearEvents(input);
        }
        EventHandler.remove(this.element, 'submit', this.submitHandler);
    }

    // Handle input element focusout event
    private focusOutHandler(e: Event): void {
        this.trigger('focusout', e);
        //FormValidator.triggerCallback(this.focusout, e);
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        if (this.rules[element.name]) {
            if (this.rules[element.name][this.required] || element.value.length > 0) {
                this.validate(element.name);
            } else if (this.validated.indexOf(element.name) === -1) {
                this.validated.push(element.name);
            }
        }
    }

    // Handle input element keyup event
    private keyUpHandler(e: KeyboardEvent): void {
        this.trigger('keyup', e);
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        // List of keys need to prevent while validation
        let excludeKeys: number[] = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
        if (e.which === 9 && !this.rules[element.name][this.required]) {
            return;
        }
        if (this.validated.indexOf(element.name) !== -1 && this.rules[element.name] && excludeKeys.indexOf(e.which) === -1) {
            this.validate(element.name);
        }
    }

    // Handle input click event
    private clickHandler(e: Event): void {
        this.trigger('click', e);
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        // If element type is not submit allow validation
        if (element.type !== 'submit') {
            this.validate(element.name);
        } else if (element.getAttribute('formnovalidate') !== null) {
            // Prevent form validation, if submit button has formnovalidate attribute
            this.allowSubmit = true;
        }
    }

    // Handle input change event
    private changeHandler(e: Event): void {
        this.trigger('change', e);
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        this.validate(element.name);
    }

    // Handle form submit event
    private submitHandler(e: Event): void {
        this.trigger('submit', e);
        //FormValidator.triggerCallback(this.submit, e);
        // Prevent form submit if validation failed
        if (!this.allowSubmit && !this.validate()) {
            e.preventDefault();
        } else {
            this.allowSubmit = false;
        }
    }

    // Validate each rule based on input element name
    private validateRules(name: string): void {
        let rules: string[] = Object.keys(this.rules[name]);
        this.getInputElement(name);
        this.getErrorElement(name);
        for (let rule of rules) {
            let errorRule: ErrorRule = { name: name, message: this.getErrorMessage(this.rules[name][rule], rule) };
            if (!this.isValid(name, rule) && !this.inputElement.classList.contains(this.ignore)) {
                this.removeErrorRules(name);
                this.errorRules.push(errorRule);
                // Set aria attributes to invalid elements
                this.inputElement.setAttribute('aria-invalid', 'true');
                this.inputElement.setAttribute('aria-describedby', this.inputElement.id + '-info');
                if (!this.infoElement) {
                    this.createErrorElement(name, errorRule.message);
                } else {
                    this.showMessage(errorRule);
                }
                this.inputElement.classList.add(this.errorClass);
                this.inputElement.classList.remove(this.validClass);
                this.trigger('validationComplete', errorRule);
                // Set aria-required to required rule elements
                if (rule === 'required') {
                    this.inputElement.setAttribute('aria-required', 'true');
                    break;
                }
            } else {
                this.hideMessage(name);
            }
        }
    }

    // Check the input element whether it's value satisfy the validation rule or not
    private isValid(name: string, rule: string): boolean {
        let params: Object = this.rules[name][rule];
        let param: Object = (params instanceof Array && typeof params[1] === 'string') ? params[0] : params;
        let currentRule: { [key: string]: Object } = <IKeyValue>this.rules[name][rule];
        let args: ValidArgs = { value: this.inputElement.value, param: param, element: this.inputElement };
        this.trigger('validationBegin', args);
        if (typeof currentRule[0] === 'function') {
            let fn: () => boolean = <() => boolean>currentRule[0];
            return fn.call(this, { element: this.inputElement, value: this.inputElement.value });
        } else if (FormValidator.isCheckable(this.inputElement)) {
            if (rule !== 'required') { return true; }
            return selectAll('input[name=' + name + ']:checked', this.element).length > 0;
        } else {
            return FormValidator.checkValidator[rule](args);
        }
    }

    // Return default error message or custom error message 
    private getErrorMessage(ruleValue: Object, rule: string): string {
        let message: string = (ruleValue instanceof Array && typeof ruleValue[1] === 'string') ? ruleValue[1] : this.defaultMessages[rule];
        let formats: string[] = message.match(/{(\d)}/g);
        if (!isNullOrUndefined(formats)) {
            for (let i: number = 0; i < formats.length; i++) {
                let value: string = ruleValue instanceof Array ? ruleValue[i] : ruleValue;
                message = message.replace(formats[i], value);
            }
        }
        return message;
    }

    // Create error element based on name and error message
    private createErrorElement(name: string, message: string): void {
        let errorElement: HTMLElement = createElement(this.errorElement, {
            className: this.errorClass,
            innerHTML: message,
            attrs: { for: name }
        });
        // Create message design if errorOption is message
        if (this.errorOption === ErrorOption.Message) {
            errorElement.classList.remove(this.errorClass);
            errorElement.classList.add('e-message');
            errorElement = createElement(this.errorContainer, { className: this.errorClass, innerHTML: errorElement.outerHTML });
        }
        errorElement.id = this.inputElement.name + '-info';
        // Call custom placement function if customPlacement is not null
        if (this.customPlacement != null) {
            this.customPlacement.call(this, this.inputElement, errorElement);
        } else {
            this.inputElement.parentNode.insertBefore(errorElement, this.inputElement.nextSibling);
        }
        errorElement.style.display = 'block';
        this.getErrorElement(name);
        this.validated.push(name);
        this.checkRequired(name);
    }

    // Get error element by name
    private getErrorElement(name: string): HTMLElement {
        this.infoElement = <HTMLElement>select(this.errorElement + '.' + this.errorClass, this.inputElement.parentElement);
        if (!this.infoElement) {
            this.infoElement = <HTMLElement>select(this.errorElement + '.' + this.errorClass + '[for="' + name + '"]');
        }
        return this.infoElement;
    }

    // Remove existing rule from errorRules object
    private removeErrorRules(name: string): void {
        for (let i: number = 0; i < this.errorRules.length; i++) {
            let rule: ErrorRule = this.errorRules[i];
            if (rule.name === name) {
                this.errorRules.splice(i, 1);
            }
        }
    }

    // Show error message to the input element
    private showMessage(errorRule: ErrorRule): void {
        this.infoElement.style.display = 'block';
        this.infoElement.innerHTML = errorRule.message;
        this.checkRequired(errorRule.name);
    }

    // Hide error message based on input name
    private hideMessage(name: string): void {
        if (this.infoElement) {
            this.infoElement.style.display = 'none';
            this.removeErrorRules(name);
            this.inputElement.classList.add(this.validClass);
            this.inputElement.classList.remove(this.errorClass);
            this.inputElement.setAttribute('aria-invalid', 'false');
        }
    }

    // Check whether the input element have required rule and its value is not empty
    private checkRequired(name: string): void {
        if (!this.rules[name][this.required] && !this.inputElement.value.length) {
            this.infoElement.innerHTML = this.inputElement.value;
            this.infoElement.setAttribute('aria-invalid', 'false');
            this.hideMessage(name);
        }
    }

    // List of function to validate the rules
    private static checkValidator: Validator = {
        required: (option: ValidArgs): boolean => {
            return option.value.length > 0;
        },
        email: (option: ValidArgs): boolean => {
            return new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
                '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$').test(option.value);
        },
        url: (option: ValidArgs): boolean => {
            return new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_\‌​+~#=]+)' +
                '+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?').test(option.value);
        },
        date: (option: ValidArgs): boolean => {
            return !isNaN(new Date(option.value).getTime());
        },
        dateIso: (option: ValidArgs): boolean => {
            return new RegExp('^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$').test(option.value);
        },
        number: (option: ValidArgs): boolean => {
            return !isNaN(Number(option.value)) && option.value.indexOf(' ') === -1;
        },
        digits: (option: ValidArgs): boolean => {
            return new RegExp('^[0-9]*$').test(option.value);
        },
        maxLength: (option: ValidArgs): boolean => {
            return option.value.length <= option.param;
        },
        minLength: (option: ValidArgs): boolean => {
            return option.value.length >= option.param;
        },
        rangeLength: (option: ValidArgs): boolean => {
            let param: number[] = <number[]>option.param;
            return option.value.length >= param[0] && option.value.length <= param[1];
        },
        range: (option: ValidArgs): boolean => {
            let param: number[] = <number[]>option.param;
            return !isNaN(Number(option.value)) && Number(option.value) >= param[0] && Number(option.value) <= param[1];
        },
        max: (option: ValidArgs): boolean => {
            return !isNaN(Number(option.value)) && Number(option.value) <= option.param;
        },
        min: (option: ValidArgs): boolean => {
            return !isNaN(Number(option.value)) && Number(option.value) >= option.param;
        },
        regex: (option: ValidArgs): boolean => {
            return new RegExp(<string>option.param).test(option.value);
        }
    };

    // Return boolean result if the input have chekcable or submit types
    private static isCheckable(input: Element): boolean {
        let inputType: string = input.getAttribute('type');
        return inputType && (inputType === 'checkbox' || inputType === 'radio' || inputType === 'submit');
    }
}

interface Validator {
    [rule: string]: (value: ValidArgs) => boolean;
}

interface ValidArgs {
    value: string;
    param?: Object;
    element?: HTMLElement;
}

interface ErrorRule {
    name: string;
    message: string;
}