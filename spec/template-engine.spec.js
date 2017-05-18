define(["require", "exports", "../src/template-engine", "../src/dom"], function (require, exports, template, dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dsJSONArray = [{ name: 'one', info: { id: '01' } }, { name: 'two', info: { id: '02' } }];
    var dsSubArray = [{ name: 'one', items: ['AR Item1', 'AR Item2'] }, { name: 'two', items: ['AR Item1', 'AR Item2'] }];
    var dsJSONSubArray = [{ name: 'one', info: { id: '01', items: ['AR Item1', 'AR Item2'] } }, { name: 'two', info: { id: '02', items: ['AR Item1', 'AR Item2'] } }];
    var tempObj;
    window.getName = function () {
        return "TestName";
    };
    var outDOM = function (tempFunction, data) {
        var output = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var htmlEle = dom_1.createElement('div', { innerHTML: tempFunction(item) });
            output.push(htmlEle.children[0]);
        }
        return output;
    };
    describe('Template Engine', function () {
        it('JSON Array Input With Template String', function () {
            var templateStr = '<div>${name}</div>';
            var result = [];
            result.push(dom_1.createElement('div', { innerHTML: 'one' }));
            result.push(dom_1.createElement('div', { innerHTML: 'two' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array input with multiple key mapping String', function () {
            var templateStr = '<div>${name}${info.id}</div>';
            var result = [];
            result.push(dom_1.createElement('div', { innerHTML: 'one01' }));
            result.push(dom_1.createElement('div', { innerHTML: 'two02' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('custom helper', function () {
            var templateStr = '<div>${uCase(name)}${info.id}</div>';
            var result = [];
            var cHelper = {
                uCase: function (str) {
                    return str.toUpperCase();
                }
            };
            result.push(dom_1.createElement('div', { innerHTML: 'ONE01' }));
            result.push(dom_1.createElement('div', { innerHTML: 'TWO02' }));
            expect(outDOM(template.compile(templateStr, cHelper), dsJSONArray)).toEqual(result);
        });
        it('custom engine', function () {
            var spyCompiler = jasmine.createSpy("compile");
            var CustomEngine = (function () {
                function CustomEngine() {
                }
                CustomEngine.prototype.compile = function (tStr, helper) {
                    return spyCompiler;
                };
                return CustomEngine;
            }());
            var templateStr = '<div>${uCase(name)}${info.id}</div>';
            template.setTemplateEngine(new CustomEngine());
            var tmpFun = template.compile(templateStr);
            tmpFun(dsJSONArray[0]);
            expect(spyCompiler).toHaveBeenCalled();
        });
    });
});
