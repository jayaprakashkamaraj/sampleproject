define(["require", "exports", "../src/template", "../src/dom"], function (require, exports, template, dom_1) {
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
    describe('Template', function () {
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
        it('JSON Array input with cacheTemplate', function () {
            var templateStr = '<div>${name}${info.id}</div>';
            var result = [];
            result.push(dom_1.createElement('div', { innerHTML: 'one01' }));
            result.push(dom_1.createElement('div', { innerHTML: 'two02' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array input multi line template', function () {
            template.expression(/\{{([^}]*)}}/g);
            var templateStr = "<div>\n            <span>{{name}}</span>{{info.id}}\n            </div>";
            var result = [];
            result.push(dom_1.createElement('div', { innerHTML: '<span>one</span>01' }));
            result.push(dom_1.createElement('div', { innerHTML: '<span>two</span>02' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
            template.expression(new RegExp('\\${([^}]*)}', 'g'));
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
        it('variable function access', function () {
            var templateStr = '<div>${name.toUpperCase()}${info.id}</div>';
            var result = [];
            result.push(dom_1.createElement('div', { innerHTML: 'ONE01' }));
            result.push(dom_1.createElement('div', { innerHTML: 'TWO02' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('window function access', function () {
            var templateStr = '<div>${getName()}${info.id}</div>';
            var result = [];
            result.push(dom_1.createElement('div', { innerHTML: 'TestName01' }));
            result.push(dom_1.createElement('div', { innerHTML: 'TestName02' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array Input With IF Condition', function () {
            var templateStr = '<div>${if(name=="one")}${info.id}${/if}</div>';
            var result = [];
            result.push(dom_1.createElement('div', { innerHTML: '01' }));
            result.push(dom_1.createElement('div', { innerHTML: '' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array Input With IF ELSE Condition', function () {
            var templateStr = '<div>${if(name=="one")}${info.id}${else}${name}${/if}</div>';
            var result = [];
            result.push(dom_1.createElement('div', { innerHTML: '01' }));
            result.push(dom_1.createElement('div', { innerHTML: 'two' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array Input With Multiple IF Condition', function () {
            var templateStr = '<div>${if(name=="one" && info.id != "01")}${info.id}${/if}</div>';
            var result = [];
            result.push(dom_1.createElement('div', { innerHTML: '' }));
            result.push(dom_1.createElement('div', { innerHTML: '' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array Input With For Condition', function () {
            var templateStr = '<div>${for(item of items)}${item} <br/> ${/for}</div>';
            var result = [];
            result.push(dom_1.createElement('div', { innerHTML: 'AR Item1 <br/> AR Item2 <br/> ' }));
            result.push(dom_1.createElement('div', { innerHTML: 'AR Item1 <br/> AR Item2 <br/> ' }));
            expect(outDOM(template.compile(templateStr), dsSubArray)).toEqual(result);
        });
        it('JSON Array Input With For Condition item index', function () {
            var templateStr = '<div>${for(item of items)}${itemIndex},${/for}</div>';
            var result = [];
            result.push(dom_1.createElement('div', { innerHTML: '0,1,' }));
            result.push(dom_1.createElement('div', { innerHTML: '0,1,' }));
            expect(outDOM(template.compile(templateStr), dsSubArray)).toEqual(result);
        });
        it('JSON Array Input With IF and FOR Condition', function () {
            var templateStr = '<div>${if(name=="one")}${for(item of items)}${item} <br/> ${/for}${/if}</div>';
            var result = [];
            result.push(dom_1.createElement('div', { innerHTML: 'AR Item1 <br/> AR Item2 <br/> ' }));
            result.push(dom_1.createElement('div', { innerHTML: '' }));
            expect(outDOM(template.compile(templateStr), dsSubArray)).toEqual(result);
        });
        it('JSON Array Input With FOR and IF Condition', function () {
            var templateStr = '<div>${for(item of items)}${if(item == "AR Item1")}${item}${/if}${/for}</div>';
            var result = [];
            result.push(dom_1.createElement('div', { innerHTML: 'AR Item1' }));
            result.push(dom_1.createElement('div', { innerHTML: 'AR Item1' }));
            expect(outDOM(template.compile(templateStr), dsSubArray)).toEqual(result);
        });
        it('JSON Array Input With Nesting two false Condition', function () {
            var templateStr = '<div>${if(name=="two")}${if(info.id != "02")}${info.id}${/if}${/if}</div>';
            var result = [];
            result.push(dom_1.createElement('div', { innerHTML: '' }));
            result.push(dom_1.createElement('div', { innerHTML: '' }));
            expect(outDOM(template.compile(templateStr), dsJSONSubArray)).toEqual(result);
        });
    });
});
