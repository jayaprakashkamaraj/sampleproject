import { selectAll, select, createElement } from './dom';import { Base, EmitType } from './base';import { extend, isNullOrUndefined, IKeyValue } from './util';import { EventHandler } from './event-handler';import { Property, NotifyPropertyChanges, INotifyPropertyChanged, Event } from './notify-property-change';
import {ErrorOption} from "./form-validator";

/**
 * Interface for a class FormValidator
 */
export interface FormValidatorModel {

    /**
     * Ignores input fields based on the class name     * @default 'e-hidden';     */    ignore?: string;

    /**
     * Maps the input fields with validation rules     * @default {};     */    rules?: { [name: string]: { [rule: string]: Object } };

    /**
     * Sets the defined css class to error fields      * @default 'e-error';     */    errorClass?: string;

    /**
     * Sets the defined css class to valid fields      * @default : 'e-valid';     */    validClass?: string;

    /**
     * Specify HTML element for error     * @default : 'label';     */    errorElement?: string;

    /**
     * Specify HTML element for error container      * @default : 'div';     */    errorContainer?: string;

    /**
     * Option to display the error     * @default : ErrorOption.Label;     */    errorOption?: ErrorOption;

    /**
     * Triggers when a field's focused  out     * @event     */    focusout?: EmitType<Event>;

    /**
     * Trigger when keyup is triggered in any fields     * @event     */    keyup?: EmitType<KeyboardEvent>;

    /**
     * Triggers when a check box field is clicked     * @event     */    click?: EmitType<Event>;

    /**
     * Trigger when a select/drop-down field is changed     * @event     */    change?: EmitType<Event>;

    /**
     * Triggers before form is being submitted     * @event     */    submit?: EmitType<Event>;

    /**
     * Triggers before validation starts     * @event     */    validationBegin?: EmitType<Object>;

    /**
     * Triggers after validation is completed     * @event     */    validationComplete?: EmitType<Object>;

    /**
     * Assigns the custom function to place the error message in the page.     * @event     */    customPlacement?: EmitType<Object>;

}