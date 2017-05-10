define(["require", "exports", "../src/util", "../src/dom"], function (require, exports, Util, dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Util', function () {
        it('getObject function', function () {
            var obj = { type: 'Fiat', model: '500', fields: { text: 'name' } };
            expect(Util.getValue('type', obj)).toBe('Fiat');
            expect(Util.getValue('fields.text', obj)).toBe('name');
        });
        describe('setImmediate', function () {
            var spy = jasmine.createSpy('set');
            beforeAll(function (done) {
                Util.setImmediate(function () {
                    spy();
                    done();
                });
            });
            it('triggers callback properly', function () {
                expect(spy).toHaveBeenCalled();
            });
        });
        it('setObject function', function () {
            var obj = { type: 'Fiat', model: '500', fields: { text: 'name' } };
            Util.setValue('check', true, obj);
            expect(obj.check).toBe(true);
            expect(Object.keys(obj).length).toBe(4);
        });
        it('extend function', function () {
            var first = { type: 'Fiat', model: '500' };
            var second = { model: '500', color: 'white' };
            expect(Util.extend({}, first, second)).toEqual({ type: 'Fiat', model: '500', color: 'white' });
            expect(Util.extend({}, undefined, second)).toEqual({ model: '500', color: 'white' });
            expect(Util.extend(false, first, second)).toEqual({ type: 'Fiat', model: '500', color: 'white' });
            first = { a: { b: { c: 2, d: 5 } }, e: 2 };
            second = { a: { b: { c: 12 } }, e: { test: 2 }, f: 'end' };
            expect(Util.extend({}, first, second, true)).toEqual({ a: { b: { c: 12, d: 5 } }, e: { test: 2 }, f: 'end' });
            expect(Util.extend({}, first)).toEqual({ a: { b: { c: 2, d: 5 } }, e: 2 });
        });
        it('merge function', function () {
            var first = { type: 'Fiat', model: '500' };
            var second;
            expect(Util.merge(first, second)).toEqual(undefined);
        });
        it('delete Object function', function () {
            var first = { type: 'Fiat', model: '500' };
            Util.deleteObject(first, 'type');
            expect(first).toEqual({ model: '500' });
        });
        it('isObject function with JSON', function () {
            var obj = {};
            expect(Util.isObject(obj)).toEqual(true);
        });
        it('isObject function with array', function () {
            var arObj = [];
            expect(Util.isObject(arObj)).toEqual(false);
        });
        it('isNullOrUndefined function', function () {
            var obj = {};
            expect(Util.isNullOrUndefined(null)).toEqual(true);
            expect(Util.isNullOrUndefined(undefined)).toEqual(true);
            expect(Util.isNullOrUndefined('data')).toEqual(false);
            expect(Util.isNullOrUndefined(obj)).toEqual(false);
            obj.data = 'some data';
            expect(Util.isNullOrUndefined(obj)).toEqual(false);
        });
        it('isUndefined function', function () {
            var val;
            expect(Util.isUndefined(val)).toEqual(true);
        });
        it('isUndefined function with value', function () {
            var val = '';
            expect(Util.isUndefined(val)).toEqual(false);
        });
        it('getUniqueId function', function () {
            var uniqueId = Util.getUniqueID('event');
            expect(uniqueId).toEqual('event_0');
            uniqueId = Util.getUniqueID('event');
            expect(uniqueId).toEqual('event_1');
            uniqueId = Util.getUniqueID('');
            expect(uniqueId).toEqual('_2');
        });
        it('getenum function', function () {
            var Days;
            (function (Days) {
                Days[Days["Sunday"] = 0] = "Sunday";
                Days[Days["Monday"] = 1] = "Monday";
                Days[Days["Tuesday"] = 2] = "Tuesday";
            })(Days || (Days = {}));
            expect(Util.getEnumValue(Days, '0')).toEqual('Sunday');
            expect(Util.getEnumValue(Days, 1)).toEqual('Monday');
            expect(Util.getEnumValue(Days, 'Tuesday')).toEqual(2);
            expect(Util.getEnumValue(Days, 5)).toEqual(undefined);
            expect(Util.getEnumValue(Days, 'saturday')).toEqual(undefined);
            expect(Util.getEnumValue(Days, 'monday')).toEqual(undefined);
        });
        it('queryParams function', function () {
            var params = { param1: 'value1' };
            var str = Util.queryParams(params);
            expect(str).toBe('param1=value1');
            var params1 = { param1: 'value1', param2: 'value2' };
            var str1 = Util.queryParams(params1);
            expect(str1).toBe('param1=value1&param2=value2');
        });
        it('isObjectArray', function () {
            var result = Util.isObjectArray([{ test: 1 }]);
            expect(result).toBe(true);
            result = Util.isObjectArray(['text']);
            expect(result).toBe(false);
            result = Util.isObjectArray('text');
            expect(result).toBe(false);
        });
        it('throwError', function () {
            expect(function () { Util.throwError('custom Error'); }).toThrow();
        });
        it('print window print testing', function (done) {
            var win = {
                document: { write: function () { }, close: function () { } },
                close: function () { }, print: function () { }, focus: function () { }
            };
            spyOn(win, 'print');
            win.ready = true;
            Util.print(dom_1.createElement('div', { innerHTML: 'print' }), win);
            setTimeout(function () {
                expect(win.print).toHaveBeenCalled();
                done();
            }, 1000);
        });
        it('print window close testing', function (done) {
            var win = {
                document: { write: function () { }, close: function () { } },
                close: function () { }, print: function () { }, focus: function () { }
            };
            document.getElementsByTagName('head')[0].appendChild(dom_1.createElement('style'));
            win.ready = true;
            spyOn(win, 'close');
            Util.print(dom_1.createElement('div', { innerHTML: 'print' }), win);
            setTimeout(function () {
                expect(win.close).toHaveBeenCalled();
                done();
            }, 1000);
        });
        it('formatunit method auto value testing', function () {
            expect(Util.formatUnit('auto')).toEqual('auto');
        });
        it('formatunit method percentage value testing', function () {
            expect(Util.formatUnit('100%')).toEqual('100%');
        });
        it('formatunit method pixel value testing', function () {
            expect(Util.formatUnit('100px')).toEqual('100px');
        });
        it('formatunit method number value testing', function () {
            expect(Util.formatUnit(100)).toEqual('100px');
        });
        describe('addInstance function', function () {
            var ej2Instances = 'ej2_instances';
            var element = dom_1.createElement('p');
            it('adding by element', function () {
                var instance = { 0: 'elem', 1: 'inst' };
                Util.addInstance(element, instance);
                expect(element[ej2Instances]).toEqual([instance]);
            });
            it('adding by selector', function () {
                var instance1 = { 0: 'selector' };
                Util.addInstance('p', instance1);
                expect(dom_1.select('p')[ej2Instances]).toEqual([instance1]);
            });
        });
        describe('getInstance function', function () {
            var element = dom_1.createElement('p');
            var Test = (function () {
                function Test() {
                }
                return Test;
            }());
            var Test1 = (function () {
                function Test1() {
                }
                return Test1;
            }());
            var inst = new Test();
            var inst1 = new Test();
            inst.name = 'test';
            Util.addInstance(element, inst);
            Util.addInstance(element, inst1);
            it('fetching instance by passing element ', function () {
                expect(JSON.stringify(Util.getInstance(element, Test))).toBe(JSON.stringify({ name: 'test' }));
            });
            it('fetching instance by selector', function () {
                expect(Util.getInstance('p', Test1)).toBe(null);
            });
            it('Unavailable component', function () {
                expect(Util.getInstance('div', {})).toBe(null);
            });
        });
    });
});
