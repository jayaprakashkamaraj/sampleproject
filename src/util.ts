/**
 * Common utility methods
 */
export interface IKeyValue extends CSSStyleDeclaration {
    [key: string]: Object;
}
let instances: string = 'ej2_instances';
declare let window: {
    msCrypto: Crypto;
} & Window;
let uid: number = 0;
 /* tslint:disable:no-any */
    /**
     * Create Instance from constructor function with desired parameters.
     * @param {Function} classFunction - Class function to which need to create instance
     * @param {any[]} params - Parameters need to passed while creating instance
     * @return {any}
     */
export function createInstance(classFunction: Function, params: any[]): any {
        let arrayParam: Object[] = params;
        arrayParam.unshift(undefined);
        return new (Function.prototype.bind.apply(classFunction, arrayParam));
    }

    /**
     * To run a callback function immediately after the browser has completed other operations.
     * @param {Function} handler - callback function to be triggered.
     * @return {Function}
     */
    export function setImmediate(handler: Function): Function {
        let unbind: Function;
        let num: Int16Array = new Uint16Array(5);
        let intCrypto: Crypto = window.msCrypto || window.crypto;
        intCrypto.getRandomValues(num);
        let secret: string = 'ej2' + combineArray(num);
        let messageHandler: Function =  (event: any): void => {
            if (event.source === window && typeof event.data === 'string' && event.data.length <= 32 && event.data === secret) {
                handler();
                unbind();
            }
        };
        window.addEventListener('message', <EventListener>messageHandler, false);
        window.postMessage(secret, '*');
        return unbind =  () => {
            window.removeEventListener('message', <EventListener>messageHandler);
        };
    }
     /**
      * To get nameSpace value from the desired object.
      * @param {string} nameSpace - String value to the get the inner object
      * @param {any} obj - Object to get the inner object value.
      * @return {any}
      */
    export function getValue(nameSpace: string, obj: any): any {
        let value: Object = obj;
        let splits: string[] = nameSpace.split('.');

        for (let i: number = 0; i < splits.length && !isUndefined(value); i++) {
            value = value[splits[i]];
        }
        return value;
    }
    /**
     * To set value for the nameSpace in desired object.
     * @param {string} nameSpace - String value to the get the inner object
     * @param {any} value - Value that you need to set.
     * @param {any} obj - Object to get the inner object value.
     * @return {void}
     */
     export function setValue(nameSpace: string, value: any, obj: any): any {
        let keys: string[] = nameSpace.split('.');
        let start: any = obj || {};
        let fromObj: any = start;
        let i: number;
        let length: number = keys.length;
        let key: string;

        for (i = 0; i < length; i++) {
            key = keys[i];

            if (i + 1 === length) {
                fromObj[key] = value === undefined ? {} : value;
            } else if (isNullOrUndefined(fromObj[key])) {
                fromObj[key] = {};
            }

            fromObj = fromObj[key];
        }

        return start;
    }
     /**
      * Delete an item from Object
      * @param {any} obj - Object in which we need to delete an item.
      * @param {string} params - String value to the get the inner object
      * @return {void}
      */
    export function deleteObject(obj: any, key: string): void {
        delete obj[key];
    }
      /**
       * Check weather the given argument is only object.
       * @param {any} obj - Object which is need to check.
       * @return {boolean}
       */
    export function isObject(obj: any): boolean {
        let objCon: {} = {};
        return (!isNullOrUndefined(obj) && obj.constructor === objCon.constructor);
    }
    /**
     * To get enum value by giving the string.
     * @param {any} enumObject - Enum object.
     * @param {string} enumValue - Enum value to be searched
     * @return {any}
     */
    export function getEnumValue(enumObject: any, enumValue: string | number): any {
        return (<any>enumObject[enumValue]);
    }
     /**
      * Merge the source object into destination object.
      * @param {any} source - source object which is going to merge with destination object
      * @param {any} destination - object need to be merged
      * @return {void}
      */
    export function merge(source: Object, destination: Object): void {
        if (!isNullOrUndefined(destination)) {
            let temrObj: IKeyValue = source as IKeyValue;
            let tempProp: IKeyValue = destination as IKeyValue;
            let keys: string[] = Object.keys(destination);
            for (let key of keys) {
                temrObj[key] = tempProp[key];
            }
        }
    }
     /**
      * Extend the two object with newer one.
      * @param {any} copied - Resultant object after merged
      * @param {Object} first - First object need to merge
      * @param {Object} second - Second object need to merge
      * @return {Object}
      */
     export function extend(copied: Object, first: Object, second?: Object, deep?: boolean): Object {
        let result: IKeyValue = copied as IKeyValue || {} as IKeyValue;
        let length: number = arguments.length;
        if (deep) {
            length = length - 1;
        }
        for (let i: number = 1; i < length; i++) {
            if (!arguments[i]) {
                continue;
            }
            let obj1: { [key: string]: Object } = arguments[i];
            Object.keys(obj1).forEach((key: string) => {
                let src: Object = result[key];
                let copy: Object = obj1[key];
                let clone: Object;
                if (deep && isObject(copy)) {
                    clone = isObject(src) ? src : {};
                    result[key] = extend({}, clone, copy, true);
                } else {
                    result[key] = copy;
                }
            });
        }
        return result;
    }
      /**
       * To check whether the object is null or undefined.
       * @param {Object} value - To check the object is null or undefined
       * @return {boolean}
       */
    export function isNullOrUndefined(value: Object): boolean {
        return value === undefined || value === null;
    }
    /**
     * To check whether the object is undefined.
     * @param {Object} value - To check the object is undefined
     * @return {boolean}
     */
    export function isUndefined(value: Object): boolean {
        return ('undefined' === typeof value);
    }
     /**
      * To return the generated unique name
      * @param {string} definedName - To concatenate the unique id to provided name
      * @return {string}
      */
    export  function getUniqueID(definedName?: string): string {
        return definedName + '_' + uid++;
    }
     /**
      * It limits the rate at which a function can fire. The function will fire only once every provided second instead of as quickly.
      * @param {Function} eventFunction - Specifies the function to run when the event occurs
      * @param {number} delay - A number that specifies the milliseconds for function delay call option
      * @return {Function}
      */
    export function debounce(eventFunction: Function, delay: number): Function {
        let out: number;
        return (...arg: Object[]) => {
            let args: Object = arg[0];
            let later: TimeoutHandler = () => {
                out = null;
                return eventFunction.call(this, args);
            };
            clearTimeout(out);
            out = setTimeout(later, delay);
        };
    }
     /**
      * To convert the object to string for query url
      * @param  {Object} data
      * @returns string
      */
    export function queryParams(data: Object): string {
        let array: string[] = [];
        let keys: string[] = Object.keys(data);
        for (let key of keys) {
            array.push(encodeURIComponent(key) + '=' + encodeURIComponent('' + data[key]));
        }
        return array.join('&');
    }
     /**
      * To check whether the given array contains object.
      * @param {T[]} value- Specifies the T type array to be checked.
      */
    export  function isObjectArray<T>(value: T[]): boolean {
        let parser: Function = Object.prototype.toString;
        if (parser.call(value) === '[object Array]') {
            if (parser.call(value[0]) === '[object Object]') {
                return true;
            }
        }
        return false;
    }
     /**
      * To check whether the  child element is descendant to parent element or parent and child are same element.
      * @param{Element} - Specifies the child element to compare with parent.
      * @param{Element} - Specifies the parent element.
      * @return boolean 
      */
    export  function compareElementParent(child: Element, parent: Element): boolean {
        let node: Node = child;
        if (node === parent) {
            return true;
        } else if (node === document || !node) {
            return false;
        } else {
            return compareElementParent(<Element>node.parentNode, parent);
        }
    }
    /**
     * To throw custom error message.
     * @param{string} - Specifies the error message to be throwned.
     */
    export  function throwError(message: string): void {
        try {
            throw new Error(message);
        } catch (e) {
            throw e.message + '\n' + e.stack;
        }
    }
 /**
  * This function is used to print given element
  * @param{Element} element - Specifies the print content element.
  * @param{Window} printWindow - Specifies the print window.
  */
    export function print(element: Element, printWindow?: Window): Window {
        let div: Element = document.createElement('div');
        let links: HTMLElement[] = [].slice.call(document.getElementsByTagName('head')[0].querySelectorAll('link, style'));
        let reference: string = '';
        if (isNullOrUndefined(printWindow)) {
            printWindow = window.open('', 'print', 'height=452,width=1024,tabbar=no');
        }
        div.appendChild(element.cloneNode(true) as Element);
        for (let i: number = 0, len: number = links.length; i < len; i++) {
            reference += links[i].outerHTML;
        }
        printWindow.document.write('<!DOCTYPE html> <html><head>' + reference + '</head><body>' + div.innerHTML +
            '<script> (function() { window.ready = true; })(); </script>' + '</body></html>');
        printWindow.document.close();
        printWindow.focus();
        let interval: number = setInterval(
            () => {
                if ((<{ ready: Function } & Window>printWindow).ready) {
                    printWindow.print();
                    printWindow.close();
                    clearInterval(interval);
                }
            },
            500);
        return printWindow;
    }

    /**
     * Function to normalize the units applied to the element.
     * @param  {number|string} value
     * @return {string} result
     */
    export function formatUnit(value: number | string): string {
        let result: string = <string>value + '';

        if (result === 'auto' || result.indexOf('%') !== -1 || result.indexOf('px') !== -1) {
            return result;
        }

        return result + 'px';
    }

/**
 * Function to fetch the Instances of a HTML element for the given component.
 * @param {string | HTMLElement} element 
 * @param {any} component 
 * @return {Object} inst
 */

    export function getInstance(element: string | HTMLElement, component: any): Object {
        let elem: Element = (typeof (element) === 'string') ? document.querySelector(element) : element;
        if (elem[instances]) {
            for (let inst of elem[instances]) {
                if (inst instanceof component) {
                    return inst;
                }
            }
        }
        return null;
    }

    /**
     * Function to add instances for the given element.
     * @param {string | HTMLElement} element 
     * @param {Object} instance 
     * @return {void}
     */

    export function addInstance(element: string | HTMLElement, instance: Object): void {
        let elem: Element = (typeof (element) === 'string') ? document.querySelector(element) : element;
        if (elem[instances]) {
            elem[instances].push(instance);
        } else {
            elem[instances] = [instance];
        }
    }


 /* tslint:enable:no-any */

interface TimeoutHandler {
    (): Function;
}
function combineArray(num: Int16Array): string {
    let ret: string = '';
    for (let i: number = 0; i < 5; i++) {
        ret += (i ? ',' : '') + num[i];
    }
    return ret;
}