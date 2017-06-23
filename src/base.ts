import { isUndefined, isNullOrUndefined, merge, setImmediate, setValue } from './util';
import { addClass, removeClass } from './dom';
import { Observer } from './observer';

export interface DomElements extends HTMLElement {
    ej2_instances: Object[];
}

/* tslint:disable:no-any */

export interface AngularEventEmitter {
    subscribe?: (generatorOrNext?: any, error?: any, complete?: any) => any;
}

export declare type EmitType<T> = AngularEventEmitter & ((arg?: T, ...rest: any[]) => void);
/* tslint:enable:no-any */


/**
 * Base library module is common module for Framework modules like touch,keyboard and etc., 
 * @private
 */
export abstract class Base<ElementType extends HTMLElement> {
    public element: ElementType;
    public isDestroyed: boolean;
    protected isProtectedOnChange: boolean = true;
    protected properties: { [key: string]: Object } = {};
    protected changedProperties: { [key: string]: Object } = {};
    protected oldProperties: { [key: string]: Object } = {};
    protected refreshing: boolean = false;
    // tslint:disable-next-line:no-empty
    protected finalUpdate: Function = (): void => { };
    protected modelObserver: Observer;
    protected childChangedProperties: { [key: string]: Object } = {};
    protected abstract getModuleName(): string;
    protected abstract onPropertyChanged(newProperties: Object, oldProperties?: Object): void;
    /** Property base section */
    /**
     * Function used to set bunch of property at a time.
     * @private
     * @param  {Object} prop - JSON object which holds components properties.
     * @param  {boolean} muteOnChange? - Specifies to true when we set properties.
     */
    public setProperties(prop: Object, muteOnChange?: boolean): void {
        let prevDetection: boolean = this.isProtectedOnChange;
        this.isProtectedOnChange = !!muteOnChange;
        merge(this, prop);
        if (muteOnChange !== true) {
            merge(this.changedProperties, prop);
            this.dataBind();
        }
        this.finalUpdate();
        this.changedProperties = {};
        this.oldProperties = {};
        this.isProtectedOnChange = prevDetection;
    };
    /**
     * Calls for child element data bind
     * @param {Object} obj 
     * @param {Object} parent 
     * @returns {void}
     */
    private static callChildDataBind(obj: Object, parent: Object): void {
        let keys: string[] = Object.keys(obj);
        for (let key of keys) {
            if (parent[key] instanceof Array) {
                for (let obj of parent[key]) {
                    if (obj.dataBind !== undefined) {
                        obj.dataBind();
                    }
                }
            } else {
                parent[key].dataBind();
            }
        }
    }

    protected clearChanges(): void {
        this.finalUpdate();
        this.changedProperties = {};
        this.oldProperties = {};
        this.childChangedProperties = {};
    }

    /**
     * Bind property changes immediately to components
     */
    public dataBind(): void {
        Base.callChildDataBind(this.childChangedProperties, this);
        if (Object.getOwnPropertyNames(this.changedProperties).length) {
            let prevDetection: boolean = this.isProtectedOnChange;
            let newChanges: Object = this.changedProperties;
            let oldChanges: Object = this.oldProperties;
            this.clearChanges();
            this.isProtectedOnChange = true;
            this.onPropertyChanged(newChanges, oldChanges);
            this.isProtectedOnChange = prevDetection;
        }
    };

    protected saveChanges(key: string, newValue: string, oldValue: string): void {
        if (this.isProtectedOnChange) { return; }
        this.oldProperties[key] = oldValue;
        this.changedProperties[key] = newValue;
        this.finalUpdate();
        this.finalUpdate = setImmediate(this.dataBind.bind(this));
    };
    /** END of property base section */
    /** Event Base Section */
    /**
     * To attaches an event handler to the current component context.
     * It is used for managing the sample side event properties which are not used internal event calling within the component.
     * @param {string} eventName - A String that specifies the name of the event
     * @param {Function} listener - Specifies the call to run when the event occurs.
     * @return {void}
     */
    public addEventListener(eventName: string, handler: Function): void {
        this.modelObserver.on(eventName, handler);
    }
    /**
     * To remove an event handler that has been attached with the addEventListener() method.
     * @param {string} eventName - A String that specifies the name of the event to remove
     * @param {Function} listener - Specifies the function to remove
     * @return {void}
     */
    public removeEventListener(eventName: string, handler: Function): void {
        this.modelObserver.off(eventName, handler);
    }
    /**
     * To triggers the handlers in the specified event.
     * @private
     * @param {string} eventName - Specifies the event to trigger for the specified component properties. 
     * Can be a custom event, or any of the standard events.
     * @param {Event} eventProp - Additional parameters to pass on to the event properties
     * @return {void}
     */
    public trigger(eventName: string, eventProp?: Object): void {
        if (this.isDestroyed !== true) {
            let prevDetection: boolean = this.isProtectedOnChange;
            this.isProtectedOnChange = false;
            this.modelObserver.notify(eventName, eventProp);
            this.isProtectedOnChange = prevDetection;
        }
    }
    /** End of event Base Section */
    /**
     * Base constructor accept options and element 
     */
    constructor(options: Object, element: ElementType | string) {
        this.modelObserver = new Observer(this);
        if (!isUndefined(element)) {
            if ('string' === typeof (element)) {
                this.element = <ElementType>document.querySelector(<string>element);
            } else {
                this.element = <ElementType>element;
            }
            if (!isNullOrUndefined(this.element)) {
                this.isProtectedOnChange = false;
                this.addInstance();
            }
        }
        if (!isUndefined(options)) {
            this.setProperties(options, true);
        }
        this.isDestroyed = false;
    }
    /**
     * To maintain instance in base class
     */
    protected addInstance(): void {
        // Add module class to the root element
        let moduleClass: string = 'e-' + this.getModuleName().toLowerCase();
        addClass([this.element], ['e-control', moduleClass]);
        if (!isNullOrUndefined((<DomElements>(this.element as HTMLElement)).ej2_instances)) {
            (<DomElements>(this.element as HTMLElement)).ej2_instances.push(this);
        } else {
            setValue('ej2_instances', [this], (<DomElements>(this.element as HTMLElement)));
        }
    }
    /**
     * To remove the instance from the element
     */
    protected destroy(): void {
        (<DomElements>(this.element as HTMLElement)).ej2_instances =
            (<DomElements>(this.element as HTMLElement)).ej2_instances.filter((i: Object) => { return i !== this; });
        removeClass([this.element], ['e-' + this.getModuleName()]);
        if ((<DomElements>(this.element as HTMLElement)).ej2_instances.length === 0) {
            // Remove module class from the root element
            removeClass([this.element], ['e-control']);
        }
        this.clearChanges();
        this.modelObserver.destroy();
        this.isDestroyed = true;
    }
}
