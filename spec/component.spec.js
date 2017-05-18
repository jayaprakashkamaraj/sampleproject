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
define(["require", "exports", "../src/dom", "../src/util", "../src/component", "../src/child-property", "../src/notify-property-change", "../src/touch", "../src/internationalization"], function (require, exports, dom_1, util_1, component_1, child_property_1, notify_property_change_1, touch_1, internationalization_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InnerTable = (function (_super) {
        __extends(InnerTable, _super);
        function InnerTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InnerTable;
    }(child_property_1.ChildProperty));
    __decorate([
        notify_property_change_1.Property('id')
    ], InnerTable.prototype, "id", void 0);
    __decorate([
        notify_property_change_1.Property('name')
    ], InnerTable.prototype, "name", void 0);
    exports.InnerTable = InnerTable;
    var Table = (function (_super) {
        __extends(Table, _super);
        function Table() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Table;
    }(child_property_1.ChildProperty));
    __decorate([
        notify_property_change_1.Property('id')
    ], Table.prototype, "id", void 0);
    __decorate([
        notify_property_change_1.Property('name')
    ], Table.prototype, "name", void 0);
    __decorate([
        notify_property_change_1.Complex({}, InnerTable)
    ], Table.prototype, "innerTable", void 0);
    exports.Table = Table;
    var Fields = (function (_super) {
        __extends(Fields, _super);
        function Fields() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Fields;
    }(child_property_1.ChildProperty));
    __decorate([
        notify_property_change_1.Property('id')
    ], Fields.prototype, "id", void 0);
    __decorate([
        notify_property_change_1.Property('name')
    ], Fields.prototype, "name", void 0);
    __decorate([
        notify_property_change_1.Complex({}, Table)
    ], Fields.prototype, "table", void 0);
    exports.Fields = Fields;
    var Styler = (function (_super) {
        __extends(Styler, _super);
        function Styler(fontObj, id) {
            return _super.call(this, fontObj, id) || this;
        }
        Styler.prototype.preRender = function () { };
        Styler.prototype.getModuleName = function () {
            return 'Styler';
        };
        Styler.prototype.getPersistData = function () {
            return this.ignoreOnPersist(['size']);
        };
        Styler.prototype.render = function () {
            this.element.classList.add('e-styler');
            this.element.style.fontSize = this.size;
        };
        Styler.prototype.destroy = function () {
            this.element.classList.remove('e-styler');
            _super.prototype.destroy.call(this);
        };
        Styler.prototype.onPropertyChanged = function (newProp, oldProp) {
            this.element.style.fontSize = newProp['size'];
        };
        return Styler;
    }(component_1.Component));
    __decorate([
        notify_property_change_1.Property('12px')
    ], Styler.prototype, "size", void 0);
    __decorate([
        notify_property_change_1.Property(false)
    ], Styler.prototype, "enablePersistence", void 0);
    __decorate([
        notify_property_change_1.Complex({}, Fields)
    ], Styler.prototype, "fields", void 0);
    __decorate([
        notify_property_change_1.Property({ color: 'red' })
    ], Styler.prototype, "settings", void 0);
    __decorate([
        notify_property_change_1.Property([])
    ], Styler.prototype, "items", void 0);
    __decorate([
        notify_property_change_1.Property()
    ], Styler.prototype, "event1", void 0);
    __decorate([
        notify_property_change_1.Property('true')
    ], Styler.prototype, "enableTouch", void 0);
    __decorate([
        notify_property_change_1.Property()
    ], Styler.prototype, "event2", void 0);
    __decorate([
        notify_property_change_1.Property()
    ], Styler.prototype, "event3", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], Styler.prototype, "created", void 0);
    __decorate([
        notify_property_change_1.Event()
    ], Styler.prototype, "destroyed", void 0);
    Styler = __decorate([
        notify_property_change_1.NotifyPropertyChanges
    ], Styler);
    exports.Styler = Styler;
    var Styler1 = (function (_super) {
        __extends(Styler1, _super);
        function Styler1(fontObj, id) {
            return _super.call(this, fontObj, id) || this;
        }
        Styler1.prototype.requiredModules = function () {
            var modules = [{
                    args: [this.element],
                    member: 'touch'
                }];
            return modules;
        };
        ;
        return Styler1;
    }(Styler));
    Styler1 = __decorate([
        notify_property_change_1.NotifyPropertyChanges
    ], Styler1);
    exports.Styler1 = Styler1;
    var ObserveComponent = (function (_super) {
        __extends(ObserveComponent, _super);
        function ObserveComponent(id, option) {
            return _super.call(this, option, id) || this;
        }
        ObserveComponent.prototype.preRender = function () {
        };
        ObserveComponent.prototype.getModuleName = function () {
            return 'observeComponent';
        };
        ObserveComponent.prototype.getPersistData = function () {
            return this.ignoreOnPersist([]);
        };
        ObserveComponent.prototype.render = function () {
        };
        ObserveComponent.prototype.destroy = function () {
            this.element.classList.remove('e-styler');
            _super.prototype.destroy.call(this);
        };
        ObserveComponent.prototype.onPropertyChanged = function (newProp, oldProp) {
        };
        return ObserveComponent;
    }(component_1.Component));
    __decorate([
        notify_property_change_1.Property()
    ], ObserveComponent.prototype, "event1", void 0);
    __decorate([
        notify_property_change_1.Property()
    ], ObserveComponent.prototype, "event2", void 0);
    __decorate([
        notify_property_change_1.Property()
    ], ObserveComponent.prototype, "event3", void 0);
    ObserveComponent = __decorate([
        notify_property_change_1.NotifyPropertyChanges
    ], ObserveComponent);
    exports.ObserveComponent = ObserveComponent;
    describe('Component', function () {
        it('Uninjecting with empty required modules', function () {
            Styler.Inject();
            var elem = dom_1.createElement('div', { id: 'myStyleDiv0' });
            document.body.appendChild(elem);
            var styleObj = new Styler({ size: '20px' }, '#myStyleDiv0');
            expect(styleObj.getInjectedModules()).toEqual([]);
            styleObj.destroy();
            document.body.innerHTML = '';
        });
        it('Injecting modules with out required modules', function () {
            Styler.Inject(touch_1.Touch);
            var elem = dom_1.createElement('div', { id: 'myStyleDiv0' });
            document.body.appendChild(elem);
            var styleObj = new Styler({ size: '20px' }, '#myStyleDiv0');
            expect(util_1.getValue('touchModule', styleObj)).toEqual(undefined);
            styleObj.destroy();
            document.body.innerHTML = '';
        });
        it('Injecting dependent modules without required modules', function () {
            Styler.Inject(touch_1.Touch);
            var elem = dom_1.createElement('div', { id: 'myStyleDiv0' });
            document.body.appendChild(elem);
            var styleObj = new Styler({ size: '20px' }, '#myStyleDiv0');
            expect(util_1.getValue('touchModule', styleObj)).toEqual(undefined);
            styleObj.destroy();
            document.body.innerHTML = '';
        });
        it('Injecting dependent modules with required modules', function () {
            Styler1.Inject(touch_1.Touch);
            var elem = dom_1.createElement('div', { id: 'myStyleDiv0' });
            document.body.appendChild(elem);
            var styleObj = new Styler1({ size: '20px' }, '#myStyleDiv0');
            expect(util_1.getValue('touchModule', styleObj) instanceof touch_1.Touch).toEqual(true);
            styleObj.destroy();
            document.body.innerHTML = '';
        });
        it('Controls render by default', function () {
            var elem = dom_1.createElement('div', { id: 'myStyleDiv0' });
            document.body.appendChild(elem);
            var styleObj = new Styler({ size: '20px', enablePersistence: true }, '#myStyleDiv0');
            expect(document.getElementById('myStyleDiv0').style.fontSize).toEqual('20px');
            styleObj.refresh();
            styleObj.destroy();
            document.body.innerHTML = '';
        });
        it('Control render by appendto ', function () {
            var elem = dom_1.createElement('div', { id: 'myStyleDiv1' });
            document.body.appendChild(elem);
            var styleObj = new Styler({ size: '25px' });
            styleObj.appendTo();
            styleObj.appendTo('#myStyleDiv1');
            expect(document.getElementById('myStyleDiv1').style.fontSize).toEqual('25px');
            styleObj.destroy();
            document.body.innerHTML = '';
        });
        it('Controls render by default from element', function () {
            var elem = dom_1.createElement('div', { id: 'myStyleDiv2' });
            document.body.appendChild(elem);
            var myElem = document.getElementById('myStyleDiv2');
            var styleObj = new Styler({ size: '20px' }, myElem);
            expect(document.getElementById('myStyleDiv2').style.fontSize).toEqual('20px');
            styleObj.destroy();
            document.body.innerHTML = '';
        });
        it('Control render by appendto from element', function () {
            var elem = dom_1.createElement('div', { id: 'myStyleDiv3' });
            document.body.appendChild(elem);
            var styleObj = new Styler({ size: '25px' });
            var myElem = document.getElementById('myStyleDiv3');
            styleObj.appendTo(myElem);
            expect(document.getElementById('myStyleDiv3').style.fontSize).toEqual('25px');
            styleObj.destroy();
            document.body.innerHTML = '';
        });
        it('instance creation check in appendTo', function () {
            var elem = dom_1.createElement('div', { id: 'instanceEle' });
            var styleObj = new Styler({ size: '25px' });
            styleObj.appendTo(elem);
            expect(elem.ej2_instances[0]).toEqual(styleObj);
            expect(elem.ej2_instances.length).toEqual(1);
        });
        it('instance creation check in constructor creation', function () {
            var elem = dom_1.createElement('div', { id: 'instanceEle1' });
            var styleObj = new Styler({ size: '25px' }, elem);
            expect(elem.ej2_instances[0]).toEqual(styleObj);
            expect(elem.ej2_instances.length).toEqual(1);
        });
        it('change detection for enableRtl', function () {
            var elem = dom_1.createElement('div', { id: 'rtlDiv' });
            document.body.appendChild(elem);
            var styleObj = new Styler({ size: '24px' }, elem);
            var onChangeFn = jasmine.createSpy('onPropertyChanged');
            styleObj.onPropertyChanged = onChangeFn;
            styleObj.enableRtl = true;
            styleObj.dataBind();
            expect(onChangeFn).toHaveBeenCalledWith({ enableRtl: true }, { enableRtl: false });
            styleObj.destroy();
            document.body.innerHTML = '';
        });
        it('Check defaultrtlstatus is set to component corrctly', function () {
            var elem = dom_1.createElement('div', { id: 'rtlDiv' });
            document.body.appendChild(elem);
            internationalization_1.enableRtl();
            var styleObj = new Styler({ size: '24px' }, elem);
            expect(styleObj.enableRtl).toBe(true);
            styleObj.destroy();
            internationalization_1.enableRtl(false);
        });
        it('change detection for enableRtl with enableRtl function ', function () {
            var elem = dom_1.createElement('div', { id: 'rtlDiv' });
            document.body.appendChild(elem);
            var styleObj = new Styler({ size: '24px' }, elem);
            var onChangeFn = jasmine.createSpy('onPropertyChanged');
            styleObj.onPropertyChanged = onChangeFn;
            internationalization_1.enableRtl();
            styleObj.dataBind();
            expect(onChangeFn).toHaveBeenCalledWith({ enableRtl: true }, { enableRtl: false });
            styleObj.destroy();
            document.body.innerHTML = '';
            internationalization_1.enableRtl(false);
        });
        it('set enableRtl in component side works properly', function () {
            var elem = dom_1.createElement('div', { id: 'rtlDiv' });
            document.body.appendChild(elem);
            var styleObj = new Styler({ size: '24px', enableRtl: true }, elem);
            expect(styleObj.enableRtl).toBe(true);
            styleObj.destroy();
        });
        it('Check defaultculture is set to component corrctly', function () {
            var elem = dom_1.createElement('div', { id: 'rtlDiv' });
            document.body.appendChild(elem);
            internationalization_1.setCulture('ar');
            var styleObj = new Styler({ size: '24px' }, elem);
            expect(styleObj.locale).toBe('ar');
            styleObj.destroy();
            internationalization_1.setCulture('en-US');
        });
        it('change detection for culture with setCulture function ', function () {
            var elem = dom_1.createElement('div', { id: 'rtlDiv' });
            document.body.appendChild(elem);
            var styleObj = new Styler({ size: '24px' }, elem);
            var onChangeFn = jasmine.createSpy('onPropertyChanged');
            styleObj.onPropertyChanged = onChangeFn;
            internationalization_1.setCulture('ja');
            styleObj.dataBind();
            expect(onChangeFn).toHaveBeenCalledWith({ locale: 'ja' }, { locale: 'en-US' });
            styleObj.destroy();
            document.body.innerHTML = '';
            internationalization_1.setCulture('en-US');
        });
        it('set locale in component side works properly', function () {
            var elem = dom_1.createElement('div', { id: 'rtlDiv' });
            document.body.appendChild(elem);
            var styleObj = new Styler({ size: '24px', locale: 'ar-QA' }, elem);
            expect(styleObj.locale).toBe('ar-QA');
            styleObj.destroy();
        });
        it('change detection for when refresh', function (done) {
            var elem = dom_1.createElement('div', { id: 'rtlDiv' });
            document.body.appendChild(elem);
            var styleObj = new Styler({ size: '24px' }, elem);
            var onChangeFn = jasmine.createSpy('onPropertyChange');
            styleObj.onPropertyChanged = onChangeFn;
            styleObj.enableRtl = true;
            styleObj.refresh();
            setTimeout(function () {
                expect(onChangeFn).not.toHaveBeenCalled();
                styleObj.destroy();
                document.body.innerHTML = '';
                done();
            }, 100);
        });
        it('addEventListener', function () {
            var i = 0;
            var elem = dom_1.createElement('div', { id: 'myStyleDiv2' });
            document.body.appendChild(elem);
            var styleObj = new Styler({ size: '25px' });
            styleObj.appendTo('#myStyleDiv2');
            styleObj.addEventListener('click', function () {
                i++;
            });
            styleObj.trigger('click');
            expect(i).toEqual(1);
            styleObj.destroy();
            document.body.innerHTML = '';
        });
        it('removeEventListener', function () {
            var i = 0;
            var elem = dom_1.createElement('div', { id: 'myStyleDiv3' });
            document.body.appendChild(elem);
            var styleObj = new Styler({ size: '25px' });
            var func = function () {
                i++;
            };
            styleObj.appendTo('#myStyleDiv3');
            styleObj.addEventListener('click', func);
            styleObj.removeEventListener('click', func);
            styleObj.trigger('click');
            expect(i).toEqual(0);
            styleObj.destroy();
            document.body.innerHTML = '';
        });
        it('add on persistence with complex object', function () {
            window.localStorage.clear();
            var elem = dom_1.createElement('div', { id: 'addonP' });
            document.body.appendChild(elem);
            var list = ['size', 'fields.id', 'fields.table.id', 'fields.table.innerTable.id', 'settings', 'columns'];
            var actual = Styler.prototype.getPersistData;
            Styler.prototype.getPersistData = function () {
                return this.addOnPersist(list);
            };
            var styleObj2 = new Styler({ size: '20px', enablePersistence: true }, '#addonP');
            styleObj2.fields.id = 'EmpID';
            styleObj2.fields.name = 'EmpName';
            styleObj2.fields.table.id = 'TableID';
            styleObj2.fields.table.name = 'TableName';
            styleObj2.fields.table.innerTable.id = 'InnerTableID';
            styleObj2.fields.table.innerTable.name = 'InnerTableName';
            styleObj2.destroy();
            var styleObj3 = new Styler({ size: '20px', enablePersistence: true }, '#addonP');
            expect(styleObj3.fields.id).toBe('EmpID');
            expect(styleObj3.fields.name).toBe('name');
            expect(styleObj3.fields.table.id).toBe('TableID');
            expect(styleObj3.fields.table.name).toBe('name');
            expect(styleObj3.fields.table.innerTable.id).toBe('InnerTableID');
            expect(styleObj3.fields.table.innerTable.name).toBe('name');
            styleObj3.destroy();
            elem.remove();
            Styler.prototype.getPersistData = actual;
        });
        it('add on persistence with complex whole object', function () {
            window.localStorage.clear();
            var elem = dom_1.createElement('div', { id: 'addonP' });
            document.body.appendChild(elem);
            var list = ['fields'];
            var actual = Styler.prototype.getPersistData;
            Styler.prototype.getPersistData = function () {
                return this.addOnPersist(list);
            };
            var styleObj2 = new Styler({ size: '20px', enablePersistence: true }, '#addonP');
            styleObj2.fields.id = 'EmpID';
            styleObj2.fields.name = 'EmpName';
            styleObj2.fields.table.id = 'TableID';
            styleObj2.fields.table.name = 'TableName';
            styleObj2.fields.table.innerTable.id = 'InnerTableID';
            styleObj2.fields.table.innerTable.name = 'InnerTableName';
            styleObj2.destroy();
            var styleObj3 = new Styler({ size: '20px', enablePersistence: true }, '#addonP');
            expect(styleObj3.fields.id).toBe('EmpID');
            expect(styleObj3.fields.name).toBe('EmpName');
            expect(styleObj3.fields.table.id).toBe('TableID');
            expect(styleObj3.fields.table.name).toBe('TableName');
            expect(styleObj3.fields.table.innerTable.id).toBe('InnerTableID');
            expect(styleObj3.fields.table.innerTable.name).toBe('InnerTableName');
            styleObj3.destroy();
            elem.remove();
            Styler.prototype.getPersistData = actual;
        });
        it('add on persistence without complex object', function () {
            window.localStorage.clear();
            var elem = dom_1.createElement('div', { id: 'addonP' });
            document.body.appendChild(elem);
            var list = ['size'];
            var actual = Styler.prototype.getPersistData;
            Styler.prototype.getPersistData = function () {
                return this.addOnPersist(list);
            };
            var styleObj2 = new Styler({ size: '20px', enablePersistence: true }, '#addonP');
            styleObj2.size = '200px';
            styleObj2.fields.id = 'EmpID';
            styleObj2.fields.name = 'EmpName';
            styleObj2.fields.table.id = 'TableID';
            styleObj2.fields.table.name = 'TableName';
            styleObj2.fields.table.innerTable.id = 'InnerTableID';
            styleObj2.fields.table.innerTable.name = 'InnerTableName';
            styleObj2.destroy();
            var styleObj3 = new Styler({ size: '20px', enablePersistence: true }, '#addonP');
            expect(styleObj3.size).toBe('200px');
            expect(styleObj3.fields.id).toBe('id');
            expect(styleObj3.fields.name).toBe('name');
            expect(styleObj3.fields.table.id).toBe('id');
            expect(styleObj3.fields.table.name).toBe('name');
            expect(styleObj3.fields.table.innerTable.id).toBe('id');
            expect(styleObj3.fields.table.innerTable.name).toBe('name');
            styleObj3.destroy();
            elem.remove();
            Styler.prototype.getPersistData = actual;
        });
        it('add on persistence with an array', function () {
            window.localStorage.clear();
            var elem = dom_1.createElement('div', { id: 'addonP' });
            document.body.appendChild(elem);
            var list = ['items'];
            var actual = Styler.prototype.getPersistData;
            Styler.prototype.getPersistData = function () {
                return this.addOnPersist(list);
            };
            var styleObj2 = new Styler({ size: '20px', enablePersistence: true }, '#addonP');
            styleObj2.items = ['i1', 'i2', 'i3'];
            styleObj2.fields.id = 'EmpID';
            styleObj2.fields.name = 'EmpName';
            styleObj2.fields.table.id = 'TableID';
            styleObj2.fields.table.name = 'TableName';
            styleObj2.fields.table.innerTable.id = 'InnerTableID';
            styleObj2.fields.table.innerTable.name = 'InnerTableName';
            styleObj2.destroy();
            var styleObj3 = new Styler({ size: '20px', enablePersistence: true }, '#addonP');
            expect(styleObj3.items).toEqual(['i1', 'i2', 'i3']);
            expect(styleObj3.fields.id).toBe('id');
            expect(styleObj3.fields.name).toBe('name');
            expect(styleObj3.fields.table.id).toBe('id');
            expect(styleObj3.fields.table.name).toBe('name');
            expect(styleObj3.fields.table.innerTable.id).toBe('id');
            expect(styleObj3.fields.table.innerTable.name).toBe('name');
            styleObj3.destroy();
            elem.remove();
            Styler.prototype.getPersistData = actual;
        });
        it('add on persistence with an empty list', function () {
            window.localStorage.clear();
            var elem = dom_1.createElement('div', { id: 'addonP' });
            document.body.appendChild(elem);
            var list = [];
            var actual = Styler.prototype.getPersistData;
            Styler.prototype.getPersistData = function () {
                return this.addOnPersist(list);
            };
            var styleObj2 = new Styler({ size: '20px', enablePersistence: true }, '#addonP');
            styleObj2.items = ['i1', 'i2', 'i3'];
            styleObj2.fields.id = 'EmpID';
            styleObj2.fields.name = 'EmpName';
            styleObj2.fields.table.id = 'TableID';
            styleObj2.fields.table.name = 'TableName';
            styleObj2.fields.table.innerTable.id = 'InnerTableID';
            styleObj2.fields.table.innerTable.name = 'InnerTableName';
            styleObj2.destroy();
            expect(window.localStorage.getItem('StyleraddonP')).toEqual('{}');
            var styleObj3 = new Styler({ size: '20px', enablePersistence: true }, '#addonP');
            expect(styleObj3.items).toEqual([]);
            expect(styleObj3.fields.id).toBe('id');
            expect(styleObj3.fields.name).toBe('name');
            expect(styleObj3.fields.table.id).toBe('id');
            expect(styleObj3.fields.table.name).toBe('name');
            expect(styleObj3.fields.table.innerTable.id).toBe('id');
            expect(styleObj3.fields.table.innerTable.name).toBe('name');
            styleObj3.destroy();
            elem.remove();
            Styler.prototype.getPersistData = actual;
        });
        it('ignore on persistence with out complex', function () {
            var elem = dom_1.createElement('div', { id: 'ignoreP' });
            var list = ['size'];
            document.body.appendChild(elem);
            window.localStorage.clear();
            var actual = Styler.prototype.getPersistData;
            Styler.prototype.getPersistData = function () {
                return this.ignoreOnPersist(list);
            };
            var styleObj2 = new Styler({ size: '20px', enablePersistence: true }, '#ignoreP');
            styleObj2.size = '200px';
            styleObj2.fields.id = 'EmpID';
            styleObj2.fields.name = 'EmpName';
            styleObj2.fields.table.id = 'TableID';
            styleObj2.fields.table.name = 'TableName';
            styleObj2.fields.table.innerTable.id = 'innerTableID';
            styleObj2.fields.table.innerTable.name = 'InnerTableName';
            styleObj2.destroy();
            expect(JSON.parse(window.localStorage.getItem('StylerignoreP')).fields).not.toEqual('');
            var styleObj3 = new Styler({ size: '20px', enablePersistence: true }, '#ignoreP');
            expect(styleObj3.size).toEqual('20px');
            expect(styleObj3.fields.id).toBe('EmpID');
            expect(styleObj3.fields.name).toBe('EmpName');
            expect(styleObj3.fields.table.id).toBe('TableID');
            expect(styleObj3.fields.table.name).toBe('TableName');
            expect(styleObj3.fields.table.innerTable.id).toBe('innerTableID');
            expect(styleObj3.fields.table.innerTable.name).toBe('InnerTableName');
            styleObj3.destroy();
            elem.remove();
            Styler.prototype.getPersistData = actual;
        });
        it('ignore on persistence with an array', function () {
            var elem = dom_1.createElement('div', { id: 'ignoreP' });
            var list = ['items'];
            document.body.appendChild(elem);
            window.localStorage.clear();
            var actual = Styler.prototype.getPersistData;
            Styler.prototype.getPersistData = function () {
                return this.ignoreOnPersist(list);
            };
            var styleObj2 = new Styler({ size: '20px', enablePersistence: true }, '#ignoreP');
            styleObj2.items = ['i1', 'i2'];
            styleObj2.size = '200px';
            styleObj2.fields.id = 'EmpID';
            styleObj2.fields.name = 'EmpName';
            styleObj2.fields.table.id = 'TableID';
            styleObj2.fields.table.name = 'TableName';
            styleObj2.fields.table.innerTable.id = 'innerTableID';
            styleObj2.fields.table.innerTable.name = 'InnerTableName';
            styleObj2.destroy();
            expect(JSON.parse(window.localStorage.getItem('StylerignoreP')).fields).not.toEqual('');
            var styleObj3 = new Styler({ size: '20px', enablePersistence: true }, '#ignoreP');
            expect(styleObj3.items).toEqual([]);
            expect(styleObj3.size).toEqual('200px');
            expect(styleObj3.fields.id).toBe('EmpID');
            expect(styleObj3.fields.name).toBe('EmpName');
            expect(styleObj3.fields.table.id).toBe('TableID');
            expect(styleObj3.fields.table.name).toBe('TableName');
            expect(styleObj3.fields.table.innerTable.id).toBe('innerTableID');
            expect(styleObj3.fields.table.innerTable.name).toBe('InnerTableName');
            styleObj3.destroy();
            elem.remove();
            Styler.prototype.getPersistData = actual;
        });
        it('ignore on persistence with complex', function () {
            var elem = dom_1.createElement('div', { id: 'ignoreP' });
            var list = ['size', 'fields.name', 'fields.table.name', 'fields.table.innerTable.id'];
            document.body.appendChild(elem);
            window.localStorage.clear();
            var actual = Styler.prototype.getPersistData;
            Styler.prototype.getPersistData = function () {
                return this.ignoreOnPersist(list);
            };
            var styleObj2 = new Styler({ size: '20px', enablePersistence: true }, '#ignoreP');
            styleObj2.size = '200px';
            styleObj2.fields.id = 'EmpID';
            styleObj2.fields.name = 'EmpName';
            styleObj2.fields.table.id = 'TableID';
            styleObj2.fields.table.name = 'TableName';
            styleObj2.fields.table.innerTable.id = 'innerTableID';
            styleObj2.fields.table.innerTable.name = 'InnerTableName';
            styleObj2.settings.color = 'Yellow';
            styleObj2.destroy();
            expect(JSON.parse(window.localStorage.getItem('StylerignoreP')).fields).not.toEqual('');
            var styleObj3 = new Styler({ size: '20px', enablePersistence: true }, '#ignoreP');
            expect(styleObj3.size).toEqual('20px');
            expect(styleObj3.fields.id).toBe('EmpID');
            expect(styleObj3.fields.name).toBe('name');
            expect(styleObj3.fields.table.id).toBe('TableID');
            expect(styleObj3.fields.table.name).toBe('name');
            expect(styleObj3.fields.table.innerTable.id).toBe('id');
            expect(styleObj3.fields.table.innerTable.name).toBe('InnerTableName');
            expect(styleObj3.settings.color).toBe('Yellow');
            styleObj3.destroy();
            elem.remove();
            Styler.prototype.getPersistData = actual;
        });
        it('ignore on persistence with an empty list', function () {
            var elem = dom_1.createElement('div', { id: 'ignoreP' });
            var list = [];
            document.body.appendChild(elem);
            window.localStorage.clear();
            var actual = Styler.prototype.getPersistData;
            Styler.prototype.getPersistData = function () {
                return this.ignoreOnPersist(list);
            };
            var styleObj2 = new Styler({ size: '20px', enablePersistence: true }, '#ignoreP');
            styleObj2.size = '200px';
            styleObj2.fields.id = 'EmpID';
            styleObj2.fields.name = 'EmpName';
            styleObj2.fields.table.id = 'TableID';
            styleObj2.fields.table.name = 'TableName';
            styleObj2.fields.table.innerTable.id = 'innerTableID';
            styleObj2.fields.table.innerTable.name = 'InnerTableName';
            styleObj2.settings.color = 'Yellow';
            styleObj2.destroy();
            expect(JSON.parse(window.localStorage.getItem('StylerignoreP')).fields).not.toEqual('');
            var styleObj3 = new Styler({ size: '20px', enablePersistence: true }, '#ignoreP');
            expect(styleObj3.size).toEqual('200px');
            expect(styleObj3.fields.id).toBe('EmpID');
            expect(styleObj3.fields.name).toBe('EmpName');
            expect(styleObj3.fields.table.id).toBe('TableID');
            expect(styleObj3.fields.table.name).toBe('TableName');
            expect(styleObj3.fields.table.innerTable.id).toBe('innerTableID');
            expect(styleObj3.fields.table.innerTable.name).toBe('InnerTableName');
            expect(styleObj3.settings.color).toBe('Yellow');
            styleObj3.destroy();
            elem.remove();
            Styler.prototype.getPersistData = actual;
        });
        describe('Eventlisteners', function () {
            var event1Spy;
            var event2SPy;
            var observeIns;
            var evtName = ['event1'];
            var value;
            var componentObj = { test: 'context' };
            var cntxtFunction = function () { value = this; };
            beforeEach(function () {
                var elem = dom_1.createElement('div', { id: 'observe' });
                document.body.appendChild(elem);
                observeIns = new Styler({ size: '20px' }, '#observe');
                event1Spy = jasmine.createSpy('event1');
                event2SPy = jasmine.createSpy('event2');
            });
            it('on adds handlers to the event properly', function () {
                observeIns.on('event1', event1Spy);
                observeIns.on([{ event: 'event2', handler: event2SPy }]);
                observeIns.notify('event1', {});
                observeIns.notify('event2', {});
                expect(event1Spy).toHaveBeenCalled();
            });
            it('off removes handlers from the specified event', function () {
                observeIns.event1 = event1Spy;
                observeIns.on([{ event: 'event1', handler: observeIns.event1 }, { event: 'event2', handler: cntxtFunction, context: componentObj }]);
                observeIns.off('event1', observeIns.event1);
                observeIns.notify('event1', {});
                observeIns.notify('event2', {});
                observeIns.off([{ event: 'event2', handler: cntxtFunction }]);
                expect(event1Spy).not.toHaveBeenCalled();
                expect(value).toBe(componentObj);
            });
            it('Check created event trigger properly ', function () {
                var spy = jasmine.createSpy('created');
                var elem = dom_1.createElement('div', { id: 'myStyleDiv1' });
                document.body.appendChild(elem);
                var styleObj = new Styler({ size: '25px', created: spy }, elem);
                expect(spy).toHaveBeenCalled();
                styleObj.destroy();
                document.body.innerHTML = '';
            });
            it('Check destroy event trigger properly ', function () {
                var spy = jasmine.createSpy('created');
                var elem = dom_1.createElement('div', { id: 'myStyleDiv1' });
                document.body.appendChild(elem);
                var styleObj = new Styler({ size: '25px', destroyed: spy }, elem);
                styleObj.destroy();
                expect(spy).toHaveBeenCalled();
                document.body.innerHTML = '';
            });
            afterEach(function () {
                document.body.innerHTML = '';
            });
        });
        describe('no change detection', function () {
            var obj = new Styler();
            var spy = jasmine.createSpy('detectSpy');
            it('before element', function () {
                obj.onPropertyChanged = spy;
                obj.size = '10px';
                obj.dataBind();
                expect(spy).not.toHaveBeenCalled();
            });
            it('after element', function () {
                var elem = dom_1.createElement('div', { id: 'ignoreP' });
                spy.calls.reset();
                obj.appendTo(elem);
                obj.size = '20px';
                obj.dataBind();
                expect(spy).toHaveBeenCalled();
            });
        });
        afterAll(function () {
            Styler1.prototype.injectedModules = [];
        });
        describe('set element id', function () {
            var elem = dom_1.createElement('div');
            it('needsID, id dont exist', function () {
                var obj = new Styler();
                obj.needsID = true;
                obj.appendTo(elem);
                expect(elem.id).toBe('Styler_3');
            });
            it('needsID, id exists', function () {
                var obj1 = new Styler();
                obj1.needsID = true;
                elem.id = 'demo';
                obj1.appendTo(elem);
                expect(elem.id).toBe('demo');
            });
        });
    });
});
