
/**
 * Template Engine Bridge
 */
import { compile as render } from './template';

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
export function compile(templateString: string, helper?: Object): (data: Object | JSON) => string {
    return engineObj.compile(templateString, helper);
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
    public compile(templateString: string, helper?: Object): (data: Object | JSON) => string {
        return render(templateString, helper);
    }
}

let engineObj: ITemplateEngine = { compile: new Engine().compile };