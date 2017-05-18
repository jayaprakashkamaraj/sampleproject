var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "../src/notify-property-change", "../src/base", "../src/dom", "../src/child-property"], function (require, exports, notify_property_change_1, base_1, dom_1, child_property_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BookInfo = (function (_super) {
        __extends(BookInfo, _super);
        function BookInfo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BookInfo;
    }(child_property_1.ChildProperty));
    __decorate([
        notify_property_change_1.Property('test')
    ], BookInfo.prototype, "accessId", void 0);
    __decorate([
        notify_property_change_1.Property(false)
    ], BookInfo.prototype, "flag", void 0);
    var Book = (function (_super) {
        __extends(Book, _super);
        function Book() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Book;
    }(child_property_1.ChildProperty));
    __decorate([
        notify_property_change_1.Property('')
    ], Book.prototype, "bookID", void 0);
    __decorate([
        notify_property_change_1.Property('')
    ], Book.prototype, "name", void 0);
    __decorate([
        notify_property_change_1.Property('')
    ], Book.prototype, "author", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], Book.prototype, "level2event", void 0);
    var Book2 = (function (_super) {
        __extends(Book2, _super);
        function Book2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Book2;
    }(child_property_1.ChildProperty));
    __decorate([
        notify_property_change_1.Property('')
    ], Book2.prototype, "author", void 0);
    __decorate([
        notify_property_change_1.Complex({ accessId: 'ss' }, BookInfo)
    ], Book2.prototype, "bookData", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], Book2.prototype, "level2event", void 0);
    var Subject = (function (_super) {
        __extends(Subject, _super);
        function Subject() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Subject;
    }(child_property_1.ChildProperty));
    __decorate([
        notify_property_change_1.Property('')
    ], Subject.prototype, "subID", void 0);
    __decorate([
        notify_property_change_1.Property(0)
    ], Subject.prototype, "subScore", void 0);
    __decorate([
        notify_property_change_1.Property(0)
    ], Subject.prototype, "practicalScore", void 0);
    __decorate([
        notify_property_change_1.Complex({ name: 'Book1' }, Book)
    ], Subject.prototype, "preferedBook", void 0);
    __decorate([
        notify_property_change_1.Collection([{ name: 'levl2name', bookID: 'snm' }], Book)
    ], Subject.prototype, "preferedCollection", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], Subject.prototype, "childEvent", void 0);
    var Subject2 = (function (_super) {
        __extends(Subject2, _super);
        function Subject2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Subject2;
    }(child_property_1.ChildProperty));
    __decorate([
        notify_property_change_1.Complex({ name: 'Book1', bookData: { accessId: 'subject', flag: true } }, Book2)
    ], Subject2.prototype, "preferedBook", void 0);
    var Marker = (function (_super) {
        __extends(Marker, _super);
        function Marker() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Marker;
    }(child_property_1.ChildProperty));
    __decorate([
        notify_property_change_1.Property(true)
    ], Marker.prototype, "visible", void 0);
    __decorate([
        notify_property_change_1.Property('falseString')
    ], Marker.prototype, "fill", void 0);
    var Points = (function (_super) {
        __extends(Points, _super);
        function Points() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Points;
    }(child_property_1.ChildProperty));
    __decorate([
        notify_property_change_1.Property()
    ], Points.prototype, "x", void 0);
    __decorate([
        notify_property_change_1.Property('')
    ], Points.prototype, "fill", void 0);
    __decorate([
        notify_property_change_1.Collection([{ fill: 'dsnm' }], Marker)
    ], Points.prototype, "marker1", void 0);
    var Series = (function (_super) {
        __extends(Series, _super);
        function Series() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Series;
    }(child_property_1.ChildProperty));
    __decorate([
        notify_property_change_1.Complex({}, Marker)
    ], Series.prototype, "marker", void 0);
    __decorate([
        notify_property_change_1.Property('visible')
    ], Series.prototype, "visibility", void 0);
    __decorate([
        notify_property_change_1.Collection([{ x: 22, fill: 'sm', marker1: [{ fill: 'snm' }] }], Points)
    ], Series.prototype, "points", void 0);
    var defaulEvent = jasmine.createSpy('defaultEvent');
    var DemoClass = (function (_super) {
        __extends(DemoClass, _super);
        function DemoClass(properties, ele) {
            return _super.call(this, properties, ele) || this;
        }
        DemoClass.prototype.getModuleName = function () {
            return 'demo';
        };
        DemoClass.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        DemoClass.prototype.onPropertyChanged = function (newProp, oldProp) {
        };
        return DemoClass;
    }(base_1.Base));
    __decorate([
        notify_property_change_1.Property('default1')
    ], DemoClass.prototype, "property1", void 0);
    __decorate([
        notify_property_change_1.Property('default2')
    ], DemoClass.prototype, "property2", void 0);
    __decorate([
        notify_property_change_1.Property()
    ], DemoClass.prototype, "property3", void 0);
    __decorate([
        notify_property_change_1.Property({ text: 'check' })
    ], DemoClass.prototype, "property4", void 0);
    __decorate([
        notify_property_change_1.Complex({ name: 'Book1' }, Subject)
    ], DemoClass.prototype, "subject1", void 0);
    __decorate([
        notify_property_change_1.Complex({ name: 'Book1', preferedBook: { bookData: { accessId: 'snm' } } }, Subject2)
    ], DemoClass.prototype, "subject2", void 0);
    __decorate([
        notify_property_change_1.Collection([{ subID: 'snm', subScore: 2 }, {
                subID: 'test2', subScore: 34, preferedBook: { author: 'syncf', name: 'setter' }
            }
        ], Subject)
    ], DemoClass.prototype, "subjectCollection", void 0);
    __decorate([
        notify_property_change_1.Collection([{}], Series)
    ], DemoClass.prototype, "seriesCollection", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], DemoClass.prototype, "event1", void 0);
    DemoClass = __decorate([
        notify_property_change_1.NotifyPropertyChanges
    ], DemoClass);
    var ele = dom_1.createElement('div', { id: 'ele1' });
    var objDemoClass1 = new DemoClass({}, ele);
    var objDemoClass2 = new DemoClass({}, ele);
    describe('NotifyProperty', function () {
        describe('Property decorator creation', function () {
            it('create property using property function', function () {
                notify_property_change_1.Property()(objDemoClass1, 'newProp');
                expect(objDemoClass1.hasOwnProperty('newProp')).toBe(true);
            });
            it('create property for multiple instance', function () {
                notify_property_change_1.Property()(objDemoClass2, 'newProp');
                expect(objDemoClass2.hasOwnProperty('newProp')).toBe(true);
            });
        });
        describe('Class decorator creation', function () {
            it('dynamic function creation', function () {
                notify_property_change_1.NotifyPropertyChanges(objDemoClass1.constructor);
                expect(typeof objDemoClass1.saveChanges).toEqual('function');
                expect(typeof objDemoClass1.dataBind).toEqual('function');
            });
            it('function creation for multiple instance ', function () {
                notify_property_change_1.NotifyPropertyChanges(objDemoClass2.constructor);
                expect(typeof objDemoClass2.saveChanges).toEqual('function');
                expect(typeof objDemoClass2.dataBind).toEqual('function');
            });
        });
        describe('default Value', function () {
            it('get default value', function () {
                expect(objDemoClass1.property1).toBe('default1');
                expect(objDemoClass1.property2).toBe('default2');
                expect(objDemoClass1.property3).toBe(undefined);
            });
            it('get default value of 2nd instance', function () {
                expect(objDemoClass2.property2).toBe('default2');
                expect(objDemoClass1.property2).toBe('default2');
                objDemoClass2.property2 = 'value2';
                expect(objDemoClass1.property2).toBe('default2');
                expect(objDemoClass2.property2).toBe('value2');
            });
            it('complex default value', function () {
                expect(objDemoClass2.property4.text).toBe('check');
                expect(objDemoClass1.property4.text).toBe('check');
                objDemoClass2.property4 = { text: 'test' };
                expect(objDemoClass1.property4.text).toBe('check');
                expect(objDemoClass2.property4.text).toBe('test');
            });
            it('Complex default value multi level and default value at all levels', function () {
                expect(objDemoClass1.subject2.preferedBook.bookData.accessId).toBe('snm');
                expect(objDemoClass1.property4.text).toBe('check');
            });
            describe('complex multi level property value changes', function () {
                beforeAll(function (done) {
                    spyOn(objDemoClass1, 'onPropertyChanged');
                    objDemoClass1.subject2.preferedBook.bookData.accessId = 'valueChanged';
                    setTimeout(function () { done(); }, 50);
                });
                it('works properly', function () {
                    expect(objDemoClass1.onPropertyChanged).toHaveBeenCalled();
                    expect(objDemoClass1.subject2.preferedBook.bookData.accessId).toBe('valueChanged');
                });
            });
            it('complex property value change specifically', function () {
                expect(objDemoClass1.property4.text).toBe('check');
                expect(objDemoClass2.property4.text).toBe('test');
                objDemoClass2.property4.text = 'updated';
                expect(objDemoClass1.property4.text).toBe('check');
                expect(objDemoClass2.property4.text).toBe('updated');
            });
            describe(' array  of complex default value', function () {
                it('check array length', function () {
                    expect(objDemoClass1.subjectCollection.length).toBe(2);
                });
                it('check array values first level', function () {
                    expect(objDemoClass1.subjectCollection[0].subID).toBe('snm');
                });
                it('check array values level2', function () {
                    expect(objDemoClass1.subjectCollection[1].preferedBook.author).toBe('syncf');
                });
                it('check complex property array value array value', function () {
                    expect(objDemoClass1.subjectCollection[0].preferedCollection[0].name).toBe('levl2name');
                });
            });
            describe('Multi level complexProperty array', function () {
                it('check first level array default value', function () {
                    expect(objDemoClass1.seriesCollection[0].visibility).toBe('visible');
                });
                it('check second level array default value', function () {
                    expect(objDemoClass1.seriesCollection[0].points[0].x).toBe(22);
                });
                it('check third level array default value', function () {
                    expect(objDemoClass1.seriesCollection[0].points[0].marker1[0].fill).toBe('snm');
                });
            });
        });
        describe('NotifyPropertyChanges', function () {
            var dataClass;
            beforeAll(function () {
                dataClass = new DemoClass({}, ele);
            });
            it('saveChanges method call', function () {
                spyOn(objDemoClass1, 'saveChanges');
                spyOn(objDemoClass2, 'saveChanges');
                objDemoClass1.property2 = 'check';
                objDemoClass1.property2 = 'check';
                expect(objDemoClass1.saveChanges).toHaveBeenCalledWith('property2', 'check', 'default2');
                expect(objDemoClass1.saveChanges).toHaveBeenCalledTimes(1);
                expect(objDemoClass2.saveChanges).not.toHaveBeenCalled();
            });
            it('dataBind method call', function () {
                spyOn(dataClass, 'onPropertyChanged');
                dataClass.property2 = 'value1';
                dataClass.property3 = 'value2';
                dataClass.dataBind();
                expect(dataClass.onPropertyChanged).toHaveBeenCalledWith({ property2: 'value1', property3: 'value2' }, { property2: 'default2', property3: undefined });
            });
            it('dataBind method call without property change', function () {
                spyOn(dataClass, 'onPropertyChanged');
                objDemoClass1.dataBind();
                dataClass.dataBind();
                expect(dataClass.onPropertyChanged).not.toHaveBeenCalled();
            });
        });
        describe('Methods', function () {
            beforeEach(function (done) {
                spyOn(objDemoClass1, 'onPropertyChanged');
                objDemoClass1.property2 = 'checknew';
                objDemoClass1.property3 = 'check3';
                setTimeout(function () {
                    done();
                }, 0);
            });
            it('onPropertyChanged using normal method', function () {
                expect(objDemoClass1.onPropertyChanged).toHaveBeenCalledWith({ property2: 'checknew', property3: 'check3' }, { property2: 'check', property3: undefined });
            });
        });
        describe('Methods', function () {
            beforeEach(function (done) {
                spyOn(objDemoClass1, 'onPropertyChanged');
                spyOn(objDemoClass2, 'onPropertyChanged');
                objDemoClass2.property2 = 'check';
                objDemoClass2.property3 = 'check3';
                setTimeout(function () {
                    done();
                }, 0);
            });
            it('onPropertyChanged method multiple test', function () {
                expect(objDemoClass1.onPropertyChanged).not.toHaveBeenCalled();
                expect(objDemoClass2.onPropertyChanged).toHaveBeenCalledWith({ property2: 'check', property3: 'check3' }, { property2: 'value2', property3: undefined });
            });
        });
        describe('Methods', function () {
            beforeEach(function (done) {
                spyOn(objDemoClass1, 'onPropertyChanged');
                objDemoClass1.setProperties({ property1: 'val1', property2: 'val2', property3: 'val3' });
                setTimeout(function () {
                    done();
                }, 0);
            });
            it('setProperties method with out mute mode', function () {
                expect(objDemoClass1.onPropertyChanged).toHaveBeenCalledWith({ property1: 'val1', property2: 'val2', property3: 'val3' }, {
                    'property1': 'default1',
                    'property2': 'checknew',
                    'property3': 'check3'
                });
            });
        });
        describe('Methods', function () {
            beforeEach(function (done) {
                spyOn(objDemoClass1, 'onPropertyChanged');
                objDemoClass1.setProperties({ property1: 'val11', property2: 'val12', property3: 'val13' }, true);
                setTimeout(function () {
                    done();
                }, 0);
            });
            it('setProperties method with mute mode', function () {
                expect(objDemoClass1.onPropertyChanged).not.toHaveBeenCalled();
                expect(objDemoClass1.property1).toEqual('val11');
                expect(objDemoClass1.property2).toEqual('val12');
                expect(objDemoClass1.property3).toEqual('val13');
            });
        });
        describe('Methods', function () {
            beforeEach(function (done) {
                spyOn(objDemoClass1, 'onPropertyChanged');
                objDemoClass1.property1 = 'val11';
                objDemoClass1.destroy();
                setTimeout(function () {
                    done();
                }, 0);
            });
            it('onproperty change after control destroy', function () {
                expect(objDemoClass1.onPropertyChanged).not.toHaveBeenCalled();
            });
        });
        describe('check setter for array of complex object', function () {
            var demoClassAr;
            beforeEach(function () {
                demoClassAr = new DemoClass({}, ele);
            });
            describe('Re assigning new array', function () {
                beforeEach(function (done) {
                    demoClassAr.subjectCollection = [{ subID: '2', subScore: 22 }];
                    demoClassAr.subjectCollection.push({ subID: '2', subScore: 22 });
                    spyOn(demoClassAr, 'onPropertyChanged');
                    setTimeout(function () { done(); }, 50);
                });
                it('', function () {
                    expect(demoClassAr.subjectCollection.length).toBe(2);
                    expect(demoClassAr.subjectCollection[0].subID).toBe('2');
                    expect(demoClassAr.subjectCollection[0].subScore).toBe(22);
                    expect(demoClassAr.onPropertyChanged).toHaveBeenCalled();
                });
            });
            describe('Change the value of entries single level', function () {
                beforeEach(function (done) {
                    spyOn(demoClassAr, 'onPropertyChanged');
                    demoClassAr.subjectCollection[0].subID = '786';
                    demoClassAr.dataBind();
                    setTimeout(function () { done(); }, 50);
                });
                it('', function () {
                    expect(demoClassAr.subjectCollection[0].subID).toBe('786');
                    expect(demoClassAr.onPropertyChanged).toHaveBeenCalled();
                });
            });
            describe('change value in third level array triggers property changed', function () {
                describe('Reassigning new array', function () {
                    beforeEach(function (done) {
                        spyOn(demoClassAr, 'onPropertyChanged');
                        demoClassAr.seriesCollection[0].points[0].marker1 = [{ fill: 'val1', visible: false }, { fill: 'val2', visible: true }];
                        demoClassAr.dataBind();
                        setTimeout(function () { done(); }, 50);
                    });
                    it('', function () {
                        expect(demoClassAr.onPropertyChanged).toHaveBeenCalled();
                        expect(demoClassAr.seriesCollection[0].points[0].marker1.length).toBe(2);
                    });
                });
                describe('changed values in one of entries new array', function () {
                    beforeEach(function (done) {
                        spyOn(demoClassAr, 'onPropertyChanged');
                        demoClassAr.seriesCollection[0].points[0].marker1[0].fill = 'value4';
                        demoClassAr.dataBind();
                        setTimeout(function () { done(); }, 50);
                    });
                    it('', function () {
                        expect(demoClassAr.onPropertyChanged).toHaveBeenCalled();
                        expect(demoClassAr.seriesCollection[0].points[0].marker1[0].fill).toBe('value4');
                    });
                });
            });
        });
        describe('Creating the component using the builder', function () {
            var DemoBuilder2 = notify_property_change_1.CreateBuilder(DemoClass);
            it('Assign value to simple properties using builder', function () {
                var evspy = jasmine.createSpy('evspy');
                var DemoBuilder = notify_property_change_1.CreateBuilder(DemoClass);
                var component = new DemoBuilder('#ele').property1('testText').event1(evspy).create();
                expect(component.property1).toBe('testText');
                expect(component.event1).toEqual(evspy);
                component.trigger('event1');
                expect(evspy).toHaveBeenCalled();
            });
            it('Assign value to complex property single level with return type Object', function () {
                var DemoBuilder = notify_property_change_1.CreateBuilder(DemoClass);
                var component = new DemoBuilder('#ele').property1('testText').subject1(function (sd) {
                    sd.subID('sdd');
                }).create();
                expect(component.subject1.properties).toEqual({ subID: 'sdd' });
            });
            it('Assign value to complex property single level with return type Array', function () {
                var component2 = new DemoBuilder2('#ele').property1('testText').subject1(function (sd) {
                    sd.subID('sdd').add();
                }).create();
                expect(component2.subject1[0]).toEqual({ subID: 'sdd' });
            });
            it('Assign value to complex property multi level with return type Object', function () {
                var DemoBuilder = notify_property_change_1.CreateBuilder(DemoClass);
                var component = new DemoBuilder('#ele').property1('testText').subject1(function (sd) {
                    sd.subID('sdd').preferedBook(function (p) {
                        p.bookID('testId').author('NewAuthor');
                    });
                }).create();
                expect(component.subject1.properties.preferedBook.properties).
                    toEqual({ name: 'Book1', bookID: 'testId', author: 'NewAuthor' });
            });
        });
        describe('check events', function () {
            describe('Event set at instance creation triggers properly', function () {
                var eve;
                var eventObj;
                beforeEach(function () {
                    eve = jasmine.createSpy('test');
                    eventObj = new DemoClass({ event1: eve }, ele);
                });
                it('check the value is set to event properly', function () {
                    expect(eventObj.event1).toEqual(eve);
                });
                it('event triggers properly', function () {
                    eventObj.trigger('event1');
                    expect(eve).toHaveBeenCalled();
                });
                it('check previous handler removes properly while assigning new value', function () {
                    var tempEvent = jasmine.createSpy('test2');
                    eventObj.event1 = tempEvent;
                    eventObj.trigger('event1');
                    expect(eve).not.toHaveBeenCalled();
                    expect(tempEvent).toHaveBeenCalled();
                });
                it('check event handler removes while value set to undefined', function () {
                    eventObj.event1 = eve;
                    eventObj.event1 = undefined;
                    eventObj.trigger('event1');
                    expect(eve).not.toHaveBeenCalled();
                });
            });
            describe('multi level events', function () {
                var eve1;
                var eve2;
                var eventObj;
                beforeEach(function () {
                    eve1 = jasmine.createSpy('event1');
                    eve2 = jasmine.createSpy('event2');
                    eventObj = new DemoClass({}, ele);
                });
                it('add handler working properly in single level complex property', function () {
                    eventObj.subject1.childEvent = eve1;
                    eventObj.trigger('subject1-childEvent', { test: 1 });
                    expect(eve1).toHaveBeenCalledWith({ name: 'subject1-childEvent', test: 1 });
                });
                it('remove handler working properly in single level complex property', function () {
                    eventObj.subject1.childEvent = eve1;
                    eventObj.subject1.childEvent = undefined;
                    eventObj.trigger('subject1-childEvent', { test: 1 });
                    expect(eve1).not.toHaveBeenCalled();
                });
                it('add handler working properly in second level complex property', function () {
                    eventObj.subject1.preferedBook.level2event = eve1;
                    eventObj.trigger('subject1-preferedBook-level2event', { test: 1 });
                    expect(eve1).toHaveBeenCalledWith({ name: 'subject1-preferedBook-level2event', test: 1 });
                });
                it('remove handler working properly in second level complex property', function () {
                    eventObj.subject1.preferedBook.level2event = undefined;
                    eventObj.trigger('subject1-preferedBook-level2event', { test: 1 });
                    expect(eve1).not.toHaveBeenCalled();
                });
            });
        });
    });
});
