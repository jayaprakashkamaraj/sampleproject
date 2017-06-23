
/**
 * Template Engine Bridge
 */
import { compile as render } from './template';
import { createElement } from './dom';

const HAS_ROW: RegExp = /^[\n\r.]+\<tr|^\<tr/;

/**
 * Interface for Template Engine.
 */
export interface ITemplateEngine {
    compile: (templateString: string, helper?: Object) => (data: Object | JSON) => string;
}

/**
 * Compile the template string into template function.
 * @param  {string} templateString - The template string which is going to convert.
 * @param  {Object} helper? - Helper functions as an object.
 */
export function compile(templateString: string, helper?: Object): (data: Object | JSON) => HTMLCollection {

    let compiler: (data: Object) => string = engineObj.compile(templateString, helper);
    return (data: Object): HTMLCollection => {
        let result: string = '' + compiler(data);
        let ele: HTMLElement = createElement((HAS_ROW.test(result) ? 'table' : 'div'), { innerHTML: result });
        return ele.children;
    };
}

/**
 * Set your custom template engine for template rendering.
 * @param  {ITemplateEngine} classObj - Class object for custom template.
 */
export function setTemplateEngine(classObj: ITemplateEngine): void {
    engineObj.compile = classObj.compile;
}

//Default Engine Class
class Engine implements ITemplateEngine {
    public compile(templateString: string, helper: Object = {}): (data: Object | JSON) => string {
        return render(templateString, helper);
    }
}

let engineObj: ITemplateEngine = { compile: new Engine().compile };