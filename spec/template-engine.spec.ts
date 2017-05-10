import * as template from '../src/template-engine';
import { createElement } from '../src/dom';
/**
 * Template Engine Spec
 */

let dsJSONArray: any = [{ name: 'one', info: { id: '01' } }, { name: 'two', info: { id: '02' } }];
let dsSubArray: any = [{ name: 'one', items: ['AR Item1', 'AR Item2'] }, { name: 'two', items: ['AR Item1', 'AR Item2'] }];
let dsJSONSubArray: any = [{ name: 'one', info: { id: '01', items: ['AR Item1', 'AR Item2'] } }, { name: 'two', info: { id: '02', items: ['AR Item1', 'AR Item2'] } }];

let tempObj: any;

interface MyWindow extends Window {
    getName: Function;
}

declare var window: MyWindow

window.getName = function () {
    return "TestName";
}

let outDOM: Function = (tempFunction: Function, data: Object[]) => {
    let output: any[] = [];
    for (let item of data) {
        let htmlEle: HTMLElement = createElement('div', { innerHTML: tempFunction(item) });
        output.push(htmlEle.children[0]);
    }
    return output;
}

describe('Template Engine', () => {


    it('JSON Array Input With Template String', () => {
        let templateStr: string = '<div>${name}</div>';
        let result: Element[] = [];
        result.push(createElement('div', { innerHTML: 'one' }));
        result.push(createElement('div', { innerHTML: 'two' }));
        expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
    });

    it('JSON Array input with multiple key mapping String', () => {
        let templateStr: string = '<div>${name}${info.id}</div>';
        let result: Element[] = [];
        result.push(createElement('div', { innerHTML: 'one01' }));
        result.push(createElement('div', { innerHTML: 'two02' }));
        expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
    });


    it('custom helper', () => {
        let templateStr: string = '<div>${uCase(name)}${info.id}</div>';
        let result: Element[] = [];
        let cHelper: any = {
            uCase: (str: string) => {
                return str.toUpperCase();
            }
        };
        result.push(createElement('div', { innerHTML: 'ONE01' }));
        result.push(createElement('div', { innerHTML: 'TWO02' }));
        expect(outDOM(template.compile(templateStr, cHelper), dsJSONArray)).toEqual(result);
    });

    it('custom engine', () => {
        let spyCompiler = jasmine.createSpy("compile");
        class CustomEngine implements template.ITemplateEngine {
            public compile(tStr: string, helper?: Object): (data: Object | JSON) => string {
                return spyCompiler;
            }
        }
        let templateStr: string = '<div>${uCase(name)}${info.id}</div>';
        template.setTemplateEngine(new CustomEngine());
        let tmpFun: Function = template.compile(templateStr);
        tmpFun(dsJSONArray[0]);
        expect(spyCompiler).toHaveBeenCalled();
    });


});