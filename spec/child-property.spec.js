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
    var BookChild = (function (_super) {
        __extends(BookChild, _super);
        function BookChild() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BookChild;
    }(child_property_1.ChildProperty));
    __decorate([
        notify_property_change_1.Property('')
    ], BookChild.prototype, "bookID", void 0);
    __decorate([
        notify_property_change_1.Property('')
    ], BookChild.prototype, "name", void 0);
    __decorate([
        notify_property_change_1.Property('')
    ], BookChild.prototype, "author", void 0);
    var SubjectChild = (function (_super) {
        __extends(SubjectChild, _super);
        function SubjectChild() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SubjectChild;
    }(child_property_1.ChildProperty));
    __decorate([
        notify_property_change_1.Property('')
    ], SubjectChild.prototype, "subID", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], SubjectChild.prototype, "subClick", void 0);
    __decorate([
        notify_property_change_1.Property(0)
    ], SubjectChild.prototype, "subScore", void 0);
    __decorate([
        notify_property_change_1.Property(0)
    ], SubjectChild.prototype, "practicalScore", void 0);
    __decorate([
        notify_property_change_1.Complex({ name: 'Book1' }, BookChild)
    ], SubjectChild.prototype, "prefered", void 0);
    __decorate([
        notify_property_change_1.Collection([{ name: 'levl2name', bookID: 'snm' }], BookChild)
    ], SubjectChild.prototype, "collection", void 0);
    var Demo = (function (_super) {
        __extends(Demo, _super);
        function Demo(ele, options) {
            return _super.call(this, (options ? options : {}), ele) || this;
        }
        Demo.prototype.getModuleName = function () {
            return 'demo';
        };
        Demo.prototype.onPropertyChanged = function (newProp, oldProp) {
            var vde = 1;
            vde;
        };
        return Demo;
    }(base_1.Base));
    __decorate([
        notify_property_change_1.Property('')
    ], Demo.prototype, "name", void 0);
    __decorate([
        notify_property_change_1.Property('')
    ], Demo.prototype, "id", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], Demo.prototype, "click", void 0);
    __decorate([
        notify_property_change_1.Complex({}, SubjectChild)
    ], Demo.prototype, "subject1", void 0);
    __decorate([
        notify_property_change_1.Collection([
            { subID: 'snm', subScore: 2 },
            { subID: 'test2', subScore: 34, prefered: { author: 'syncf', name: 'setter' } }
        ], SubjectChild)
    ], Demo.prototype, "subjectArray", void 0);
    Demo = __decorate([
        notify_property_change_1.NotifyPropertyChanges
    ], Demo);
    var ele = dom_1.createElement('div', { id: 'ele1' });
    describe('ChildProperty', function () {
        describe('complex property', function () {
            var demoClass1 = new Demo(ele);
            var demoClass2 = new Demo(ele);
            describe('getter', function () {
                it('check default value', function () {
                    expect(demoClass1.subject1.prefered.name).toBe('Book1');
                });
            });
            describe('setter', function () {
                it('instance 1', function () {
                    demoClass1.subject1.prefered.name = 'S1Book';
                    expect(demoClass1.subject1.prefered.name).toBe('S1Book');
                });
                it('instance 2', function () {
                    expect(demoClass2.subject1.prefered.name).toBe('Book1');
                });
            });
            describe('setter JSON value', function () {
                it('instance 1', function () {
                    demoClass1.subject1.prefered = { bookID: '001', name: 'Book2' };
                    expect(demoClass1.subject1.prefered.name).toBe('Book2');
                    expect(demoClass1.subject1.prefered.bookID).toBe('001');
                });
                it('instance 2', function () {
                    expect(demoClass2.subject1.prefered.name).toBe('Book1');
                    expect(demoClass2.subject1.prefered.bookID).toBe('');
                });
            });
        });
        describe('onPropertyChanged call', function () {
            it('on child property initialize', function (done) {
                var obj = new Demo(ele, { subject1: { prefered: { name: 'Social Science' } } });
                spyOn(obj, 'onPropertyChanged');
                setTimeout(function () {
                    expect(obj.onPropertyChanged).not.toHaveBeenCalled();
                    expect(obj.subject1.prefered.name).toBe('Social Science');
                    done();
                }, 100);
            });
            it('set properties without change', function () {
                var obj = new Demo(ele);
                spyOn(obj, 'onPropertyChanged');
                obj.dataBind();
                expect(obj.onPropertyChanged).not.toHaveBeenCalled();
            });
        });
        describe('onPropertyChanged call', function () {
            it('dataBind', function () {
                var demoClass1 = new Demo(ele);
                var demoClass2 = new Demo(ele);
                spyOn(demoClass1, 'onPropertyChanged');
                spyOn(demoClass2, 'onPropertyChanged');
                demoClass1.subject1.prefered.name = 'Book3';
                demoClass1.dataBind();
                expect(demoClass1.onPropertyChanged).toHaveBeenCalledWith({ subject1: { prefered: { name: 'Book3' } } }, { subject1: { prefered: { name: 'Book1' } } });
                expect(demoClass2.onPropertyChanged).not.toHaveBeenCalled();
            });
        });
        describe('onPropertyChanged call', function () {
            var demoClass3 = new Demo(ele);
            var demoClass4 = new Demo(ele);
            beforeEach(function (done) {
                spyOn(demoClass3, 'onPropertyChanged');
                spyOn(demoClass4, 'onPropertyChanged');
                demoClass3.subject1.prefered.name = 'Book3';
                setTimeout(function () { done(); }, 50);
            });
            it('timeout', function () {
                expect(demoClass3.onPropertyChanged).toHaveBeenCalledWith({ subject1: { prefered: { name: 'Book3' } } }, { subject1: { prefered: { name: 'Book1' } } });
                expect(demoClass4.onPropertyChanged).not.toHaveBeenCalled();
            });
        });
        describe('onPropertyChanged call', function () {
            it('dataBind JSON bind value', function () {
                var demoClass1 = new Demo(ele);
                var demoClass2 = new Demo(ele);
                spyOn(demoClass1, 'onPropertyChanged');
                spyOn(demoClass2, 'onPropertyChanged');
                demoClass1.subject1 = { prefered: { name: 'Book3' } };
                demoClass1.dataBind();
                expect(demoClass1.onPropertyChanged).toHaveBeenCalledWith({ subject1: { prefered: { name: 'Book3' } } }, { subject1: { prefered: { name: 'Book1' } } });
                expect(demoClass2.onPropertyChanged).not.toHaveBeenCalled();
            });
        });
        describe('onPropertyChanged call', function () {
            var demoClass3 = new Demo(ele);
            var demoClass4 = new Demo(ele);
            beforeEach(function (done) {
                spyOn(demoClass3, 'onPropertyChanged');
                spyOn(demoClass4, 'onPropertyChanged');
                demoClass3.subject1 = { prefered: { name: 'Book3' } };
                setTimeout(function () { done(); }, 50);
            });
            it('timeout JSON value', function () {
                expect(demoClass3.onPropertyChanged).toHaveBeenCalledWith({ subject1: { prefered: { name: 'Book3' } } }, { subject1: { prefered: { name: 'Book1' } } });
                expect(demoClass4.onPropertyChanged).not.toHaveBeenCalled();
            });
        });
        describe('Object array implementation', function () {
            var demoClass3;
            beforeEach(function () {
                demoClass3 = new Demo(ele);
            });
            describe('check setter for object array', function () {
                describe('Change the value of entries multi level', function () {
                    beforeEach(function (done) {
                        demoClass3.subjectArray[0].prefered.bookID = 'test';
                        spyOn(demoClass3, 'onPropertyChanged');
                        setTimeout(function () { done(); }, 50);
                    });
                    it('', function () {
                        expect(demoClass3.subjectArray[0].prefered.bookID).toBe('test');
                        expect(demoClass3.onPropertyChanged).toHaveBeenCalled();
                    });
                });
                describe('Change the inner array value ', function () {
                    beforeEach(function (done) {
                        demoClass3.subjectArray[0].collection[0].name = 'nameChanged';
                        spyOn(demoClass3, 'onPropertyChanged');
                        setTimeout(function () { done(); }, 50);
                    });
                    it('', function () {
                        expect(demoClass3.subjectArray[0].collection[0].name).toBe('nameChanged');
                        expect(demoClass3.onPropertyChanged).toHaveBeenCalled();
                    });
                });
                describe('Assign new array value ', function () {
                    var obj = { bookID: '123', name: 'Collections' };
                    var colAr = [];
                    colAr.push(obj);
                    beforeEach(function (done) {
                        demoClass3.subjectArray[0].collection = colAr;
                        spyOn(demoClass3, 'onPropertyChanged');
                        setTimeout(function () { done(); }, 50);
                    });
                    it('', function () {
                        expect(demoClass3.subjectArray[0].collection[0].properties).toEqual(obj);
                        expect(demoClass3.onPropertyChanged).toHaveBeenCalled();
                    });
                });
            });
        });
    });
});
