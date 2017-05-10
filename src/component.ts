import { isUndefined, getValue, isNullOrUndefined, setValue, getUniqueID } from './util';
import { ModuleLoader, ModuleDeclaration } from './module-loader';
import { Base } from './base';
import { Observer, BoundOptions } from './observer';
import { ChildProperty } from './child-property';
import { Property, NotifyPropertyChanges } from './notify-property-change';
import { onIntlChange, rightToLeft, defaultCulture } from './internationalization';

/**
 * Base class for all Essential JavaScript components
 */
@NotifyPropertyChanges
export abstract class Component<ElementType extends HTMLElement> extends Base<ElementType> {

    public element: ElementType;
    private detectFunction: Function;
    /**
     * Enable or disable persisting component's state between page reloads.
     */
    @Property(false)
    public enablePersistence: boolean;

    /**
     * Enable or disable rendering component in right to left direction.
     */
    @Property()
    public enableRtl: boolean;
    /**
     * Overrides the global culture and localization value for this component.
     */
    @Property()
    public locale: string;
    protected needsID: boolean = false;
    protected moduleLoader: ModuleLoader;
    protected localObserver: Observer;
    protected abstract render(): void;
    protected abstract preRender(): void;
    protected abstract getPersistData(): string;
    protected injectedModules: Function[];
    protected requiredModules(): ModuleDeclaration[] {
        return [];
    };

    /**
     * Destroys the sub modules while destroying the widget
     */
    protected destroy(): void {
        this.trigger('destroyed', { cancel: false });
        super.destroy();
        onIntlChange.off('notifyExternalChange', this.detectFunction);
        this.moduleLoader.clean();
        this.localObserver.destroy();
        if (this.enablePersistence) {
            this.setPersistData();
        }
    }
    /**
     * Apply all the pending property changes and render the component again
     */
    public refresh(): void {
        this.clearChanges();
        this.preRender();
        this.injectModules();
        this.render();
    }
    /**
     * Append the control within the given HTML Element
     * @param {string | HTMLElement} selector - Target element where control needs to be appended
     */
    public appendTo(selector?: string | HTMLElement): void {
        if (!isNullOrUndefined(selector) && typeof (selector) === 'string') {
            this.element = <ElementType>document.querySelector(<string>selector);
        } else if (!isNullOrUndefined(selector)) {
            this.element = <ElementType>selector;
        }
        if (!isNullOrUndefined(this.element)) {
            if (this.needsID && !this.element.id) {
                this.element.id = getUniqueID(this.getModuleName());
            }
            this.isProtectedOnChange = false;
            let inst: Object[] = getValue('ej2_instances', this.element);
            if (!inst || inst.indexOf(this) === -1) {
                super.addInstance();
            }
            this.preRender();
            if (this.enablePersistence) {
                this.mergePersistData();
            }
            this.injectModules();
            this.render();
            this.trigger('created');
        }
    }

    /**
     * Apply the pending property changes immediately to the component
     */
    public dataBind(): void {
        this.injectModules();
        super.dataBind();
    };
    /**
     * Attach one or more  event handler to the current component context.
     * It is used for internal handling event internally within the component only.
     * @param {BoundOptions[]| string} event - It is  optional type either to  Set the collection of event list or the eventName.
     * @param {Function} handler - optional parameter Specifies the handler to run when the event occurs
     * @param {Object} context - optional parameter Specifies the context to be bind in the handler.
     * @return {void}
     * @private
     */
    public on(event: BoundOptions[] | string, handler?: Function, context?: Object): void {
        if (typeof event === 'string') {
            this.localObserver.on(event, handler, context);
        } else {
            for (let arg of event) {
                this.localObserver.on(arg.event, arg.handler, arg.context);
            }
        }

    }

    /**
     * To remove one or more event handler that has been attached with the on() method.
     * @param {BoundOptions[]| string} event - It is  optional type either to  Set the collection of event list or the eventName.
     * @param {Function} handler - optional parameter Specifies the function to run when the event occurs
     * @return {void}
     * @private
     */
    public off(event: BoundOptions[] | string, handler?: Function): void {
        if (typeof event === 'string') {
            this.localObserver.off(event, handler);
        } else {
            for (let arg of event) {
                this.localObserver.off(arg.event, arg.handler);
            }
        }
    }
    /**
     * To notify the handlers in the specified event.
     * @param {string} property - Specifies the event to be notify.
     * @param {Object} argument - Additional parameters to pass while calling the handler.
     * @return {void}
     * @private
     */
    public notify(property: string, argument: Object): void {
        this.localObserver.notify(property, argument);
    }
    /**
     * Get injected modules
     * @private
     */
    public getInjectedModules(): Function[] {
        return this.injectedModules;
    };

    /**
     * Dynamically inject the required modules to component
     */
    public static Inject(...moduleList: Function[]): void {
        if (!this.prototype.injectedModules) {
            this.prototype.injectedModules = [];
        }
        for (let i: number = 0; i < moduleList.length; i++) {
            if (this.prototype.injectedModules.indexOf(moduleList[i]) === -1) {
                this.prototype.injectedModules.push(moduleList[i]);
            }
        }
    }

    /**
     * Initialize the constructor for component base
     */
    constructor(options?: Object, selector?: string | ElementType) {
        super(options, selector);
        if (isNullOrUndefined(this.enableRtl)) {
            this.setProperties({ 'enableRtl': rightToLeft }, true);
        }
        if (isNullOrUndefined(this.locale)) {
            this.setProperties({ 'locale': defaultCulture }, true);
        }
        this.moduleLoader = new ModuleLoader(this);
        this.localObserver = new Observer(this);
        // tslint:disable-next-line:no-function-constructor-with-string-args
        this.detectFunction = new Function('args', 'var prop = Object.keys(args); if(prop.length){this[prop[0]] = args[prop[0]];}');
        onIntlChange.on('notifyExternalChange', this.detectFunction, this);
        if (this.enablePersistence) {
            window.addEventListener('unload', this.setPersistData.bind(this));
        }
        if (!isUndefined(selector)) {
            this.appendTo();
        }
    }

    private injectModules(): void {
        if (this.injectedModules && this.injectedModules.length) {
            this.moduleLoader.inject(this.requiredModules(), this.injectedModules);
        }
    }

    private mergePersistData(): void {
        let data: string = window.localStorage.getItem(this.getModuleName() + this.element.id);
        if (!(isNullOrUndefined(data) || (data === ''))) {
            this.setProperties(JSON.parse(data), true);
        }
    }
    private setPersistData(): void {
        window.localStorage.setItem(this.getModuleName() + this.element.id, this.getPersistData());
    }

    protected addOnPersist(options: string[]): string {
        let persistObj: Object = {};
        for (let key of options) {
            let objValue: Object;
            objValue = getValue(key, this);
            if (!isUndefined(objValue)) {
                setValue(key, this.getActualProperties(objValue), persistObj);
            }
        }
        return JSON.stringify(persistObj, (key: string, value: Object) => {
            return this.getActualProperties(value);
        });
    }

    protected getActualProperties<T>(obj: T): T {
        if (obj instanceof ChildProperty) {
            return <T>getValue('properties', obj);
        } else {
            return obj;
        }
    }

    protected ignoreOnPersist(options: string[]): string {
        return JSON.stringify(this.iterateJsonProperties(this.properties, options));
    }

    protected iterateJsonProperties(obj: {}, ignoreList: string[]): Object {
        let newObj: {} = {};
        for (let key of Object.keys(obj)) {
            if (ignoreList.indexOf(key) === -1) {
                let value: Object = obj[key];
                if (typeof value === 'object' && !(value instanceof Array)) {
                    let newList: string[] = ignoreList.filter((str: string): boolean => {
                        return new RegExp(key + '.').test(str);
                    }).map((str: string): string => {
                        return str.replace(key + '.', '');
                    });
                    newObj[key] = this.iterateJsonProperties(this.getActualProperties(value), newList);
                } else {
                    newObj[key] = value;
                }
            }
        }
        return newObj;
    }
}
